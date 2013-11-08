//
// @file 		lt3745.js
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/11/01
// @brief 		Binding/calculating code for the LT3745 calculator. PHP/HTML code is in lt3745.php.
// @details
//				See the README in the root dir for more info.

// Get a variable for jQuery
var j = jQuery.noConflict();

// Debug flag. Set to true to print debug information, otherwise false.
var DEBUG = true;

var unit = function(name, multiplier) {
        this.name = name;
        this.multiplier = multiplier;
   };
	
	
function calc()
{
	this.addValidator = function(calcVar, validatorFunc)
	{
		calcVar.validators.push(validatorFunc);
	}
}
	
// "Class" for a calc variable
var calcInput = function(app, validatorFn, units, selUnit) {
			this.dispVal = ko.observable();
			this.units = ko.observableArray(units);
			this.selUnit = ko.observable(this.units()[selUnit]);
			
			// Scaled value, taking into account the units
			this.val = ko.computed( function(){
				return parseFloat(this.dispVal())*parseFloat(this.selUnit().multiplier);
			},
			this);

			// Default is to just return true.
			this.isValid = ko.computed(validatorFn, app);
   };
	
var calcComp = function(app, compFn, validatorFn, units, selUnit) {
			
			this.units = ko.observableArray(units);
			this.selUnit = ko.observable(this.units()[selUnit]);
			
			this.val = ko.computed(compFn, app);
			
			// Number of decimal places to round value to
			this.roundTo = 1;
			
			// This is the displayed value
			this.dispVal = ko.computed(function(){
					var unroundedVal = this.val()/this.selUnit().multiplier;
					// Round the value
					var roundedVal = Math.round(unroundedVal*Math.pow(10, this.roundTo))/Math.pow(10, this.roundTo);
					return roundedVal;
				},
				this);				
			
			this.lowerBound = 0; //ko.observable(lowerBound);
			this.upperBound = 0; //ko.observable(upperBound);

			// Default is to just return true.
			this.isValid = ko.computed(validatorFn, app);
			
   };

function AppViewModel() {

	//============= Vload ============//
	
   this.loadVoltage = new calcInput(
		this,
		function() { return true; },
		[ new unit('V', 1.0) ],
		0
	);
	
	//============== Vbuck,out ===========//
		
	this.vBuckOut = new calcComp(
		this,
		function() 
		{
			return this.loadVoltage.val() + 0.8;
      }, 
		function() { return true; },
		[ new unit('V', 1.0) ],
		0
		);
	
	//=============== Vin(min) ===============//
		
	this.vInMin = new calcComp(
		this,
		function() 
		{
			return parseFloat(this.vBuckOut.val()) + 2.1;
      }, 
		function()
		{
			return true;
		},
		[ new unit('V', 1.0) ],
		0);
	
	//================= Vin(max) ================//

	this.vInMax = new calcInput(
		this,
		function()
		{
			return true;
		},
		[ new unit('V', 1.0) ],
		0);
		
	this.vInMax.isValid = ko.computed(
		function()
		{
			if(this.vInMax.val() < this.vInMin.val())
				return false;
			else
				return true;
		},
		this
	);
	
	//========== Rfb1 =============//
	
	this.rfb1 = new calcInput(
		this,
		function() { return true; },
		[ 
			new unit('\u2126', 1.0),
			new unit('k\u2126', 1000.0) 
		],
		1
	);
	
	//============== Rfb2 ==============//
		
	this.rfb2 = new calcComp(
		this,
		function() 
		{
			return (this.rfb1.val()*(this.vBuckOut.val()/1.205 - 1));
      },
		function()
		{
			return true;
		},
		[ 
			new unit('\u2126', 1.0), 
			new unit('k\u2126', 1000.0)
		],
		1);
		
	//=============== Iout(max) =================//
	
	this.iOutMax = new calcInput(
		this,
		function() { return true; },
		[
			new unit('mA', 0.001),
			new unit('A', 1.0)
		],
		0
	);
	
	//=========== Rsense ============//
	
	// Rsense = 35mV/Iout(max)
	this.rSense = new calcComp(
		this,
		function() 
		{	
			return (0.035/this.iOutMax.val());
      }, 
		function() { return true; },
		[
			new unit('m\u2126', 0.001),
			new unit('\u2126', 1.0)
		],
		0
	);
		
	//======= Prsense =========//
	
	// Prsense = Iout(max)^2*Rsense
	this.prsense = new calcComp(
		this,
		function() 
		{			
			var iOutMax = this.iOutMax.val();
			var rSense = this.rSense.val();
			
			return (Math.pow(iOutMax, 2)*rSense);
      },
		function() { return this; },
		[
			new unit('mW', 0.001),
			new unit('W', 1)
		],
		0
	);
		
	//================ iLedPinNom ================//
		
	this.iLedPinNom = new calcInput(
		this,
		function() { return true; },
		[
			new unit('mA', 0.001),
			new unit('A', 1.0),
		],
		0
	);
	
	//======= Riset =========//

	// Riset = 2500*(1.205/Iled-pin(nom))
	this.riSet = new calcComp(
		this,
		function() 
		{
			var iLedPinNom = this.iLedPinNom.val();
			
			return (2500*(1.205/iLedPinNom));
      },
		function() { return true; },
		[
			new unit('\u2126', 1.0),
			new unit('k\u2126', 1000.0)
		],
		1
	);
		
	//============= Vd,f =============//
		
	this.vdf = new calcInput(
		this,
		function() { return true; },
		[
			new unit('V', 1.0)
		],
		0
	);
	
	//======= Dmin =========//
	
	// Dmin = (Vout(max) + Vd,f) / (Vin(max) + Vd,f)
	this.dMin = new calcComp(
		this,
		function() 
		{		
			var vBuckOut = this.vBuckOut.val();
			var vdf = this.vdf.val();
			var vInMax = this.vInMax.val();
			
			return ((vBuckOut + vdf) / (vInMax + vdf));
      }, 
		function() { return true; },
		[
			new unit('%', 1.0),
		],
		0
	);
		
	//======= Dmax =========//
	
	// Dmax = (Vout(max) + Vd,f) / (Vin(min) + Vd,f)
	this.dMax = new calcComp(
		this,
		function() 
		{			
			var vBuckOut = this.vBuckOut.val();
			var vdf = this.vdf.val();
			var vInMin = this.vInMin.val();
			
			return ((vBuckOut + vdf) / (vInMin + vdf));
      }, 
		function() { return true; },
		[
			new unit('%', 1.0)
		],
		0
	);
	
	//================ ton(min)==============//
	
	this.tOnMin = new calcInput(
		this,
		function() { return true; },
		[
			new unit('ns', 0.000000001),
			new unit('us', 0.000001)
		],
		0
	);
	
	//================ toff(min) ============//
	
	this.tOffMin = new calcInput(
		this,
		function () { return true; },
		[
			new unit('ns', 0.000000001),
			new unit('us', 0.000001)
		],
		0
	);
	
	//================ fsw(max) ==============//
	
	// fsw(max) = min( Dmin/ton(min) , (1 - Dmax)/toff(min) )
	this.fSwMax = new calcComp(
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
			new unit('kHz', 1000.0),
		],
		0
	);
	
	//================ fsw(act) ============//
	
	this.fSwAct = new calcInput(
		this,
		function(){
			return true;
		},
		[ new unit('kHz', 1000.0) ],
		0);
	
	this.fSwAct.validator = ko.computed(
		function(){
			if(this.fSwAct.val() > 1000000)
			{
				return false;
				}
			else 
				return true;
		},
		this
	);
	
	//================ fugf ==============//
	
	// fugf = fsw(act)/10
	this.fugf = new calcComp(
		this,
		function() 
		{			
			//var fSwAct = parseFloat(this.fSwAct().value())*this.fSwAct().selUnit().multiplier;
			var fSwAct = this.fSwAct.val();
			return (fSwAct/10.0);
      }, 
		function() { return true; },
		[
			new unit('kHz', 1000.0)
		],
		0
	);
		
	//================ Cout(min) ==============//
	
	// Cout(min) = max( 0.25/(Rsense*fugf) , 1.5/(Rsense*Vbuck,out*fugf) )
	this.cOutMin = new calcComp(
		this,
		function() 
		{
			var rSense = this.rSense.val();
			var fugf = this.fugf.val();
			var vBuckOut = this.vBuckOut.val();
			
			return (Math.max( 0.25/(rSense*fugf), 1.5/(vBuckOut*rSense*fugf)));
      }, 
		function() { return true; },
		[
			new unit('uF', 0.000001),
		],
		0
	);
	
	//================ Il(delta) ============//
	
	this.iLDelta = new calcInput(
		this,
		function() { return true; },
		[
			new unit('%', 0.01)
		],
		0
	);
	
	//================ L(min) ==============//
	
	// Lmin = [ (Vbuck,out + Vd,f) / (Vin(max) + Vd,f) ] * [ (Vin(max) - Vbuck,out) / (fsw(act)*Il(delta)) ]
	this.lMin = new calcComp(
		this,
		function() 
		{
			var vBuckOut = this.vBuckOut.val();
			var vdf = this.vdf.val();
			var vInMax = this.vInMax.val();
			var fSwAct = this.fSwAct.val();
			var iLDelta = this.iLDelta.val();
			
			return ( ((vBuckOut + vdf)/(vInMax + vdf))*((vInMax - vBuckOut)/(fSwAct*iLDelta)));
      }, 
		function() { return true; },
		[
			new unit('uH', 0.000001),
		],
		0
	);
		
	//================ Vin(ripple) ============//
	
	this.vInRipple = new calcInput(
		this,
		function() { return true; },
		[
			new unit('mV', 0.001)
		],
		0
	);
	
	//================ Cin(min) ==============//
	
	// Cin(min) = (Dmax*Iout(max)) / (Vin,ripple*fsw(act))
	this.cInMin = new calcComp(
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
			new unit('uF', 0.000001),
		],
		0
	);
	
}

var app = new AppViewModel();

// Start-up function
j(document).ready(
	function StartUp()
	{	  		
		// Create custom binding
		ko.bindingHandlers.calcVar = {
			 init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				  // This will be called when the binding is first applied to an element
				  // Set up any initial state, event handlers, etc. here
				  //console.log(valueAccessor()().rawVal());
			  // Call value binding (child binding)
				  ko.bindingHandlers.value.init(element, function (){ return valueAccessor().dispVal } , allBindings, viewModel, bindingContext);
				  
			 },
			 update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
				  // This will be called once when the binding is first applied to an element,
				  // and again whenever the associated observable changes value.
				  // Update the DOM element based on the supplied values here.
		
				  // Call value binding (child binding)
				  ko.bindingHandlers.value.update(element, function (){ return valueAccessor().dispVal } , allBindings, viewModel, bindingContext);
				  
				  // Update background colour of input
					//if(valueAccessor()().val() < valueAccessor()().lowerBound() || valueAccessor()().val() > valueAccessor()().upperBound())
					//{
					//	j(element).css('background-color', '#FF9999');
					//}
					
					if(valueAccessor().isValid() == false)
					{
						j(element).css('background-color', '#FF9999');
					}
					else
					{
						j(element).css('background-color', '#99FF99');
					}
					
			 }
		};
		
		// Activates knockout.js
		
		ko.applyBindings(app);	
	}
);

// Logs error messages
function Log(msg)
{
	// Only print if DEBUG variable has been set to true
	if(DEBUG == true)
		console.log(msg);
}

