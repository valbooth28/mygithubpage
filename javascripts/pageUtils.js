/**
 * File: pageUtils.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Functions that deal any HTML aspects of the page.
 * TODO: Make a function that edits the innerHTML elements
  **/


/* 
* Helper function for readInput.
* NOTE: Inspiration for this function taken from http://bit.ly/13L47WF,
* a stack overflow question
* TODO: This does not currently accept commas, maybe try and figure it out
*/
function isPositiveInteger(n) {
	//Is it a number? Is it finite? 
	var bool = !isNaN(parseFloat(n)) && isFinite(n);
	//Does it have a decimal or negative sign?
	bool = bool && (n.indexOf(".") === -1) && (n.indexOf("-") === -1);
	//Does it have an e in it? We're going to say e is not proper notation here
	//Thanks to Adam @aem1269 for the insight
	bool = bool && (n.indexOf("e") === -1);
	return bool;
}


/*
* Takes the input from the two num input boxes, checks that the input is
* valid, and if it is valid calls the EEA algorithm, if not prints out
* an error message.
*/
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



/* 
* Edits the value of the text boxes on the page.
* @param boxID: the id of the box on the page, might make an array later
* @param boxValue: the string to be written out to the page
*/
function writeTextBox(boxID, boxValue){
	var textBox = document.getElementById(boxID);
	textBox.value = boxValue;
}


/*
* @param isGCD: a boolean for if we're printing the GCD or inverse calcs
* @param Calc: an array of arrays
*/
function printCalculation(isGCD, Calc){
	//Defining this str specifically because I can't decide what I want it to be
	var MULT_STR = " • ";

	var calcStr = "";
	var tempPrintCalc;
	var newValue;
	//TODO: when we're in multiplicative inverse check for 1s that we don't
	//need to print LOW PRIORITY
	//TODO: Variable for document.getElementByID call?

	if(isGCD){
		//First, reset the innerHTML because if this is a GCD printing,
		//we're doing an entirely new calculation
		document.getElementById("GCD calcs").innerHTML = "";


		//Now go and build the calcStr to be printed to the HTML page
		//by adding each number in the GCD calc w/appropriate
		//expressions
		for (var i = 0; i < Calc.length; i++) {
			
			tempPrintCalc = Calc[i];

			calcStr += tempPrintCalc[RESULT_INDEX].toString();
			calcStr += " = ";
			calcStr += tempPrintCalc[DIVID_INDEX].toString();
			calcStr += MULT_STR;
			calcStr += tempPrintCalc[DIVIS_INDEX].toString();
			calcStr += " + ";
			calcStr += tempPrintCalc[REMAIN_INDEX].toString();
			calcStr += "<br />";
		}
		//Finally, print the calcStr out to the page
		document.getElementById("GCD calcs").innerHTML += calcStr;
	}
	//We're printing the multiplicative inverse, much more complicated
	else{
		calcStr += "<br />";
		for (var i = 0; i < Calc.length; i++) {
			// calcStr = "";
			tempPrintCalc = Calc[i];

			for(var j = 0; j <tempPrintCalc.length; j++){
				newValue = tempPrintCalc[j];
				
				//Checking if an element is an array. Evidence online shows this
				//is the fastest way to check
				if(newValue.constructor === Array){
					calcStr += "(";
					calcStr += newValue[0].toString();
					//TODO: Better fix later
					//calcStr += " - ";
					calcStr += " - "+ Math.abs(newValue[1]).toString();
					calcStr += MULT_STR;
					calcStr += newValue[2].toString();
					calcStr += ")";
				}
				else{
					if(newValue < 0){
						calcStr += " - ";
					}
					calcStr += Math.abs(newValue).toString()
				}

				switch(j){
					case 0:
						calcStr += " = ";
						break;

					case 1:
						calcStr += MULT_STR;
						break;

					case 2:
						//TODO: Better fix later
						//calcStr += " - ";
						break;

					case 3:
						calcStr += MULT_STR;
						break;

				}

			}
			//Don't forget to add a newline so it's not all squished together
			calcStr+= "<br />";
		}
		document.getElementById("GCD calcs").innerHTML += calcStr;

	}

	
}