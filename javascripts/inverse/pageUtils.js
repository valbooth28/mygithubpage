/**
 * File: pageUtils.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Functions that deal with any HTML aspects of the inverse page.
  **/

//NOTE: The upper limit for the EEA calculation, chosen because 100 million was
//occasionally having some accuracy issues, 50 million's a good number
MAX_NUM = 50000000;
//Span classes that allow for highlighting the the gcd and inverse calcs
eqAccentSpan = '<span class="eqAccent">';
modAccentSpan = '<span class="modAccent">';

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
	//Thanks to Adam @amccarthy1 for the insight
	bool = bool && (n.indexOf("e") === -1);
	return bool;
}




/*
* Takes the input from the two num input boxes, checks that the input is
* valid, and if it is valid calls the EEA algorithm, if not prints out
* an error message.
*/
function readInput(){
	var num1;
	var num2;
	
	//Presetting to be no error
	var errNo = errorEnum.NO_ERROR; 
	
	//Clear out any past results
	document.getElementById("final inverse").innerHTML = "";
	document.getElementById("GCD calcs").innerHTML = "";
	document.getElementById("inverse calcs").innerHTML = "";
	document.getElementById("errors").innerHTML = "";

	//Grabs the input from the two text boxes
	num1 = document.getElementById('num1Input').value;
	num2 = document.getElementById('num2Input').value;
	
	//Checking if our first num is not a positive int
	if(!isPositiveInteger(num1)){
		errNo = errorEnum.NUM1_NOT_POS_INT;
	}
	//It is, keep going
	else{
		//Converting num1, clarifying base ten just in case
		num1 = parseInt(num1,10);
		
		//Checking if our second num isn't a positive int
		if(!isPositiveInteger(num2)){
			errNo = errorEnum.NUM2_NOT_POS_INT;
		}

		//It is, keep going
		else{
			num2 = parseInt(num2,10);

			//Check that numbers are within range
			if(num1 > MAX_NUM){
				errNo = errorEnum.NUM1_OUT_OF_RANGE;
			}
			else if(num2 > MAX_NUM){
				errNo = errorEnum.NUM2_OUT_OF_RANGE;
			}	
			
			//Check for zeroes
			else if(num1 === 0){
				errNo = errorEnum.NUM1_VAL_OF_ZERO;
			}
			else if(num2 === 0){
				errNo = errorEnum.NUM2_VAL_OF_ZERO;
			}
			
			//Check for one
			else if(num1 === 1){
				errNo = errorEnum.NUM1_VAL_OF_ONE;
			} 
			else if(num2 === 1){
				errNo = errorEnum.NUM2_VAL_OF_ONE;
			}
			
			//Check that the numbers are not the same, a modular integer ring of n
			//contains numbers of 1,2, ... n-1
			else if(num1 === num2){
				errNo = errorEnum.SAME_NUMS;
			}
			
		}
	}

	//No errors, proceed with calculations
	if(errNo === errorEnum.NO_ERROR){

		//NOTE: This is not an error, just something to help EEA.js along
		if(num1 < num2){
			//NOTE: I hear it's faster to use a tmpVariable then a one liner
			var tmpNum = num1;
			num1 = num2;
			num2 = tmpNum;
		}

		gcd(num1, num2);
	}
	else{
		//Print out the error to the page
		var errorStr = ERR_SPAN_STR + errorEnum.val[errNo].str;
		errorStr += '</span>';
		document.getElementById("errors").innerHTML = errorStr;

		//clear the appropriate text box, every enum value after
		//the GCD error requires some box to be cleared
		if(errNo > errorEnum.GCD_OF_ONE){
			
			//The even values correspond to the first text box
			if((errNo % 2) === 0){
				writeTextBox("num1Input", "");
			}
			//Odd ones the second text box
			else{
				writeTextBox("num2Input", "");
			}
		}
	}

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
	//Defining this str specifically in case I change my mind about what it is
	var MULT_STR = " • ";

	var calcStr = "";
	var tempPrintCalc;
	var newValue;
	var calcLen =  Calc.length;
	//TODO: when we're in multiplicative inverse check for 1s that we don't
	//need to print (LOW PRIORITY)

	if(isGCD){
		//Go and build the calcStr to be printed to the HTML page
		//by concatenating each number in the GCD calc w/appropriate
		//expressions
		for (var i = 0; i < calcLen ; i++) {
			
			tempPrintCalc = Calc[i];
			
			//starting equation accent span, if not the last equation
			if(i !== calcLen-1){
				calcStr += eqAccentSpan;
			}

			calcStr += tempPrintCalc[RESULT_INDEX].toString();
			calcStr += " = ";
			calcStr += tempPrintCalc[DIVID_INDEX].toString();
			calcStr += MULT_STR;
			calcStr += tempPrintCalc[DIVIS_INDEX].toString();
			
			//ending equation accent and starting mod accent
			if(i !== calcLen-1){
				calcStr += "</span>" + modAccentSpan;
			}
			
			calcStr += " + " + tempPrintCalc[REMAIN_INDEX].toString();
			

			if(i !== calcLen-1){
				calcStr+= "</span>";
			}

			
			//the last two calculations will be right next to each other,
			//for easy comparison with the inverse calcs
			if(i === calcLen -2){
				calcStr = "<br /><br />" + calcStr + "<br />";
			}
			else{
				//all others are given extra space for room to show
				//combinations on inverse side
				calcStr += "<br /> <br />";
			}
			
		}

		//Finally, print the calcStr out to the page
		document.getElementById("GCD calcs").innerHTML += calcStr;
	}

	//We're printing the multiplicative inverse, much more complicated
	else{
		var tmpAccentVar = -1;

		//for every calculation
		for (var i = Calc.length -1; i >= 0; i--) {
			
			tempPrintCalc = Calc[i];

			//for every index of that calculation
			for(var j = 0; j <tempPrintCalc.length; j++){
				newValue = tempPrintCalc[j];
				
				//Checking if an element is an array. Evidence online shows this
				//is the fastest way to check
				if(newValue.constructor === Array){
					//start highlighting
					calcStr += eqAccentSpan+ "(";
					calcStr += newValue[0].toString();
					calcStr += " - "+ Math.abs(newValue[1]).toString();
					calcStr += MULT_STR;
					calcStr += newValue[2].toString();
					//end highlighting
					calcStr += ") </span>";

					//Also, save this index so that the equation we're
					//swapping out for us, below us, gets highlighted
					tmpAccentVar = j;
				}
				else{
					if(newValue < 0){
						calcStr += " - ";
					}

					//Previous calculations show this is about to be subbed in,
					//so we need to accent it
					if(j === tmpAccentVar){
						calcStr += modAccentSpan;
					}

					calcStr += Math.abs(newValue).toString();
					
					if(j === tmpAccentVar){
						calcStr += "</span>";
						tmpAccentVar = -1;
					}
				}

				switch(j){
					case 0:
						calcStr += " = ";
						break;

					case 1:
						calcStr += MULT_STR;
						break;

					case 2:
						break;

					case 3:
						calcStr += MULT_STR;
						break;

				}

			}

			//Don't forget to add a newline so it's not all squished together
			calcStr+= "<br />";
		}
		//Print it out to the page
		document.getElementById("inverse calcs").innerHTML += calcStr + "<br /><br />";

	}

	
}
