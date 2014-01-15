/************************
jquery-fancynumbers v1.1
https://github.com/AldoRodz/jquery-fancynumbers/

requires jQuery 1.7+
Copyright (c) 2014, Aldo Rodríguez
************************/

(function($) {
	var elem, currentNumber, finalNumber, numberToAdd, difference, started;
	currentNumber = 0; numberToAdd = 1; smoothDescent = 2, started = false;

	// generate a number to add
	var getSumNumber = function(finalNumber, currentNumber) {

		if (finalNumber <= 100){
			// to small numbers
			var difference = parseInt(finalNumber - currentNumber)
			if (difference > 50){
				numberToAdd = parseInt(difference / 5)
			}
			else{
				numberToAdd = 1
			}
			
		}
		else if (finalNumber > 100){
			// to bigger numbers
			var difference = parseInt(finalNumber - currentNumber)
			if (difference > 50){
				numberToAdd = parseInt(finalNumber / 100) * 4
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
		// return the number to the sum
		numberToAdd = getSumNumber(finalNumber, currentNumber)

		if (currentNumber < finalNumber){
			// Add the number to the previous number
			currentNumber = parseInt(currentNumber) + numberToAdd
			// Show current number
			elem.text(currentNumber);
		}
		else if (currentNumber == finalNumber){
			// Finish if the current number is the one that started
			clearInterval(numberSum)
		}

	};

	// if everything it's ok start animation
	var startAnimation = function(elem, finalNumber){
		numberSum = setInterval(function(){createAnimation(elem, finalNumber)},5);
        elem.text("0");
        return true
	}

	// Check if is element is in viewport
	var isInViewport = function(elem) {
	    var windowViewTop = $(window).scrollTop();
    	var windowViewBottom = windowViewTop + $(window).height();


    	var elemTop = elem.offset().top;
    	var elemBottom = elemTop + elem.height();

    	return ((elemBottom >= windowViewTop) && (elemTop <= windowViewBottom) && (elemBottom <= windowViewBottom) && (elemTop >= windowViewTop));
	}

	$.fn.FancyNumbers = function() {
		// Get the start number which will end the animation
        finalNumber = parseInt($(this).text());
        elem = $(this);

        // Check is a valid number
        if (isNaN(finalNumber) == true){
        	console.log("FancyNumbers: This is not a correct number")
        	return false;
        }

        if (finalNumber == 0){
        	return false;
        }

        if (isInViewport(elem) === true && started === false){
        	started = startAnimation(elem, finalNumber)
        }
        else{
        	$(window).scroll(function(){
        		if (isInViewport(elem) === true && started === false){
        			started = startAnimation(elem, finalNumber)
        		}
        	});
        }


        return this;
    }

})(jQuery);
