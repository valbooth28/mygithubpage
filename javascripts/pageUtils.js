/**
 * File: pageUtils.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Functions that deal any HTML aspects of the page.
 * TODO: Make a function that edits the innerHTML elements
  **/

//NOTE: The upper limit for the EEA calculation, chosen because 100 million was
//occasionally having some accuracy issues, 50 million's a good number
MAX_NUM = 50000000;


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
	var num1;
	var num2;
	
	//Presetting to be no error
	var errNo = errorEnum.NO_ERROR; 
	//Clear out any past results
	document.getElementById("final inverse").innerHTML = "";

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

		EEA(num1, num2);
	}
	else{
		//Print out the error to the page
		var errorStr = ERR_SPAN_STR + errorEnum.val[errNo].str;
		errorStr += '</span>';
		document.getElementById("GCD calcs").innerHTML = errorStr;

		//clear the appropriate text box, every enum after
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
		document.getElementById("inverse calcs").innerHTML = "";


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
			calcStr += "<br /> <br />";
		}
		//Finally, print the calcStr out to the page
		document.getElementById("GCD calcs").innerHTML += calcStr;
	}
	//We're printing the multiplicative inverse, much more complicated
	else{
		// calcStr += "<br />";

		for (var i = Calc.length -1; i >= 0; i--) {
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
		document.getElementById("inverse calcs").innerHTML += calcStr + "<br />";

	}

	
}