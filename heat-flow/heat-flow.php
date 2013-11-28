<script type="text/javascript">
	window.jQuery || document.write('<script src="http://code.jquery.com/jquery-latest.min.js"><\/script>')
</script>

<script type="text/javascript"
  src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

<p>The calculator works out either \(P_D\), \(\Delta T\), or \(R_{\theta}\), given the other two parameters, using the heat flow equation:</p>
<p style="text-align: center;">$$P_D = \frac{\Delta T}{R_{\theta}}$$</p>
<p style="text-align: center;">
	where:<br />
	\(P_D\) = dissipated power (Watts)<br />
	\(\Delta T\) = temperature drop (degrees Celcius)<br />
	\(R_{\theta}\) = thermal resistance (degrees Celcius/Watt)
</p>
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
			<td style="text-align: center;">\(P_D\)</td>
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
			<td rowspan="20">
				<?php
					// Get full path
					$cur_file = str_replace('\\','/', realpath(dirname(__FILE__)));
					// Remove everything up to public_html (Apache) or htdocs (xampp)
					$cur_file = preg_replace('/(.*?)\/public_html/', '', $cur_file);
					$cur_file = preg_replace('/(.*?)\/htdocs/', '', $cur_file);
					// Output HTML
					echo '<img src="' . $cur_file . '/three-thermal-resistance-diagram-with-power-and-temp.png" width="150" height="200" />';
				?>
			</td>
		</tr>
		<tr>
			<td colspan="4" style="text-align: center;">Num. Thermal Components
				<input id="addOne" type="button" value="+" />
				<input id="removeOne" type="button" value="-" />
			</td>
		</tr>
		<tr>
			<td style="text-align: center;">\(R_{\theta}\)</td>
			<td style="text-align: center;">
				<input id="rbVar2" type="radio" name="input" />
			</td>
			<td style="text-align: center;">\(\Delta T\)</td>
			<td style="text-align: center;">
				<input id="rbVar3" type="radio" name="input" />
			</td>
		</tr>
		<tr>
			<td><input id="tbVar2" type="text" size="16" /></td>
			<td>
				<select id="cbVar2">
					<option selected="selected" value="1">&deg;C</option>
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
				<input id="btClear" type="button" value="Clear Values" />
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
			Calculate();
		},
		false);
	document.getElementById('removeOne').addEventListener(
		'click',
		function(){
			RemoveRow();
			Calculate();
		},
		false);
	document.getElementById('btClear').addEventListener(
		'click',
		function(){
			ClearValues();
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
 
	console.log('Num thermal comp = ' + numThermComp);
	console.log('Num array elements = ' + thermResA.length);
 
   // power
   if(calcForm.rbVar1.checked == true)     
   {
		console.log('Var 1 selected.');
		
		// Calc res and temp totals
		
		var thermResTotal = 0.0;
		for(var x = 0; x < thermResA.length; x++)
		{
			console.log(thermResA[x].childNodes[0]);
			if(thermResA[x].childNodes[0].value != '')
			{
				thermResTotal += parseFloat(thermResA[x].childNodes[0].value);
			}
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
			if(tempChangeA[x].childNodes[0].value != '')
			{
				tempChangeTotal += parseFloat(tempChangeA[x].childNodes[0].value);
			}
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
			if(tempChangeA[x].childNodes[0].value != '')
			{
				tempChangeTotal += parseFloat(tempChangeA[x].childNodes[0].value);
			}
		}
		
		// Only displays total if more than 1 thermal component
		if(numThermComp >= 2)
		{
			document.getElementById('tbTempChangeTotal').innerHTML = tempChangeTotal;
			document.getElementById('tbThermResTotal').innerHTML = (tempChangeTotal/power)/calcForm.cbVar2.value;
		}
		console.log('Temp change total = ' + tempChangeTotal);
		
		// Update individual elements
		for(var x = 0; x < thermResA.length; x++)
		{
			console.log('Therm Res[x] = ' + (tempChangeA[x].childNodes[0].value/power)/calcForm.cbVar2.value);
			thermResA[x].childNodes[0].value = (tempChangeA[x].childNodes[0].value/power)/calcForm.cbVar2.value;
		}
		
    } 
	
    // Temp change
    if(calcForm.rbVar3.checked == true)       
    {   
		console.log('Var 3 selected.');
		
		// Calc res total
		
		var thermResTotal = 0.0;
		for(var x = 0; x < thermResA.length; x++)
		{
			console.log(thermResA[x].childNodes[0]);
			if(thermResA[x].childNodes[0].value != '')
			{
				thermResTotal += parseFloat(thermResA[x].childNodes[0].value);
			}
		}
		
		// Only displays total if more than 1 thermal component
		if(numThermComp >= 2)
		{
			document.getElementById('tbThermResTotal').innerHTML = thermResTotal;
			document.getElementById('tbTempChangeTotal').innerHTML = (power*thermResTotal)/calcForm.cbVar3.value;
		}
		console.log('Therm res total = ' + thermResTotal);
		
		// Update individual elements
		for(var x = 0; x < tempChangeA.length; x++)
		{
			console.log('Temp change[x] = ' + (power*thermResA[x].childNodes[0].value)/calcForm.cbVar3.value);
			tempChangeA[x].childNodes[0].value = (power*thermResA[x].childNodes[0].value)/calcForm.cbVar3.value;
		}
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
	thermCompA[numThermComp - 1].cells[0].childNodes[0].value = 0.0;
	thermCompA[numThermComp - 1].cells[1].innerHTML = "";
	thermCompA[numThermComp - 1].cells[2].childNodes[0].value = 0.0;
	thermCompA[numThermComp - 1].cells[3].innerHTML = "";
	
	// Add thermal resistance cell to array
	thermResA[numThermComp - 1] = thermCompA[numThermComp - 1].cells[0];
	tempChangeA[numThermComp - 1] = thermCompA[numThermComp - 1].cells[2];
	
	
	
	console.log('Test: ' + thermResA[numThermComp - 1].childNodes[0]);
	// Add event listeners
	thermResA[numThermComp - 1].childNodes[0].addEventListener('keyup',
		function(){ 
			Calculate();
		},
		false);
	tempChangeA[numThermComp - 1].childNodes[0].addEventListener('keyup',
		function(){ 
			Calculate();
		},
		false);
	
	// Insert row into table
	tBody.insertBefore(
		thermCompA[numThermComp - 1],
		mainTable.rows[FIRST_THERMAL_ROW + numThermComp - 1]);
		
	if(numThermComp == 2)
	{
		var totalRow = mainTable.insertRow(FIRST_THERMAL_ROW + numThermComp);
		var cell1 = totalRow.insertCell(0);
		cell1.id = 'tbThermResTotal';
		cell1.style.fontWeight = 'bold';
		var cell2 = totalRow.insertCell(1);
		var newText  = document.createTextNode('Totals')
		cell2.appendChild(newText);
		cell2.style.textAlign = 'center';
		cell2.style.fontWeight = 'bold';
		var cell3 = totalRow.insertCell(2);
		cell3.id = 'tbTempChangeTotal';
		cell3.style.fontWeight = 'bold';
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
		thermResA.splice(thermResA.length - 1, 1);
		tempChangeA.splice(tempChangeA.length - 1, 1);
		// Decrement counter
		numThermComp--;
	}
}
</script></p>
