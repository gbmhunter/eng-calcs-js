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
<script type="text/javascript" src="/candy-calc/js/candy-calc-v2.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/candy-calc/css/candy-calc.css" />



 
<p>This calculator finds a standard resistance value(s) that will best match the resistance \(R_{desired}\) you specify.</p>
<table id="ohmsLaw" class="candy-calc" border="4" style="width: 500px;">
	<tbody>
		<tr>
			<td><strong>Variable:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
		</tr>
		<tr>
			<td class="symbol">\(V\)</td>
			<td>
				<input class="input" data-bind="value: voltage" ></input>
			</td>		
		</tr>		
		<tr>
			<td colspan="3" style="text-align: center;">
				<input data-bind="checked: calcWhat" type="radio" name="range" value="voltage">Voltage</input>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="current">Current</input>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="resistance">Resistance</input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\(I\)</td>
			<td>
				<input class="input" data-bind="value: current" ></input>
			</td>		
			<td>
				<!--<select data-bind="options: current.units, optionsText: 'name', value: current.selUnit"></select>-->
			</td>
		</tr>
		<tr>
			<td class="symbol">\(R\)</td>
			<td>
				<input class="input" data-bind="value: resistance" ></input>
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
	echo '<script type="text/javascript" src="' . $cur_file . '\ohms-law.js"></script>';
?>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>


