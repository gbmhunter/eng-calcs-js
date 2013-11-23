//
// @file 		ohms-law.js
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/11/23
// @brief 		Given an input resistance, finds the closest resistance in a specified series.
// @details
//				See the README in the root dir for more info.
	
// Adding the standardResistanceFinder "namespace" for the calculator, so that multiple calculators can work
// on the same page. Use the data-bind="with: standardResistanceCalculator" command within the HTML to access the child variables.

function ohmsLaw()
{
	this.calcWhat = ko.observable('resistance');
		
	this.voltageS = ko.observable();
	
	this.voltage = ko.computed({
		read: function () {
			console.log('Maybe reading from voltage');
			if(this.calcWhat() == 'voltage')
			{
				console.log('Reading from voltage');
				if(this.calcWhat() == 'voltage')
				{
					console.log('Writing to voltage');
					if(this.currentS == null)
						return;
					if(this.resistanceS == null)
						return;
					return(this.currentS()*this.resistanceS());
				}
				else
					return this.voltageS();
			}
		},
		write: function (value) {
			console.log('Maybe writing to voltage');
			this.voltageS(value)
		},
		owner: this
	});
	
	this.currentS = ko.observable();
	
	this.current = ko.computed({
		read: function () {
			console.log('Maybe reading from current');
			if(this.calcWhat() == 'current')
			{
				console.log('Reading from current');
				if(this.voltageS == null)
					return;
				if(this.resistanceS == null)
					return;				
				return(this.voltageS()/this.resistanceS());
			}
			else
				return this.currentS();
		},
		write: function (value) {
			console.log('Maybe writing to current');
			console.log('Writing to current');
			this.currentS(value);
		},
		owner: this
	});
	
	this.resistanceS = ko.observable();
	
	this.resistance = ko.computed({
		read: function () {
			console.log('Maybe reading from resistance');
			if(this.calcWhat() == 'resistance')
			{
				console.log('Reading from resistance');
				if(this.currentS == null)
					return;
				if(this.voltageS == null)
					return;
				return(this.voltageS()/this.currentS());
			}
			else
				return this.resistanceS();
		},
		write: function (value) {
			console.log('Maybe writing to resistance');
			console.log('Writing to resistance');
			this.resistanceS(value);
		},
		owner: this
	});
	
	/*
	this.voltage = new cc.variable(
		this,
		function()
		{
			console.log('Calculating voltage...');
			if(this.current == null) 
				return;
			if(this.resistance == null)
				return;
			return this.current.val()*this.resistance.val();
		},
		function() { return true; },
		[
			new cc.unit('m\u2126', 0.001),
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		0,
		2,
		// state function to set as input/output
		function()
		{
			console.log('voltage state function called.');
			if(this.calcWhat() == 'voltage')
			{
				console.log('voltage is output.');
				return cc.stateEnum.output;
			}
			else
			{
				console.log('voltage is input.');
				return cc.stateEnum.input;
			}
		}
	);
	
	this.voltage.val = 2;
	
	/*
	this.current = new cc.variable(
		this,
		function()
		{
			console.log('Calculating current...');
			if(this.voltage == null) 
				return;
			if(this.resistance == null)
				return;
			return this.voltage.val()/this.resistance.val();
		},
		function() { return true; },
		[
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1.0),
			new cc.unit('kA', 1000.0)
		],
		0,
		2,
		// state function to set as input/output
		function()
		{
			if(this.calcWhat() == 'current')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	);
	
	this.resistance = new cc.variable(
		this,
		function()
		{
			console.log('Calculating resistance...');
			if(this.voltage == null) 
				return;
			if(this.current == null)
				return;
			return this.voltage.val()/this.current.val();
		},
		function() { return true; },
		[
			new cc.unit('m\u2126', 0.001),
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		0,
		2,
		// state function to set as input/output
		function()
		{
			if(this.calcWhat() == 'resistance')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	);	
	*/
}

ko.applyBindings(new ohmsLaw());

// Register the calculator
//cc.registerCalc(ohmsLaw, 'ohmsLaw');

