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
	
function AppViewModel() {

	//============= Vload ============//
	
    this.loadVoltage = ko.observable();
	
	this.loadVoltageUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.loadVoltageSelUnit = ko.observable();
	
	//============== Vbuck,out ===========//
		
	this.vBuckOut = ko.computed(
		function() 
		{
			return parseFloat(this.loadVoltage()) + 0.8;
      }, 
		this);
	
	this.vBuckOutUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.vBuckOutSelUnit = ko.observable();
	
	//=============== Vin(min) ===============//
	
	this.vInMin = ko.computed(
		function() 
		{
			return parseFloat(this.vBuckOut()) + 2.1;
      }, 
		this);
	
	this.vInMinUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.vInMinSelUnit = ko.observable();
	
	//================= Vin(max) ================//
	
	this.vInMax = ko.observable();
	
	this.vInMaxUnits = ko.observableArray([
		new unit('V', 1.0),
	]);
	
	this.vInMaxSelUnit = ko.observable();
	
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
			return ((parseFloat(this.rfb1())*parseFloat(this.rfb1SelUnit().multiplier))*(parseFloat(this.vBuckOut())/1.205 - 1))/this.rfb2SelUnit().multiplier;
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
		
	//============= Vd,f =============//
		
	this.vdf = ko.observable();
	
	this.vdfUnits = ko.observableArray([
		new unit('V', 1.0)
	]);
	
	this.vdfSelUnit = ko.observable();
	
	//======= Dmin =========//
	
	this.dMinUnits = ko.observableArray([
		new unit('%', 1.0),
	]);
	
	this.dMinSelUnit = ko.observable();
	
	// Dmin = (Vout(max) + Vd,f) / (Vin(max) + Vd,f)
	this.dMin = ko.computed(
		function() 
		{
			if(this.vBuckOutSelUnit() == null)
				return;
			if(this.vdfSelUnit() == null)
				return;
			if(this.vInMaxSelUnit() == null)
				return;
			if(this.dMinSelUnit() == null)
				return;
			
			var vBuckOut = parseFloat(this.vBuckOut())*this.vBuckOutSelUnit().multiplier;
			var vdf = parseFloat(this.vdf())*this.vdfSelUnit().multiplier;
			var vInMax = parseFloat(this.vInMax())*this.vInMaxSelUnit().multiplier;
			
			return ((vBuckOut + vdf) / (vInMax + vdf))/this.dMinSelUnit().multiplier;
      }, 
		this);
		
	//======= Dmax =========//
	
	this.dMaxUnits = ko.observableArray([
		new unit('%', 1.0),
	]);
	
	this.dMaxSelUnit = ko.observable();
	
	// Dmax = (Vout(max) + Vd,f) / (Vin(min) + Vd,f)
	this.dMax = ko.computed(
		function() 
		{
			if(this.vBuckOutSelUnit() == null)
				return;
			if(this.vdfSelUnit() == null)
				return;
			if(this.vInMinSelUnit() == null)
				return;
			if(this.dMaxSelUnit() == null)
				return;
			
			var vBuckOut = parseFloat(this.vBuckOut())*this.vBuckOutSelUnit().multiplier;
			var vdf = parseFloat(this.vdf())*this.vdfSelUnit().multiplier;
			var vInMin = parseFloat(this.vInMin())*this.vInMinSelUnit().multiplier;
			
			return ((vBuckOut + vdf) / (vInMin + vdf))/this.dMaxSelUnit().multiplier;
      }, 
		this);
	
	//================ ton(min)==============//
	
	this.tOnMin = ko.observable();
	
	this.tOnMinUnits = ko.observableArray([
		new unit('ns', 0.000000001),
		new unit('us', 0.000001)
	]);
	
	this.tOnMinSelUnit = ko.observable();
	
	//================ toff(min) ============//
	
	this.tOffMin = ko.observable();
	
	this.tOffMinUnits = ko.observableArray([
		new unit('ns', 0.000000001),
		new unit('us', 0.000001)
	]);
	
	this.tOffMinSelUnit = ko.observable();
	
	//================ fsw(max) ==============//
	
	this.fSwMaxUnits = ko.observableArray([
		new unit('kHz', 1000.0),
	]);
	
	this.fSwMaxSelUnit = ko.observable();
	
	// fsw(max) = min( Dmin/ton(min) , (1 - Dmax)/toff(min) )
	this.fSwMax = ko.computed(
		function() 
		{
			if(this.dMinSelUnit() == null)
				return;
			if(this.tOnMinSelUnit() == null)
				return;
			if(this.dMaxSelUnit() == null)
				return;
			if(this.tOffMinSelUnit() == null)
				return;
			if(this.fSwMaxSelUnit() == null)
				return;
			
			var dMin = parseFloat(this.dMin())*this.dMinSelUnit().multiplier;
			var tOnMin = parseFloat(this.tOnMin())*this.tOnMinSelUnit().multiplier;
			var dMax = parseFloat(this.dMax())*this.dMaxSelUnit().multiplier;
			var tOffMin = parseFloat(this.tOffMin())*this.tOffMinSelUnit().multiplier;
			
			return (Math.min(dMin/tOnMin, (1.0 - dMax)/tOffMin))/this.fSwMaxSelUnit().multiplier;
      }, 
		this);
	
	//================ fsw(act) ============//
	
	this.fSwAct = ko.observable();
	
	this.fSwActUnits = ko.observableArray([
		new unit('kHz', 1000.0)
	]);
	
	this.fSwActSelUnit = ko.observable();
	
	//================ fugf ==============//
	
	this.fugfUnits = ko.observableArray([
		new unit('kHz', 1000.0),
	]);
	
	this.fugfSelUnit = ko.observable();
	
	// fugf = fsw(act)/10
	this.fugf = ko.computed(
		function() 
		{
			if(this.fSwActSelUnit() == null)
				return;
			if(this.fugfSelUnit() == null)
				return;
			
			var fSwAct = parseFloat(this.fSwAct())*this.fSwActSelUnit().multiplier;
			
			return (fSwAct/10.0)/this.fugfSelUnit().multiplier;
      }, 
		this);
		
	//================ Cout(min) ==============//
	
	this.cOutMinUnits = ko.observableArray([
		new unit('uF', 0.000001),
	]);
	
	this.cOutMinSelUnit = ko.observable();
	
	// Cout(min) = max( 0.25/(Rsense*fugf) , 1.5/(Rsense*Vbuck,out*fugf) )
	this.cOutMin = ko.computed(
		function() 
		{
			if(this.rSenseSelUnit() == null)
				return;
			if(this.fugfSelUnit() == null)
				return;
			if(this.vBuckOutSelUnit() == null)
				return;
			if(this.cOutMinSelUnit() == null)
				return;
			
			var rSense = parseFloat(this.rSense())*this.rSenseSelUnit().multiplier;
			var fugf = parseFloat(this.fugf())*this.fugfSelUnit().multiplier;
			var vBuckOut = parseFloat(this.vBuckOut())*this.vBuckOutSelUnit().multiplier;
			
			return (Math.max( 0.25/(rSense*fugf), 1.5/(vBuckOut*rSense*fugf)))/this.cOutMinSelUnit().multiplier;
      }, 
		this);
	
	//================ Il(delta) ============//
	
	this.iLDelta = ko.observable();
	
	this.iLDeltaUnits = ko.observableArray([
		new unit('%', 0.01)
	]);
	
	this.iLDeltaSelUnit = ko.observable();
	
	//================ L(min) ==============//
	
	this.lMinUnits = ko.observableArray([
		new unit('uH', 0.000001),
	]);
	
	this.lMinSelUnit = ko.observable();
	
	// Lmin = [ (Vbuck,out + Vd,f) / (Vin(max) + Vd,f) ] * [ (Vin(max) - Vbuck,out) / (fsw(act)*Il(delta)) ]
	this.lMin = ko.computed(
		function() 
		{
			if(this.vBuckOutSelUnit() == null)
				return;
			if(this.vdfSelUnit() == null)
				return;
			if(this.vInMaxSelUnit() == null)
				return;
			if(this.fSwActSelUnit() == null)
				return;
			if(this.iLDeltaSelUnit() == null)
				return;
			if(this.lMinSelUnit() == null)
				return;
			
			var vBuckOut = parseFloat(this.vBuckOut())*this.vBuckOutSelUnit().multiplier;
			var vdf = parseFloat(this.vdf())*this.vdfSelUnit().multiplier;
			var vInMax = parseFloat(this.vInMax())*this.vInMaxSelUnit().multiplier;
			var fSwAct = parseFloat(this.fSwAct())*this.fSwActSelUnit().multiplier;
			var iLDelta = parseFloat(this.iLDelta())*this.iLDeltaSelUnit().multiplier;
			
			return ( ((vBuckOut + vdf)/(vInMax + vdf))*((vInMax - vBuckOut)/(fSwAct*iLDelta)))/this.lMinSelUnit().multiplier;
      }, 
		this);
		
	//================ Vin(ripple) ============//
	
	this.vInRipple = ko.observable();
	
	this.vInRippleUnits = ko.observableArray([
		new unit('mV', 0.001)
	]);
	
	this.vInRippleSelUnit = ko.observable();
	
	//================ Cin(min) ==============//
	
	this.cInMinUnits = ko.observableArray([
		new unit('uF', 0.000001),
	]);
	
	this.cInMinSelUnit = ko.observable();
	
	// Cin(min) = (Dmax*Iout(max)) / (Vin,ripple*fsw(act))
	this.cInMin = ko.computed(
		function() 
		{
			if(this.dMaxSelUnit() == null)
				return;
			if(this.iOutMaxSelUnit() == null)
				return;
			if(this.vInRippleSelUnit() == null)
				return;
			if(this.fSwActSelUnit() == null)
				return;
			if(this.cInMinSelUnit() == null)
				return;
			
			var dMax = parseFloat(this.dMax())*this.dMaxSelUnit().multiplier;
			var iOutMax = parseFloat(this.iOutMax())*this.iOutMaxSelUnit().multiplier;
			var vInRipple = parseFloat(this.vInRipple())*this.vInRippleSelUnit().multiplier;
			var fSwAct = parseFloat(this.fSwAct())*this.fSwActSelUnit().multiplier;
			
			return ( (dMax*iOutMax)/(vInRipple*fSwAct) )/this.cInMinSelUnit().multiplier;
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