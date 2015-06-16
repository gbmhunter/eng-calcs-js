//!
//! @file 			lt3745.js
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
//! @edited 		n/a
//! @date 			2013-11-01
//! @last-modified	2015-06-16
//! @brief 			Binding/calculating code for the LT3745 calculator. PHP/HTML code is in lt3745.php.
//! @details
//!		See the README in the root dir for more info.

// Adding the lt3745 "namespace" for LT3745 calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: lt3745" command within the HTML to access the child variables.
function lt3745()
{

	//==============================================================================//
	//================================== Vcc =======================================//
	//==============================================================================//
	
	this.supplyVoltage = new cc.variable({
		name: 'supplyVoltage',		// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('V',  1.0),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.supplyVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Add validator
	this.supplyVoltage.AddCustomValidator(
		this,
		'Supply voltage must be between 3.0 and 5.5V.',
		function(app){
			return (app.supplyVoltage.val() >= 3.0 && app.supplyVoltage.val() <= 5.5)
		},
		cc.severityEnum.error
	);

	//==============================================================================//
	//================================ Vload (input) ===============================//
	//==============================================================================//
	
	this.loadVoltage = new cc.variable({
		name: 'loadVoltage',		// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('V',  1.0),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
		
	// Add validator(s)	
	this.loadVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.loadVoltage.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	
	//==============================================================================//
	//================================= vOutMax (input) ============================//
	//==============================================================================//

	this.vOutMax = new cc.variable({
		name: 'vOutMax',		// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('V',  1.0),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
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
	
	//==============================================================================//
	//============================ Vin(min) (output) ===============================//
	//==============================================================================//

	this.vInMin = new cc.variable({
		name: 'vInMin',
		app: this,
		eqFn: function() 
		{		
			
			var tempVal = this.vOutMax.val() + 2.1;
			
			// Vin(min) cannot be less than 6.0V
			if(tempVal < 6.0)
				return 6.0;
				
			return tempVal;
			
		},
		units: [
			new cc.unit('V', 1.0)			
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	//==============================================================================//
	//============================ Vin(max) (input) ================================//
	//==============================================================================//

	this.vInMax = new cc.variable({
		name: 'vInMax',		// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('V',  1.0),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	// Make sure it is a number
	this.vInMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Add max voltage validator
	this.vInMax.AddCustomValidator(
		this,
		'Voltage cannot be greater than 55V.',
		function(app){
			return (app.vInMax.val() <= 55);
		},
		cc.severityEnum.error
	);

	// Make sure Vin(max) is not less than Vin(min)
	this.vInMax.AddCustomValidator(
		this,
		'Vin(max) must be greater or equal to Vin(min).',
		function(app){
			return (app.vInMax.val() >= app.vInMin.val());
		},
		cc.severityEnum.error
	);

	//==============================================================================//
	//================================ Rfb1 (input) ================================//
	//==============================================================================//

	this.rfb1 = new cc.variable({
		name: 'rfb1',		// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0) 
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.rfb1.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommended that this should be 10k
	this.rfb1.AddCustomValidator(
		this,
		'Rfb1 is recommended to be 10kR.',
		function(app){
			return (app.rfb1.val() == 10000.0)						
		},
		cc.severityEnum.warning
	);
	
	//==============================================================================//
	//============================== Rfb2 (output) =================================//
	//==============================================================================//

	this.rfb2 = new cc.variable({
		name: 'rfb2',
		app: this,
		eqFn: function() 
		{					
			return (this.rfb1.val()*(this.vOutMax.val()/1.205 - 1));			
		},
		units: [
			new cc.unit('\u2126', 1.0), 
			new cc.unit('k\u2126', 1000.0)			
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//	
	//============================= Iout(max) (input) ==============================//
	//==============================================================================//

	this.iOutMax = new cc.variable({
		name: 'iOutMax',				// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.iOutMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	//==============================================================================//
	//============================ Rsense (output) =================================//
	//==============================================================================//

	this.rSense = new cc.variable({
		name: 'rSense',
		app: this,
		eqFn: function() 
		{					
			return (0.035/this.iOutMax.val());		
		},
		units: [
			new cc.unit('m\u2126', 0.001),
			new cc.unit('\u2126', 1.0)		
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
		
	//==============================================================================//	
	//============================ Prsense (output) ================================//
	//==============================================================================//
	
	// Prsense = Iout(max)^2*Rsense
	this.prsense = new cc.variable({
		name: 'prsense',
		app: this,
		eqFn: function() 
		{					
			var iOutMax = this.iOutMax.val();
			var rSense = this.rSense.val();
			
			return (Math.pow(iOutMax, 2)*rSense);	
		},
		units: [
			new cc.unit('mW', 0.001),
			new cc.unit('W', 1)	
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
		
	//==============================================================================//
	//============================= iLedPinNom (input) =============================//
	//==============================================================================//

	this.iLedPinNom = new cc.variable({
		name: 'iLedPinNom',				// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	// Make sure it is a number
	this.iLedPinNom.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Make sure it is between 10-50mA
	this.iLedPinNom.AddCustomValidator(
		this,
		'iLedPin(nom) must be between 10-50mA.',
		function(app){
			return (app.iLedPinNom.val() >= 0.01 && app.iLedPinNom.val() <= 0.05)
		},
		cc.severityEnum.error
	);
	
	//==============================================================================//
	//================================= Riset (output) =============================//
	//==============================================================================//

	// Riset = 2500*(1.205/Iled-pin(nom))
	this.riSet = new cc.variable({
		name: 'riSet',
		app: this,
		eqFn: function() 
		{					
			var iLedPinNom = this.iLedPinNom.val();
			
			return (2500*(1.205/iLedPinNom));	
		},
		units: [
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//	
	//================================= Vd,f (input) ===============================//
	//==============================================================================//		

	this.vdf = new cc.variable({
		name: 'vdf',					// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('V', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.vdf.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	//==============================================================================//
	//============================== Dmin (output) =================================//
	//==============================================================================//
	
	// Dmin = (vOutMax(max) + Vd,f) / (Vin(max) + Vd,f)
	this.dMin = new cc.variable({
		name: 'dMin',
		app: this,
		eqFn: function() 
		{					
			var vOutMax = this.vOutMax.val();
			var vdf = this.vdf.val();
			var vInMax = this.vInMax.val();
			
			return ((vOutMax + vdf) / (vInMax + vdf));
		},
		units: [
			new cc.unit('%', 0.01)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
		
	//==============================================================================//
	//=============================== Dmax (output) ================================//
	//==============================================================================//
	
	// Dmax = (vOutMax(max) + Vd,f) / (Vin(min) + Vd,f)
	this.dMax = new cc.variable({
		name: 'dMax',
		app: this,
		eqFn: function() 
		{					
			var vOutMax = this.vOutMax.val();
			var vdf = this.vdf.val();
			var vInMin = this.vInMin.val();
			
			return ((vOutMax + vdf) / (vInMin + vdf));
		},
		units: [
			new cc.unit('%', 0.01)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//
	//============================== ton(min) (input) ==============================//
	//==============================================================================//

	this.tOnMin = new cc.variable({
		name: 'tOnMin',					// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [						
			new cc.unit('ns', 1e-9)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.tOnMin.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Should be greater than 1ns and less than 500ns
	this.tOnMin.AddCustomValidator(
		this,
		'ton(min) should be between 1-500ns.',
		function(app){
			return (app.tOnMin.val() >= 1e-9 && app.tOnMin.val() <= 500e-9);
		},
		cc.severityEnum.warning
	);
	
	//==============================================================================//
	//================================ toff(min) (input) ===========================//
	//==============================================================================//

	this.tOffMin = new cc.variable({
		name: 'tOffMin',					// Debugging name
		app: this,
		eqFn: function() { return; },		// Is input so don't need an equation function
		units: [						
			new cc.unit('ns', 1e-9)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.tOffMin.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Should be greater than 1ns and less than 500ns
	this.tOffMin.AddCustomValidator(
		this,
		'toff(min) should be between 1-500ns.',
		function(app){
			return (app.tOnMin.val() >= 1e-9 && app.tOnMin.val() <= 500e-9);
		},
		cc.severityEnum.warning
	);
	
	//==============================================================================//
	//============================== fsw(max) (output) =============================//
	//==============================================================================//
	
	// fsw(max) = min( Dmin/ton(min) , (1 - Dmax)/toff(min) )
	this.fSwMax = new cc.variable({
		name: 'fSwMax',
		app: this,
		eqFn: function() 
		{					
			var dMin = this.dMin.val();
			var tOnMin = this.tOnMin.val();
			var dMax = this.dMax.val();
			var tOffMin = this.tOffMin.val();
			
			return (Math.min(dMin/tOnMin, (1.0 - dMax)/tOffMin));
		},
		units: [
			new cc.unit('kHz', 1000.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//
	//============================ fsw(act) (input) ================================//
	//==============================================================================//
	
	this.fSwAct = new cc.variable({
		name: 'fSwAct',					// Debugging name
		app: this,
		eqFn: function() { return; },		// Is input so don't need an equation function
		units: [						
			new cc.unit('kHz', 1000.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.fSwAct.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Has to be between 100kHz-1MHz
	this.fSwAct.AddCustomValidator(
		this,
		'fsw(act) has to be between 100kHz-1MHz.',
		function(app){
			return (app.fSwAct.val() >= 100e3 && app.fSwAct.val() <= 1e6);
		},
		cc.severityEnum.error
	);
	
	// Has to be less than fsw(max)
	this.fSwAct.AddCustomValidator(
		this,
		'fsw(act) has to be less than or equal to fsw(max).',
		function(app){
			return(app.fSwAct.val() <= app.fSwMax.val());
		},
		cc.severityEnum.error
	);
	
	//==============================================================================//
	//================================= fugf (output) ==============================//
	//==============================================================================//
	
	// fugf = fsw(act)/10
	this.fugf = new cc.variable({
		name: 'fugf',
		app: this,
		eqFn: function() 
		{					
			var fSwAct = this.fSwAct.val();
			return (fSwAct/10.0);
		},
		units: [
			new cc.unit('kHz', 1000.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//
	//================================= Rt (output) ================================//
	//==============================================================================//
	
	// Rt = 2.25167*10^11 / fSwAct^1.114
	this.rt = new cc.variable({
		name: 'rt',
		app: this,
		eqFn: function() 
		{					
			var fSwAct = this.fSwAct.val();
			return ((2.25167*Math.pow(10, 11))/(Math.pow(fSwAct, 1.114)));
		},
		units: [
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//
	//================================ tj(max) (input) =============================//
	//==============================================================================//

	this.tjMax = new cc.variable({
		name: 'tjMax',					// Debugging name
		app: this,
		eqFn: function() { return; },		// Is input so don't need an equation function
		units: [						
			new cc.unit('\xB0C', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.tjMax.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
		
	// tj(max) should be above room temperature
	this.tjMax.AddCustomValidator(
		this,
		'tjMax should really be higher than standard room temperature.',
		function(app){
			return (app.tjMax.val() <= 25.0);
		},
		cc.severityEnum.warning
	);
	
	// Make sure tj(max) is below abs max temp set by IC
	this.tjMax.AddCustomValidator(
		this,
		'tjMax cannot be higher than the internally set maximum temperature.',
		function(app){
			return (app.tjMax.val() <= 165.0);
		},
		cc.severityEnum.error
	);
		
	//==============================================================================//
	//================================= Rtset (output) =============================//
	//==============================================================================//

	this.rtSet = new cc.variable({
		name: 'rtSet',
		app: this,
		eqFn: function() 
		{					
			var riSet = this.riSet.val();
			var tjMax = this.tjMax.val();
			
			return (0.00172*(tjMax + 273.15)*riSet)/1.205;
		},
		units: [
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
		
	//==============================================================================//
	//============================== Cout(min) (output) ============================//
	//==============================================================================//
	
	// Cout(min) = max( 0.25/(Rsense*fugf) , 1.5/(Rsense*Vbuck,out*fugf) )
	this.cOutMin = new cc.variable({
		name: 'cOutMin',
		app: this,
		eqFn: function() 
		{					
			var rSense = this.rSense.val();
			var fugf = this.fugf.val();
			var vOutMax = this.vOutMax.val();
			
			return (Math.max( 0.25/(rSense*fugf), 1.5/(vOutMax*rSense*fugf)));
		},
		units: [
			new cc.unit('uF', 1e-6)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==============================================================================//
	//================================== Il(delta) =================================//
	//==============================================================================//

	this.iLDelta = new cc.variable({
		name: 'iLDelta',					// Debugging name
		app: this,
		eqFn: function() { return; },		// Is input so don't need an equation function
		units: [						
			new cc.unit('%', 0.01)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	// Make sure it is a number
	this.iLDelta.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommend that it is between 10-50%
	this.iLDelta.AddCustomValidator(
		this,
		'iLDelta should be between 10-50%.',
		function(app){
			return (app.iLDelta.val() >= 0.1 && app.iLDelta.val() <= 0.5);
		},
		cc.severityEnum.warning
	);
	
	//==============================================================================//
	//================================ L(min) (output) =============================//
	//==============================================================================//
	
	// Lmin = [ (Vbuck,out + Vd,f) / (Vin(max) + Vd,f) ] * [ (Vin(max) - Vbuck,out) / (fsw(act)*Il(delta)) ]
	this.lMin = new cc.variable({
		name: 'lMin',
		app: this,
		eqFn: function() 
		{					
			var vOutMax = this.vOutMax.val();
			var vdf = this.vdf.val();
			var vInMax = this.vInMax.val();
			var fSwAct = this.fSwAct.val();
			var iLDelta = this.iLDelta.val();
			
			return ( ((vOutMax + vdf)/(vInMax + vdf))*((vInMax - vOutMax)/(fSwAct*iLDelta)));
		},
		units: [
			new cc.unit('uH', 1e-6),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
		
	//==============================================================================//
	//=============================== Vin(ripple) (input) ==========================//
	//==============================================================================//

	this.vInRipple = new cc.variable({
		name: 'vInRipple',					// Debugging name
		app: this,
		eqFn: function() { return; },		// Is input so don't need an equation function
		units: [						
			new cc.unit('mV', 1e-3)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});
	
	this.vInRipple.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	
	// Recommend that it is between 20mv-2.0V
	this.vInRipple.AddCustomValidator(
		this,
		'vInRipple should be between 20mV-2.0V.',
		function(app){
			return (app.vInRipple.val() >= 0.020 && app.vInRipple.val() <= 2.0);
		},
		cc.severityEnum.warning
	);
	
	//==============================================================================//
	//================================ Cin(min) (output) ===========================//
	//==============================================================================//
	
	// Cin(min) = (Dmax*Iout(max)) / (Vin,ripple*fsw(act))
	this.cInMin = new cc.variable({
		name: 'cInMin',
		app: this,
		eqFn: function() 
		{					
			var dMax = this.dMax.val();
			var iOutMax = this.iOutMax.val();
			var vInRipple = this.vInRipple.val();
			var fSwAct = this.fSwAct.val();
			
			return ( (dMax*iOutMax)/(vInRipple*fSwAct) );
		},
		units: [
			new cc.unit('uF', 1e-6),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
}

// Register the calculator
cc.registerCalc(lt3745, 'lt3745');
