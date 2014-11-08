<!--
//!
//! @file 			ohms-law.php
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
//! @edited 		n/a
//! @date 			2013-11-23
//! @last-modified	2014-11-08
//! @brief 			Ohms law calculator.
//! @details
//!		See the README in the repo's root dir for more info.
-->

<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>
	
<!-- candy-calc logic -->
<script type="text/javascript" src="/candy-calc/js/candy-calc.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/candy-calc/css/candy-calc.css" />

<p>The following calculator works out either voltage, current or resistance, given the other two parameters, using the equation:</p>
<p style="text-align: center;">
	\( V = IR \) <br>
	where: <br>
	\( V \) = voltage across the resistor <br>
	\( I \) = current through the resistor <br>
	\( R \) = resistance of the resistor
</p>
<table id="ohmsLaw" class="candy-calc" border="4" style="width: 600px;">
	<tbody>
		<tr>
			<td><strong>Variable:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
			<td><strong>Calculate What?</strong></td>
			<td><strong>Variable Diagram:</strong></td>
		</tr>
		<tr>
			<td class="symbol">\(V\)</td>
			<td>
				<input class="input" data-bind="calcVar: voltage, valueUpdate: 'afterkeydown'" ></input>
			</td>		
			<td>
				<select data-bind="options: voltage.units, optionsText: 'name', value: voltage.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="voltage"></input>
			</td>
			<td rowspan="4">
				<?php
					// Get full path
					$cur_file = str_replace('\\','/', realpath(dirname(__FILE__)));
					// Remove everything up to public_html (Apache) or htdocs (xampp)
					$cur_file = preg_replace('/(.*?)\/public_html/', '', $cur_file);
					$cur_file = preg_replace('/(.*?)\/htdocs/', '', $cur_file);
					// Output HTML
					echo '<img src="' . $cur_file . '/ohms-law-variable-diagram.png" alt="ohms-law-variable-diagram" title="ohms-law-variable-diagram" width="300" />';
				?>
				
			</td>
		</tr>				
		<tr>
			<td class="symbol">\(I\)</td>
			<td>
				<input class="input" data-bind="calcVar: current, valueUpdate: 'afterkeydown'" ></input>
			</td>		
			<td>
				<select data-bind="options: current.units, optionsText: 'name', value: current.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="current"></input>
			</td>
		</tr>
		<tr>
			<td class="symbol">\(R\)</td>
			<td>
				<input class="input" data-bind="calcVar: resistance, valueUpdate: 'afterkeydown'" ></input>
			</td>	
			<td>
				<select data-bind="options: resistance.units, optionsText: 'name', value: resistance.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="resistance"></input>
			</td>
		</tr>
		<tr>
			<td></td>
			<td>
				<input type="button" value="Clear Values"/>
			</td>
			<td></td>
			<td></td>
		</tr>
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


