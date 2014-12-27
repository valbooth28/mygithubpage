/**
 * File: EEA.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Does all of the math for the Extended Euclidean Algorithm. 
  **/

/**
	@param num1 an integer <= 10,000 that is greater than num2
	@param num2 an integer <= 10,000
*/
function EEA(num1, num2){
	//Indexing Constants, for my own sanity
	var DIVIS_INDEX = 0;
	var DIVID_INDEX = 1;
	var REMAIN_INDEX = 2;

	//Vars for finding the GCD
	var remainder;
	var dividend;
	var newCalc;
	var lastResult;
	var result = num1;
	var divisor = num2;
	var gcdCalcs = {};

	//Vars for finding the multiplicative inverse
	var EEACalc = {};
	var tempCalc;
	var tempCalc2 = new Array();
	var old_divis;
	var old_divid;
	var old_remain;

	//Going down in the Calcs to find the GCD
	do{
		remainder = result % divisor;
		dividend = Math.floor(result/divisor);

		//NOTE: gcdCalcs is structured like so:
		//result	: [divisor, dividend, remainder]
		//divisor	: [remainder, newDivident, newRemainder]
		//and so on and so forth
		newCalc = new Array();
		newCalc.push(divisor, dividend, remainder);
		gcdCalcs[result] = newCalc;
		
		//Reassign variables for next while loop run
		lastResult = result;
		result = divisor;
		divisor = remainder;
	}while(remainder > 1);
	
	//If the remainder is zero, num2 does not have a multiplicative inverse
	//in Z(num1)
	if(remainder === 0){
		//TODO: Have the alert mention the actual GCD
		alert(num1.toString() + num2.toString() + "do not have a GCD of one.\n" +
			"Please enter two numbers with a GCD of 1");
	}
	
	//Going back up in the Calcs to find the multiplicative inverse
	//This will be done through a series of linear combinations
	//Our final goal is to have EEACalc[1] = [factor1, num1, factor2, num2]
	//Factor2 will be our multiplicative inverse
	else{
		//TODO: Figure out (do) while construct
		//getting the last equation we found. It will be of the form:
		//lastResult = divisor x dividend + remainder
		tempCalc = gcdCalcs[lastResult];
		old_divisor = tempCalc[DIVIS_INDEX];
		old_dividend = tempCalc[DIVID_INDEX];
		old_remainder = tempCalc[REMAIN_INDEX];
		
		//These two lines are making it so that EEA (w/a level of abstration)
		//represents: remainder = lastResult x 1 - divisor x dividend
		//NOTE: Due to the if/else, remainder should be 1
		//NOTE: the minus sign will be implied, and not actually in any number
		tempCalc2.push(lastResult, 1, old_divisor, old_dividend);
		EEACalc[old_remainder] = tempCalc2;

		//Now we need to do some linear combinations.
		//Divisor should be a previous remainder be in GCDCalcs, 
		//so now we loop to find that
		for (var key in gcdCalcs) {
			if (gcdCalcs.hasOwnProperty(key)) {
				if(gcdCalcs[key][REMAIN_INDEX] == old_divisor){
					//TODO: Should we remove it? TBT
					tempCalc = gcdCalcs[key];
					remainder = key;
					break;
				}
			}
 		}
 		//TODO: remember to check if we need to add or subtract our combination
 		//TODO: Show the mid step? If so we need an innerHTML = call
 		//Now we need to search our current EA Calculation to find where we are subsituting


 	}
}

//TODO: @param isGCD: a boolean for if we're printing the GCD or inverse calcs
//@param Calc: a calculation object for either the GCD or inverse operation
function printCalculation(Calc){
	//The string representing the equation, to be printed out to the HTML page
	var calcStr;
	
	for (var key in Calc) {
		//building the calcStr
		if (Calc.hasOwnProperty(key)) {
			//String = result
			calcString += key.toString();
			calcString += " = ";
			calcString += Calc[key][DIVIS_INDEX].toString();
			calcString += " x ";
			calcString += Calc[key][DIVID_INDEX].toString();
			calcString += " + ";
			calcString += Calc[key][REMAIN_INDEX].toString();
			//TODO change
			document.getElementById("demo").innerHTML = calcString;
		}
	}
	

}




