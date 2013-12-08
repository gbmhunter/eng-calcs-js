==============================================================
Engineering Calculators Written In Javascript
==============================================================

- Author: gbmhunter <gbmhunter@gmail.com> (http://www.cladlab.com)
- Created: 2013/06/06
- Last Modified: 2013/12/08
- Version: v6.1.0.0
- Company: CladLabs
- Project: Free Code Libraries	.
- Language: HTML/JS/PHP
- Compiler: n/a
- uC Model: n/a
- Computer Architecture: n/a
- Operating System: n/a
- Documentation Format: Doxygen
- License: GPLv3

Description
===========

Contains engineering calculators designed to be viewed with a browser.

Heat Flow Calculator
--------------------

Calculates power dissipation, thermal resistance, or temperature change, given the other two parameters. You can dynamically add more thermal components (having both a thermal resistance and temperature change) to the equation.

Standard Resistance Calculator
------------------------------

Given an input resistance, finds the closest resistance in a specified standard resistance series (an E series, e.g. E12 or E24).

LT3745 Calculator
-----------------

Calculates values of the supporting passive components for the LT3745 LED driver by Linear Technology. Uses equations given in the datasheet.

Internal Dependencies
=====================

None.

External Dependencies
=====================

MathJax (delivered through MathJax CDN) for latex rendering of equations.

knockout.js (delivered through CDN) for MVVM framework.

Issues
======

See GitHub Issues.

Limitations
===========

None documented.

Usage
=====

This repo is designed so that you can clone it directly (using SSH) into a web servers ``public_html`` folder (or any sub-folder). Then using PHP on a web page, include the php file of the specific calculator you wish to use, e.g.

::

	include $_SERVER['DOCUMENT_ROOT'] . '/Js-EngCalcs/chip-specific/lt3745/lt3745.php';
	
(assuming you cloned the repo directly into ``public_html``). The PHP file will automatically include it's respective Javascript file that resides in the same directory. All dependencies are automatically included via CDNs.
	
Changelog
=========

========= ========== ============================================================================================================
Version   Date       Comment
========= ========== ============================================================================================================
v6.1.0.0  2013/12/08 Modified all calculators to use new 'cc.variable()' object literal notation.
v6.0.5.0  2013/12/08 Changed 'cc.linkUnits()' call to match candy-calc API change.
v6.0.4.0  2013/12/07 Fixed infinite recursion issue for linked units in 'Standard Resistance Calculator'.
v6.0.3.0  2013/12/04 Converted 'Standard Resistance Calculator' to use new ``cc.variable()`` object. Fixed Chrome freeze issue by separating the desired and actual resistance units.
v6.0.2.0  2013/11/29 Deleted unneeded, commented code, and replaced all console.log() calls with Log() in the Ohm's Law calculator and LT3745 calculator.
v6.0.1.0  2013/11/29 Changed console.log() function calls to Log() so that they can be deactivated by setting DEBUG to false.
v6.0.0.0  2013/11/29 Added Capacitor Energy calculator to repo, closes #2.
v5.0.0.0  2013/11/28 Added Capacitor Charge calculator to repo, closes #3.
v4.5.7.0  2013/11/28 Make Heat Flow calculator jQuery safe, closes #58.
v4.5.6.0  2013/11/27 Fixed incorrect image link in the Heat Flow calculator, closes #59.
v4.5.5.0  2013/11/27 Fixed 'has no method shadowVal' bug in Ohm's Law calculator, closes #56. Added units to percentage diff row in the Standard Resistance Finder table, closes #55.
v4.5.4.0  2013/11/26 Removed references to jStorage in lt3745.js.
v4.5.3.0  2013/11/26 Removed references to jStorage in lt3745.php.
v4.5.2.0  2013/11/26 Added jStorage as a submodule into lib/jStorage, but then removed it after deciding it would be better in the candy-calc repo. Default unit is now kOhms for RT in the LT3745 calculator.
v4.5.1.0  2013/11/25 Added info about the Rt equation to the LT3745 calculator.
v4.5.0.0  2013/11/25 Added fw(act) and Rt calculations to the LT3745 calculator, closes #54.
v4.4.0.0  2013/11/25 Added temperature calculations for the LT3745 calculator, closes #53.
v4.3.0.0  2013/11/25 Added separators (horizontal dividers) to the LT3745 calculator.
v4.2.0.0  2013/11/25 All of the following changes apply to the LT3745 calculator: Added 55V limit to Vin(max), closes #45. Added rule that maximum input voltage has to be greater or equal to minimum input voltage, closes #46. Made sure Vin(min) cannot go less than 6V, fixes #47. Added Vcc variable, closes #48. Rfb1 is now recommended to be 10k, closes #49. Added more comments. Changed Vbuck,out to just Vout, and changed it from an output to an input, closes #50. Made sure Iled(nom) is between 10 and 50mA, closes #51. Made sure fsw(act) was between 100kHz-1MHz and less than fsw(max), closes #52.
v4.1.0.0  2013/11/24 Added image to Ohm's law calculator. Added and fixed units in Ohm's law calculator. Added 'Clear Values' button to Ohm's law calculator, although it doesn't work yet.
v4.0.1.0  2013/11/24 The mysteriously disappearing values in the Ohms law calculator bug has been fixed. Closes #43.
v4.0.0.0  2013/11/23 Added ohms law calculator to repo. Uses separate read/write functions and shadow variables to support the dynamic changing of what is calculated.
v3.13.2.0 2013/11/22 Modified candy-calc API to work with ``unit`` and ``validator`` objects being part of the ``cc`` object.
v3.13.1.0 2013/11/22 Removed the unneeded 'AppViewModel' objects, which meant that the ``data-bid with`` statement in the php files was also unneeded.
v3.13.0.0 2013/11/22 Multiple calculators can now run in the same page, using the ``cc.registerCalc()`` API call. Closes #42.
v3.12.0.0 2013/11/21 Converted standard-resistance-calculator to candy-calc framework.
v3.11.1.0 2013/11/20 Modified bindings in LT3745 calculator so that variables update on 'key down' rather than 'change', which makes the UI more responsive and 'live'.
v3.11.0.0 2013/11/18 Added validator severity to the LT3745 calculator.
v3.10.3.0 2013/11/18 Deleted commented custom binding code which is now in candy-calc from lt3745.js. 
v3.10.2.0 2013/11/18 Removed unnecessary HTML form element from the LT3745 calculator. 
v3.10.1.0 2013/11/18 Added a namespace for the LT3745 calculator so that other calculators can run on the same page. This uses the knockout data-bind 'with' command.
v3.10.0.0 2013/11/18 Added 'IsNumber' validators to all inputs of the LT3745 calculator.
v3.9.0.0  2013/11/18 Replaced fugf with correct variable name. Added more comments to the LT3745 calculator.
v3.8.5.0  2013/11/18 Removed all commented calculator code which is now in candy-calc. Updated candy-calc API calls to match new cc namespace (using cc.input and cc.output).
v3.8.4.0  2013/11/14 Splitted the 'Minimum Inductance' equation in another attempt to allow more column room for the description.
v3.8.3.0  2013/11/14 Splitted the 'Minimum Output Capacitance' equation into two lines, and made the 'Minimum Inductance' equation smaller in another attempt to allow more column room for the description.
v3.8.2.0  2013/11/14 Made the 'Minimum Output Capacitance' equation on the LT3745 calculator smaller to allow more table column room for the description.
v3.8.1.0  2013/11/14 Moved all the 3d-party library/framework inclusions into candy-calc.
v3.8.0.0  2013/11/14 LT3745 calculator now calls candy-calc framework (code moved into candy-calc repo).
v3.7.7.0  2013/11/12 Replaced all occurrences of $ with jQuery.
v3.7.6.0  2013/11/12 Changed $ to jQuery to see if it will fix jQuery issues when running in Wordpress.
v3.7.5.0  2013/11/12 Modified incorrect conditional jQuery load.
v3.7.4.0  2013/11/12 Added check to see if jQuery has already been loaded before loading (conditional load) to avoid conflicts when running on Wordpress.
v3.7.3.0  2013/11/12 Added a forward-slash to the front of the candy-calc CSS path to see if it will fix the 'resource not found' error.
v3.7.2.0  2013/11/12 Moved more of the inline styles into the candy-calc repo.
v3.7.1.0  2013/11/11 Moved CSS code into candy-calc repo and added link to it from lt3445.php file. Aim is to eventually move all 'calculator framework' code into the candy-calc repo, while leaving Js-EngCalcs for actual calculator implementations.
v3.7.0.0  2013/11/11 Added glow to currently selected input box. Moved input/output background colour styling to CSS, and made input border reflect background colour.
v3.6.3.0  2013/11/11 Added validator array support for computed variables. Changed outputs from disabled to readonly, which still allows tooltips to be displayed.
v3.6.2.0  2013/11/11 Made tooltips red to look like errors. Tooltips now display errors message associated with failed validator. Had to create a new qTip everytime I wanted to change the text as the content text change code didn't work properly.
v3.6.1.0  2013/11/10 Upgraded the tooltip styling (made it black with rounded corners). Began working on validator array functionality, in where multiple validators can be added for a single calculator variable. These are then automatically ran everytime the variable changes, and the red/green status and tooltip updated accordingly.
v3.6.0.0  2013/11/10 Add qTip (jQuery tooltip library), and implemented basic tooltip functionality on non-valid inputs/outputs.
v3.5.6.0  2013/11/10 Fixed the too-large 'Comments' column by add all cells in this column to the 'comment' class, and then applying 'text-size: small' to this class using CSS.
v3.5.5.0  2013/11/10 Fixed too-small Latex equations in the LT3745 calculator by replacing the command \frac with \dfrac.
v3.5.4.2  2013/11/09 Fixed incorrect rendering of code in README.
v3.5.4.1  2013/11/09 Improved the usage section of the README, adding more detailed info on how to clone the repo onto a server, and then include a calculators PHP file.
v3.5.4.0  2013/11/09 Removed all spaces from standard resistance finder and heat flow calculator folder names.
v3.5.3.0  2013/11/08 Changed the table width from 90% width to 1000px because it was being rendered too small in the web page.
v3.5.2.0  2013/11/08 Replaced inline styles with class parameter and CSS class selectors at top of page for the LT3745 calculator.
v3.5.1.0  2013/11/08 Changed all variables to use the calc object in the LT3745 calculator.
v3.5.0.0  2013/11/07 Fixed calculator object code bugs in the LT3745 calculator. The calc object now works fine, making it easier to created input and calculated variables which bind to the markup. One issue remaining is that the validator function has to be assigned after the object is created, not as part of the constructor.
v3.4.4.0  2013/11/05 Working on a validator for computed variables, along with rounding capabilities.
v3.4.3.0  2013/11/05 Validator has now been applied to two observable variables. Have to work on computed variables next.
v3.4.2.0  2013/11/05 Validator is now implemented with a function assigned to the validator variable. Still only testing with one variable in the LT3745 calculator.
v3.4.1.0  2013/11/04 Improved custom binding for fsw(act) with automatic colour changes on invalid value.
v3.4.0.0  2013/11/04 Basic custom binding working for fsw(act). Full functionality has not yet been added.
v3.3.1.0  2013/11/04 Replaced object == null checks with initialisers into the ko.observable() function in the LT3745 calculator.
v3.3.0.0  2013/11/04 Added colour feedback (green is good, red is bad) for actual frequency variable in the LT3745 calculator.
v3.2.0.0  2013/11/03 Added comments column to calculator table, and populated some of the comment cells. Added 'brief' doxygen comments to lt3745.php and lt3745.js. Removed old code from a previous calculator in lt3745.js. Add style rule so that calculator is 90% of the width of the parent element.
v3.1.0.0  2013/11/02 Added more variables to the LT3745 calculator. Now finds maximum switching frequency, minimum output capacitance, minimum inductance, and minimum input capacitance.
v3.0.0.0  2013/11/01 Added calculator for LT3745 LED driver under chip-specific/lt3745. Calculates values for supporting passive components, based on equations given in the datasheet. Added relevant info to the datasheet.
v2.2.11.1 2013/10/07 Fixed restructured text table in README so that it displays correctly.
v2.2.11.0 2013/10/07 Set the debug flag to false.
v2.2.10.0 2013/10/07 Changes jQuery inclusion code again in attempt to fix conflict bug. This time uses window.onload().
v2.2.9.0  2013/10/07 Changed conditional jQuery inclusion code in attempt to fix conflict bug.
v2.2.8.0  2013/10/07 Added check for jQuery before it is loaded, to prevent it being loaded twice and causing conflicts.
v2.2.7.0  2013/10/07 Fixed NaN bug when desired resistance was above highest number in series, by adding the first number in the next order of magnitude to the end of the series arrays. Re-included jQuery, as I discovered it is needed for these scripts.
v2.2.6.0  2013/10/07 Removed jQuery include in standard resistance calculator, as not needed, and was causing issues with the Wordpress MegaMenu.
v2.2.5.2  2013/10/07 Added title block to php files. Added comments to php files.
v2.2.5.1  2013/10/07 Changed incorrect standard-resistance-calculator.c extension in title block to .js.
v2.2.5.0  2013/10/07 Set debug to false in the standard resistance calculator Javascript file.
v2.2.4.0  2013/10/07 Added backslashes to the start/end in the preg pattern, also escaped a forward slash. 
v2.2.3.0  2013/10/07 Formatted __FILE__ so remove leading public_html (and beforehand) parts to URL. 
v2.2.2.0  2013/10/07 Made standard resistor php file load JS script with realpath(dirname(__FILE__)), which should give the correct path no matter where php file is included from.
v2.2.1.0  2013/10/07 Removed defer keyword from Javascript file include in standard resistance calculator. Moved this include to below HTML code.
v2.2.0.1  2013/09/27 Added knockout.js to list of external dependencies in README.
v2.2.0.0  2013/09/27 Rewrote the standard resistance finder calculator to use the knockout.js MVVM framework.
v2.1.2.0  2013/09/26 Renamed another index.php to heat-flow.php.
v2.1.1.0  2013/09/26 Renamed index.php to standard-resistance-finder.php. Added info about the standard resistance calculator to README.
v2.1.0.0  2013/09/17 Standard resistance calculator now works for finding E12, E24, E48, E96 and E192 values. Reports closest match and percentage error.
v2.0.0.0  2013/09/16 Added standard resistance calculator. Just started working on it's code, got a table looking half-decent. All the JS code from the heat flow calculator present in file, using as a template.
v1.1.0.0  2013/06/12 Release version. Heat flow table working! Using MathJax to render latex client-side. Added image to folder. 
v1.0.7.0  2013/06/11	Heat flow table almost working, except value calc bug when adding then removing rows.
v1.0.6.0  2013/06/11	Heat flow table calculating totals correctly for all three variables.
v1.0.5.0  2013/06/10 Heat flow table adding TOTAL row with 2 or more thermal components.
v1.0.4.0  2013/06/09 Heat flow table copying row correctly using insertBefore().
v1.0.3.0  2013/06/09 Heat flow table meant to be adding copied row into middle of table, but throwing DOM exception.
v1.0.2.0  2013/06/08 Re-arranged table so adding new rows makes more sense. Fixed version number.
v1.0.1.1  2013/06/08 Changelog now in table format.
v1.0.1.0  2013/06/08 Heat flow calc can now add more rows.
v1.0.0.1  2013/06/06 Fixed two README section titles from having all capitals.
v1.0.0.0  2013/06/06 Initial commit.
========= ========== ============================================================================================================