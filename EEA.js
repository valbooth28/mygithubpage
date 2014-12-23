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
	var remainder;
	var dividend;
	var newCalculation;
	
	var result = num1;
	var divisor = num2;
	var gcdCalculations = {};
	
	do{
		remainder = result % divisor;
		dividend = Math.floor(result/divisor);
		newCalculation = new Array();
		newCalculation.push(divisor, dividend, remainder);
		gcdCalculations[result] = newCalculation;
		result = divisor;
		divisor = remainder;
	}while(remainder > 1);

}






