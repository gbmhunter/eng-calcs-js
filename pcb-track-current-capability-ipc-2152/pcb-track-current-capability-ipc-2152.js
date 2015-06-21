//
// @file 				pcb-track-current-capability-ipc-2152.js
// @author 				Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 				n/a
// @created				2015-06-20
// @last-modified		2015-06-20
// @brief 				
// @details
//		See the README in the root dir for more info.
	

// Adding the pcbTrackWidth "namespace" for the calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: pcbTrackWidth" command within the HTML to access the child variables.
function pcbTrackCurrentCapabilityIpc2152()
{

	//! @brief		Units for resistance
	var resistanceUnits = [
		new cc.unit('m\u2126', 0.001),
		new cc.unit('\u2126', 1.0),
		new cc.unit('k\u2126', 1000.0)
	];

	var NUM_MILS_PER_MM = 1000/25.4;
	var UNIT_CONVERSION_COPPER_THICKNESS_M_PER_OZ = 0.0000350012;
	var UNIT_CONVERSION_M_PER_MIL = 25.4/1e6;
	var UNIT_CONVERSION_M2_PER_MIL2 = UNIT_CONVERSION_M_PER_MIL*UNIT_CONVERSION_M_PER_MIL;

	var UNIT_CONVERSION_THERMAL_CONDUCTIVITY_WATT_nMETER_nKELVIN_PER_BTU_nHOUR_nFT_nDEGF = 1.73;

	// UNIVERSAL CHART CONSTANTS

	// The trendlines to calculate the co-efficients for a fixed temp takes the form y = Ax^B
	// where y is the co-efficient, x is the temperature.
	// e.g. (co-efficient A) = AA * temp ^ AB
	//      (co-efficient B) = BA * temp ^ BB
	var UNIVERSAL_CHART_TREND_LINE_COEF_AA = 8.9710902134e-02;
	var UNIVERSAL_CHART_TREND_LINE_COEF_AB = 3.9379253898e-01;

	var UNIVERSAL_CHART_TREND_LINE_COEF_BA = 5.0382053698e-01;
	var UNIVERSAL_CHART_TREND_LINE_COEF_BB = 3.8495772461e-02;

	// TRACK THICKNESS MODIFIER CONSTANTS

	// The data from the track thickness modifier graph in IPS-2152 is modelled using
	// a 5th degree polynomial

	// y = C0 + C1*x^1 + C2*x^2 + C3*x^3 + C4*x^4 + C5*x^5

	var TRACK_THICKNESS_TREND_LINE_COEF_COEF_A =
		[
			[
				9.8453567795e-01,	// C0C0
				-2.2281787548e-01,	// C0C1
				2.0061423196e-01,	// C0C2
				-4.1541116264e-02,	// C0C3
			],
			[
				-1.6571949210e-02,	// C1C0
				1.7520059279e-04,	// C1C1
				-5.0615234096e-03,	// C1C2
				2.2814836340e-03,	// C1C3
			],
			[
				8.8711317661e-04,	// C2C0
				1.3631745743e-03,	// C2C1
				-2.2373309710e-04,	// C2C2
				-1.0974218613e-04	// C2C3
			],
			[
				-6.6729255031e-06,	// e.t.c...
				-1.4976736827e-04,
				5.8082340133e-05,
				-2.4728159584e-06
			],
			[
				-7.9576264561e-07,	
				5.5788354958e-06,	
				-2.4912026388e-06,	
				2.4000295954e-07	
			],
			[
				1.6619678738e-08,	
				-7.1122635445e-08,	
				3.3800191741e-08,	
				-3.9797591878e-09	
			]
		];

	// BOARD THICKNESS CONSTANTS

	var BOARD_THICKNESS_TREND_LINE_COEF_A = 2.4929779905e+01;
	var BOARD_THICKNESS_TREND_LINE_COEF_B = -7.5501997929e-01;

	// PLANE PROXIMITY CONSTANTS

	var PLANE_PROXIMITY_TREND_LINE_COEF_M = 3.1298662911e-03;
	var PLANE_PROXIMITY_TREND_LINE_COEF_C = 4.0450883823e-01;

	// THERMAL CONDUCTIVITY CONSTANTS

	var THERMAL_CONDUCTIVITY_TREND_LINE_COEF_M = -1.4210148167e+00;
	var THERMAL_CONDUCTIVITY_TREND_LINE_COEF_C = 1.1958174134e+00;

	//========================================================================================================//
	//============================================= CHECKBOX (input) =========================================//
	//========================================================================================================//

	//! @brief 		Variable for hiding extra calculator variables
	//! @details	Starts of hidden (pass in false).
	this.showExtraVariables = new ko.observable(false);

	//========================================================================================================//
	//============================================== CURRENT (input) =========================================//
	//========================================================================================================//

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

	// Add validator(s)
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
	
	//========================================================================================================//
	//============================================ TEMP RISE (input) =========================================//
	//========================================================================================================//

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

	// Add validator(s)
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
	
	//========================================================================================================//
	//========================== UN-ADJUSTED TRACK CROSS-SECTIONAL AREA (output) =============================//
	//========================================================================================================//

	this.unadjustedTrackCrosssectionalArea = new cc.variable({
		name: 'unadjustedTrackCrosssectionalArea',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			// Get desired resistance  
			var current = this.current.val();
			Log('current = ' + current);
			var tempRise = this.tempRise.val();
			Log('tempRise = ' + tempRise);
			
			// Lets calculate the two co-efficients for the fixed-temp trend line 
			var universalChartTrendLineCoefA = UNIVERSAL_CHART_TREND_LINE_COEF_AA * Math.pow(tempRise, UNIVERSAL_CHART_TREND_LINE_COEF_AB); 
			var universalChartTrendLineCoefB = UNIVERSAL_CHART_TREND_LINE_COEF_BA * Math.pow(tempRise, UNIVERSAL_CHART_TREND_LINE_COEF_BB); 
		 
		 	// Now we know the two co-efficients, we can use the trend line eq. y=Ax^B to find the unadjusted cross-sectional area
			var unadjustedTrackCrosssectionalAreaMils2 = Math.pow(current/universalChartTrendLineCoefA, 1/universalChartTrendLineCoefB);

			//console.log("unadjustedTrackCrosssectionalAreaMils2 = '" + unadjustedTrackCrosssectionalAreaMils2 + "'.");

			// Convert mils^2 to m^2 (store variable values in SI units)
			var unadjustedTrackCrosssectionalAreaM2 = unadjustedTrackCrosssectionalAreaMils2*(1/(NUM_MILS_PER_MM*NUM_MILS_PER_MM*1e6));

			return unadjustedTrackCrosssectionalAreaM2;  
			
		},
		units: [
			new cc.unit('um^2', 1e-12),
			new cc.unit('mils^2', UNIT_CONVERSION_M2_PER_MIL2),
			new cc.unit('mm^2', 1e-6)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	//========================================================================================================//
	//========================================== TRACK THICKNESS (input) ====================================//
	//========================================================================================================//

	//! @brief		
	this.trackThickness = new cc.variable({
		name: 'trackThickness',
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('um', 1e-6),
			new cc.unit('oz', UNIT_CONVERSION_COPPER_THICKNESS_M_PER_OZ),
			new cc.unit('Mm', 1e-3)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator
	this.trackThickness.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.trackThickness.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.trackThickness.AddCustomValidator(
		this.trackThickness,
		'Value is below recommended minimum (17.5um ot 0.5oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() >= 0.0000175)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	this.trackThickness.AddCustomValidator(
		this.trackThickness,
		'Value is above recommended maximum (105um, or 3oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() <= 0.0001050036)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);

	//========================================================================================================//
	//==================================== TRACK THICKNESS MODIFIER (output) =================================//
	//========================================================================================================//

	this.trackThicknessModifier = new cc.variable({
		name: 'trackThicknessModifier',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			// Get desired resistance  
			var currentA = this.current.val();
			var trackThicknessM = this.trackThickness.val();

			// Convert to "oz" units, as this is what is used in IPC-2152 graphs
			var trackThicknessOz = trackThicknessM*(1/UNIT_CONVERSION_COPPER_THICKNESS_M_PER_OZ);
			//console.log("trackThicknessOz = " + trackThicknessOz);

			// Lets calculate the two co-efficients for the fixed-temp trend line 
			var trackThicknessTrendLineCoefA = [];

			//console.log("test = " + TRACK_THICKNESS_TREND_LINE_COEF_COEF_A[0].length);


			// Outer loop calculates all co-efficients
			for(i = 0; i < TRACK_THICKNESS_TREND_LINE_COEF_COEF_A.length; i++)
			{
				// Initialise array element with 0
				trackThicknessTrendLineCoefA[i] = 0;

				//console.log("i = " + i);
				//console.log("test = " + TRACK_THICKNESS_TREND_LINE_COEF_COEF_A[i].length);

				// Inner loop calculates a single co-efficient
				for(j = 0; j < TRACK_THICKNESS_TREND_LINE_COEF_COEF_A[i].length; j++)
				{
					//TRACK_THICKNESS_TREND_LINE_COEF_COEF_A[0,0] = 2;
					//console.log("sum = " + TRACK_THICKNESS_TREND_LINE_COEF_COEF_A[0,0]);
					trackThicknessTrendLineCoefA[i] += TRACK_THICKNESS_TREND_LINE_COEF_COEF_A[i][j]*Math.pow(trackThicknessOz, j);
				}

				//console.log("trackThicknessTrendLineCoefA[" + i + "] = '" + trackThicknessTrendLineCoefA[i] + "'.");
			}

			// Now we have calculate the 5th degree polynomial co-efficients, we can finally calc the thickness modifier
			var trackThicknessModifierMulti = 0;

			for(i = 0; i < trackThicknessTrendLineCoefA.length; i++)
			{
				trackThicknessModifierMulti += trackThicknessTrendLineCoefA[i]*Math.pow(currentA, i);
			}

			return trackThicknessModifierMulti;  
			//return 0;
		},
		units: [
			new cc.unit('no unit', 1)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	//========================================================================================================//
	//========================================== BOARD THICKNESS (input) ====================================//
	//========================================================================================================//

	//! @brief		
	this.boardThickness = new cc.variable({
		name: 'boardThickness',
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('um', 1e-6),
			new cc.unit('mils', UNIT_CONVERSION_M_PER_MIL),
			new cc.unit('mm', 1e-3),
		],
		selUnitNum: 2,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.boardThickness.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.boardThickness.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.boardThickness.AddCustomValidator(
		this.boardThickness,
		'Value is below recommended minimum (17.5um ot 0.5oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() >= 0.0000175)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	this.boardThickness.AddCustomValidator(
		this.boardThickness,
		'Value is above recommended maximum (105um, or 3oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() <= 0.0001050036)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);

	//========================================================================================================//
	//==================================== BOARD THICKNESS MODIFIER (output) =================================//
	//========================================================================================================//

	this.boardThicknessModifier = new cc.variable({
		name: 'boardThicknessModifier',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			var boardThicknessM = this.boardThickness.val();

			// Convert to "mils" units, as this is what is used in IPC-2152 graphs
			var boardThicknessMils = boardThicknessM*(1/UNIT_CONVERSION_M_PER_MIL);
			
			var boardThicknessModifierMulti = BOARD_THICKNESS_TREND_LINE_COEF_A * Math.pow(boardThicknessMils, BOARD_THICKNESS_TREND_LINE_COEF_B);

			return boardThicknessModifierMulti;
		},
		units: [
			new cc.unit('no unit', 1)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	
	
	//========================================================================================================//
	//=========================================== PLANE PROXIMITY (input) ====================================//
	//========================================================================================================//

	//! @brief		
	this.planeProximity = new cc.variable({
		name: 'planeProximity',
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('um', 1e-6),
			new cc.unit('mils', UNIT_CONVERSION_M_PER_MIL),
			new cc.unit('mm', 1e-3),
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.planeProximity.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.planeProximity.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.planeProximity.AddCustomValidator(
		this.planeProximity,
		'Value is below recommended minimum (17.5um ot 0.5oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() >= 0.0000175)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	this.planeProximity.AddCustomValidator(
		this.planeProximity,
		'Value is above recommended maximum (105um, or 3oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() <= 0.0001050036)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);

	//========================================================================================================//
	//==================================== PLANE PROXIMITY MODIFIER (output) =================================//
	//========================================================================================================//

	this.planeProximityModifier = new cc.variable({
		name: 'planeProximityModifier',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			var planeProximityM = this.planeProximity.val();

			// Convert to "mils" units, as this is what is used in IPC-2152 graphs
			var planeProximityMils = planeProximityM*(1/UNIT_CONVERSION_M_PER_MIL);
			
			var planeProximityModifierMulti = PLANE_PROXIMITY_TREND_LINE_COEF_M * planeProximityMils + PLANE_PROXIMITY_TREND_LINE_COEF_C;

			return planeProximityModifierMulti;
		},
		units: [
			new cc.unit('no unit', 1)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	//========================================================================================================//
	//========================================= THERMAL CONDUCTIVITY (input) =================================//
	//========================================================================================================//

	//! @brief		
	this.thermalConductivity = new cc.variable({
		name: 'thermalConductivity',
		app: this,
		eqFn: function() { return; },
		units: [
			new cc.unit('W/(m*k)', 1),
			new cc.unit('BTU/(hour*ft*F)', UNIT_CONVERSION_THERMAL_CONDUCTIVITY_WATT_nMETER_nKELVIN_PER_BTU_nHOUR_nFT_nDEGF)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.input; }	// Always an input
	});

	// Add validator(s)
	this.thermalConductivity.AddValidator(cc.validatorEnum.IS_NUMBER, cc.severityEnum.error);
	this.thermalConductivity.AddValidator(cc.validatorEnum.IS_POSITIVE_OR_ZERO, cc.severityEnum.error);
	this.thermalConductivity.AddCustomValidator(
		this.thermalConductivity,
		'Value is below recommended minimum (17.5um ot 0.5oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() >= 0.0000175)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);
	this.thermalConductivity.AddCustomValidator(
		this.thermalConductivity,
		'Value is above recommended maximum (105um, or 3oz). Equation will not be as accurate (extrapolation will occur)',
		function(variable)
		{
			if(variable.val() <= 0.0001050036)
				return true;
			else
				return false;
		},
		cc.severityEnum.warning);

	//========================================================================================================//
	//================================= THERMAL CONDUCTIVITY MODIFIER (output) ===============================//
	//========================================================================================================//

	this.thermalConductivityModifier = new cc.variable({
		name: 'thermalConductivityModifier',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			var thermalConductivityWattnMeternDegC = this.thermalConductivity.val();

			// Convert to BTU/(ft*hour*F), as this is what the IPC-2152 graph used

			var thermalConductivityBtunFtnHournDegF = thermalConductivityWattnMeternDegC*(1/UNIT_CONVERSION_THERMAL_CONDUCTIVITY_WATT_nMETER_nKELVIN_PER_BTU_nHOUR_nFT_nDEGF);
			
			var thermalConductivityModifierMulti = THERMAL_CONDUCTIVITY_TREND_LINE_COEF_M * thermalConductivityBtunFtnHournDegF + THERMAL_CONDUCTIVITY_TREND_LINE_COEF_C;

			return thermalConductivityModifierMulti;
		},
		units: [
			new cc.unit('no unit', 1)
		],
		selUnitNum: 0,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	//========================================================================================================//
	//================================== ADJUSTED CROSS-SECTIONAL AREA (output) ==============================//
	//========================================================================================================//

	this.adjustedTrackCrosssectionalArea = new cc.variable({
		name: 'adjustedTrackCrosssectionalArea',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}
			
			var adjustedTrackCrosssectionalAreaM2 =
				this.unadjustedTrackCrosssectionalArea.val() *
				this.trackThicknessModifier.val() *
				this.boardThicknessModifier.val() *
				this.planeProximityModifier.val() *
				this.thermalConductivityModifier.val();

			return adjustedTrackCrosssectionalAreaM2;
		},
		units: [
			new cc.unit('um2', 1e-12),
			new cc.unit('mils2', UNIT_CONVERSION_M2_PER_MIL2),
			new cc.unit('mm2', 1e-6)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function() { return cc.stateEnum.output; }		// Always an output
	});	

	//========================================================================================================//
	//======================================= MINIMUM TRACK WIDTH (output) ===================================//
	//========================================================================================================//

	this.minimumTrackWidth = new cc.variable({
		name: 'minimumTrackWidth',
		app: this,
		eqFn: function() 
		{
			
			// Quit if units have not been initialised
			if(this.current.selUnit() === undefined)
			{
				//Log('this.desiredRes.selUnit() has not been defined, returning...');
				return;
			}

			var minimumTrackWidthM = this.adjustedTrackCrosssectionalArea.val() / this.trackThickness.val();

			return minimumTrackWidthM;
		},
		units: [
			new cc.unit('um', 1e-6),
			new cc.unit('mils', UNIT_CONVERSION_M_PER_MIL),
			new cc.unit('mm', 1e-3)
		],
		selUnitNum: 1,
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
cc.registerCalc(pcbTrackCurrentCapabilityIpc2152, 'pcbTrackCurrentCapabilityIpc2152');

