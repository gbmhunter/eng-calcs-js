//!
//! @file 			lt3745.js
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
//! @edited 		n/a
//! @date 			2013-11-01
//! @last-modified	2014-11-08
//! @brief 			Binding/calculating code for the LT3745 calculator. PHP/HTML code is in lt3745.php.
//! @details
//!		See the README in the root dir for more info.

// Adding the lt3745 "namespace" for LT3745 calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: lt3745" command within the HTML to access the child variables.
this.lt3745 = function()
{

	//============= Vcc ============//
	
	this.supplyVoltage = new cc.input(
		this,
		function() { return true; },
		[ new cc.unit('V', 1.0) ],
		0
	);
			
	this.supplyVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Add validator
	this.supplyVoltage.AddCustomValidator(
		this,
		'Supply voltage must be between 3.0 and 5.5V.',
		function(app){
			if(app.supplyVoltage.val() < 3.0 || app.supplyVoltage.val() > 5.5)
				return false;
			return true;
		},
		cc.severityEnum.error
	);

	//============= Vload ============//
	
	this.loadVoltage = new cc.input(
		this,
		function() { return true; },
		[ new cc.unit('V', 1.0) ],
		0
	);
			
	this.loadVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Add validator
	this.loadVoltage.AddCustomValidator(
		this,
		'Voltage cannot be less than 0.',
		function(app){
			if(app.loadVoltage.val() < 0)
				return false;
			return true;
		},
		cc.severityEnum.error
	);
	
	//============== vOutMax ===========//
		
	this.vOutMax = new cc.input(
		this,
		function() { return true; },
		[ new cc.unit('V', 1.0) ],
		0
	);
	
	// Make sure it is a number
	this.vOutMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommend that it be between 0.8 and 3.0V higher than Vload
	this.vOutMax.AddCustomValidator(
		this,
		'vOutMax is recommended to be between 0.8-3.0V higher than Vload for the best current regulation.',
		function(app){
			if( (app.vOutMax.val() < app.loadVoltage.val() + 0.8) || (app.vOutMax.val() > app.loadVoltage.val() + 3.0))
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	//=============== Vin(min) ===============//
		
	this.vInMin = new cc.output(
		this,
		function() 
		{
			var tempVal = this.vOutMax.val() + 2.1;
			
			// Vin(min) cannot be less than 6.0V
			if(tempVal < 6.0)
				return 6.0;
				
			return tempVal;
		}, 
		function()
		{
			return true;
		},
		[ new cc.unit('V', 1.0) ],
		0);
	
	//================= Vin(max) ================//

	this.vInMax = new cc.input(
		this,
		function()
		{
			return true;
		},
		[ new cc.unit('V', 1.0) ],
		0);
	
	this.vInMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Add max voltage validator
	this.vInMax.AddCustomValidator(
		this,
		'Voltage cannot be greater than 55V.',
		function(app){
			if(app.vInMax.val() > 55)
				return false;
			return true;
		},
		cc.severityEnum.error
	);
	
	// Make sure Vin(max) is not less than Vin(min)
	this.vInMax.AddCustomValidator(
		this,
		'Vin(max) must be greater or equal to Vin(min).',
		function(app){
			if(app.vInMax.val() < app.vInMin.val())
				return false;
			return true;
		},
		cc.severityEnum.error
	);
	
	//========== Rfb1 =============//
	
	this.rfb1 = new cc.input(
		this,
		function() { return true; },
		[ 
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0) 
		],
		1
	);
	
	this.rfb1.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommended that this should be 10k
	this.rfb1.AddCustomValidator(
		this,
		'Rfb1 is recommended to be 10kR.',
		function(app){
			if(app.rfb1.val() != 10000.0)
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	//============== Rfb2 ==============//
		
	this.rfb2 = new cc.output(
		this,
		function() 
		{
			return (this.rfb1.val()*(this.vOutMax.val()/1.205 - 1));
		},
		function()
		{
			return true;
		},
		[ 
			new cc.unit('\u2126', 1.0), 
			new cc.unit('k\u2126', 1000.0)
		],
		1);
		
	//=============== Iout(max) =================//
	
	this.iOutMax = new cc.input(
		this,
		function() { return true; },
		[
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1.0)
		],
		0
	);
	
	this.iOutMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	//=========== Rsense ============//
	
	// Rsense = 35mV/Iout(max)
	this.rSense = new cc.output(
		this,
		function() 
		{	
			return (0.035/this.iOutMax.val());
		}, 
		function() { return true; },
		[
			new cc.unit('m\u2126', 0.001),
			new cc.unit('\u2126', 1.0)
		],
		0
	);
		
	//======= Prsense =========//
	
	// Prsense = Iout(max)^2*Rsense
	this.prsense = new cc.output(
		this,
		function() 
		{			
			var iOutMax = this.iOutMax.val();
			var rSense = this.rSense.val();
			
			return (Math.pow(iOutMax, 2)*rSense);
		},
		function() { return this; },
		[
			new cc.unit('mW', 0.001),
			new cc.unit('W', 1)
		],
		0
	);
		
	//================ iLedPinNom ================//
		
	this.iLedPinNom = new cc.input(
		this,
		function() { return true; },
		[
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1.0),
		],
		0
	);
	
	// Make sure it is a number
	this.iLedPinNom.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Make sure it is between 10-50mA
	this.iLedPinNom.AddCustomValidator(
		this,
		'iLedPin(nom) must be between 10-50mA.',
		function(app){
			if(app.iLedPinNom.val() < 0.01 || app.iLedPinNom.val() > 0.05)
				return false;
			return true;
		},
		cc.severityEnum.error
	);
	
	//======= Riset =========//

	// Riset = 2500*(1.205/Iled-pin(nom))
	this.riSet = new cc.output(
		this,
		function() 
		{
			var iLedPinNom = this.iLedPinNom.val();
			
			return (2500*(1.205/iLedPinNom));
		},
		function() { return true; },
		[
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		1
	);
		
	//============= Vd,f =============//
		
	this.vdf = new cc.input(
		this,
		function() { return true; },
		[
			new cc.unit('V', 1.0)
		],
		0
	);
	
	this.vdf.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	//======= Dmin =========//
	
	// Dmin = (vOutMax(max) + Vd,f) / (Vin(max) + Vd,f)
	this.dMin = new cc.output(
		this,
		function() 
		{		
			var vOutMax = this.vOutMax.val();
			var vdf = this.vdf.val();
			var vInMax = this.vInMax.val();
			
			return ((vOutMax + vdf) / (vInMax + vdf));
		}, 
		function() { return true; },
		[
			new cc.unit('%', 0.01),
		],
		0
	);
		
	//======= Dmax =========//
	
	// Dmax = (vOutMax(max) + Vd,f) / (Vin(min) + Vd,f)
	this.dMax = new cc.output(
		this,
		function() 
		{			
			var vOutMax = this.vOutMax.val();
			var vdf = this.vdf.val();
			var vInMin = this.vInMin.val();
			
			return ((vOutMax + vdf) / (vInMin + vdf));
		}, 
		function() { return true; },
		[
			new cc.unit('%', 0.01)
		],
		0
	);
	
	//================ ton(min)==============//
	
	this.tOnMin = new cc.input(
		this,
		function() { return true; },
		[
			new cc.unit('ns', 0.000000001)
		],
		0
	);
	
	this.tOnMin.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Should be greater than 1ns and less than 500ns
	this.tOnMin.AddCustomValidator(
		this,
		'ton(min) should be between 1-500ns.',
		function(app){
			if(app.tOnMin.val() < 0.000000001 || app.tOnMin.val() > 0.0000005)
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	//================ toff(min) ============//
	
	this.tOffMin = new cc.input(
		this,
		function () { return true; },
		[
			new cc.unit('ns', 0.000000001)
		],
		0
	);
	
	this.tOffMin.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Should be greater than 1ns and less than 500ns
	this.tOffMin.AddCustomValidator(
		this,
		'toff(min) should be between 1-500ns.',
		function(app){
			if(app.tOffMin.val() < 0.000000001 || app.tOffMin.val() > 0.0000005)
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	//================ fsw(max) ==============//
	
	// fsw(max) = min( Dmin/ton(min) , (1 - Dmax)/toff(min) )
	this.fSwMax = new cc.output(
		this,
		function() 
		{			
			var dMin = this.dMin.val();
			var tOnMin = this.tOnMin.val();
			var dMax = this.dMax.val();
			var tOffMin = this.tOffMin.val();
			
			return (Math.min(dMin/tOnMin, (1.0 - dMax)/tOffMin));
		}, 
		function() { return true; },
		[
			new cc.unit('kHz', 1000.0),
		],
		0
	);
	
	//================ fsw(act) ============//
	
	this.fSwAct = new cc.input(
		this,
		function(){
			return true;
		},
		[ new cc.unit('kHz', 1000.0) ],
		0);
	
	this.fSwAct.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Has to be between 100kHz-1MHz
	this.fSwAct.AddCustomValidator(
		this,
		'fsw(act) has to be between 100kHz-1MHz.',
		function(app){
			if(app.fSwAct.val() < 100000 || app.fSwAct.val() > 1000000)
				return false;
			return true;
		},
		cc.severityEnum.error
	);
	
	// Has to be less than fsw(max)
	this.fSwAct.AddCustomValidator(
		this,
		'fsw(act) has to be less than fsw(max).',
		function(app){
			if(app.fSwAct.val() > app.fSwMax.val())
				return false;
			return true;
		},
		cc.severityEnum.error
	);
	
	//================ fugf ==============//
	
	// fugf = fsw(act)/10
	this.fugf = new cc.output(
		this,
		function() 
		{			
			var fSwAct = this.fSwAct.val();
			return (fSwAct/10.0);
		}, 
		function() { return true; },
		[
			new cc.unit('kHz', 1000.0)
		],
		0
	);
	
	//================ Rt ==============//
	
	// Rt = 2.25167*10^11 / fSwAct^1.114
	this.rt = new cc.output(
		this,
		function() 
		{			
			var fSwAct = this.fSwAct.val();
			return ((2.25167*Math.pow(10, 11))/(Math.pow(fSwAct, 1.114)));
		}, 
		function() { return true; },
		[
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		1
	);
	
	//================ tj(max) ============//
	
	this.tjMax = new cc.input(
		this,
		function(){
			return true;
		},
		[ new cc.unit('\xB0C', 1.0) ],
		0);
	
	this.tjMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
		
	// tj(max) should be above room temperature
	this.tjMax.AddCustomValidator(
		this,
		'tjMax should really be higher than standard room temperature.',
		function(app){
			if(app.tjMax.val() < 25.0)
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	// Make sure tj(max) is below abs max temp set by IC
	this.tjMax.AddCustomValidator(
		this,
		'tjMax cannot be higher than the internally set maximum temperature.',
		function(app){
			if(app.tjMax.val() > 165.0)
				return false;
			return true;
		},
		cc.severityEnum.error
	);
		
	//================ Rtset ==============//
	
	this.rtSet = new cc.output(
		this,
		function() 
		{			
			var riSet = this.riSet.val();
			var tjMax = this.tjMax.val();
			
			return (0.00172*(tjMax + 273.15)*riSet)/1.205;
		}, 
		function() { return true; },
		[
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		1
	);
		
	//================ Cout(min) ==============//
	
	// Cout(min) = max( 0.25/(Rsense*fugf) , 1.5/(Rsense*Vbuck,out*fugf) )
	this.cOutMin = new cc.output(
		this,
		function() 
		{
			var rSense = this.rSense.val();
			var fugf = this.fugf.val();
			var vOutMax = this.vOutMax.val();
			
			return (Math.max( 0.25/(rSense*fugf), 1.5/(vOutMax*rSense*fugf)));
		}, 
		function() { return true; },
		[
			new cc.unit('uF', 0.000001),
		],
		0
	);
	
	//================ Il(delta) ============//
	
	this.iLDelta = new cc.input(
		this,
		function() { return true; },
		[
			new cc.unit('%', 0.01)
		],
		0
	);
	
	// Make sure it is a number
	this.iLDelta.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommend that it is between 10-50%
	this.iLDelta.AddCustomValidator(
		this,
		'iLDelta should be between 10-50%.',
		function(app){
			if(app.iLDelta.val() < 0.1 || app.iLDelta.val() > 0.5)
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	//================ L(min) ==============//
	
	// Lmin = [ (Vbuck,out + Vd,f) / (Vin(max) + Vd,f) ] * [ (Vin(max) - Vbuck,out) / (fsw(act)*Il(delta)) ]
	this.lMin = new cc.output(
		this,
		function() 
		{
			var vOutMax = this.vOutMax.val();
			var vdf = this.vdf.val();
			var vInMax = this.vInMax.val();
			var fSwAct = this.fSwAct.val();
			var iLDelta = this.iLDelta.val();
			
			return ( ((vOutMax + vdf)/(vInMax + vdf))*((vInMax - vOutMax)/(fSwAct*iLDelta)));
		}, 
		function() { return true; },
		[
			new cc.unit('uH', 0.000001),
		],
		0
	);	
		
	//================ Vin(ripple) ============//
	
	this.vInRipple = new cc.input(
		this,
		function() { return true; },
		[
			new cc.unit('mV', 0.001)
		],
		0
	);
	
	this.vInRipple.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommend that it is between 20mv-2.0V
	this.vInRipple.AddCustomValidator(
		this,
		'vInRipple should be between 20mV-2.0V.',
		function(app){
			if(app.vInRipple.val() < 0.020 || app.vInRipple.val() > 2.0)
				return false;
			return true;
		},
		cc.severityEnum.warning
	);
	
	//================ Cin(min) ==============//
	
	// Cin(min) = (Dmax*Iout(max)) / (Vin,ripple*fsw(act))
	this.cInMin = new cc.output(
		this,
		function() 
		{
			var dMax = this.dMax.val();
			var iOutMax = this.iOutMax.val();
			var vInRipple = this.vInRipple.val();
			var fSwAct = this.fSwAct.val();
			
			return ( (dMax*iOutMax)/(vInRipple*fSwAct) );
		}, 
		function() { return true; },
		[
			new cc.unit('uF', 0.000001),
		],
		0
	);
}

// Register the calculator
cc.registerCalc(lt3745, 'lt3745');
