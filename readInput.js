/**
 * File: readInput.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Grabs input from HTML page and performs error checking before
 * calling the calculation function in EEA.js 
  **/


function readInput(){
	var num1;
	var num2; 
	//The greatest number that my EEA can do. Currently 10k because why not?
	var MAX_NUM = 10000;
	var errorStr = "you have entered is not an integer. Please enter an integer."
	//Grabs the input from the two text boxes
	num1 = document.getElementById("num1Input");
	num2 = document.getElementById("num2Input");
	
	//Check that they are valid integers then convert them
	if(isInteger(num1)){
		num1 = parseInt(num1);
	}
	else{
		alert("The first " + errorStr);
		//TODO Be fancy and clear out the text boxes?
		return;
	}


	if(isInteger(num2)){
		num2 = parseInt(num2);
	}
	else{
		alert("The second " + errorStr);
		//TODO Be fancy and clear out the text boxes?
		return;
	}

	//Double check that they are within range
	if(num1 > 10000){

	}

	if(num2 > 10000){

	}
}


//NOTE: Inspiration for this function taken from http://bit.ly/13L47WF,
//a stack overflow question
function isInteger(n) {
	return !isNaN(parseFloat(n)) && isFinite(n) && (n.indexOf(".") === -1);
}

