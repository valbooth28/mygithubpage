/**
* File: errorData.js
* Author: Val Booth <vxb4825@rit.edu>
* Purpose: Error enum and strings for printing
* NOTE: Thanks to Stijn de Witt for this awesome enum article:
* http://bit.ly/1yrmePt
*/

//Error Span stuff
ERR_SPAN_STR = '<span class="error">';


//Error Strings
var POS_INV_STR = "you have entered is not a positive integer. Please enter a positive integer.";
var GCD_STR = "Please enter two numbers with a GCD of 1.";
var ZERO_STR = "0 is not a valid number in a modular integer ring.";
var ONE_STR = "The multiplicative inverse of 1 is always 1.";
var SAME_NUM_STR = "A modular integer ring of a number cannot contain itself. Please change one of the numbers.";
var RANGE_STR = "Please enter a number between 2 and " + MAX_NUM.toString()+ ".";

//Error Enum
var errorEnum = {
	NO_ERROR: 		   -1, 
	SAME_NUMS:  		0,
	GCD_OF_ONE:         1,
	
	NUM1_NOT_POS_INT:   2,
	NUM2_NOT_POS_INT:	3,				
	
	NUM1_VAL_OF_ONE: 	4,
	NUM2_VAL_OF_ONE: 	5,
	
	NUM1_VAL_OF_ZERO: 	6,
	NUM2_VAL_OF_ZERO: 	7,	
	
	NUM1_OUT_OF_RANGE:	8,
	NUM2_OUT_OF_RANGE:  9,
	
	val: 		{
		0:     	{str: SAME_NUM_STR}, 
		1:     	{str: GCD_STR}, 
		2:     	{str: "The first number " + POS_INV_STR}, 
		3:     	{str: "The second number " + POS_INV_STR}, 
		4:     	{str: ONE_STR}, 
		5:     	{str: ONE_STR}, 
		6:     	{str: ZERO_STR},
		7: 		{str: ZERO_STR},		
		8: 		{str: RANGE_STR},
		9: 		{str: RANGE_STR},
	}
};


	

	
