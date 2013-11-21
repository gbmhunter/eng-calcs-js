<!--
// @file 		standard-resistance-finder.php
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/09/17
// @brief 		Given an input resistance, finds the closest resistance in a specified series.
// @details
//				See the README in the root dir for more info.
-->

<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>
	
<!-- candy-calc logic -->
<script type="text/javascript" src="/candy-calc/js/candy-calc.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/candy-calc/css/candy-calc.css" />

<p>This calculator finds a standard resistance value(s) that will best match the resistance \(R_{desired}\) you specify.</p>
<table class="candy-calc" data-bind="with: standardResistanceFinder" border="4" style="width: 500px;">
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
				<input data-bind="checked: series" type="radio" name="range" value="e12">E12</input>
				<input data-bind="checked: series" type="radio" name="range" value="e24">E24</input>
				<input data-bind="checked: series" type="radio" name="range" value="e48">E48</input>
				<input data-bind="checked: series" type="radio" name="range" value="e96">E96</input>
				<input data-bind="checked: series" type="radio" name="range" value="e192">E192</input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\(R_{actual}\)</td>
			<td>
				<input class="output" data-bind="calcVar: actualRes, valueUpdate: 'afterkeydown'" type="text" size="16" />
			</td>
			<td>
				<select data-bind="options: actualRes.units, optionsText: 'name', value: desiredRes.selUnit"></select>
			</td>
		</tr>
		<tr>
			<td class="symbol">\(\%_{diff}\)</td>
			<td>
				<input class="output" data-bind="calcVar: percDiff, valueUpdate: 'afterkeydown'" type="text" size="16" disabled="true"/>
			</td>
		<tr>
	</tbody>
</table>
<!-- Include Javascript file for calculator. Path is built from this scripts path, using __FILE__ variable. -->
<?php
	// Get full path
	$cur_file = str_replace('\\','/', realpath(dirname(__FILE__)));
	// Remove everything up to public_html (Apache) or htdocs (xampp)
	$cur_file = preg_replace('/(.*?)\/public_html/', '', $cur_file);
	$cur_file = preg_replace('/(.*?)\/htdocs/', '', $cur_file);
	// Output HTML
	echo '<script type="text/javascript" src="' . $cur_file . '\standard-resistance-finder.js"></script>';
?>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>


