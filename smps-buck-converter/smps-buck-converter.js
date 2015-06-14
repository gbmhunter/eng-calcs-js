//
// @file 				smps-buck-converter.js
// @author 				Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 				n/a
// @created				2015-06-13
// @last-modified		2015-06-13
// @brief 				
// @details
//		See the README in the root dir for more info.
	

// Adding the smpsBuckConverter "namespace" for the calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: smpsBuckConverter" command within the HTML to access the child variables.
function smpsBuckConverter()
{

	//! @brief		Units for resistance
	var resistanceUnits = [
		new cc.unit('m\u2126', 0.001),
		new cc.unit('\u2126', 1.0),
		new cc.unit('k\u2126', 1000.0)
	];

	//===== INPUT VOLTAGE (input) =====//

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

	// Add validator
	this.inputVoltage.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.inputVoltage.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	
	//===== OUTPUT VOLTAGE (input) =====//
		
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
			if(app.outputVoltage.val() > app.inputVoltage.val())
				return false;
			return true;
		},
		cc.severityEnum.error
	);

	//===== DIODE VOLTAGE DROP (input) =====//
		
	this.diodeVoltageDrop = new cc.variable({
		name: 'diodeVoltageDrop',						// Debugging name
		app: this,
		eqFn: function() { return; },				// Is input so don't need an equation function	
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.diodeVoltageDrop.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.diodeVoltageDrop.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);

	//===== SWITCHING ELEMENT VOLTAGE DROP (input) =====//
		
	this.switchingElementVoltageDrop = new cc.variable({
		name: 'switchingElementVoltageDrop',						// Debugging name
		app: this,
		eqFn: function() { return; },				// Is input so don't need an equation function	
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.switchingElementVoltageDrop.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.switchingElementVoltageDrop.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);

	//===== DUTY CYCLE (output) =====//

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
			//Log('current = ' + current);
			var outputVoltage = this.outputVoltage.val();
			//Log('tempRise = ' + tempRise);
			//og('avgOutputCurrent = ' + this.avgOutputCurrent.val())
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
	
	//===== SWITCHING FREQUENCY (input) =====//

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

	// Add validator
	this.switchingFrequency.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.switchingFrequency.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);

	//===== AVG OUTPUT CURRENT (input) =====//

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

	// Add validator
	this.avgOutputCurrentA.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.avgOutputCurrentA.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);

	//===== PERCENTAGE OUTPUT CURRENT RIPPLE (input) =====//

	this.percOutputCurrentRipple = new cc.variable({
		name: 'percOutputCurrentRipple',				// Debugging name
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('%', 0.01)			
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.percOutputCurrentRipple.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.percOutputCurrentRipple.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);

	//===== Inductance (output) =====//

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

