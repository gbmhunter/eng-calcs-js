<!--
// @file 		lt3745.php
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/11/01
// @brief 		PHP and HTML for the LT3745 calculator. Binding/calculating code is in lt3745.js.
// @details
//				See the README in the root dir for more info.
-->

<style>
	.name, .equation, .symbol {
		text-align: center;
	}
	
	.comment {
		font-size: small;
	}
</style>

<!-- MathJax for Latex rendering -->
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<!-- Include knockout for binding -->
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min.js"></script>

<!-- Jquery -->
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

<!-- CSS file -->
<link type="text/css" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/qtip2/2.1.0/jquery.qtip.min.css" />

<!-- Include either the minifed or production version, not both -->
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/qtip2/2.1.0/jquery.qtip.min.js"></script>

<p>A calculator to help you choose the values of the supporting passive components for the Linear Technology LT3745 16-channel LED driver.</p>
<p>The datasheet can be found <a href="http://cds.linear.com/docs/en/datasheet/3745f.pdf">here</a>.</p>
<p>For more information you can check out the Linear Technology Demonstration Circuit 1608A.</p>
<form name="formSrc">
<table id="mainTable" style="margin-left: auto; margin-right: auto; width: 1000px;" border="4">
	<tbody>
		<tr>
			<td><strong>Variable Name:</strong></td>
			<td><strong>Variable Symbol:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>
			<td><strong>Equation Used:</strong></td>
			<td><strong>Comments:</strong></td>
		</tr>
		<tr>
			<td class="name">Load Voltage</td>
			<td class="symbol">\(V_{load}\)</td>
			<td><input data-bind="calcVar: loadVoltage" size="16"></input></td>
			<td><select data-bind="options: loadVoltage.units, optionsText: 'name', value: loadVoltage.selUnit"></select></td>	
			<td class="equation">n/a</td>
			<td class="comment">This is the maximum voltage that the load will ever see. If driving LEDs, this is equal to the forward voltage of the LED at the maximum current to plan to drive them at. If driving multiple is series, sum the forward voltages. If driving different colours, this is equal to the LED with the highest forward voltage.</td>
		</tr>		
		<tr>
			<td class="name">Buck Output Voltage</td>
			<td class="symbol">\(V_{buck,out}\)</td>
			<td><input data-bind="calcVar: vBuckOut" size="16" readonly="readonly"></input></td>
			<td><select data-bind="options: vBuckOut.units, optionsText: 'name', value: vBuckOut.selUnit"></select></td>	
			<td class="equation">\(V_{load} + 0.8V\)</td>
			<td class="comment">This is simply equal to the maximum load voltage, \( V_{load} \), plus the dropout voltage of the "linear regulator" of each channel used to fine-tune the current.</td>
		</tr>
		<tr>
			<td class="name">Minimum Input Voltage</td>
			<td class="symbol">\(V_{in(min)}\)</td>
			<td><input data-bind="calcVar: vInMin" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: vInMin.units, optionsText: 'name', value: vInMin.selUnit" ></select></td>
			<td class="equation">\(V_{out(max)} + 2.1V\)</td>
			<td class="comment">The is a minimum input voltage allowed to sustain current regulation. It also cannot be less than 6V.</td>
		</tr>
		<tr>
			<td class="name">Maximum Input Voltage</td>
			<td class="symbol">\(V_{in(max)}\)</td>
			<td><input data-bind="calcVar: vInMax" type="text" size="16" /></td>
			<td><select data-bind="options: vInMax.units, optionsText: 'name', value: vInMax.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the maximum input voltage that will ever be provided to the LT3745. Must be greater or equal to \( V_{in(min)} \), and less or equal to 55V.</td>
		<tr>
		<tr />
		<tr>
			<td class="name">Feedback Resistor 1</td>
			<td class="symbol">\(R_{fb1}\)</td>
			<td><input data-bind="calcVar: rfb1" type="text" size="16" /></td>
			<td><select data-bind="options: rfb1.units, optionsText: 'name', value: rfb1.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Feedback Resistor 2</td>
			<td class="symbol">\(R_{fb2}\)</td>
			<td><input data-bind="calcVar: rfb2" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: rfb2.units, optionsText: 'name', value: rfb2.selUnit" ></select></td>
			<td class="equation">\(R_{fb1}*\left(\dfrac{V_{out(max)}}{1.205V} - 1\right)\)</td>
			<td class="comment"></td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Maximum Output Current</td>
			<td class="symbol">\(I_{out(max)}\)</td>
			<td><input data-bind="calcVar: iOutMax" type="text" size="16" /></td>
			<td><select data-bind="options: iOutMax.units, optionsText: 'name', value: iOutMax.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Sense Resistance</td>
			<td class="symbol">\(R_{sense}\)</td>
			<td><input data-bind="calcVar: rSense" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: rSense.units, optionsText: 'name', value: rSense.selUnit" ></select></td>
			<td class="equation">\(\dfrac{35mV}{I_{out(max)}}\)</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Sense Resistance Power Dissipation</td>
			<td class="symbol">\(P_{Rsense}\)</td>
			<td><input data-bind="calcVar: prsense" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: prsense.units, optionsText: 'name', value: prsense.selUnit" ></select></td>
			<td class="equation">\(I_{out(max)}^2 * R_{sense}\)</td>
			<td class="comment"></td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Nominal Led-Pin Current</td>
			<td class="symbol">\(I_{led-pin(nom)}\)</td>
			<td><input data-bind="calcVar: iLedPinNom" type="text" size="16" /></td>
			<td><select data-bind="options: iLedPinNom.units, optionsText: 'name', value: iLedPinNom.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the "average" current each LED will see. Note that the current for each channel can be individually controlled down to 50% and up to 150% of this nominal current, and then further modulated with PWM from 0 to 100%.</td>
		</tr>
		<tr>
			<td class="name">Current Set Resistance</td>
			<td class="symbol">\(R_{iset}\)</td>
			<td><input data-bind="calcVar: riSet" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: riSet.units, optionsText: 'name', value: riSet.selUnit" ></select></td>
			<td class="equation">\(2500*(\dfrac{1.205}{I_{led-pin(nom)}})\)</td>
			<td class="comment">The resistor sets the nominal LED current chosen above.</td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Voltage Drop Across Buck Diode</td>
			<td class="symbol">\(V_{d,f}\)</td>
			<td><input data-bind="calcVar: vdf" type="text" size="16" /></td>
			<td><select data-bind="options: vdf.units, optionsText: 'name', value: vdf.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Minimum Duty Cycle</td>
			<td class="symbol">\(D_{min}\)</td>
			<td><input data-bind="calcVar: dMin" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: dMin.units, optionsText: 'name', value: dMin.selUnit" ></select></td>
			<td class="equation">\(\dfrac{V_{out(max)} + V_{d,f}}{V_{in(max)} + V_{d,f}}\)</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Maximum Duty Cycle</td>
			<td class="symbol">\(D_{max}\)</td>
			<td><input data-bind="calcVar: dMax" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: dMax.units, optionsText: 'name', value: dMax.selUnit" ></select></td>
			<td class="equation">\(\dfrac{V_{out(max)} + V_{d,f}}{V_{in(min)} + V_{d,f}}\)</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Minimum On Time</td>
			<td class="symbol">\(t_{on(min)}\)</td>
			<td><input data-bind="calcVar: tOnMin" type="text" size="16" /></td>
			<td><select data-bind="options: tOnMin.units, optionsText: 'name', value: tOnMin.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Minimum Off Time</td>
			<td class="symbol">\(t_{off(min)}\)</td>
			<td><input data-bind="calcVar: tOffMin" type="text" size="16" /></td>
			<td><select data-bind="options: tOffMin.units, optionsText: 'name', value: tOffMin.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Maximum Switching Frequency</td>
			<td class="symbol">\(f_{sw(max)}\)</td>
			<td><input data-bind="calcVar: fSwMax" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: fSwMax.units, optionsText: 'name', value: fSwMax.selUnit" ></select></td>
			<td class="equation">\(min( \dfrac{D_{min}}{t_{on,min}}, \dfrac{1 - D_{max}}{t_{off(min)}})\)</td>
			<td class="comment">This is the maximum switching frequency you could use. </td>
		</tr>
		<tr>
			<td class="name">Actual Switching Frequency</td>
			<td class="symbol">\(f_{sw(act)}\)</td>
			<td><input data-bind="calcVar: fSwAct" type="text" size="16" /></td>
			<td><select data-bind="options: fSwAct.units, optionsText: 'name', value: fSwAct.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the switching frequency you want to use, set by the resistor \( R_T \). It has to be between 100kHz and 1MHz, and also less than \(f_{sw(max)}\).</td>
		</tr>
		<tr>
			<td class="name">fufg</td>
			<td class="symbol">\(f_{ugf}\)</td>
			<td><input data-bind="calcVar: fugf" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: fugf.units, optionsText: 'name', value: fugf.selUnit" ></select></td>
			<td class="equation">\(\dfrac{f_{sw(act)}}{10}\)</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Minimum Output Capacitance</td>
			<td class="symbol">\(C_{out(min)}\)</td>
			<td><input data-bind="calcVar: cOutMin" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: cOutMin.units, optionsText: 'name', value: cOutMin.selUnit" ></select></td>
			<td class="equation">\(max( \dfrac{0.25}{R_{sense}*f_{ugf}}, \dfrac{1.5}{V_{buck,out}*R_{sense}*f_{ugf}})\)</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Inductor Ripple Current</td>
			<td class="symbol">\(I_{L(delta)}\)</td>
			<td><input data-bind="calcVar: iLDelta" type="text" size="16" /></td>
			<td><select data-bind="options: iLDelta.units, optionsText: 'name', value: iLDelta.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Minimum Inductance</td>
			<td class="symbol">\(L_{min}\)</td>
			<td><input data-bind="calcVar: lMin" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: lMin.units, optionsText: 'name', value: lMin.selUnit" ></select></td>
			<td class="equation">\( \dfrac{V_{buck,out} + V_{d,f}}{ V_{in(max) + V_{d,f}}} * \dfrac{ V_{in(max)} - V_{buck,out} }{ f_{sw(act)}*I_{L(delta)} } \)</td>
			<td class="comment">This is the minimum inductance required to satisfy the inductor ripple current specified above. If this inductance is too large, you could consider increasing the ripple current, or increasing the switching frequency.</td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Input Voltage Ripple</td>
			<td class="symbol">\( V_{in,ripple} \)</td>
			<td><input data-bind="calcVar: vInRipple" type="text" size="16" /></td>
			<td><select data-bind="options: vInRipple.units, optionsText: 'name', value: vInRipple.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment"></td>
		</tr>
		<tr>
			<td class="name">Minimum Input Capacitance</td>
			<td class="symbol">\(C_{in(min)}\)</td>
			<td><input data-bind="calcVar: cInMin" type="text" size="16" readonly="readonly" /></td>
			<td><select data-bind="options: cInMin.units, optionsText: 'name', value: cInMin.selUnit" ></select></td>
			<td class="equation">\( \dfrac{D_{max}*I_{out(max)}}{V_{in,ripple}*f_{sw(act)}} \)</td>
			<td class="comment">This is the minimum input capacitance required to satisfy the desired input voltage ripple chosen above.</td>
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


