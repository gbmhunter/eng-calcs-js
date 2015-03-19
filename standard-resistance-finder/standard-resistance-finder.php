<!--
// @file 			standard-resistance-finder.php
// @author 			Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
// @edited 			n/a
// @date 			2013-09-17
// @last-modified	2015-03-18
// @brief 			Given an input resistance, finds the closest resistance in a specified series.
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

<p>This calculator finds a standard resistance value \(R_{actual}\) that best matches the desired resistance \(R_{desired}\) and resistance series you specify.</p>
<table id="standardResistanceFinder" class="candy-calc" border="4" style="width: 500px;">
	<tbody>
		<tr>
			<td><strong>Variable:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
		</tr>
		<tr>
			<td class="symbol">\(R_{desired}\)</td>
			<td>
				<input class="input" data-bind="calcVar: desiredRes, valueUpdate: 'afterkeydown'" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: desiredRes.units, optionsText: 'name', value: desiredRes.selUnit"></select>
			</td>			
		</tr>		
		<tr>
			<td colspan="3" style="text-align: center;">
				<input data-bind="checked: series" type="radio" name="range" value="e12">E12 (10%)   </input>
				<input data-bind="checked: series" type="radio" name="range" value="e24">E24 (5%)   </input>
				<input data-bind="checked: series" type="radio" name="range" value="e48">E48 (2%)  </input>
				<input data-bind="checked: series" type="radio" name="range" value="e96">E96 (1%)   </input>
				<input data-bind="checked: series" type="radio" name="range" value="e192">E192 (0.5%)  </input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\(R_{actual}\)</td>
			<td>
				<input class="output" data-bind="calcVar: actualRes, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td>
				<select data-bind="options: actualRes.units, optionsText: 'name', value: actualRes.selUnit"></select>
			</td>
		</tr>
		<tr>
			<td class="symbol">\(\%_{diff}\)</td>
			<td>
				<input class="output" data-bind="calcVar: percDiff, valueUpdate: 'afterkeydown'" type="text" size="16" disabled="true"/>
			</td>
			<td>
				<select data-bind="options: percDiff.units, optionsText: 'name', value: percDiff.selUnit"></select>
			</td>
		<tr>
	</tbody>
</table>

<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	echo '<script type="text/javascript" src="/lib/eng-calcs-js/standard-resistance-finder/standard-resistance-finder.js"></script>';
?>

