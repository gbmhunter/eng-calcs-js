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
			<td id="td1"><strong>Variables:</strong></td>
			<td><strong>Values:</strong></td>
			<td><strong>Units:</strong></td>
			<td><strong>Calculate What?</strong></td>
			<td><strong>Variable Diagram:</strong></td>
		</tr>
		<tr>
			<td style="text-align: center;">$P_D$</td>
			<td>
				<input id="tbVar1" type="text" size="16" />
			</td>
			<td>
				<select id="cbVar1">
					<option value="0.001">mW</option>
					<option selected="selected" value="1.0">W</option>
					<option value="1000.0">kW</option>
				</select>
			</td>
			<td style="text-align: center;">
				<input id="rbVar1" type="radio" name="input" />
			</td>
			<td rowspan="4">[singlepic id=1147 w=300 h=150 float=right]</td>
		</tr>
		<tr>
			<td colspan="2" style="text-align: center;">Num. Thermal Components
				<input id="addOne" type="button" value="+" />
				<input id="removeOne" type="button" value="-" />
			</td>
		</tr>
		<tr>
			<td>$\Delta T$</td>
			<td style="text-align: center;">
				<input id="rbVar2" type="radio" name="input" />
			</td>
			<td style="text-align: center;">$R_{\theta}$</td>
			<td style="text-align: center;">
				<input id="rbVar3" type="radio" name="input" />
			</td>
		</tr>
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
			<td style="text-align: center;">
				<input onclick="ClearValues()" type="button" value="Clear Values" />
			</td>
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
var thermCompA = new Array();
// Array of thermal resistance cells
var thermResA = new Array();
// Array of temp change cells
var tempChangeA = new Array();
// Count from 0
var FIRST_THERMAL_ROW = 4;
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
			EnableInputs(thermResA); 
			EnableInputs(tempChangeA); 
			Calculate();
		},
		false);
	document.getElementById('rbVar2').addEventListener(
		'click',
		function(){
			DisableInputs(thermResA); 
			EnableInput(document.getElementById('tbVar1')); 
			EnableInputs(tempChangeA); 
			Calculate();
		},
		false);
	document.getElementById('rbVar3').addEventListener(
		'click',
		function(){
			DisableInputs(tempChangeA); 
			EnableInput(document.getElementById('tbVar1')); 
			EnableInputs(thermResA); 
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
	thermCompA[0] = document.getElementById('mainTable').rows[FIRST_THERMAL_ROW];
	// Add thermal resistance cell to array
	thermResA[0] = document.getElementById('mainTable').rows[FIRST_THERMAL_ROW].cells[0];
	tempChangeA[0] = document.getElementById('mainTable').rows[FIRST_THERMAL_ROW].cells[2];
	
	calcForm.style.position= 'relative'; 
	calcForm.style.left = '0px'; 
	//moveRight();
}
);

function EnableInput(object)
{
	object.disabled = false;    
	ColourActInput(object); 
}

// Expects an array
function EnableInputs(object)
{
	console.log('Enabling inputs...');
	for(var x = 0; x < object.length; x++)
	{
		object[x].childNodes[0].disabled = false;    
		ColourActInput(object[x].childNodes[0]); 
	}
}

// Works for both forms
function DisableInput(object)
{
	object.disabled = true;    
	ColourDisInput(object); 
}

// Expects an array
function DisableInputs(object)
{
	console.log('Disabling inputs...');
	for(var x = 0; x < object.length; x++)
	{
		object[x].childNodes[0].disabled = true;    
		ColourDisInput(object[x].childNodes[0]); 
	}
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
	console.log('Calculating...');
   // PART 1
	// P = T/R   
   var power = parseFloat(calcForm.tbVar1.value)*parseFloat(calcForm.cbVar1.value);
   //var res = parseFloat(calcForm.tbVar2.value)*parseFloat(calcForm.cbVar2.value);
   //var temp = parseFloat(calcForm.tbVar3.value)*parseFloat(calcForm.cbVar3.value);
 
   // power
   if(calcForm.rbVar1.checked == true)     
   {
		console.log('Var 1 selected.');
		
		// Calc res and temp totals
		
		var thermResTotal = 0.0;
		for(var x = 0; x < thermResA.length; x++)
		{
			console.log(thermResA[x].childNodes[0]);
			thermResTotal += parseFloat(thermResA[x].childNodes[0].value);
		}
		
		// Only displays total if more than 1 thermal component
		if(numThermComp >= 2)
		{
			document.getElementById('tbThermResTotal').innerHTML = thermResTotal;
		}
		console.log('Therm res total = ' + thermResTotal);
		
		var tempChangeTotal = 0.0;
		for(var x = 0; x < tempChangeA.length; x++)
		{
			console.log(tempChangeA[x].childNodes[0]);
			tempChangeTotal += parseFloat(tempChangeA[x].childNodes[0].value);
		}
		
		// Only displays total if more than 1 thermal component
		if(numThermComp >= 2)
		{
			document.getElementById('tbTempChangeTotal').innerHTML = tempChangeTotal;
		}
		console.log('Temp change total = ' + tempChangeTotal);
		
		// Calculate power
		calcForm.tbVar1.value = (tempChangeTotal/thermResTotal)/calcForm.cbVar1.value;      
   }
    // temp
    if(calcForm.rbVar2.checked == true)       
	{    
		console.log('Var 2 selected.');
		
		var tempChangeTotal = 0.0;
		for(var x = 0; x < tempChangeA.length; x++)
		{
			tempChangeTotal += parseFloat(tempChangeA[x].childNodes[0].value);
		}
		
		// Only displays total if more than 1 thermal component
		if(numThermComp >= 2)
		{
			document.getElementById('tbTempChangeTotal').innerHTML = tempChangeTotal;
		}
		console.log('Temp change total = ' + tempChangeTotal);
		
		document.getElementById('tbThermResTotal').innerHTML = (tempChangeTotal/power)/calcForm.cbVar2.value;     
    } 
	
    // res 
    if(calcForm.rbVar3.checked == true)       
    {   
		console.log('Var 3 selected.');
		
		// Calc res total
		
		var thermResTotal = 0.0;
		for(var x = 0; x < thermResA.length; x++)
		{
			console.log(thermResA[x].childNodes[0]);
			thermResTotal += parseFloat(thermResA[x].childNodes[0].value);
		}
		
		// Only displays total if more than 1 thermal component
		if(numThermComp >= 2)
		{
			document.getElementById('tbThermResTotal').innerHTML = thermResTotal;
		}
		console.log('Therm res total = ' + thermResTotal);
		
		document.getElementById('tbTempChangeTotal').innerHTML = (power*thermResTotal)/calcForm.cbVar3.value;      
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
	var mainTable = document.getElementById('mainTable');
	//var newRow = document.getElementById('mainTable').insertRow(FIRST_THERMAL_ROW + numThermComp);
	
	// Get tbody (parent of rows), so that we can insert rows using insertBefore().
	var tBody = mainTable.children[0];
	
	// Increment counter
	numThermComp++;
	
	// Create new row, and save in array
	thermCompA[numThermComp - 1] = mainTable.rows[FIRST_THERMAL_ROW + numThermComp - 2].cloneNode(true);
	thermCompA[numThermComp - 1].cells[1].innerHTML = "";
	thermCompA[numThermComp - 1].cells[3].innerHTML = "";
	
	// Add thermal resistance cell to array
	thermResA[numThermComp - 1] = thermCompA[numThermComp - 1].cells[0];
	tempChangeA[numThermComp - 1] = thermCompA[numThermComp - 1].cells[2];
	
	// Insert row into table
	tBody.insertBefore(
		thermCompA[numThermComp - 1],
		mainTable.rows[FIRST_THERMAL_ROW + numThermComp - 1]);
		
	if(numThermComp == 2)
	{
		var totalRow = mainTable.insertRow(FIRST_THERMAL_ROW + numThermComp);
		var cell1 = totalRow.insertCell(0);
		cell1.id = 'tbThermResTotal';
		var cell2 = totalRow.insertCell(1);
		var newText  = document.createTextNode('Totals')
		cell2.appendChild(newText);
		var cell3 = totalRow.insertCell(2);
		cell3.id = 'tbTempChangeTotal';
	}
	
}
// Adds new row to the main table (and fills with cells)
function RemoveRow()
{
	// Remove the TOTAL row if going from 2 to 1 row
	if(numThermComp == 2)
	{
		mainTable.deleteRow(FIRST_THERMAL_ROW + numThermComp);
	}

	// Only allow remove if there is more than one row left
	if(numThermComp > 1)
	{
		document.getElementById('mainTable').deleteRow(FIRST_THERMAL_ROW + numThermComp - 1);
		// Decrement counter
		numThermComp--;
	}
}
</script></p>
