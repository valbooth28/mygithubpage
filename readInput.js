/**
 * File: readInput.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Grabs input from HTML page and performs error checking before
 * calling the calculation function in EEA.js 
  **/


function readInput(){
	//The upper limit for the EEA calculation, chosen because 100 million was
	//occasionally having some accuracy issues, 50 million's a good number 
	var MAX_NUM = 50000000;
	
	//Error Strings
	//TODO: Make these <= 80 length?
	var notPosIntErrStr = "number you have entered is not a positive integer. Please enter a positive integer.";
	var oneErrStr = "The multiplicative inverse of 1 is always 1.";
	var zeroErrStr = "0 is not a valid number in a modular integer ring.";
	var sameNumErrStr = "A modular integer ring of a number cannot contain itself. Please change one of the numbers.";
	
	var num1;
	var num2; 

	//Grabs the input from the two text boxes
	num1 = document.getElementById('num1Input').value;
	num2 = document.getElementById('num2Input').value;
	
	//TODO: This can be combined a bit
	//Check that they are valid integers then convert them
	if(isPositiveInteger(num1)){
		//Clarifying base ten just in case
		num1 = parseInt(num1,10);
	}
	else{
		alert("The first " + notPosIntErrStr);
		//TODO Be fancy and clear out the text boxes?
		return;
	}


	if(isPositiveInteger(num2)){
		num2 = parseInt(num2,10);
	}
	else{
		alert("The second " + notPosIntErrStr);
		//TODO Be fancy and clear out the text boxes?
		return;
	}


	//Double check that they are within range
	if(num1 > MAX_NUM){
		alert("Please enter a number between 1 and " + MAX_NUM.toString());
		return;
	}

	else if(num2 > MAX_NUM){
		alert("Please enter a number between 1 and " + MAX_NUM.toString());
		return;
	}

	//Check for zeroes or ones
	if((num1 === 0) || (num2 === 0)){
		alert(zeroErrStr);
		return;
	}
	else if((num1 === 1) || (num2 === 1)){
		alert(oneErrStr);
		return;
	}

	//Check that the numbers are not the same, a modular integer ring of n
	//contains numbers of 1,2, ... n-1
	if(num1 === num2){
		alert(sameNumErrStr);
		return;
	}

	//If num2 < num1, swap the numbers, because num1 should be a number
	//with a multiplicative inverse mod num2 therefore mod2 is bigger
	if(num1 < num2){
		//NOTE: I hear it's faster to use a tmpVariable then a one liner
		var tmpNum = num1;
		num1 = num2;
		num2 = tmpNum;
	}

	//If you got this far, proceed with the calculations.
	EEA(num1, num2);
	
}


//NOTE: Inspiration for this function taken from http://bit.ly/13L47WF,
//a stack overflow question
function isPositiveInteger(n) {
	//Is it a number? Is it finite? Does it have a decimal or negative sign?
	return !isNaN(parseFloat(n)) && isFinite(n) && (n.indexOf(".") === -1) && (n.indexOf("-") === -1);
}

