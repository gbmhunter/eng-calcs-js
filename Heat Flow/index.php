<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<p>[latexpage]</p>
<p>The calculator works out either $P_D$, $\Delta T$, or $R_{\theta}$, given the other two parameters, using the heat flow equation:</p>
<p style="text-align: center;">$P_D = \frac{\Delta T}{R_{\theta}}$</p>
<p style="text-align: center;">where:<br />
$P_D$ = dissipated power (Watts)<br />
$\Delta T$ = temperature drop (degrees Celcius)<br />
	$R_{\theta}$ = thermal resistance (degrees Celcius/Watt)</p>
<form name="hfc">
<table id="mainTable" style="margin-left: auto; margin-right: auto;" border="4">
<tbody>
<tr>
<td><strong>Variables:</strong></td>
<td><strong>Values:</strong></td>
<td><strong>Units:</strong></td>
<td><strong>Calculate What?</strong></td>
<td><strong>Variable Diagram:</strong></td>
</tr>
<tr>
	<td style="text-align: center;">$P_D$</td>
	<td><input id="tbVar1" type="text" size="16" /></td>
	<td>
	<select id="cbVar1">
	<option value="0.001">mW</option>
	<option selected="selected" value="1.0">W</option>
	<option value="1000.0">kW</option>
	</select>
	</td>
	<td style="text-align: center;"><input id="rbVar1" type="radio" name="input" /></td>
	<td rowspan="4">[singlepic id=1147 w=300 h=150 float=right]</td>
</tr>
<tr>
	<td colspan="2" style="text-align: center;">Num. Thermal Components

		<input id="addOne" type="button" value="+">

		<input id="removeOne" type="button" value="-">
	</td>
</tr>
<tr>
<tr>
	<td>$\Delta T$</td>
	<td style="text-align: center;"><input id="rbVar2" type="radio" name="input" /></td>
	<td style="text-align: center;">$R_{\theta}$</td>
	<td style="text-align: center;"><input id="rbVar3" type="radio" name="input" /></td>
<tr>
	<td><input id="tbVar2" type="text" size="16" /></td>
	<td>
		<select id="cbVar2">
			<option selected="selected" value="1">°C</option>
		</select>
	</td>
	<td><input id="tbVar3" type="text" size="16" /></td>
	<td>
		<select id="cbVar3">
			<option value="0.001">mO</option>
			<option selected="selected" value="1.0">O</option>
			<option value="1000.0">kO</option>
		</select>
	</td>
</tr>
<tr>
<td></td>
<td style="text-align: center;"><input onclick="ClearValues()" type="button" value="Clear Values" /></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
</form>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
var j = jQuery.noConflict();
// Get the right form
var calcForm = document.forms.hfc
// Array for holding thermal components
var thermalCompA = new Array();
var FIRST_THERMAL_ROW = 5;
var numThermComp = 1;
// Start-up function
j(document).ready(
function StartUp()
{
   // Pre-select the bottom option
	calcForm.rbVar3.checked = true;
	DisableInput(calcForm.tbVar3);
	// Add event handlers	
	document.getElementById('tbVar1').addEventListener('keyup',
		function(){ 
			Calculate();
		},
		false);
	document.getElementById('tbVar2').addEventListener('keyup',
		function(){ 
			Calculate();
		},
		false);
	document.getElementById('tbVar3').addEventListener('keyup',
		function(){ 
			Calculate();
		},
		false);
	document.getElementById('cbVar1').addEventListener('onchange',
		function(){ 
			Calculate();
		},
		false);
	document.getElementById('cbVar2').addEventListener('onchange',
		function(){ 
			Calculate();
		},
		false);
	document.getElementById('cbVar3').addEventListener('onchange',
		function(){ 
			Calculate();
		},
		false);
	document.getElementById('rbVar1').addEventListener('click',
		function(){ 
			DisableInput(document.getElementById('tbVar1')); 
			EnableInput(document.getElementById('tbVar2')); 
			EnableInput(document.getElementById('tbVar3')); 
			Calculate();
		},
		false);
	document.getElementById('rbVar2').addEventListener(
		'click',
		function(){
			DisableInput(document.getElementById('tbVar2')); 
			EnableInput(document.getElementById('tbVar1')); 
			EnableInput(document.getElementById('tbVar3')); 
			Calculate();
		},
		false);
	document.getElementById('rbVar3').addEventListener(
		'click',
		function(){
			DisableInput(document.getElementById('tbVar3')); 
			EnableInput(document.getElementById('tbVar1')); 
			EnableInput(document.getElementById('tbVar2')); 
			Calculate();
		},
		false);
	// Add/remove thermal components
	document.getElementById('addOne').addEventListener(
		'click',
		function(){
			AddRow();
		},
		false);
	document.getElementById('removeOne').addEventListener(
		'click',
		function(){
			RemoveRow();
		},
		false);
	// Add first thermal component row to array
	thermalCompA[0] = document.getElementById('mainTable').rows[4];
	calcForm.style.position= 'relative'; 
	calcForm.style.left = '0px'; 
	//moveRight();
}
);
// Works for both forms
function DisableInput(object)
{
	object.disabled = true;    
	ColourDisInput(object); 
}
function EnableInput(object)
{
	object.disabled = false;    
	ColourActInput(object); 
}
function StartUp()
{
   // LprccColourDisInput(document.getElementById("iqTextBox"));
}
function ColourDisInput(input)
{
   input.style.color = "white";   
   input.style.background = "grey";   
}
function ColourActInput(input)
{
   input.style.color = "black";   
   input.style.background = "white";   
} 
function Calculate()    
{
   // PART 1
	// P = T/R   
   var power = parseFloat(calcForm.tbVar1.value)*parseFloat(calcForm.cbVar1.value);
   var temp = parseFloat(calcForm.tbVar2.value)*parseFloat(calcForm.cbVar2.value);
   var res = parseFloat(calcForm.tbVar3.value)*parseFloat(calcForm.cbVar3.value);
   // power
   if(calcForm.tbVar1.disabled == true)     
   {
	   calcForm.tbVar1.value = (temp/res)/calcForm.cbVar1.value;      
   }
   // temp
   if(calcForm.tbVar2.disabled == true)       
   {          
	   calcForm.tbVar2.value = (power*res)/calcForm.cbVar2.value;       
   }      
   // res 
   if(calcForm.tbVar3.disabled == true)       
   {         
	   calcForm.tbVar3.value = (temp/power)/calcForm.cbVar3.value;      
   }    
}
// Clears values from the first form
function ClearValues()
{
   for(i=0; i<calcForm.elements.length; i++)   
   {
      var formObj = calcForm.elements[i];
      // // Check to see if it is a text box
      if(formObj.type == "text")
      {
          formObj.value = "";
      }
   }
   // When clearing values from the first form, the second form has to be recalculated
   // since it is dependant
   Calculate();
   AddRow();
}
// Animation stuff
function moveRight(){
   calcForm.style.left = parseInt(calcForm.style.left) + 10 + 'px';
   animate = setTimeout(moveRight,20); // call moveRight in 20msec
}
// Adds new row to the main table (and fills with cells)
function AddRow()
{
	var newRow = document.getElementById('mainTable').insertRow(FIRST_THERMAL_ROW + numThermComp);
	for(var i = 0; i <  mainTable.rows[0].cells.length; i++)
	{
		var newCell = newRow.insertCell(i);
		newCell.innerHtml = "ab";
	}
	// Increment counter
	numThermComp++;
}
// Adds new row to the main table (and fills with cells)
function RemoveRow()
{
	// Only allow remove if there is more than one row left
	if(numThermComp > 1)
	{
		document.getElementById('mainTable').deleteRow(FIRST_THERMAL_ROW + numThermComp - 1);
		// Decrement counter
		numThermComp--;
	}
}
</script></p>
