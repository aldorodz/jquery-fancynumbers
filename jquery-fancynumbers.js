/*! jquery-fancynumbers v1.2 Copyright (c) 2014, Aldo Rodríguez
 *  https://github.com/AldoRodz/jquery-fancynumbers/ */

(function($) {
	// generate a number to add
	var getSumNumber = function(finalNumber, currentNumber) {
		var enumberToAdd, difference;
		if (finalNumber <= 100){
			// to small numbers
			difference = parseInt(finalNumber - currentNumber)
			if (difference > 50){
				numberToAdd = parseInt(difference / 5)
			}
			else{
				numberToAdd = 1
			}
			
		}
		else if (finalNumber > 100){
			// to bigger numbers
			difference = parseInt(finalNumber - currentNumber)
			if (difference > 50){
				numberToAdd = parseInt(finalNumber / 100)
			}
			else{
				numberToAdd = parseInt(difference / 5)
			}
		}

		// sometimes needed to add only 1 to finish the animation
		if (numberToAdd == 0){
			numberToAdd = 1
		}

		return numberToAdd
	};

	var createAnimation = function(elem, finalNumber) {
		var currentNumber = $(elem).text();
		// return the number to the sum
		numberToAdd = getSumNumber(finalNumber, currentNumber)

		if (currentNumber < finalNumber){
			// Add the number to the current number and show the new number
			$(elem).text(parseInt(currentNumber) + numberToAdd);
		}
		else if (currentNumber == finalNumber){
			// Finish if the current number is the one that started
			clearInterval(elem.numberSum)
		}

	};

	// function to start the animation
	var startAnimation = function(elem, finalNumber) {
		elem.numberSum = setInterval(function(){createAnimation(elem, finalNumber)}, 10);
        return true;
	};

	// Check if is element is in viewport
	var isInViewport = function() {
	    var windowViewTop = $(window).scrollTop();
    	var windowViewBottom = windowViewTop + $(window).height();


    	var elemTop = $(this).offset().top;
    	var elemBottom = elemTop + $(this).height();

    	return ((elemBottom >= windowViewTop) && (elemTop <= windowViewBottom) && (elemBottom <= windowViewBottom) && (elemTop >= windowViewTop));
	};

	var functions = {
		init: function(){
			var elem = this;
			elem.started = false
			// Get the start number which will end the animation
			elem.finalNumber = parseInt($(elem).text());
			// Set 0
			$(elem).text("0");
			// Check is a valid number
	        if (isNaN(elem.finalNumber) == true){
	        	console.log("FancyNumbers: This is not a correct number")
	        	return false;
	        }

	        if (elem.finalNumber == 0){
	        	return false;
	        }

	        // if everything is okay start the animation
	        if (isInViewport.call(elem) === true && elem.started === false){
	        	elem.started = startAnimation(elem, elem.finalNumber)
	        }
	        else{
	        	$(window).scroll(function(){
	        		if (isInViewport.call(elem) === true && elem.started === false){
	        			elem.started = startAnimation(elem, elem.finalNumber)
	        		}
	        	});
	        }

		}
	}

	$.fn.FancyNumbers = function() {
        var init = functions.init;
		this.each(function(){
		    init.call(this);
		});
        return this;
    }

})(jQuery);
