/**
 * File: EEA.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Does all of the math for the Extended Euclidean Algorithm. 
  **/


//Indexing Constants, for my own sanity
var RESULT_INDEX = 0;
var DIVIS_INDEX = 1;
var DIVID_INDEX = 2;
var REMAIN_INDEX = 3;

/**
	@param num1 an integer <= 10,000 that is greater than num2
	@param num2 an integer <= 10,000
*/
function EEA(num1, num2){
	//Vars for finding the GCD
	var remainder;
	var dividend;
	var newCalc;
	var lastResult;
	var result = num1;
	var divisor = num2;
	var gcdCalcs = new Array();

	//Vars for finding the multiplicative inverse
	var EEACalc = new Array();
	var tempCalc;
	var tempCalc2 = new Array();
	var tempCalc3;
	var old_result;
	var old_divis;
	var old_divid;
	var old_remain;

	//Going down in the Calcs to find the GCD
	do{
		remainder = result % divisor;
		dividend = Math.floor(result/divisor);

		//NOTE: gcdCalcs is structured like so:
		//result	: [divisor, dividend, remainder]
		//divisor	: [remainder, newDividend, newRemainder]
		//and so on and so forth
		//Trying to change gcdCalcs to an array of arrays
		newCalc = new Array();
		newCalc.push(result, divisor, dividend, remainder);
		gcdCalcs.push(newCalc); 
		
		//Reassign variables for next while loop run
		// lastResult = result; No longer needed I think
		result = divisor;
		divisor = remainder;
	}while(remainder > 1);
	
	//If the remainder is zero, num2 does not have a multiplicative inverse
	//in Z(num1)
	if(remainder === 0){
		//TODO: Have the alert mention the actual GCD? Low priority
		alert(num1.toString() + " and " + num2.toString() + " do not have a GCD of 1.\n" +
			"Please enter two numbers with a GCD of 1.");
	}

	//Going back up in the Calcs to find the multiplicative inverse
	//This will be done through a series of linear combinations
	//Our final goal is to have EEACalc[1] = [factor1, num1, factor2, num2]
	//Factor2 will be our multiplicative inverse
	else{
		
		//First, print the gcd results
		printCalculation(gcdCalcs);

		var index = gcdCalcs.length - 1;

		//This while construct allows us to iterate backwards over gcdCalcs
		//TODO: might change
		while(index > 0){
			//getting the last equation we found, which will be at the end of the array
			tempCalc = gcdCalcs[index];
			old_result = tempCalc[RESULT_INDEX];
			old_divisor = tempCalc[DIVIS_INDEX];
			old_dividend = tempCalc[DIVID_INDEX];
			old_remainder = tempCalc[REMAIN_INDEX];
			
			//These two lines are making it so that EEA (w/a level of abstration)
			//represents: remainder = lastResult x 1 - divisor x dividend
			//NOTE: Due to the if/else, remainder should be 1
			//NOTE: the minus sign will be explicit and is applied here
			tempCalc2.push(old_remainder, old_result, 1, ((-1)*old_divisor), old_dividend);
			EEACalc.push(tempCalc2);
	
			//Now we need to do some linear combinations.
			//old_divisor should be the remainder one gcdCalc up, so get that equation
			index-=1;
			tempCalc = gcdCalc[index];
			//Now we're editing tempCalc2 to show the intermediate step
	
	
 			//TODO: remember to check if we need to add or subtract our combination
 			//TODO: Show the mid step? If so we need an innerHTML = call
 			//Now we need to search our current EA Calculation to find where we are subsituting
		}
		


 	}
}

//TODO: @param isGCD: a boolean for if we're printing the GCD or inverse calcs
//@param Calc: an array of arrays
function printCalculation(Calc){
	//TODO: A check to see if we need to clear out the innerHTML element or not
	//This can be done when we add the isGCD boolean
	
	for (var i = 0; i < Calc.length; i++) {
		//The string representing the equation, to be printed out to the HTML page
		var calcStr = "";
		//Note: Calc is a one dimensional array
		tempPrintCalc = Calc[i];
		calcStr += tempPrintCalc[RESULT_INDEX].toString();
		calcStr += " = ";
		calcStr += tempPrintCalc[DIVIS_INDEX].toString();
		calcStr += " x ";
		calcStr += tempPrintCalc[DIVID_INDEX].toString();
		calcStr += " + ";
		calcStr += tempPrintCalc[REMAIN_INDEX].toString();
		calcStr += "<br />";
		document.getElementById("GCD calcs").innerHTML += calcStr;
		}
}
	






