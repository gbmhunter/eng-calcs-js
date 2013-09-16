==============================================================
Engineering Calculators Written In Javascript
==============================================================

- Author: gbmhunter <gbmhunter@gmail.com> (http://www.cladlab.com)
- Created: 2013/06/06
- Last Modified: 2013/09/16
- Version: v2.0.0.0
- Company: CladLabs
- Project: Free Code Libraries	.
- Language: HTML/JS
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

Internal Dependencies
=====================

None.

External Dependencies
=====================

MathJax (delivered through MathJax CDN) for latex rendering of equations.

Issues
======

See GitHub Issues.

Limitations
===========

None documented.

Usage
=====

Load .php files in browser.
	
Changelog
=========

======== ========== ============================================================================================================
Version  Date       Comment
======== ========== ============================================================================================================
v2.0.0.0 2013/09/16 Added standard resistance calculator. Just started working on it's code, got a table looking half-decent. All the JS code from the heat flow calculator present in file, using as a template.
v1.1.0.0 2013/06/12 Release version. Heat flow table working! Using MathJax to render latex client-side. Added image to folder. 
v1.0.7.0 2013/06/11	Heat flow table almost working, except value calc bug when adding then removing rows.
v1.0.6.0 2013/06/11	Heat flow table calculating totals correctly for all three variables.
v1.0.5.0 2013/06/10 Heat flow table adding TOTAL row with 2 or more thermal components.
v1.0.4.0 2013/06/09 Heat flow table copying row correctly using insertBefore().
v1.0.3.0 2013/06/09 Heat flow table meant to be adding copied row into middle of table, but throwing DOM exception.
v1.0.2.0 2013/06/08 Re-arranged table so adding new rows makes more sense. Fixed version number.
v1.0.1.1 2013/06/08 Changelog now in table format.
v1.0.1.0 2013/06/08 Heat flow calc can now add more rows.
v1.0.0.1 2013/06/06 Fixed two README section titles from having all capitals.
v1.0.0.0 2013/06/06 Initial commit.
======== ========== ============================================================================================================