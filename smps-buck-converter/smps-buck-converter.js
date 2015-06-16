//
// @file 				smps-buck-converter.js
// @author 				Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 				n/a
// @created				2015-06-13
// @last-modified		2015-06-15
// @brief 				
// @details
//		See the README in the root dir for more info.

//console.log("RawVal = 1234, EngNot = '" + cc.ToEngNotation(1234) + "'.");
//console.log("RawVal = 12, EngNot = '" + cc.ToEngNotation(12) + "'.");
//console.log("RawVal = 1234567, EngNot = '" + cc.ToEngNotation(1234567) + "'.");
//console.log("RawVal = 0.023, EngNot = '" + cc.ToEngNotation(0.023) + "'.");
//console.log("RawVal = 0.000023, EngNot = '" + cc.ToEngNotation(0.000023) + "'.");


// Adding the smpsBuckConverter "namespace" for the calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: smpsBuckConverter" command within the HTML to access the child variables.
function smpsBuckConverter()
{

	// Calculator constants
	var SWITCHING_FREQUENCY_TOO_LOW_HZ = 100e3;
	var SWITCHING_FREQUENCY_TOO_HIGH_HZ = 10e6;
	var CURRENT_TOO_HIGH_A = 40;
	var RIPPLE_CURRENT_TOO_HIGH_PERC = 20;
	

	//==========================================================================================================//
	//============================================== INPUT VOLTAGE (input) =====================================//
	//==========================================================================================================//

	this.inputVoltage = new cc.variable({
		name: 'inputVoltage',		// Debugging name
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
	this.inputVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.inputVoltage.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	
	//==========================================================================================================//
	//=========================================== OUTPUT VOLTAGE (input) =======================================//
	//==========================================================================================================//
		
	this.outputVoltage = new cc.variable({
		name: 'outputVoltage',						// Debugging name
		app: this,
		eqFn: function() { return; },				// Is input so don't need an equation function	
		units: [
			new cc.unit('V', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.outputVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.outputVoltage.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.outputVoltage.AddCustomValidator(
		this,
		'For a buck converter, the output voltage has to be equal to or less than the input voltage.',
		function(app){
			return app.outputVoltage.val() <= app.inputVoltage.val()
		},
		cc.severityEnum.error
	);

	//==========================================================================================================//
	//============================================= DIODE VOLTAGE DROP (input) =================================//
	//==========================================================================================================//
		
	this.diodeVoltageDrop = new cc.variable({
		name: 'diodeVoltageDrop',						// Debugging name
		app: this,
		eqFn: function() { return; },					// Is input so don't need an equation function	
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.diodeVoltageDrop.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.diodeVoltageDrop.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.diodeVoltageDrop.AddCustomValidator(
		this, 
		"The diode voltage drop must be less than the input voltage.",
		function(app){
			return app.diodeVoltageDrop.val() < app.inputVoltage.val()						
		},
		cc.severityEnum.error);

	//==========================================================================================================//
	//======================================= SWITCHING ELEMENT VOLTAGE DROP (input) ===========================//
	//==========================================================================================================//
		
	this.switchingElementVoltageDrop = new cc.variable({
		name: 'switchingElementVoltageDrop',						// Debugging name
		app: this,
		eqFn: function() { return; },				// Is input so don't need an equation function	
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.switchingElementVoltageDrop.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.switchingElementVoltageDrop.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.switchingElementVoltageDrop.AddCustomValidator(
		this, 
		"The sum of the diode and switching element voltage drops must be less than the input voltage.",
		function(app){
			return (app.diodeVoltageDrop.val() + app.switchingElementVoltageDrop.val() < app.inputVoltage.val())						
		},
		cc.severityEnum.error);

	//==========================================================================================================//
	//============================================= DUTY CYCLE (output) ========================================//
	//==========================================================================================================//

	this.dutyCycle = new cc.variable({
		name: 'dutyCycle',
		app: this,
		eqFn: function() 
		{		
			
			// Quit if units have not been initialised
			if(this.inputVoltage.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			//Log('Mulitplier = ' + this.desiredRes.selUnit().multiplier);
			
			// Get desired resistance  
			var inputVoltage = this.inputVoltage.val();			
			var outputVoltage = this.outputVoltage.val();					
			var diodeVoltageDrop = this.diodeVoltageDrop.val();
			var switchingElementVoltageDrop = this.switchingElementVoltageDrop.val();
			
			var dutyCycle = (outputVoltage - diodeVoltageDrop) / (inputVoltage - switchingElementVoltageDrop - diodeVoltageDrop);

			return dutyCycle;				
			
		},
		units: [
			new cc.unit('%', 0.01)			
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//==========================================================================================================//
	//===================================== SWITCHING FREQUENCY (input) ========================================//
	//==========================================================================================================//

	this.switchingFrequency = new cc.variable({
		name: 'switchingFrequency',				// Debugging name
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('kHz', 1000),
			new cc.unit('MHz', 1000000)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.switchingFrequency.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.switchingFrequency.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.switchingFrequency.AddCustomValidator(
		this, 
		"Yawn...Low switching frequencies result in large inducatances (these are big, heavy and expensive) and/or larger ripple currents. " +
		"Try for something greater or equal to '" + cc.ToEngNotation(SWITCHING_FREQUENCY_TOO_LOW_HZ) + "Hz'.",
		function(app){
			return (app.switchingFrequency.val() >= SWITCHING_FREQUENCY_TOO_LOW_HZ)						
		},
		cc.severityEnum.warning);
	this.switchingFrequency.AddCustomValidator(
		this, 
		"Easy speedster! High switching frequencies increase the losses in the switching element and diode. Try for something lower or equal to '" +
		cc.ToEngNotation(SWITCHING_FREQUENCY_TOO_HIGH_HZ) + "Hz'.",
		function(app){
			return (app.switchingFrequency.val() < SWITCHING_FREQUENCY_TOO_HIGH_HZ)						
		},
		cc.severityEnum.warning);

	//==========================================================================================================//
	//======================================= AVG OUTPUT CURRENT (input) =======================================//
	//==========================================================================================================//

	this.avgOutputCurrentA = new cc.variable({
		name: 'avgOutputCurrentA',				// Debugging name
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.avgOutputCurrentA.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.avgOutputCurrentA.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.avgOutputCurrentA.AddCustomValidator(
		this, 
		"Proceed with caution, this is quite alot of current (>'" + cc.ToEngNotation(CURRENT_TOO_HIGH_A) + "A')! ",
		function(app){
			return (app.avgOutputCurrentA.val() <= CURRENT_TOO_HIGH_A)						
		},
		cc.severityEnum.warning);

	//==========================================================================================================//
	//================================ PERCENTAGE OUTPUT CURRENT RIPPLE (input) ================================//
	//==========================================================================================================//

	this.percOutputCurrentRipple = new cc.variable({
		name: 'percOutputCurrentRipple',					// Debugging name
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('%', 0.01)							// Percentages are always 0.01	
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.percOutputCurrentRipple.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.percOutputCurrentRipple.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.percOutputCurrentRipple.AddCustomValidator(
		this, 
		"Ripple current is recommended to be <= '" + cc.ToEngNotation(RIPPLE_CURRENT_TOO_HIGH_PERC) + "%'.",
		function(app){
			return (app.percOutputCurrentRipple.val() <= RIPPLE_CURRENT_TOO_HIGH_PERC/100)						
		},
		cc.severityEnum.warning);

	//==========================================================================================================//
	//======================================= INDUCTANCE (output) ==============================================//
	//==========================================================================================================//

	this.inductance = new cc.variable({
		name: 'inductance',
		app: this,
		eqFn: function() 
		{		
			
			// Quit if units have not been initialised
			if(this.inputVoltage.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
									  
			// Calculate switch on time  
			var ton = this.dutyCycle.val()/this.switchingFrequency.val();
			Log('ton = ' + ton);

			// Calculate absolute output current ripple (i.e. not as a percentage)
			var outputCurrentRippleA = this.percOutputCurrentRipple.val()*this.avgOutputCurrentA.val();
			Log('outputCurrentRippleA = ' + outputCurrentRippleA);

			var inductance = ((this.inputVoltage.val() - this.switchingElementVoltageDrop.val() - this.outputVoltage.val())*ton) / (outputCurrentRippleA);	
			Log('inductance = ' + inductance);		

			return inductance;				
			
		},
		units: [
			new cc.unit('uH', 0.000001),
			new cc.unit('mH', 0.001)			
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

}

// Register the calculator
cc.registerCalc(smpsBuckConverter, 'smpsBuckConverter');

