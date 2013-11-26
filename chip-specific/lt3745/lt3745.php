<!--
// @file 		lt3745.php
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/11/01
// @brief 		PHP and HTML for the LT3745 calculator. Binding/calculating code is in lt3745.js.
// @details
//				See the README in the root dir for more info.
-->

<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>
	
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js"></script>
<!-- jStorage, for saving calculator state to user's computer -->
<script type="text/javascript" src="Js-EngCalcs/lib/jStorage/jstorage.js"></script>
	
<!-- candy-calc logic -->
<script type="text/javascript" src="/candy-calc/js/candy-calc.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/candy-calc/css/candy-calc.css" />

<p>A calculator to help you choose the values of the supporting passive components for the Linear Technology LT3745 16-channel LED driver.</p>
<p>The datasheet can be found <a href="http://cds.linear.com/docs/en/datasheet/3745f.pdf">here</a>.</p>
<p>For more information you can check out the Linear Technology Demonstration Circuit 1608A.</p>
<table id="lt3745" class="candy-calc" border="4" style="border-collapse: collapse;" >
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
			<td class="name">Supply Voltage</td>
			<td class="symbol">\(V_{cc}\)</td>
			<td><input class="input" data-bind="calcVar: supplyVoltage, valueUpdate: 'afterkeydown'" size="16"></input></td>
			<td class="units"><select data-bind="options: supplyVoltage.units, optionsText: 'name', value: supplyVoltage.selUnit"></select></td>	
			<td class="equation">n/a</td>
			<td class="comment">The supply voltage for the logic. Must be between 3.0 and 5.5V.</td>
		</tr>	
		<tr>
			<td class="name">Load Voltage</td>
			<td class="symbol">\(V_{load}\)</td>
			<td><input class="input" data-bind="calcVar: loadVoltage, valueUpdate: 'afterkeydown'" size="16"></input></td>
			<td class="units"><select data-bind="options: loadVoltage.units, optionsText: 'name', value: loadVoltage.selUnit"></select></td>	
			<td class="equation">n/a</td>
			<td class="comment">This is the maximum voltage that the load will ever see. If driving LEDs, this is equal to the forward voltage of the LED at the maximum current to plan to drive them at. If driving multiple is series, sum the forward voltages. If driving different colours, this is equal to the LED with the highest forward voltage.</td>
		</tr>		
		<tr>
			<td class="name">Output Voltage</td>
			<td class="symbol">\(V_{out(max)}\)</td>
			<td><input class="input" data-bind="calcVar: vOutMax, valueUpdate: 'afterkeydown'" size="16" ></input></td>
			<td class="units"><select data-bind="options: vOutMax.units, optionsText: 'name', value: vOutMax.selUnit"></select></td>	
			<td class="equation">n/a</td>
			<td class="comment">This must be equal or higher than \( V_{load} \). It is recommended to be set between 0.8V and 3.0V above \( V_{load} \) for the best current regulation.</td>
		</tr>
		<tr>
			<td class="name">Minimum Input Voltage</td>
			<td class="symbol">\(V_{in(min)}\)</td>
			<td><input class="output" data-bind="calcVar: vInMin, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: vInMin.units, optionsText: 'name', value: vInMin.selUnit" ></select></td>
			<td class="equation">\(V_{out(max)} + 2.1V\)</td>
			<td class="comment">The is a minimum input voltage allowed to sustain current regulation. It cannot be less than 6V. The \(2.1V\) is the minimum dropout voltage between the \(V_{in}\) and ISN pins.</td>
		</tr>
		<tr>
			<td class="name">Maximum Input Voltage</td>
			<td class="symbol">\(V_{in(max)}\)</td>
			<td><input class="input" data-bind="calcVar: vInMax, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: vInMax.units, optionsText: 'name', value: vInMax.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the maximum input voltage that will ever be provided to the LT3745. Must be greater or equal to \( V_{in(min)} \), and less or equal to 55V.</td>
		<tr>
		<tr />
		<tr>
			<td class="name">Feedback Resistor 1</td>
			<td class="symbol">\(R_{fb1}\)</td>
			<td><input class="input" data-bind="calcVar: rfb1, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: rfb1.units, optionsText: 'name', value: rfb1.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This resistor along with \(R_{fb2}\) determines the output voltage of the buck converter. This is recommended to be \(10k\Omega\)</td>
		</tr>
		<tr>
			<td class="name">Feedback Resistor 2</td>
			<td class="symbol">\(R_{fb2}\)</td>
			<td><input class="output" data-bind="calcVar: rfb2, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: rfb2.units, optionsText: 'name', value: rfb2.selUnit" ></select></td>
			<td class="equation">\(R_{fb1}*\left(\dfrac{V_{out(max)}}{1.205V} - 1\right)\)</td>
			<td class="comment">This resistor along with \(R_{fb1}\) determines the output voltage of the buck converter.</td>
		</tr>
		<tr></tr>
		<tr style="border-bottom: 4px solid #000;">
			<td class="name">Maximum Output Current</td>
			<td class="symbol">\(I_{out(max)}\)</td>
			<td><input class="input" data-bind="calcVar: iOutMax, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: iOutMax.units, optionsText: 'name', value: iOutMax.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the maximum output current for all channels, i.e. maximum current going through MOSFET and current sense resistor.</td>
		</tr>
		<tr>
			<td class="name">Sense Resistance</td>
			<td class="symbol">\(R_{sense}\)</td>
			<td><input class="output" data-bind="calcVar: rSense, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: rSense.units, optionsText: 'name', value: rSense.selUnit" ></select></td>
			<td class="equation">\(\dfrac{35mV}{I_{out(max)}}\)</td>
			<td class="comment">The value for the current-sense resistor which will give you the \( I_{out(max)}\) you want.</td>
		</tr>
		<tr>
			<td class="name">Sense Resistance Power Dissipation</td>
			<td class="symbol">\(P_{Rsense}\)</td>
			<td><input class="output" data-bind="calcVar: prsense, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: prsense.units, optionsText: 'name', value: prsense.selUnit" ></select></td>
			<td class="equation">\(I_{out(max)}^2 * R_{sense}\)</td>
			<td class="comment">This is the power that will dissipated through the current-sense resistor at maximum current output. Make sure the resistor is rated to handle this power.</td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Nominal Led-Pin Current</td>
			<td class="symbol">\(I_{led-pin(nom)}\)</td>
			<td><input class="input" data-bind="calcVar: iLedPinNom, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: iLedPinNom.units, optionsText: 'name', value: iLedPinNom.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the "nominal" current each LED will see. It has to be between 10-50mA. Note that the current for each channel can be individually controlled down to 50% and up to 150% of this nominal current, and then further modulated with PWM from 0 to 100%.</td>
		</tr>
		<tr style="border-bottom: 4px solid #000;">
			<td class="name">Current Set Resistance</td>
			<td class="symbol">\(R_{iset}\)</td>
			<td><input class="output" data-bind="calcVar: riSet, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: riSet.units, optionsText: 'name', value: riSet.selUnit" ></select></td>
			<td class="equation">\(2500*(\dfrac{1.205}{I_{led-pin(nom)}})\)</td>
			<td class="comment">The resistor sets the nominal LED current chosen above.</td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Voltage Drop Across Buck Diode</td>
			<td class="symbol">\(V_{d,f}\)</td>
			<td><input class="input" data-bind="calcVar: vdf, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: vdf.units, optionsText: 'name', value: vdf.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the forward voltage drop across the buck diode at the operating current. This value can be found in the diodes datasheet. Should be around 0.5V.</td>
		</tr>
		<tr>
			<td class="name">Minimum Duty Cycle</td>
			<td class="symbol">\(D_{min}\)</td>
			<td><input class="output" data-bind="calcVar: dMin, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: dMin.units, optionsText: 'name', value: dMin.selUnit" ></select></td>
			<td class="equation">\(\dfrac{V_{out(max)} + V_{d,f}}{V_{in(max)} + V_{d,f}}\)</td>
			<td class="comment">The minimum duty cycle of the buck converter. This limits the maximum switching frequency.</td>
		</tr>
		<tr>
			<td class="name">Maximum Duty Cycle</td>
			<td class="symbol">\(D_{max}\)</td>
			<td><input class="output" data-bind="calcVar: dMax, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: dMax.units, optionsText: 'name', value: dMax.selUnit" ></select></td>
			<td class="equation">\(\dfrac{V_{out(max)} + V_{d,f}}{V_{in(min)} + V_{d,f}}\)</td>
			<td class="comment">The maximum duty cycle of the buck converter. This limits the maximum switching frequency.</td>
		</tr>
		<tr>
			<td class="name">Minimum Switch-On Time</td>
			<td class="symbol">\(t_{on(min)}\)</td>
			<td><input class="input" data-bind="calcVar: tOnMin, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: tOnMin.units, optionsText: 'name', value: tOnMin.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the minimum switch-on time of the MOSFET. Sometimes called the turn-on delay time ( \( t_{d(on)} \) ). Check the MOSFET's datasheet for this value. Should be greater than 1ns and less than 500ns.</td>
		</tr>
		<tr>
			<td class="name">Minimum Switch-Off Time</td>
			<td class="symbol">\(t_{off(min)}\)</td>
			<td><input class="input" data-bind="calcVar: tOffMin, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: tOffMin.units, optionsText: 'name', value: tOffMin.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the minimum switch-off time of the MOSFET. Sometimes called the turn-off delay time ( \( t_{d(off)} \) ). Check the MOSFET's datasheet for this value. Should be greater than 1ns and less than 500ns.</td>
		</tr>
		<tr>
			<td class="name">Maximum Switching Frequency</td>
			<td class="symbol">\(f_{sw(max)}\)</td>
			<td><input class="output" data-bind="calcVar: fSwMax, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: fSwMax.units, optionsText: 'name', value: fSwMax.selUnit" ></select></td>
			<td class="equation">\(min( \dfrac{D_{min}}{t_{on,min}}, \dfrac{1 - D_{max}}{t_{off(min)}})\)</td>
			<td class="comment">This is the maximum switching frequency you could use. </td>
		</tr>
		<tr>
			<td class="name">Actual Switching Frequency</td>
			<td class="symbol">\(f_{sw(act)}\)</td>
			<td><input class="input" data-bind="calcVar: fSwAct, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: fSwAct.units, optionsText: 'name', value: fSwAct.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the switching frequency you want to use, set by the resistor \( R_T \). It has to be between 100kHz and 1MHz, and also less than \(f_{sw(max)}\).</td>
		</tr>
		<tr>
			<td class="name">Unity-gain Frequency</td>
			<td class="symbol">\(f_{ugf}\)</td>
			<td><input class="output" data-bind="calcVar: fugf, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: fugf.units, optionsText: 'name', value: fugf.selUnit" ></select></td>
			<td class="equation">\(\dfrac{f_{sw(act)}}{10}\)</td>
			<td class="comment">This is the switching frequency which would give unity voltage gain between input and output.</td>
		</tr>
		<tr style="border-bottom: 4px solid #000;">
			<td class="name">Frequency-setting Resistance</td>
			<td class="symbol">\(R_{T}\)</td>
			<td><input class="output" data-bind="calcVar: rt, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: rt.units, optionsText: 'name', value: rt.selUnit" ></select></td>
			<td class="equation">\( R_T = \dfrac{2.25167e^{11}}{f_{sw(act)^{1.114}}} \)</td>
			<td class="comment">This is the resistance required to set the frequency at \( f_{sw(act)} \) chosen above. Equation was worked out by fitting a power equation to the frequency-resistance values given in the datahseet. This equation fits the data well, with a regression coefficient of \( r^2 = 0.9994 \) within the valid range.</td>
		</tr>
		<!-- Temperature stuff -->
		<tr>
			<td class="name">Maximum Junction Temperature</td>
			<td class="symbol">\(T_{J(max)}\)</td>
			<td><input class="input" data-bind="calcVar: tjMax, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: tjMax.units, optionsText: 'name', value: tjMax.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the desired maximum junction temperature of the LT3745 IC. The IC will begin to reduce \( I_{led-pin(nom)} \) above this to prevent any further increase on temperature. The LT3745 also has an absolute maximum junction temperature of \( 165^{\circ}C \), at which point it will switch off until it drops to \( 155^{\circ}C \).</td>
		</tr>
		<tr style="border-bottom: 4px solid #000;">
			<td class="name">Temperature Set Resistance</td>
			<td class="symbol">\(R_{TSET}\)</td>
			<td><input class="output" data-bind="calcVar: rtSet, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: rtSet.units, optionsText: 'name', value: rtSet.selUnit" ></select></td>
			<td class="equation">\( \frac{1.72mV*(T_J + 273.15)*R_{ISET}}{1.205V} \)</td>
			<td class="comment">The resistance required to be connected between pin \( T_{SET} \) and ground on the LT3745 to limit the junction temperature to \( T_{J(max)} \).</td>
		</tr>
		<tr>
			<td class="name">Minimum Output Capacitance</td>
			<td class="symbol">\(C_{out(min)}\)</td>
			<td><input class="output" data-bind="calcVar: cOutMin, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: cOutMin.units, optionsText: 'name', value: cOutMin.selUnit" ></select></td>
			<td class="equation">\( \small \begin{split} max( \dfrac{0.25}{R_{sense}*f_{ugf}}, \\ \dfrac{1.5}{V_{buck,out}*R_{sense}*f_{ugf}}) \end{split} \)</td>
			<td class="comment">The output capacitance smooths the output voltage, and also stores energy to satisfy load transients.</td>
		</tr>
		<tr>
			<td class="name">Inductor Ripple Current</td>
			<td class="symbol">\(I_{L(delta)}\)</td>
			<td><input class="input" data-bind="calcVar: iLDelta, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: iLDelta.units, optionsText: 'name', value: iLDelta.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">This is the maximum desired ripple current through the inductor. A value between 10-50% is recommended.</td>
		</tr>
		<tr>
			<td class="name">Minimum Inductance</td>
			<td class="symbol">\(L_{min}\)</td>
			<td><input class="output" data-bind="calcVar: lMin, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: lMin.units, optionsText: 'name', value: lMin.selUnit" ></select></td>
			<td class="equation">\( \small \begin{split} \dfrac{V_{buck,out} + V_{d,f}}{ V_{in(max) + V_{d,f}}} * \\ \dfrac{ V_{in(max)} - V_{buck,out} }{ f_{sw(act)}*I_{L(delta)} } \end{split} \)</td>
			<td class="comment">This is the minimum inductance required to satisfy the inductor ripple current specified above. If this inductance is too large, you could consider increasing the ripple current, or increasing the switching frequency.</td>
		</tr>
		<tr></tr>
		<tr>
			<td class="name">Input Voltage Ripple</td>
			<td class="symbol">\( V_{in,ripple} \)</td>
			<td><input class="input" data-bind="calcVar: vInRipple, valueUpdate: 'afterkeydown'" type="text" size="16" /></td>
			<td class="units"><select data-bind="options: vInRipple.units, optionsText: 'name', value: vInRipple.selUnit"></select></td>
			<td class="equation">n/a</td>
			<td class="comment">The desired maximum input voltage ripple. A value around 100mV is normal.</td>
		</tr>
		<tr>
			<td class="name">Minimum Input Capacitance</td>
			<td class="symbol">\(C_{in(min)}\)</td>
			<td><input class="output" data-bind="calcVar: cInMin, valueUpdate: 'afterkeydown'" type="text" size="16" readonly="readonly" /></td>
			<td class="units"><select data-bind="options: cInMin.units, optionsText: 'name', value: cInMin.selUnit" ></select></td>
			<td class="equation">\( \dfrac{D_{max}*I_{out(max)}}{V_{in,ripple}*f_{sw(act)}} \)</td>
			<td class="comment">This is the minimum input capacitance required to satisfy the desired input voltage ripple chosen above.</td>
		</tr>
	</tbody>
</table>
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


