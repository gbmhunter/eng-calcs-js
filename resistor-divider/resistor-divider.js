//!
//! @file 			resistor-divider.js
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
//! @edited 		n/a
//! @created		2012-11-26
//! @last-modified 	2015-06-14
//! @brief 		
//! @details
//!		See the README in the root dir for more info.
	
function resistorDivider()
{
	this.calcWhat = ko.observable('vOut');
	
	this.vIn = new cc.variable({
		app: this,
		eqFn: function(){
			// E = CV^2
			Log('Calculating Vin');
			return ((this.vOut.val()*(this.r1.val() + this.r2.val()))/this.r2.val());
		},
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0),
			new cc.unit('kV', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function(){
			if(this.calcWhat() == 'vin')
			{
				return cc.stateEnum.output;
			}
			else
			{
				return cc.stateEnum.input;
			}
		}
	});
	
	this.r1 = new cc.variable({
		app: this,
		eqFn: function(){
			// C = 2E/V^2
			Log('Calculating r1.');
			return ((this.r2.val()*(this.vIn.val() - this.vOut.val()))/this.vOut.val());
		},
		units: [
			new cc.unit('m\u2126', 0.001),
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function()
		{
			if(this.calcWhat() == 'r1')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});
	
	this.r2 = new cc.variable({
		app: this,
		eqFn: function(){
			// C = 2E/V^2
			Log('Calculating r2.');
			return ((this.r1.val()*this.vOut.val())/(this.vIn.val() - this.vOut.val()));
		},
		units: [
			new cc.unit('m\u2126', 0.001),
			new cc.unit('\u2126', 1.0),
			new cc.unit('k\u2126', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function()
		{
			if(this.calcWhat() == 'r2')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});
	
	this.vOut = new cc.variable({
		app: this,
		eqFn: function(){
			// V = sqrt(2E/C)
			Log('Calculating vOut.');
			return ((this.vIn.val()*this.r2.val())/(this.r1.val() + this.r2.val()));
		},
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0),
			new cc.unit('kV', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function()
		{
			if(this.calcWhat() == 'vOut')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});	
	
	this.iQ = new cc.variable({
		app: this,
		eqFn: function(){
			Log('Calculating Iq.');
			return  (this.vIn.val()/(this.r1.val() + this.r2.val()));
		},
		units: [
			new cc.unit('mA', 0.001),
			new cc.unit('A', 1.0)
		],
		selUnitNum: 0,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function()
		{
			// Always an output
			return cc.stateEnum.output;
		}
	});	
	
}

// Register the calculator
cc.registerCalc(resistorDivider, 'resistorDivider');

