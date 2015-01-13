/**
 * File: test.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Testing script for the EEA file. Has accuracy and time tests.
  **/


/**
	Tests how accurate our EEA algorithm is in situations where
	there should be a multiplicative inverse
	@param range: a prime number to be our num2 in our EEA tests
	Purposefully picked prime because every number < range will have 
	a multiplicative inverse
*/
function accuracy_test1(range){
	var trueCount = 0;
	var falseResults = new Array();
	//Run the tests
	for(var i = 2; i < range; i++){
		tmpInverse = EEA(range, i);
		//If the tmpInverse is correct, tmpInverse * i mod range
		//should equal 1
		if(((tmpInverse * i) % range) === 1){
			trueCount++;
		}
		else{
			falseResults.push(i);
		}
	}

	//Now print the results
	var resultStr1 = "Number of correct results: ";
	resultStr1 += trueCount.toString();
	resultStr1 += " / ";
	//The Z(range) ring has range-1 members but the multiplicative
	//inverse of 1 is ALWAYS 1
	var numTests = range - 2;
	var percent = (trueCount/numTests) * 100;
	resultStr1 += numTests.toString();
	resultStr1 += " = ";
	resultStr1 += percent.toString();
	resultStr1 += " % <br />";
	//Print it out to the page
	document.getElementById("test").innerHTML = resultStr1; 

	//Let's hope we don't get in here
	if(percent !== 100){
		var resultStr2 = "Number of incorrect results = ";
		var incorrectNum = numTests - trueCount;
		resultStr2 += incorrectNum.toString();
		resultStr2 += "<br />Values: ";
		resultStr2 += falseResults.toString();
		//Print it out to the page
		document.getElementById("test").innerHTML += resultStr2;
	}
}

//TODO
// function time_test(){

// }

