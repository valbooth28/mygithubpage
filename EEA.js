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
	//NOTE: This will be a 2 dimensional array. An array of array equations
	var gcdCalcs = new Array();
	var remainders = new Array();	

	//Vars for finding the multiplicative inverse
	var EEACalc = new Array();
	var tempCalc;
	var tempCalc2 = new Array();
	var tempCalc3; 
	var replaceIndex;
	var old_result;
	var old_divis;
	var old_divid;
	var old_remain;
	var divid_eq_one;
	var divis_eq_one;
	var divis_in_remain;
	var divid_in_remain;

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
		remainders.push(remainder);
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
		//First, reset the last remainder, 1, to num2
		//since we DON'T want to combine on 1s,
		//but our last equation will combine on num2
		remainders[remainders.length-1] = num2;

		//Second, print the gcd results
		printCalculation(true, gcdCalcs);

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
		EEACalc.push(tempCalc2.slice());

		//Now we need to do some linear combinations.
		//we always replace with one equation before us, so get that
		while(index > 0){
			index-=1;
			tempCalc = gcdCalcs[index];
			tempCalc3 = new Array();

			//Using another tempCalc array,
			//tempCalc3 will represent Result - old_divisor x dividend
			old_result  = tempCalc[RESULT_INDEX];
			old_divid   = tempCalc[DIVID_INDEX];
			old_divis = tempCalc[DIVIS_INDEX];
			old_remain  = tempCalc[REMAIN_INDEX];
			tempCalc3.push(old_result, ((-1)*old_divid), old_divis);

			//Find the index of the old remainder, and substitute there
			//TODO: absolute value/negative check
			replaceIndex = tempCalc2.indexOf(old_remain);

			tempCalc2[replaceIndex] = tempCalc3;
			EEACalc.push(tempCalc2.slice());

			//Now we need to do some combining
			//NOTE: It's always the multiplication in the new equation that is getting combined 
			//NOTE: This can probably be done better. Look into it later
			//TODO: I think there's a better way to organize this...
			divid_in_remain = (remainders.indexOf(old_divid) > -1);
			divis_in_remain = (remainders.indexOf(old_divis) > -1);
			divid_eq_one = (old_divid === 1);
			divis_eq_one = (old_divis === 1)

			switch(replaceIndex){
				//NOTE: The equations in the if/else are structured like so: 
				//the index that is NOT the match is the one getting updated/
				//so old index val = itself + the not matching value from the
				//substituted equation, times the value before it's being
				//multiplied by in tempCalc2
				case 1:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[3])){
							tempCalc2[4] = tempCalc2[4] + tempCalc3[2] * tempCalc2[2];
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[4])){
							tempCalc2[3] = tempCalc2[3] + tempCalc3[2] * tempCalc2[2];
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[3])){
							tempCalc2[4] = tempCalc2[4] + tempCalc3[1] * tempCalc2[2];
							break;
						}
						
						//i.e. old_divis === tempCalc2[4]
						else{
							tempCalc2[3] = tempCalc2[3] + tempCalc3[1] * tempCalc2[2];
							break;
						}
					}	
					break;

				case 2:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[3])){
							tempCalc2[4] = tempCalc2[4] + tempCalc3[2] * tempCalc2[1];
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[4])){
							tempCalc2[3] = tempCalc2[3] + tempCalc3[2] * tempCalc2[1];
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[3])){
							tempCalc2[4] = tempCalc2[4] + tempCalc3[1] * tempCalc2[1];
							break;
						}
						
						//i.e. old_divis === tempCalc2[4]
						else{
							tempCalc2[3] = tempCalcs[3] + tempCalc3[1] * tempCalc2[1];
							break;
						}
					}
					break;

				case 3:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[1])){
							tempCalc2[2] = tempCalc2[2] + tempCalc3[2] * tempCalc2[4];
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[2])){
							tempCalc2[1] = tempCalc2[1] + tempCalc3[2] * tempCalc2[4];
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[1])){
							tempCalc2[2] = tempCalc2[2] + tempCalc3[1] * tempCalc2[4];
							break;
						}
					
						//i.e. old_divis === tempCalc2[2]
						else{
							tempCalc2[1] = tempCalcs[1] + tempCalc3[1] * tempCalc2[4];
							break;
						}
					}
					break;
					
				case 4:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[1])){
							tempCalc2[2] = tempCalc2[2] + tempCalc3[2] * tempCalc2[3];
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[2])){
							tempCalc2[1] = tempCalc2[1] + tempCalc3[2] * tempCalc2[3];
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[1])){
							tempCalc2[2] = tempCalc2[2] + tempCalc3[1] * tempCalc2[3];
							break;
						}
					
						//i.e. old_divis === tempCalc2[2]
						else{
							tempCalc2[1] = tempCalcs[1] + tempCalc3[1] * tempCalc2[3];
							break;
						}
			
					}
					break;
					
			}
			//tempCalc3 is structured such that it's result - divisor x dividend,
			//and the multiplication just got absorbed in the linear combination,
			//So the replaceIndex can just be reset to the result part of temp3
			tempCalc2[replaceIndex] = tempCalc3[0];
			EEACalc.push(tempCalc2.slice());
		}
 		printCalculation(false, EEACalc);

 		//Now specifically identify the multiplicative inverse,
 		//which will be the number multiplied times our original num2
 		var inverse;

 		//get the last computed equation
 		tempCalc = EEACalc[EEACalc.length - 1];
 		for(var i = 0; i < tempCalc.length; i++){
 			//Find where num2 is in the equation
 			if(tempCalc[i] === num2){
 				if(i % 2 == 0){
 					//Indexes 2 and 4 have their multiplicand before them
 					inverse = tempCalc[i-1];
 				}
 				else{
 					//indexes 1 and 3 have it after
 					inverse = tempCalc[i+1];
 				}
 				break;
 			}
 		}
 		var finalStr = "<br />" + "The multiplicative inverse is: " + inverse.toString();
 		document.getElementById("GCD calcs").innerHTML += finalStr;

 	}
}

//@param isGCD: a boolean for if we're printing the GCD or inverse calcs
//@param Calc: an array of arrays
function printCalculation(isGCD, Calc){
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
			calcStr += tempPrintCalc[DIVIS_INDEX].toString();
			calcStr += " x ";
			calcStr += tempPrintCalc[DIVID_INDEX].toString();
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
					calcStr += newValue[1].toString();
					calcStr += " x ";
					calcStr += newValue[2].toString();
					calcStr += ")";
				}
				else{
					calcStr += newValue.toString();
				}

				switch(j){
					case 0:
						calcStr += " = ";
						break;

					case 1:
						calcStr += " x ";
						break;

					case 2:
						//TODO: Better fix later
						//calcStr += " - ";
						break;

					case 3:
						calcStr += " x ";
						break;

				}

			}
			//Don't forget to add a newline so it's not all squished together
			calcStr+= "<br />";
		}
		document.getElementById("GCD calcs").innerHTML += calcStr;

	}

	
}
	






