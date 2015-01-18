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
	@param num1: an integer <= MAX_LIMIT that is greater than num2
	@param num2: an integer <= MAX_LIMIT
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

		//NOTE: gcdCalcs is an array of equation arrays.
		//Each equation array looks like:
		//result = dividend x divisor + remainder
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
		remainArrLen = remainders.length;
		var GCD;
		
		if(remainArrLen > 1){
			//Finding the actual GCD, which should be the penultimate remainder
			//since the last remainder is 0
			GCD = remainders[remainArrLen - 2];
		}
		else{
			//the only remainder in remainders is 0, so
			//we have to check the only calc in gcdCalcs
			var calc = gcdCalcs[0];
			var gcdDivid = calc[DIVID_INDEX]
			var gcdDivis = calc[DIVIS_INDEX];
			//The smaller of the two numbers will be the GCD
			if(gcdDivis < gcdDivid){
				GCD = gcdDivis;
			}
			else{
				GCD = gcdDivid;
			}
		}
		
		alert(num1.toString() + " and " + num2.toString() + " have a GCD of " +
			GCD.toString() + ".\nPlease enter two numbers with a GCD of 1.");
		
		//For testing purposes
		// return GCD;
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
			old_result = tempCalc[RESULT_INDEX];
			old_divid  = tempCalc[DIVID_INDEX];
			old_divis  = tempCalc[DIVIS_INDEX];
			old_remain = tempCalc[REMAIN_INDEX];
			tempCalc3.push(old_result, ((-1)*old_divid), old_divis);

			//Find the index of the old remainder, and substitute there
			//TODO: absolute value/negative check
			replaceIndex = tempCalc2.indexOf(old_remain);

			//Remove old_remainder from the remainders array
			//so the algorithm doesn't try to combine it twice
			var removeIndex = remainders.indexOf(old_remain);
			remainders.splice(removeIndex, 1);

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
							if(tempCalc3[1] < 0){
								tempCalc2[4] = tempCalc2[4] + -1*tempCalc3[2] * tempCalc2[2];
							}
							else{
								tempCalc2[4] = tempCalc2[4] + tempCalc3[2] * tempCalc2[2];
							}
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[4])){
							if(tempCalc3[1] < 0){
								tempCalc2[3] = tempCalc2[3] + -1*tempCalc3[2] * tempCalc2[2];
							}
							else{
								tempCalc2[3] = tempCalc2[3] + tempCalc3[2] * tempCalc2[2];
							}
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[3])){
							if(tempCalc3[2] < 0){
								tempCalc2[4] = tempCalc2[4] + -1*tempCalc3[1] * tempCalc2[2];
							}
							else{
								tempCalc2[4] = tempCalc2[4] + tempCalc3[1] * tempCalc2[2];
							}
							break;
						}
						
						//i.e. old_divis === tempCalc2[4]
						else{
							if(tempCalc3[2] < 0){
								tempCalc2[3] = tempCalc2[3] + -1*tempCalc3[1] * tempCalc2[2];
							}
							else{
								tempCalc2[3] = tempCalc2[3] + tempCalc3[1] * tempCalc2[2];
							}
							break;
						}
					}	
					break;

				case 2:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[3])){
							if(tempCalc3[1] < 0){
								tempCalc2[4] = tempCalc2[4] + -1*tempCalc3[2] * tempCalc2[1];
							}
							else{
								tempCalc2[4] = tempCalc2[4] + tempCalc3[2] * tempCalc2[1];
							}
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[4])){
							if(tempCalc3[1] < 0){
								tempCalc2[3] = tempCalc2[3] + -1*tempCalc3[2] * tempCalc2[1];
							}
							else{
								tempCalc2[3] = tempCalc2[3] + tempCalc3[2] * tempCalc2[1];
							}
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[3])){
							if(tempCalc3[2] < 0){
								tempCalc2[4] = tempCalc2[4] + -1*tempCalc3[1] * tempCalc2[1];
							}
							else{
								tempCalc2[4] = tempCalc2[4] + tempCalc3[1] * tempCalc2[1];
							}
							break;
						}
						
						//i.e. old_divis === tempCalc2[4]
						else{
							if(tempCalc3[2] < 0){
								tempCalc2[3] = tempCalcs[3] + -1*tempCalc3[1] * tempCalc2[1];
							}
							else{
								tempCalc2[3] = tempCalcs[3] + tempCalc3[1] * tempCalc2[1];
							}
							break;
						}
					}
					break;

				case 3:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[1])){
							if(tempCalc3[1] < 0){
								tempCalc2[2] = tempCalc2[2] + tempCalc3[2] * tempCalc2[4];
							}
							else{
								tempCalc2[2] = tempCalc2[2] + tempCalc3[2] * tempCalc2[4];
							}
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[2])){
							if(tempCalc3[2] < 0){
								tempCalc2[1] = tempCalc2[1] + -1*tempCalc3[2] * tempCalc2[4];
							}
							else{
								tempCalc2[1] = tempCalc2[1] + tempCalc3[2] * tempCalc2[4];
							}
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[1])){
							if(tempCalc3[2] < 0){
								tempCalc2[2] = tempCalc2[2] + -1*tempCalc3[1] * tempCalc2[4];
							}
							else{
								tempCalc2[2] = tempCalc2[2] + tempCalc3[1] * tempCalc2[4];
							}
							break;
						}
					
						//i.e. old_divis === tempCalc2[2]
						else{
							if(tempCalc3[2] < 0){
								tempCalc2[1] = tempCalcs[1] + -1*tempCalc3[1] * tempCalc2[4];
							}
							else{
								tempCalc2[1] = tempCalcs[1] + tempCalc3[1] * tempCalc2[4];
							}
							break;
						}
					}
					break;
					
				case 4:
					if(!divid_eq_one && divid_in_remain){
						if(old_divid === Math.abs(tempCalc2[1])){
							if(tempCalc3[1] < 0){
								tempCalc2[2] = tempCalc2[2] + (-1)*tempCalc3[2] * tempCalc2[3];
							}
							else{
								tempCalc2[2] = tempCalc2[2] + tempCalc3[2] * tempCalc2[3];
							}
							break;
						}
						
						else if(old_divid === Math.abs(tempCalc2[2])){
							if(tempCalc3[1] < 0){
								tempCalc2[1] = tempCalc2[1] + -1*tempCalc3[2] * tempCalc2[3];
							}
							else{
								tempCalc2[1] = tempCalc2[1] + tempCalc3[2] * tempCalc2[3];
							}
							break;
						}
					}
					if(!divis_eq_one && divis_in_remain){
						if(old_divis === Math.abs(tempCalc2[1])){
							if(tempCalc3[2] < 0){
								tempCalc2[2] = tempCalc2[2] + -1*tempCalc3[1] * tempCalc2[3];
							}
							else{
								tempCalc2[2] = tempCalc2[2] + tempCalc3[1] * tempCalc2[3];
							}
							break;
						}
					
						//i.e. old_divis === tempCalc2[2]
						else{
							if(tempCalc3[2] < 0){
								tempCalc2[1] = tempCalcs[1] + -1*tempCalc3[1] * tempCalc2[3];
							}
							else{
								tempCalc2[1] = tempCalcs[1] + tempCalc3[1] * tempCalc2[3];
							}
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

 		var finalStr = "<br />" + "The multiplicative inverse is: ";
 		//TODO: Better documentation
 		//If the inverse is negative it's not WRONG, it's just that
 		//often times its positive correspondent is more useful
 		if(inverse < 0){
 			finalStr += inverse.toString() + " = ";
 			//Inverse is currently negative so inverse = num1 - abs(inverse)
 			inverse = num1 + inverse;
 		}
 		finalStr += '<span class="result">' + inverse.toString() + '</span>';
 	
 		document.getElementById("final inverse").innerHTML = finalStr;

 		//For testing purposes:
 		//return inverse;
 	}
}


	






