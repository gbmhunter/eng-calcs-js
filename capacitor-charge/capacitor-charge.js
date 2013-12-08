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

function capacitorCharge()
{
	this.calcWhat = ko.observable('voltage');
	
	this.charge = new cc.variable({
		app: this,
		eqFn: function(){
			return this.capacitance.val()*this.voltage.val();
		},
		validatorFn: function() { return true; },
		units: [
			new cc.unit('pC', 0.000000000001),
			new cc.unit('nC', 0.000000001),
			new cc.unit('uC', 0.000001),
			new cc.unit('mC', 0.001)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function(){
			if(this.calcWhat() == 'charge')
			{
				return cc.stateEnum.output;
			}
			else
			{
				return cc.stateEnum.input;
			}
		}
	});
	
	this.capacitance = new cc.variable({
		app: this,
		eqFn: function()
		{
			return this.charge.val()/this.voltage.val();
		},
		validatorFn: function() { return true; },
		units: [
			new cc.unit('pF', 0.000000000001),
			new cc.unit('nF', 0.000000001),
			new cc.unit('uF', 0.000001),
			new cc.unit('mF', 0.001)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function(){
			if(this.calcWhat() == 'capacitance')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});
	
	this.voltage = new cc.variable({
		app: this,
		eqFn: function(){
			return this.charge.val()/this.capacitance.val();
		},
		validatorFn: function() { return true; },
		units: [
			new cc.unit('mV', 0.001),
			new cc.unit('V', 1.0),
			new cc.unit('kV', 1000.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		stateFn: function()
		{
			if(this.calcWhat() == 'voltage')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});	
	
}

// Register the calculator
cc.registerCalc(capacitorCharge, 'capacitorCharge');

