<!--
// @file 		lt3745.php
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/11/01
// @brief 		
// @details
//				See the README in the root dir for more info.
-->

<!-- MathJax for Latex rendering -->
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<!-- Include knockout for binding -->
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min.js"></script>

<!-- Jquery -->
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

<p>LT3745 calculator</p>
<form name="formSrc">
<table id="mainTable" style="margin-left: auto; margin-right: auto;" border="4">
	<tbody>
		<tr>
			<td id="td1"><strong>Variable Name:</strong></td>
			<td><strong>Variable Symbol:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>
			<td><strong>Equation Used:</strong></td>
		</tr>
		<tr>
			<td style="text-align: center;">Load Voltage</td>
			<td>\(V_{load}\)</td>
			<td><input data-bind="value: loadVoltage" size="16" ></input></td>
			<td><select data-bind="options: loadVoltageUnits, optionsText: 'name', value: loadVoltageSelUnit"></select></td>	
			<td>n/a</td>
		</tr>		
		<tr>
			<td style="text-align: center;">Buck Output Voltage</td>
			<td>\(V_{out(max)}\)</td>
			<td><input data-bind="value: buckOutputVoltage" size="16" disabled="true"></input></td>
			<td><select data-bind="options: buckOutputVoltageUnits, optionsText: 'name', value: buckOutputVoltageSelUnit"></select></td>	
			<td>\(V_{load} + 0.8V\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Input Voltage</td>
			<td>\(V_{in(min)}\)</td>
			<td><input data-bind="value: minInputVoltage" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: minInputVoltageUnits, optionsText: 'name', value: minInputVoltageSelUnit" ></select></td>
			<td>\(V_{out(max)} + 2.1V\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Maximum Input Voltage</td>
			<td>\(V_{in(max)}\)</td>
			<td><input data-bind="value: maxInputVoltage" type="text" size="16" /></td>
			<td><select data-bind="options: maxInputVoltageUnits, optionsText: 'name', value: maxInputVoltageSelUnit"></select></td>
			<td>n/a</td>
		<tr>
		<tr />
		<tr>
			<td style="text-align: center;">Feedback Resistor 1</td>
			<td>\(R_{fb1}\)</td>
			<td><input data-bind="value: rfb1" type="text" size="16" /></td>
			<td><select data-bind="options: rfb1Units, optionsText: 'name', value: rfb1SelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Feedback Resistor 2</td>
			<td>\(R_{fb2}\)</td>
			<td><input data-bind="value: rfb2" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: rfb2Units, optionsText: 'name', value: rfb2SelUnit" ></select></td>
			<td>\(R_{fb1}*\left(\frac{V_{out(max)}}{1.205V} - 1\right)\)</td>
		</tr>
		<tr></tr>
		<tr>
			<td style="text-align: center;">Maximum Output Current</td>
			<td>\(I_{out(max)}\)</td>
			<td><input data-bind="value: iOutMax" type="text" size="16" /></td>
			<td><select data-bind="options: iOutMaxUnits, optionsText: 'name', value: iOutMaxSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Sense Resistance</td>
			<td>\(R_{sense}\)</td>
			<td><input data-bind="value: rSense" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: rSenseUnits, optionsText: 'name', value: rSenseSelUnit" ></select></td>
			<td>\(\frac{35mV}{I_{out(max)}}\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Sense Resistance Power Dissipation</td>
			<td>\(P_{Rsense}\)</td>
			<td><input data-bind="value: prsense" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: prsenseUnits, optionsText: 'name', value: prsenseSelUnit" ></select></td>
			<td>\(I_{out(max)}^2 * R_{sense}\)</td>
		</tr>
		<tr></tr>
		<tr>
			<td style="text-align: center;">Nominal Led-Pin Current</td>
			<td>\(I_{led-pin(nom)}\)</td>
			<td><input data-bind="value: iLedPinNom" type="text" size="16" /></td>
			<td><select data-bind="options: iLedPinNomUnits, optionsText: 'name', value: iLedPinNomSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Current Set Resistance</td>
			<td>\(R_{iset}\)</td>
			<td><input data-bind="value: riSet" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: riSetUnits, optionsText: 'name', value: riSetSelUnit" ></select></td>
			<td>\(2500*(\frac{1.205}{I_{led-pin(nom)}})\)</td>
		</tr>
	</tbody>
</table>
</form>
<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	// Get full path
	$cur_file=str_replace('\\','/', realpath(dirname(__FILE__)));
	// Remove everything up to public_html
	$cur_file=preg_replace('/(.*?)\/(.*?)\/(public_html|htdocs)/', '', $cur_file);
	// Output HTML
	echo '<script type="text/javascript" src="' . $cur_file . '\lt3745.js"></script>';
?>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>


