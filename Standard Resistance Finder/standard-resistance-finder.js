//
// @file 		standard-resistance-finder.c
// @author 		Geoffrey Hunter <gbmhunter@gmail.com> (www.cladlabs.com)
// @edited 		n/a
// @date 		2013/09/17
// @brief 		Given an input resistance, finds the closest resistance in a specified series.
// @details
//				See the README in the root dir for more info.

// E12 resistance array
var e12 = new Array(1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2); 

// E24 resistance array
var e24 = new Array(1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1);

// Get a variable for jQuery
var j = jQuery.noConflict();

// Debug flag. Set to true to print debug information, otherwise false.
var DEBUG = true;

// Start-up function
j(document).ready(
	function StartUp()
	{
	   // Pre-select the bottom option

		// Add event handlers	
		document.getElementById('tbDesiredRes').addEventListener('keyup',
			function(){ 
				Calculate();
			},
			false);
		document.getElementById('cbDesiredResUnits').addEventListener('onchange',
			function(){ 
				Calculate();
			},
			false);
		document.getElementById('rbE12').addEventListener('click',
			function(){ 
				Calculate();
			},
			false);
		document.getElementById('rbE24').addEventListener(
			'click',
			function(){
				Calculate();
			},
			false);
		document.getElementById('rbE48').addEventListener(
			'click',
			function(){
				Calculate();
			},
			false);
		document.getElementById('rbE96').addEventListener(
			'click',
			function(){
				Calculate();
			},
			false);
		document.getElementById('rbE192').addEventListener(
			'click',
			function(){
				Calculate();
			},
			false);					
	}
);

function Calculate()    
{
	Log('Calculating...');
	
   // Get desired resistance  
   var desRes = parseFloat(formSrc.tbDesiredRes.value)*parseFloat(formSrc.cbDesiredResUnits.value);
 
	var selectedRange = new Array();
 
   // Find out what resistance series was selected
   if(formSrc.rbE12.checked == true)     
   {
		Log('E12 range selected.');
		selectedRange = e12;
   }
   else if(formSrc.rbE24.checked == true)
   {
		Log('E24 range selected.');
		selectedRange = e24;
   }
   else if(formSrc.rbE48.checked == true)
   {
		Log('E48 range selected.');
		selectedRange = BuildResArray(48);
   }
   else if(formSrc.rbE96.checked == true)
   {
		Log('E96 range selected.');
		selectedRange = BuildResArray(96);
   }
   else if(formSrc.rbE192.checked == true)
   {
		Log('E192 range selected.');
		selectedRange = BuildResArray(192);
   }
   
	var order = FindOrder(desRes);
	var scaledDesRes = ScaleWrtOrder(desRes, order);
	Log('Scaled resistance = ' + scaledDesRes);
	var closestMatch = FindClosestMatch(scaledDesRes, selectedRange);
	Log(closestMatch);
	formSrc.tbActualRes.value = closestMatch.val*Math.pow(10, order);
	formSrc.tbDiff.value = Math.round(closestMatch.diff*100)/100;
}

function BuildResArray(numElements)
{
	array = new Array();
	// Generate array elements
	for(i = 0; i < numElements; i++)
	{
		array[i] = (Math.pow(10, i/numElements)).toFixed(2);
	}
	return array;
}

// Finds the order of magnitude of a given input variable
// if var in range 1-10, order = 0, if var in range 10-100, order = 1, e.t.c
function FindOrder(desRes)
{
	Log('Desired resistance = ' + desRes);
	// Find the order of magnitude by using log()
	// (e.g. 1 = between 1-10, 2 = between 10-100, 3 - between 100-1000, e.t.c)
	var order = Log10(desRes);
	Log('Order of magnitude = ' + order);
	order = Math.floor(order);
	Log('Floored order of magnitude = ' + order);
	
	return order;
}

function ScaleWrtOrder(desRes, order)
{
	// Scale value so it is between 1-10
	return desRes/Math.pow(10, order);
}

// Function calculates the base-10 log of the given input
function Log10(val)
{
	// Use rule log10(x) = ln(x)/ln(10)
	return Math.log(val) / Math.LN10;
}

// Finds the closest array entry to the provided value
// For computational efficiency, this function
// assumes array values are sorted from smallest to highest
function FindClosestMatch(val, array)
{
	var i = 0;
	while(val > array[i])
	{
		i++;
	} 
	Log('Stopped when i = ' + i);
	Log('Closest lower value = ' + array[i-1]);
	Log('Closest higher value = ' + array[i]);
	
	var lowerPercDiff = ((val - array[i-1])/array[i-1])*100.0;
	Log('Lower percentage diff = ' + lowerPercDiff);
	var higherPercDiff = ((val - array[i])/array[i])*100.0;
	Log('Higher percentage diff = ' + higherPercDiff);
	
	if(Math.abs(lowerPercDiff) < Math.abs(higherPercDiff))
		return {
			val: array[i-1],
			diff: lowerPercDiff
		};
	else
		return {
			val: array[i],
			diff: higherPercDiff
		};
}

// Logs error messages
function Log(msg)
{
	// Only print if DEBUG variable has been set to true
	if(DEBUG == true)
		console.log(msg);
}