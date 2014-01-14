(function($) {
	var container, currentNumber, finalNumber, numberToAdd, difference;
	currentNumber = 0; numberToAdd = 1; smoothDescent = 2;

	// generate a number to add
	var getSumNumber = function(finalNumber, currentNumber) {
		finalNumber = parseInt(finalNumber)
		currentNumber = parseInt(currentNumber)

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

		// sometimes needed to add 1
		if (numberToAdd == 0){
			numberToAdd = 1
		}

		return numberToAdd
	};

	var setAnimation = function(container, finalNumber) {
		// return the number to the sum
		numberToAdd = getSumNumber(finalNumber, currentNumber)

		if (currentNumber < finalNumber){
			// Add the number to the previous number
			currentNumber = parseInt(currentNumber) + numberToAdd
			// Show current number
			container.text(currentNumber);
		}
		else if (currentNumber == finalNumber){
			// Finish if the current number is the one that started
			clearInterval(numberSum)
		}

	};

	$.fn.FancyNumbers = function() {
		// Get the start number which will end the animation
        finalNumber = $(this).text();
        container = $(this);

        // Check is a valid number
        if (isNaN(finalNumber) == true){
        	console.log("FancyNumbers: This is not a correct number")
        	return false;
        }

        // Start a Interval to increment number from 0
        numberSum = setInterval(function(){setAnimation(container, finalNumber)},5);

        container.text("0");

        return this;
    }

})(jQuery);