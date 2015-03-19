<!--
//! @file 			capacitor-charge.php
//! @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.mbedded.ninja)
//! @edited 		n/a
//! @date 			2013-11-28
//! @last-modified	2015-03-18
//! @brief 		
//! @details
//		See the README in the root dir for more info.
-->

<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>
	
<!-- candy-calc logic -->
<script type="text/javascript" src="/lib/candy-calc/js/candy-calc.js" ></script>
<!-- candy-calc CSS file -->
<link type="text/css" rel="stylesheet" href="/lib/candy-calc/css/candy-calc.css" />

<p>The following calculator works out either \(Q\), \(C\), or \(V\), given the other two parameters, using the capacitor charge equation:</p>
<p style="text-align: center;">
	\(Q=CV\)<br>
	where: <br>
	\(Q\) = charge <br>
	\(C\) = capacitance <br>
	\(V\) = voltage
</p>

<table id="capacitorCharge" class="candy-calc" border="4" style="width: 600px;">
	<tbody>
		<tr>
			<td><strong>Variable:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
			<td><strong>Calculate What?</strong></td>
			<td><strong>Variable Diagram:</strong></td>
		</tr>
		<tr>
			<td class="symbol">\(Q\)</td>
			<td>
				<input class="input" data-bind="calcVar: charge, valueUpdate: 'afterkeydown'" ></input>
			</td>		
			<td>
				<select data-bind="options: charge.units, optionsText: 'name', value: charge.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="charge"></input>
			</td>
			<td rowspan="4">
				<?php
					echo '<img src="/lib/eng-calcs-js/capacitor-charge/capactior-charge-calculator-variable-diagram.png" width="200" height="150" />';
				?>				
			</td>
		</tr>				
		<tr>
			<td class="symbol">\(C\)</td>
			<td>
				<input class="input" data-bind="calcVar: capacitance, valueUpdate: 'afterkeydown'" ></input>
			</td>		
			<td>
				<select data-bind="options: capacitance.units, optionsText: 'name', value: capacitance.selUnit"></select>
			</td>
			<td>
				<input data-bind="checked: calcWhat" type="radio" name="range" value="capacitance"></input>
			</td>
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
	// Output HTML
	echo '<script type="text/javascript" src="/lib/eng-calcs-js/capacitor-charge/capacitor-charge.js"></script>';
?>
