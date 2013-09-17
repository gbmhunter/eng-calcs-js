<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/javascript" src="standard-resistance-finder.js" defer></script>
<p>This calculator finds a standard resistance value(s) that will best match the resistance \(R_{desired}\) you specify.</p>
<form name="formSrc">
<table id="mainTable" style="margin-left: auto; margin-right: auto;" border="4">
	<tbody>
		<tr>
			<td id="td1"><strong>Variable:</strong></td>
			<td><strong>Value:</strong></td>
			<td><strong>Units:</strong></td>	
		</tr>
		<tr>
			<td style="text-align: center;">\(R_{desired}\)</td>
			<td>
				<input id="tbDesiredRes" type="text" size="16" />
			</td>
			<td>
				<select id="cbDesiredResUnits">
					<option value="0.001">m&#8486;</option>
					<option selected="selected" value="1.0">&#8486;</option>
					<option value="1000.0">k&#8486;</option>
				</select>
			</td>			
		</tr>		
		<tr>
			<td colspan="3" style="text-align: center;">
				<input id="rbE12" type="radio" name="range" checked="true">E12</input>
				<input id="rbE24" type="radio" name="range">E24</input>
				<input id="rbE48" type="radio" name="range">E48</input>
				<input id="rbE96" type="radio" name="range">E96</input>
				<input id="rbE192" type="radio" name="range">E192</input>
			</td>
		</tr>
		<tr>
			<td style="text-align: center;">\(R_{actual}\)</td>
			<td>
				<input id="tbActualRes" type="text" size="16" />
			</td>
			<td>
				<input id="tbActualResUnits" type="text" size="3" />
			</td>
		</tr>
		<tr>
			<td style="text-align: center;">\(\%_{diff}\)</td>
			<td>
				<input id="tbDiff" type="text" size="16" />
			</td>
		<tr>
	</tbody>
</table>
</form>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>


