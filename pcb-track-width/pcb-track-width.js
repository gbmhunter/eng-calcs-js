//
// @file 				pcb-track-width.js
// @author 				Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 				n/a
// @created				2014-11-19
// @last-modified		2015-06-14
// @brief 				
// @details
//		See the README in the root dir for more info.
	

// Adding the pcbTrackWidth "namespace" for the calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: pcbTrackWidth" command within the HTML to access the child variables.
function pcbTrackWidth()
{

	//! @brief		Units for resistance
	var resistanceUnits = [
		new cc.unit('m\u2126', 0.001),
		new cc.unit('\u2126', 1.0),
		new cc.unit('k\u2126', 1000.0)
	];

	//===== CURRENT (input) =====//

	//! @brief		The track current (input).
	this.current = new cc.variable({
		name: 'current',		// Debugging name
		app: this,
		eqFn: function() { return; },	// Is input so don't need an equation function
		units: [
			new cc.unit('uA', 0.000001),
			new cc.unit('mA', 0.001),
			new cc.unit('A',  1.0),
		],
		selUnitNum: 2,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.current.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.current.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.current.AddCustomValidator(
		this.current,
		'Value is above recommended maximum (35A). Equation will not be as accurate (extrapolation will occur).',
		function(variable)
		{
			if(variable.val() <= 35)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	
	//===== TEMP RISE (input) =====//

	//! @brief		
	this.tempRise = new cc.variable({
		name: 'tempRise',
		app: this,
		eqFn: function() { return; },	
		units: [
			new cc.unit('\xB0C', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.tempRise.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.tempRise.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.tempRise.AddCustomValidator(
		this.tempRise,
		'Value is below recommended minimum (10C). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() >= 10)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	this.tempRise.AddCustomValidator(
		this.tempRise,
		'Value is above recommended maximum (100C). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() <= 100)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	

	//===== COPPER THICKNESS (input) =====//

	//! @brief		
	this.copperThickness = new cc.variable({
		name: 'copperThickness',
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('um', 0.000001),
			new cc.unit('oz', 0.0000350012)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.copperThickness.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.copperThickness.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.copperThickness.AddCustomValidator(
		this.copperThickness,
		'Value is below recommended minimum (17.5um ot 0.5oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() >= 0.0000175)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	this.copperThickness.AddCustomValidator(
		this.copperThickness,
		'Value is above recommended maximum (105um, or 3oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() <= 0.0001050036)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	
	//===== TRACE LOCATION (input) =====//

	this.traceLocation = ko.observable("externalTrace");

	//===== MINIMUM TRACK WIDTH (output) =====//

	this.minimumTrackWidth = new cc.variable({
		name: 'minimumTrackWidth',
		app: this,
		eqFn: function() 
		{
			
			//Log('this.actualRes.eqFn() called...');
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			//Log('Mulitplier = ' + this.desiredRes.selUnit().multiplier);
			
			// Get desired resistance  
			var current = this.current.val();
			Log('current = ' + current);
			var tempRise = this.tempRise.val();
			Log('tempRise = ' + tempRise);
			Log('copperThickness = ' + this.copperThickness.val())

			if(this.traceLocation() == 'externalTrace')     
			{
				Log('External trace selected.');
				crossSectionalArea = (Math.pow((current/(0.048*Math.pow(this.tempRise.val(), 0.44))), 1/0.725));
				Log('Cross-sectional area = ' + crossSectionalArea);
				width = (crossSectionalArea/(this.copperThickness.val()*1000000.0/25.4))*(25.4/1000000.0);
				return width;
			}
			else if(this.traceLocation() == 'internalTrace')
			{
				Log('Internal trace selected.');
				crossSectionalArea = (Math.pow((current/(0.024*Math.pow(this.tempRise.val(), 0.44))), 1/0.725));
				Log('Cross-sectional area = ' + crossSectionalArea);
				width = (crossSectionalArea/(this.copperThickness.val()*1000000.0/25.4))*(25.4/1000000.0);
				return width;
			}
		 
	
			//Log('Scaled resistance = ' + scaledDesRes);
			
			// Return the actual resistance
			//Log('Returning closest resistance = ' + scaledDesRes);
			//return (current*Math.pow(10, 2));
			
		},
		units: [
			new cc.unit('um', 0.000001),
			new cc.unit('mm', 0.001)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	// Function calculates the base-10 log of the given input
	function Log10(val)
	{
		// Use rule log10(x) = ln(x)/ln(10)
		return Math.log(val) / Math.LN10;
	}


}

// Register the calculator
cc.registerCalc(pcbTrackWidth, 'pcbTrackWidth');

