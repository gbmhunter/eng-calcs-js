<!--
// @file 			pcb-track-width.php
// @author 			Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 			n/a
// @date 			2014-11-19
// @last-modified	2015-06-16
// @brief 			This calculator can find the minimum PCB track width (external or internal layer) given the track current, the allowed temperatur rise, and copper layer thickness. Calculated in accordance with IPC-2221A.
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
<script type="text/javascript" src="/lib/eng-calcs-js/lib/readmore.js/readmore.js" ></script>

<article>

	<p>This calculator can find the minimum PCB track width (external or internal layer) given the track current, the allowed temperatur rise, and copper layer thickness.</p>


<p>Calculated in accordance with the equations in IPC-2221A Section 6.2 (formerly IPC-D-275, the equation has not changed between these two standards amd you can get similar values by curve-fitting to the graphs provided in IPC-D-275, drawn in 1954, woah!).</p>

<p>$$ I = k\Delta T^b A^c $$</p>
<p style="text-align: center;">
	where:<br>
	\( k \) = 0.048 for external traces, 0.024 for internal tracks<br>
	\( \Delta T \) = the change in temperature (temperature rise) in \( ^{\circ}C \)<br>
	\( b \) = 0.44<br>
	\( A \) = cross-sectional area in \( mils^2 \)<br>
	\( c \) = 0.725
</p>

<p>The standard only covers values where the current is 0-35A, track width is 0-10.16mm, temperature rise is from 10-100C, and the copper from 0.5-3oz. Values outside this range are extrapolated (and there more error-prone) and will turn orange.</p>

<p>This also assumes the track is sufficiently long enough the the end-points do not have a significant effect on the heatsinking. For example, this calcultor should not be used for calculating the width of thermal-relief style connections from a copper pour to a via, in where the track is very short (0.2-1.0mm). It also assumes there are no vias along the length of the track.</p>

<p>The current in assumed to be constant (DC). However, you can use the RMS value for a pulsed current as long as the pulses are fast enough.</p>

<p>The temperature of the PCB material should NEVER exceed the relative thermal index (RTI) of the material. This is defined in UL746B as the temperature at which 50% of the materials properties are retained after 100,000 hours.</p>

<p>Remember this calculator does not take into account other nearby heat sources.</p>

</article>

<script type="text/javascript">
jQuery(function($) {

        $('article').readmore({maxHeight: 100, speed: 200}); // This function applies good for the first tab, but when navigated to the next tab, the text is not trimmed..

        });
</script>

<table id="pcbTrackWidth" class="candy-calc" border="4" style="width: 500px;">
	<tbody>
		<tr>
			<td><strong>Variable:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
		</tr>
		<tr>
			<td class="symbol">Trace Current</td>
			<td>
				<input class="input" data-bind="calcVar: current, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: current.units, optionsText: 'name', value: current.selUnit"></select>
			</td>			
		</tr>
		<tr>
			<td class="symbol">Temp Rise</td>
			<td>
				<input class="input" data-bind="calcVar: tempRise, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: tempRise.units, optionsText: 'name', value: tempRise.selUnit"></select>
			</td>			
		</tr>	
		<tr>
			<td class="symbol">Copper Thickness</td>
			<td>
				<input class="input" data-bind="calcVar: copperThickness, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: copperThickness.units, optionsText: 'name', value: copperThickness.selUnit"></select>
			</td>			
		</tr>
		<tr>
			<td colspan="3" style="text-align: center;">
				<input data-bind="checked: traceLocation" type="radio" name="range" value="externalTrace">External Trace   </input>
				<input data-bind="checked: traceLocation" type="radio" name="range" value="internalTrace">Internal Trace   </input>
			</td>
		</tr>		
		<tr>
			<td class="symbol">Minimum Track Width</td>
			<td>
				<input class="output" data-bind="calcVar: minimumTrackWidth, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td>
				<select data-bind="options: minimumTrackWidth.units, optionsText: 'name', value: minimumTrackWidth.selUnit"></select>
			</td>
		</tr>	
	</tbody>
</table>
<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	// Output HTML
	echo '<script type="text/javascript" src="/lib/eng-calcs-js/pcb-track-width/pcb-track-width.js"></script>';
?>

<!--
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
-->

