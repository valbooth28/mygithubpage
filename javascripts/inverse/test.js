/**
 * File: test.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Testing script for the EEA file. Has accuracy and time tests.
  **/


//Running the accuracy test1 with super large numbers
function super_accuracy_test1(){
	//priming the html
	document.getElementById("test").innerHTML = "";

		var t0 = performance.now();
		accuracy_test1(209173);
		var t1 = performance.now();
		
		var time = t1-t0;
		var timeStr = "This test took " + time.toString() + " milliseconds.";
		timeStr += "<br /><br />";
		document.getElementById("test").innerHTML += timeStr;	
}

//In drastically increasing the numbers for my time test, I've started to have
//accuracy problems, so this runs the time test a bunch of times to try and find
//the upper limit of where I won't have accuracy problems
function super_time_test(){
	//priming the html for later
	document.getElementById("test").innerHTML = "";
	//These primes taken from: http://primes.utm.edu/
	var ranges1  = [49999759,  49999777,  49999783,  49999801,  49999819,  49999843,  49999847,  49999853]; 
	var ranges2  = [49999877,  49999883,  49999897,  49999903,  49999921,  49999991,  50000017,  50000021];
	var ranges3  = [50000047,  50000059,  50000063,  50000101,  50000131,  50000141,  50000161,  50000201]; 

	

	var allRanges = [ranges1, ranges2, ranges3];
	
	for(var i = 0; i < allRanges.length; i++){
		time_test(allRanges[i]);
	}
}


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
	var tmpInverse;
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
	print_results(trueCount, range-2, falseResults);
	
}

/*
	This function is aiming to try and find pairs of numbers that will 
	produce lots of individual calculations
*/
function long_calc_test(){

}

/**
	Tests how accurate our GCD algorithm is by runnig EEA in situations
	where there ISN'T a multiplicative inverse, only a GCD
	@param range: a prime number to be our num2 in our EEA tests
	Purposefully picked a prime so that way we can multiply it by 2,
	and run the EEA with all even numbers less then range*2. 
	Since range is prime, the GCD off all even nums < range*2 should be two
*/
function accuracy_test2(prime_range){
	var range = prime_range * 2;
	var trueCount = 0;
	var falseResults = new Array();
	var tmpGCD;
	
	for(var i = 2; i< range; i+=2){
		//Run EEA on with our nums
		tmpGCD = EEA(range, i);
		if(tmpGCD === 2){
			trueCount++;
		}
		else{
			falseResults.push(i);
		}
	}

	print_results(trueCount, (range/2)-1, falseResults);
}


function print_results(trueCount, numTests, falseResults){
	var resultStr1 = "Number of correct results: ";
	resultStr1 += trueCount.toString();
	resultStr1 += " / ";
	

	var percent = (trueCount/numTests) * 100;
	resultStr1 += numTests.toString();
	resultStr1 += " = ";
	resultStr1 += percent.toString();
	resultStr1 += " % <br />";
	//Print it out to the page
	document.getElementById("test").innerHTML += resultStr1; 

	//Let's hope we don't get in here
	if(percent !== 100){
		var resultStr2 = "Number of incorrect results = ";
		var incorrectNum = numTests - trueCount;
		resultStr2 += incorrectNum.toString();
		resultStr2 += "<br />Values: ";
		resultStr2 += falseResults.toString();
		resultStr2 += "<br />";
		//Print it out to the page
		document.getElementById("test").innerHTML += resultStr2;
	}
}



/**
	Time tests, to help determine what I want the max range to
	be. I think I don't want calculations to take longer than 5 seconds I think
*/
function time_test(ranges){
	//Maybe up this later? Running multiple tests per range because
	//different numbers have differing numbers of calculations
	var iterations = 100;	
	
	for(var i = 0; i < ranges.length; i++){
		var tmpRange = ranges[i];
		var values = new Array();
		var times = new Array();
		//Doing accuracy checks just to be sure
		var falseResults = new Array();
		
		while(values.length < iterations){
			//Getting a (hopefully) new random number
			var tmpRando = Math.floor((Math.random() * tmpRange) + 1);
			if(values.indexOf(tmpRando) === -1){
				values.push(tmpRando);

				//Time the running
				var t0 = performance.now();
				var tmpInverse = EEA(tmpRange, tmpRando);
				var t1 = performance.now();

				//NOTE: Times are in milliseconds
				times.push((t1 - t0));

				//Accuracy check just in case
				var mult_inverse = ((tmpInverse * tmpRando) % tmpRange);
				if(mult_inverse !== 1){
					falseResults.push(tmpRando);
				}

			}
		}

		//print the results
		print_times(tmpRange, times, falseResults);

	}
}


function print_times(range, times, falseResults){
	var printStr = "<br />For " + range.toString();
	//printStr+= times.toString();

	//Calculate the average
	var average = 0;
	for(var i = 0; i <times.length; i++){
		average += times[i];
	}
	average = average / times.length;
	printStr += " there's an average time of: " + average.toString();
	printStr += " milliseconds";

	//Hopefully we don't get here?
	if(falseResults.length > 0){
		printStr += "False results are: " + falseResults.toString();
	}

	//print out to the webpage
	document.getElementById("test").innerHTML += printStr;
}

