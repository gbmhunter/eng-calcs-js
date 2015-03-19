<!--
//!
//! @file 			resistor-divider.php
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
//! @edited 		n/a
//! @created		2012-11-26
//! @last-modified 	2015-03-18
//! @brief 		
//! @details
//!		See the README in the root dir for more info.
-->

<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>
	
<!-- candy-calc logic -->
<script type="text/javascript" src="/lib/candy-calc/js/candy-calc.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/lib/candy-calc/css/candy-calc.css" />

The following calculator works out either \( V_{in} \), \( R_1 \)$, \( R_2 \), or \( V_{out}\), given the other three parameters, using the resistive voltage divider equation:
<p style="text-align: center;">\( V_{out}=\frac{R_2}{R_1+R_2}V_{in} \)</p>
<p style="text-align: center;">
	where:<br>
	\( V_{in} \) = input voltage<br>
	\( R_1 \) = resistance of resistor 1 (see diagram)<br>
	\( R_2 \) = resistance of resistor 2 (see diagram)<br>
	\( V_{out} \) = output voltage
</p>
<p>
	It is assumed that the output impedance on \( V_{out} \) is significantly higher than \( R_2 \) so that it doesn't matter (for example, \( V_{out} \) is connected to an op-amp input, analogue microcontroller input or similar).
</p>
<p>
	The quiescent current through the divider, \( I_q \), is also calculated, which can be useful to know when designing power-saving circuits. The equation to find \( I_q \) is:
</p>
<p style="text-align: center;">\( I_q = \frac{V_{in}}{R_1+R_2} \)</p>

<table id="resistorDivider" class="candy-calc" style="width: 400px;">
	<tbody>
		<tr>
			<td><strong>Variables:</strong></td>
			<td><strong>Values:</strong></td>
			<td><strong>Units:</strong></td>
			<td><strong>Calculate What?</strong></td>
			<td><strong>Variable Diagram:</strong></td>
		</tr>
		<tr>
			<td class="symbol">\( V_{in} \)</td>
			<td>
				<input class="input" data-bind="calcVar: vIn, valueUpdate: 'afterkeydown'" ></input>
			</td>
			<td>
				<select data-bind="options: vIn.units, optionsText: 'name', value: vIn.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="vIn"></input>
			</td>
			<td rowspan="6">
				<?php
					echo '<img src="/lib/eng-calcs-js/resistor-divider/resistor-divider-calculator-variable-diagram.png" width="150" height="150" />';
				?>
			</td>
		</tr>
		<tr>
			<td class="symbol">\( R_1 \)</td>
			<td>
				<input class="input" data-bind="calcVar: r1, valueUpdate: 'afterkeydown'" ></input>
			</td>
			<td>
				<select data-bind="options: r1.units, optionsText: 'name', value: r1.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="r1"></input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\( R_2 \)</td>
			<td>
				<input class="input" data-bind="calcVar: r2, valueUpdate: 'afterkeydown'" ></input>
			</td>
			<td>
				<select data-bind="options: r2.units, optionsText: 'name', value: r2.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="r2"></input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\( V_{out} \)</td>
			<td>
				<input class="input" data-bind="calcVar: vOut, valueUpdate: 'afterkeydown'" ></input>
			</td>
			<td>
				<select data-bind="options: vOut.units, optionsText: 'name', value: vOut.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="vOut"></input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\( I_q \)</td>
			<td>
				<input class="input" data-bind="calcVar: iQ, valueUpdate: 'afterkeydown'" ></input>
			</td>
			<td>
				<select data-bind="options: iQ.units, optionsText: 'name', value: iQ.selUnit"></select>
			</td>
			<td>
				<!-- Not able to be selected -->
			</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>

<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	echo '<script type="text/javascript" src="/lib/eng-calcs-js/resistor-divider/resistor-divider.js"></script>';
?>
