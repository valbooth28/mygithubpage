/**
 * File: EEA.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Does all of the math for the Extended Euclidean Algorithm. 
  **/


//Indexing Constants, for my own sanity
var RESULT_INDEX = 0;
var DIVID_INDEX = 1;
var DIVIS_INDEX = 2;
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
	var tempCalc3 = new Array();
	var replaceIndex;
	var old_result;
	var old_divis;
	var old_divid;
	var old_remain;

	//Going down in the Calcs to find the GCD
	do{
		remainder = result % divisor;
		dividend = Math.floor(result/divisor);

		//TODO: Change documentation
		//NOTE: gcdCalcs is structured like so:
		//result	: [divisor, dividend, remainder]
		//divisor	: [remainder, newDividend, newRemainder]
		//and so on and so forth
		//Trying to change gcdCalcs to an array of arrays
		newCalc = new Array();
		newCalc.push(result, dividend, divisor, remainder);
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

		//TODO: Iterative structure, what and where?!
		//TODO: better array variable names

		var index = gcdCalcs.length - 1;
		
		//getting the last equation we found, which will be at the end of the array
		tempCalc = gcdCalcs[index];
		result = tempCalc[RESULT_INDEX];
		dividend = tempCalc[DIVID_INDEX];
		divisor = tempCalc[DIVIS_INDEX];
		remainder = tempCalc[REMAIN_INDEX];
		
		//These two lines are making it so that EEA (w/a level of abstration)
		//represents: remainder = lastResult - dividend x divisor
		//NOTE: Due to the if/else, remainder should be 1
		//NOTE: the minus sign will be explicit and is applied here
		tempCalc2.push(remainder, result, 1, ((-1)*dividend), divisor);
		EEACalc.push(tempCalc2);

		//Now we need to do some linear combinations.
		//we always replace with one equation before us, so get that
		index-=1;
		tempCalc = gcdCalc[index];

		//Using another tempCalc array,
		//tempCalc3 will represent Result - old_divisor x dividend
		old_result  = tempCalc[RESULT_INDEX];
		old_divid   = tempCalc[DIVID_INDEX];
		old_divis = tempCalc[DIVIS_INDEX];
		old_remain  = tempCalc[REMAIN_INDEX];
		tempCalc3.push(old_result, ((-1)*old_divid), old_divis);

		//Find the index of the old remainder, and substitute there
		replaceIndex = tempCalc2.indexOf(old_remain);

		tempCalc2[replaceIndex] = tempCalc3;

		//Now we need to do some combining
		//NOTE: It's always the multiplication in the new equation that is getting combined 
		//NOTE: This can probably be done better. Look into it later
		//TODO: Remember negatives? I think I'm forgetting some
		switch(replaceIndex){
			//NOTE: The equations in the if/else are structured like so: 
			//the index that is NOT the match is the one getting updated/
			//so old index val = itself + the not matching value from the
			//substituted equation, times the value before it's being
			//multiplied by in tempCalc2
			case 0:
				if(old_divid === Math.abs(tempCalc2[2])){
					tempCalc2[3] = tempCalc2[1] + tempCalc3[2] * tempCalc2[1];
					
				}
				
				else if(old_divid === Math.abs(tempCalc2[3])){
					tempCalc2[2] = tempCalc2[0] + tempCalc3[2] * tempCalc2[1];
					
				}

				else if(old_divis === Math.abs(tempCalc2[2])){
					tempCalc2[3] = tempCalc2[1] + tempCalc3[1] * tempCalc2[1];
				}
				
				//i.e. old_divis === tempCalc2[3]
				else{
					tempCalc2[2] = tempCalcs[0] + tempCalc3[1] * tempCalc2[1];
				}
		
				break;

			case 1:
				if(old_divid === Math.abs(tempCalc2[2])){
					tempCalc2[3] = tempCalc2[1] + tempCalc3[2] * tempCalc2[1];
					
				}
				
				else if(old_divid === Math.abs(tempCalc2[3])){
					tempCalc2[2] = tempCalc2[0] + tempCalc3[2] * tempCalc2[1];
					
				}

				else if(old_divis === Math.abs(tempCalc2[2])){
					tempCalc2[3] = tempCalc2[1] + tempCalc3[1] * tempCalc2[1];
				}
				
				//i.e. old_divis === tempCalc2[3]
				else{
					tempCalc2[2] = tempCalcs[0] + tempCalc3[1] * tempCalc2[1];
				}
				break;

			case 2:
				if(old_divid === Math.abs(tempCalc2[0])){
					tempCalc2[1] = tempCalc2[1] + tempCalc3[2] * tempCalc2[3];
					
				}
				
				else if(old_divid === Math.abs(tempCalc2[1])){
					tempCalc2[0] = tempCalc2[0] + tempCalc3[2] * tempCalc2[3];
					
				}

				else if(old_divis === Math.abs(tempCalc2[0])){
					tempCalc2[1] = tempCalc2[1] + tempCalc3[1] * tempCalc2[3];
				}
				
				//i.e. old_divis === tempCalc2[1]
				else{
					tempCalc2[0] = tempCalcs[0] + tempCalc3[1] * tempCalc2[3];
				}

				break;

			case 3:
				if(old_divid === Math.abs(tempCalc2[0])){
					tempCalc2[1] = tempCalc2[1] + tempCalc3[2] * tempCalc2[2];
				}
				
				else if(old_divid === Math.abs(tempCalc2[1])){
					tempCalc2[0] = tempCalc2[0] + tempCalc3[2] * tempCalc2[2];
				}

				else if(old_divis === Math.abs(tempCalc2[0])){
					tempCalc2[1] = tempCalc2[1] + tempCalc3[1] * tempCalc2[2];
				}
				
				//i.e. old_divis === tempCalc2[1]
				else{
					tempCalc2[0] = tempCalcs[0] + tempCalc3[1] * tempCalc2[2];
				}

				break;
		}
		//tempCalc3 is structured such that it's result - divisor x dividend,
		//and the multiplication just got absorbed in the linear combination,
		//So the replaceIndex can just be reset to the result part of temp3
		tempCalc2[replaceIndex] = tempCalc3[0];
		EEACalc.push(tempCalc2);
		//TODO: End while construct HERE
 	}
}

//TODO: @param isGCD: a boolean for if we're printing the GCD or inverse calcs
//@param Calc: an array of arrays
function printCalculation(Calc){
	//TODO: when we're in multiplicative inverse check for 1s that we don't
	//need to print

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
	






