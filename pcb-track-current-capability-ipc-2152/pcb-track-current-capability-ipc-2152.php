<!--
// @file 			pcb-track-current-capability-ipc-2152.php
// @author 			Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 			n/a
// @date 			2015-06-20
// @last-modified	2015-06-20
// @brief 			This calculator can find the minimum allowed PCB track width for a given continuous current. Takes into account the allowed temperature rise, copper track thickness, proximity to planes, total thickness of the PCB, and PCB material in accordance with IPC-2152.
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

	<p>This calculator can find the minimum allowed PCB track width for a given continuous current. Takes into account the allowed temperature rise, copper track thickness, proximity to planes, total thickness of the PCB, and PCB material in accordance with IPC-2152.</p>

	<p>The current in assumed to be constant (DC). However, you can use the RMS value for a pulsed current as long as the pulses are fast enough.</p>

	<p>The temperature of the PCB material should NEVER exceed the relative thermal index (RTI) of the material. This is defined in UL746B as the temperature at which 50% of the materials properties are retained after 100,000 hours.</p>

	<p>Remember this calculator does not take into account other nearby heat sources.</p>

</article>

<script type="text/javascript">
jQuery(function($) {

        $('article').readmore({maxHeight: 500, speed: 200}); // This function applies good for the first tab, but when navigated to the next tab, the text is not trimmed..

        });
</script>

<table id="pcbTrackWidth" class="candy-calc" border="4" style="width: 800px;">
	<tbody>
		<tr>
			<td class="name">Variable Name</td>
			<td class="symbol">Symbol</td>
			<td>Value</td>
			<td class="units">Units</td>
			<td>Comments</td>	
		</tr>

		<tr>
			<td class="name">Track Current</td>
			<td class="symbol">\( I \)</td>
			<td>
				<input class="input" data-bind="calcVar: current, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td class="units">
				<select data-bind="options: current.units, optionsText: 'name', value: current.selUnit"></select>
			</td>	
			<td>The is the maximum continuous current that the track will ever carry.</td>		
		</tr>

		<tr>
			<td class="name">Temp Rise</td>
			<td class="symbol">\( \Delta T \)</td>
			<td>
				<input class="input" data-bind="calcVar: tempRise, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td class="units">
				<select data-bind="options: tempRise.units, optionsText: 'name', value: tempRise.selUnit"></select>
			</td>		
			<td>The temperature rise (above the ambient temperature of the PCB) of the track that you are o.k. with. Normally between 20-40C.</td>	
		</tr>

		<tr>
			<td class="name">Unadjusted Track Cross-sectional Area</td>
			<td class="symbol">\( A_{un-adjusted} \)</td>
			<td>
				<input class="output" data-bind="calcVar: unadjustedTrackCrosssectionalArea, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: unadjustedTrackCrosssectionalArea.units, optionsText: 'name', value: unadjustedTrackCrosssectionalArea.selUnit"></select>
			</td>
			<td>The un-adjusted track cross-sectional area, as calculated from the "Universal Graph" in IPC-2152, before any modifiers have been applied.</td>
		</tr>	

		<tr>
			<td class="name">Track Thickness</td>
			<td class="symbol">\( t_{track} \)</td>
			<td>
				<input class="input" data-bind="calcVar: trackThickness, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td class="units">
				<select data-bind="options: trackThickness.units, optionsText: 'name', value: trackThickness.selUnit"></select>
			</td>
			<td>The thickness of the track under inspection. This is the same as the thickness or "weight" of the copper layer that the track belongs to.</td>			
		</tr>

		<tr>
			<td class="name">Track Thickness Modifier</td>
			<td class="symbol">\( k_{track-thickness} \)</td>
			<td>
				<input class="output" data-bind="calcVar: trackThicknessModifier, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: trackThicknessModifier.units, optionsText: 'name', value: trackThicknessModifier.selUnit"></select>
			</td>
			<td>The amount the un-adjusted track cross-sectional area should be modified due to the track thickness.</td>
		</tr>

		<tr>
			<td class="name">Board Thickness</td>
			<td class="symbol">\( t_{board} \)</td>
			<td>
				<input class="input" data-bind="calcVar: boardThickness, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td class="units">
				<select data-bind="options: boardThickness.units, optionsText: 'name', value: boardThickness.selUnit"></select>
			</td>
			<td>The thickness of the board under inspection. This is the same as the thickness or "weight" of the copper layer that the board belongs to.</td>			
		</tr>

		<tr>
			<td class="name">Board Thickness Modifier</td>
			<td class="symbol">\( k_{board-thickness} \)</td>
			<td>
				<input class="output" data-bind="calcVar: boardThicknessModifier, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: boardThicknessModifier.units, optionsText: 'name', value: boardThicknessModifier.selUnit"></select>
			</td>
			<td>The amount the un-adjusted board cross-sectional area should be modified due to the board thickness.</td>
		</tr>

		<tr>
			<td class="name">Plane Proximity</td>
			<td class="symbol">\( d_{plane} \)</td>
			<td>
				<input class="input" data-bind="calcVar: planeProximity, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td class="units">
				<select data-bind="options: planeProximity.units, optionsText: 'name', value: planeProximity.selUnit"></select>
			</td>
			<td>The distance from the track to the closest copper plane. If the track is internal and equi-distance from two planes, just use the distance to one of them. For a basic 2-layer, 1.6mm thick PCB, the distance is normally equal to 1.6mm (assuming copper pours are placed on both layers).</td>			
		</tr>

		<tr>
			<td class="name">Plane Proximity Modifier</td>
			<td class="symbol">\( k_{plane-proximity} \)</td>
			<td>
				<input class="output" data-bind="calcVar: planeProximityModifier, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: planeProximityModifier.units, optionsText: 'name', value: planeProximityModifier.selUnit"></select>
			</td>
			<td>The amount the un-adjusted board cross-sectional area should be modified due to the proximity of a solid copper plane.</td>
		</tr>

		<tr>
			<td class="name">Thermal Conductivity</td>
			<td class="symbol">\( \kappa \)</td>
			<td>
				<input class="input" data-bind="calcVar: thermalConductivity, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td class="units">
				<select data-bind="options: thermalConductivity.units, optionsText: 'name', value: thermalConductivity.selUnit"></select>
			</td>
			<td>The thermal conductivity of the PCB.</td>			
		</tr>

		<tr>
			<td class="name">Thermal Conductivity Modifier</td>
			<td class="symbol">\( k_{thermal-conductivity} \)</td>
			<td>
				<input class="output" data-bind="calcVar: thermalConductivityModifier, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: thermalConductivityModifier.units, optionsText: 'name', value: thermalConductivityModifier.selUnit"></select>
			</td>
			<td>The amount the un-adjusted board cross-sectional area should be modified due to the thermal conductivity of the PCB material.</td>
		</tr>

		<tr>
			<td class="name">Adjusted Track Cross-sectional Area</td>
			<td class="symbol">\( A_{adjusted} \)</td>
			<td>
				<input class="output" data-bind="calcVar: adjustedTrackCrosssectionalArea, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: adjustedTrackCrosssectionalArea.units, optionsText: 'name', value: adjustedTrackCrosssectionalArea.selUnit"></select>
			</td>
			<td>
				<p>The adjusted track cross-sectional area. This uses the un-adjusted track cross-sectional area, then takes into account the track thickness modifier, the board thickness modifier, the plane proximity modifier, and the thermal conductivity modifier.<br></p>
				<p>The equation is given by:</p>
				<p>$$ A_{adjusted} = A_{un-adjusted} * k_{track-thickness} * k_{board-thickness} * \\ k_{plane-proximity} * k_{thermal-conductivity} $$</p>

			</td>
		</tr>

		<tr>
			<td class="name">Minimum Track Width</td>
			<td class="symbol">\( w_{min} \)</td>
			<td>
				<input class="output" data-bind="calcVar: minimumTrackWidth, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td class="units">
				<select data-bind="options: minimumTrackWidth.units, optionsText: 'name', value: minimumTrackWidth.selUnit"></select>
			</td>
			<td>The minimum track width required to carry the specified current without exceeding the specified increase in temperature.</td>
		</tr>	

	</tbody>
</table>
<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	// Output HTML
	echo '<script type="text/javascript" src="/lib/eng-calcs-js/pcb-track-current-capability-ipc-2152/pcb-track-current-capability-ipc-2152.js"></script>';
?>

<!--
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
-->

