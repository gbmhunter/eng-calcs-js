//
// @file 		lt3745.js
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/11/01
// @brief 		
// @details
//				See the README in the root dir for more info.

// E12 resistance array
//var e12 = new Array(1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2); 

// E24 resistance array
//var e24 = new Array(1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1);

// Get a variable for jQuery
var j = jQuery.noConflict();

// Debug flag. Set to true to print debug information, otherwise false.
var DEBUG = true;

var unit = function(name, multiplier) {
        this.name = name;
        this.multiplier = multiplier;
    };
	
function AppViewModel() {
    this.loadVoltage = ko.observable();
	
	this.loadVoltageUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.loadVoltageSelUnit = ko.observable();
		
	this.buckOutputVoltage = ko.computed(
		function() 
		{
			return parseFloat(this.loadVoltage()) + 0.8;
      }, 
		this);
	
	this.buckOutputVoltageUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.buckOutputVoltageSelUnit = ko.observable();
	
	this.minInputVoltage = ko.computed(
		function() 
		{
			return parseFloat(this.buckOutputVoltage()) + 2.1;
      }, 
		this);
	
	this.minInputVoltageUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.minInputVoltageSelUnit = ko.observable();
	
	this.maxInputVoltage = ko.observable();
	
	this.maxInputVoltageUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.maxInputVoltageSelUnit = ko.observable();
	
	//========== Rfb1 =============//
	
	this.rfb1Units = ko.observableArray([
		new unit('\u2126', 1.0),
		new unit('k\u2126', 1000.0),
	]);
	
	this.rfb1SelUnit = ko.observable(this.rfb1Units()[1]);
	
	this.rfb1 = ko.observable();
	
	//============== Rfb2 ==============//
	
	this.rfb2Units = ko.observableArray([
		new unit('\u2126', 1.0),
		new unit('k\u2126', 1000.0),
	]);
	
	this.rfb2SelUnit = ko.observable(this.rfb2Units()[1]);
	
	this.rfb2 = ko.computed(
		function() 
		{
			if(this.rfb1SelUnit() == null)
				return;
			if(this.rfb2SelUnit() == null)
				return;
			//Log('Rfb1 unit =' + this.rfb1SelUnit());
			return ((parseFloat(this.rfb1())*parseFloat(this.rfb1SelUnit().multiplier))*(parseFloat(this.buckOutputVoltage())/1.205 - 1))/this.rfb2SelUnit().multiplier;
      }, 
		this);
		
	// Iout(max)
	
	this.iOutMax = ko.observable();
	
	this.iOutMaxUnits = ko.observableArray([
		new unit('mA', 0.001),
		new unit('A', 1.0),
	]);
	
	this.iOutMaxSelUnit = ko.observable();
	
	//=========== Rsense ============//
	
	this.rSenseSelUnit = ko.observable();
	
	this.rSenseUnits = ko.observableArray([
		new unit('m\u2126', 0.001),
		new unit('\u2126', 1.0),
	]);
	
	// Rsense = 35mV/Iout(max)
	this.rSense = ko.computed(
		function() 
		{
			if(this.iOutMaxSelUnit() == null)
				return;
			if(this.rSenseSelUnit() == null)
				return;
			
			return (0.035/(parseFloat(this.iOutMax())*parseFloat(this.iOutMaxSelUnit().multiplier)))/this.rSenseSelUnit().multiplier;
      }, 
		this);
		
	//======= Prsense =========//
	
	this.prsenseSelUnit = ko.observable();
	
	this.prsenseUnits = ko.observableArray([
		new unit('mW', 0.001),
		new unit('W', 1),
	]);
	
	// Prsense = Iout(max)^2*Rsense
	this.prsense = ko.computed(
		function() 
		{
			if(this.iOutMaxSelUnit() == null)
				return;
			if(this.rSenseSelUnit() == null)
				return;
			if(this.prsenseSelUnit() == null)
				return;
			
			var iOutMax = parseFloat(this.iOutMax())*this.iOutMaxSelUnit().multiplier;
			var rSense = parseFloat(this.rSense())*this.rSenseSelUnit().multiplier;
			
			return (Math.pow(iOutMax, 2)*rSense)/this.prsenseSelUnit().multiplier;
      }, 
		this);
		
	//================ iLedPinNom ================//
		
	this.iLedPinNom = ko.observable();
	
	this.iLedPinNomUnits = ko.observableArray([
		new unit('mA', 0.001),
		new unit('A', 1.0),
	]);
	
	this.iLedPinNomSelUnit = ko.observable();
	
	//======= Riset =========//
	
	this.riSetUnits = ko.observableArray([
		new unit('\u2126', 1.0),
		new unit('k\u2126', 1000.0),
	]);
	
	this.riSetSelUnit = ko.observable(this.riSetUnits()[1]);
	
	// Riset = 2500*(1.205/Iled-pin(nom))
	this.riSet = ko.computed(
		function() 
		{
			if(this.iLedPinNomSelUnit() == null)
				return;
			if(this.riSetSelUnit() == null)
				return;
			
			var iLedPinNom = parseFloat(this.iLedPinNom())*this.iLedPinNomSelUnit().multiplier;
			
			return (2500*(1.205/iLedPinNom))/this.riSetSelUnit().multiplier;
      }, 
		this);
	
}

// Start-up function
j(document).ready(
	function StartUp()
	{	  		
		// Activates knockout.js
		var app = new AppViewModel();
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