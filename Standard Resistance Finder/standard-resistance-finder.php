<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/javascript" src="standard-resistance-finder.js" defer></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min.js"></script>
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
				<input data-bind="value: desiredRes" size="16" ></input>
			</td>
			<td>
				<select data-bind="options: desiredResUnits, optionsText: 'name', value: selectedResUnit"></select>
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
			<td style="text-align: center;">\(R_{actual}\)</td>
			<td>
				<input data-bind="value: actualRes" type="text" size="16" disabled="true" />
			</td>
			<td>
				<select data-bind="options: desiredResUnits, optionsText: 'name', value: selectedResUnit" disabled="true"></select>
			</td>
		</tr>
		<tr>
			<td style="text-align: center;">\(\%_{diff}\)</td>
			<td>
				<input data-bind="value: percDiff" type="text" size="16" disabled="true"/>
			</td>
		<tr>
	</tbody>
</table>
</form>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>


