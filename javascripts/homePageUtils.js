/**
 * File: homePageUtils.js
 * Author: Val Booth <vxb4825@rit.edu>
 * Purpose: Functions that deal with the DOM elements of the home page.
  **/

$(document).ready(function(){
	var downURL = "url(\"./images/down-bullet.png\")";
	var upURL = "url(\"./images/up-bullet.png\")";
   $('li.expandable').click(function(){
   		var subRegion = $(this).find('div.sub-region');
   		if(subRegion.css("display").localeCompare("none") == 0){
   			subRegion.css("display", "inline-block");
   			$(this).css("list-style-image", upURL);
   		}else{
   			subRegion.css("display", "none");
   			$(this).css("list-style-image", downURL);
   		}
   });
})