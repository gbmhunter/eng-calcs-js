//!
//! @file 			capacitor-energy.js
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
//! @edited 		n/a
//! @date 			2013-11-29
//! @last-modified	2015-06-14
//! @brief 		
//! @details
//!		See the README in the root dir for more info.
	
function capacitorEnergy()
{
	this.calcWhat = ko.observable('voltage');
	
	this.energy = new cc.variable({
		app: this,
		eqFn: function(){
			// E = CV^2
			Log('Calculating energy');
			return 0.5*this.capacitance.val()*Math.pow(this.voltage.val(), 2);
		},
		units: [
			new cc.unit('pJ', 0.000000000001),
			new cc.unit('nJ', 0.000000001),
			new cc.unit('uJ', 0.000001),
			new cc.unit('mJ', 0.001),
			new cc.unit('J', 1.0)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function(){
			if(this.calcWhat() == 'energy')
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
		eqFn: function(){
			// C = 2E/V^2
			Log('Calculating capacitance.');
			return (2.0*this.energy.val())/(Math.pow(this.voltage.val(), 2));
		},
		units: [
			new cc.unit('pF', 0.000000000001),
			new cc.unit('nF', 0.000000001),
			new cc.unit('uF', 0.000001),
			new cc.unit('mF', 0.001)
		],
		selUnitNum: 1,
		roundTo: 2,
		// state function to set as input/output
		stateFn: function()
		{
			if(this.calcWhat() == 'capacitance')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});
	
	this.voltage = new cc.variable({
		app: this,
		eqFn: function(){
			// V = sqrt(2E/C)
			Log('Calculating voltage.');
			return Math.sqrt((2.0*this.energy.val())/this.capacitance.val());
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
			if(this.calcWhat() == 'voltage')
				return cc.stateEnum.output;
			else
				return cc.stateEnum.input;
		}
	});	
	
}

// Register the calculator
cc.registerCalc(capacitorEnergy, 'capacitorEnergy');

