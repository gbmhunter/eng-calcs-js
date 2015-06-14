<!--
// @file 			smps-buck-converter.php
// @author 			Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 			n/a
// @date 			2015-06-13
// @last-modified	2015-06-13
// @brief 			
// @details
//		See the README in the root dir for more info.
-->

<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>

<!-- candy-calc logic -->
<script type="text/javascript" src="/lib/candy-calc/js/candy-calc.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/lib/candy-calc/css/candy-calc.css" />

<!-- readmore.js Library -->
<script type="text/javascript" src="/lib/readmore.js/readmore.js" ></script>

<article>

	<p>This calculator can be used to calculate the values of the critical component values for a buck converter.</p>

</article>

<script type="text/javascript">
jQuery(function($) {

        $('article').readmore({maxHeight: 100, speed: 200}); // This function applies good for the first tab, but when navigated to the next tab, the text is not trimmed..

        });
</script>

<table id="smpsBuckConverter" class="candy-calc" border="4" style="width: 800px;">
	<tbody>
		<tr>
			<td><strong>Variable:</strong></td>
			<td><strong>Symbol:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
			<td><strong>Notes:</strong></td>
		</tr>
		<tr>
			<td >Input Voltage</td>
			<td class="symbol">\( V_{in} \)</td>
			<td>
				<input class="input" data-bind="calcVar: inputVoltage, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: inputVoltage.units, optionsText: 'name', value: inputVoltage.selUnit"></select>
			</td>	
			<td>The voltage provided to the input of the buck converter. Usually this is from a DC power supply or battery.</td>		
		</tr>
		<tr>
			<td>Output Voltage</td>
			<td class="symbol">\( V_{out} \)</td>
			<td>
				<input class="input" data-bind="calcVar: outputVoltage, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: outputVoltage.units, optionsText: 'name', value: outputVoltage.selUnit"></select>
			</td>
			<td>The output voltage of a buck converter must be equal to or lower than the input voltage.</td>			
		</tr>
		<tr>
			<td>Diode Voltage Drop</td>
			<td class="symbol">\( V_D \)</td>
			<td>
				<input class="input" data-bind="calcVar: diodeVoltageDrop, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: diodeVoltageDrop.units, optionsText: 'name', value: diodeVoltageDrop.selUnit"></select>
			</td>	
			<td>The forward voltage drop across the diode when the diode is fully conducting.</td>		
		</tr>	
		<tr>
			<td>Transistor Voltage Drop</td>
			<td class="symbol">\( V_T \)</td>
			<td>
				<input class="input" data-bind="calcVar: transistorVoltageDrop, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: transistorVoltageDrop.units, optionsText: 'name', value: transistorVoltageDrop.selUnit"></select>
			</td>	
			<td>The voltage drop across the switching element when the switch is fully ON.</td>		
		</tr>	

		<tr>
			<td>Duty Cycle</td>
			<td class="symbol">D</td>
			<td>
				<input class="output" data-bind="calcVar: dutyCycle, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td>
				<select data-bind="options: dutyCycle.units, optionsText: 'name', value: dutyCycle.selUnit"></select>
			</td>
			<td>
				The duty cycle is given by the equation: 
					$$ D = \frac{V_{out} - V_{D}}{V_{in} - V_T - V_D} $$
			</td>
		</tr>	

		<tr>
			<td>Switching Frequency</td>
			<td class="symbol">\( f_{sw} \)</td>
			<td>
				<input class="input" data-bind="calcVar: switchingFrequency, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: switchingFrequency.units, optionsText: 'name', value: switchingFrequency.selUnit"></select>
			</td>	
			<td>The switching frequency of the transistor (or other switching element).</td>		
		</tr>	

		<tr>
			<td>Average Output Current</td>
			<td class="symbol">\( I_{out} \)</td>
			<td>
				<input class="input" data-bind="calcVar: avgOutputCurrentA, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: avgOutputCurrentA.units, optionsText: 'name', value: avgOutputCurrentA.selUnit"></select>
			</td>
			<td>The average (DC) output current of the buck converter. Note that this is usually higher than the input current!</td>			
		</tr>

		<tr>
			<td>Percentage Output Current Ripple</td>
			<td class="symbol">\( \frac{\Delta I_{out}}{I_{out}} \)</td>
			<td>
				<input class="input" data-bind="calcVar: percOutputCurrentRipple, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: percOutputCurrentRipple.units, optionsText: 'name', value: percOutputCurrentRipple.selUnit"></select>
			</td>
			<td>It is recommended that this is no more than 10-20%.</td>			
		</tr>	

		<tr>
			<td>Inductance</td>
			<td class="symbol">L</td>
			<td>
				<input class="output" data-bind="calcVar: inductance, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td>
				<select data-bind="options: inductance.units, optionsText: 'name', value: inductance.selUnit"></select>
			</td>
			<td>
				The inductance is given by the equation: 
					$$ L = \frac{(V_{in} - V_{T} - V_{out})\cdot D}{f_{sw} \cdot \Delta I_{out}} $$
			</td>
		</tr>	

	</tbody>
</table>

<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	// Output HTML
	echo '<script type="text/javascript" src="/lib/eng-calcs-js/smps-buck-converter/smps-buck-converter.js"></script>';
?>
