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
			<td>\(V_{buck,out}\)</td>
			<td><input data-bind="value: vBuckOut" size="16" disabled="true"></input></td>
			<td><select data-bind="options: vBuckOutUnits, optionsText: 'name', value: vBuckOutSelUnit"></select></td>	
			<td>\(V_{load} + 0.8V\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Input Voltage</td>
			<td>\(V_{in(min)}\)</td>
			<td><input data-bind="value: vInMin" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: vInMinUnits, optionsText: 'name', value: vInMinSelUnit" ></select></td>
			<td>\(V_{out(max)} + 2.1V\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Maximum Input Voltage</td>
			<td>\(V_{in(max)}\)</td>
			<td><input data-bind="value: vInMax" type="text" size="16" /></td>
			<td><select data-bind="options: vInMaxUnits, optionsText: 'name', value: vInMaxSelUnit"></select></td>
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
		<tr></tr>
		<tr>
			<td style="text-align: center;">Voltage Drop Across Buck Diode</td>
			<td>\(V_{d,f}\)</td>
			<td><input data-bind="value: vdf" type="text" size="16" /></td>
			<td><select data-bind="options: vdfUnits, optionsText: 'name', value: vdfSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Duty Cycle</td>
			<td>\(D_{min}\)</td>
			<td><input data-bind="value: dMin" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: dMinUnits, optionsText: 'name', value: dMinSelUnit" ></select></td>
			<td>\(\frac{V_{out(max)} + V_{d,f}}{V_{in(max)} + V_{d,f}}\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Maximum Duty Cycle</td>
			<td>\(D_{max}\)</td>
			<td><input data-bind="value: dMax" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: dMaxUnits, optionsText: 'name', value: dMaxSelUnit" ></select></td>
			<td>\(\frac{V_{out(max)} + V_{d,f}}{V_{in(min)} + V_{d,f}}\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum On Time</td>
			<td>\(t_{on(min)}\)</td>
			<td><input data-bind="value: tOnMin" type="text" size="16" /></td>
			<td><select data-bind="options: tOnMinUnits, optionsText: 'name', value: tOnMinSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Off Time</td>
			<td>\(t_{off(min)}\)</td>
			<td><input data-bind="value: tOffMin" type="text" size="16" /></td>
			<td><select data-bind="options: tOffMinUnits, optionsText: 'name', value: tOffMinSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Maximum Switching Frequency</td>
			<td>\(f_{sw(max)}\)</td>
			<td><input data-bind="value: fSwMax" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: fSwMaxUnits, optionsText: 'name', value: fSwMaxSelUnit" ></select></td>
			<td>\(min( \frac{D_{min}}{t_{on,min}}, \frac{1 - D_{max}}{t_{off(min)}})\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Actual Switching Frequency</td>
			<td>\(f_{sw(act)}\)</td>
			<td><input data-bind="value: fSwAct" type="text" size="16" /></td>
			<td><select data-bind="options: fSwActUnits, optionsText: 'name', value: fSwActSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">fufg</td>
			<td>\(f_{ugf}\)</td>
			<td><input data-bind="value: fugf" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: fugfUnits, optionsText: 'name', value: fugfSelUnit" ></select></td>
			<td>\(\frac{f_{sw(act)}}{10}\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Output Capacitance</td>
			<td>\(C_{out(min)}\)</td>
			<td><input data-bind="value: cOutMin" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: cOutMinUnits, optionsText: 'name', value: cOutMinSelUnit" ></select></td>
			<td>\(max( \frac{0.25}{R_{sense}*f_{ugf}}, \frac{1.5}{V_{buck,out}*R_{sense}*f_{ugf}})\)</td>
		</tr>
		<tr>
			<td style="text-align: center;">Inductor Ripple Current</td>
			<td>\(I_{L(delta)}\)</td>
			<td><input data-bind="value: iLDelta" type="text" size="16" /></td>
			<td><select data-bind="options: iLDeltaUnits, optionsText: 'name', value: iLDeltaSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Inductance</td>
			<td>\(L_{min}\)</td>
			<td><input data-bind="value: lMin" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: lMinUnits, optionsText: 'name', value: lMinSelUnit" ></select></td>
			<td>\( \frac{V_{buck,out} + V_{d,f}}{ V_{in(max) + V_{d,f}}} * \frac{ V_{in(max)} - V_{buck,out} }{ f_{sw(act)}*I_{L(delta)} } \)</td>
		</tr>
		<tr></tr>
		<tr>
			<td style="text-align: center;">Input Voltage Ripple</td>
			<td>\( V_{in,ripple} \)</td>
			<td><input data-bind="value: vInRipple" type="text" size="16" /></td>
			<td><select data-bind="options: vInRippleUnits, optionsText: 'name', value: vInRippleSelUnit"></select></td>
			<td>n/a</td>
		</tr>
		<tr>
			<td style="text-align: center;">Minimum Input Capacitance</td>
			<td>\(C_{in(min)}\)</td>
			<td><input data-bind="value: cInMin" type="text" size="16" disabled="true" /></td>
			<td><select data-bind="options: cInMinUnits, optionsText: 'name', value: cInMinSelUnit" ></select></td>
			<td>\( \frac{D_{max}*I_{out(max)}}{V_{in,ripple}*f_{sw(act)}} \)</td>
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


