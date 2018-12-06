// Initializes the game class
const game = new Game();

function resetDisplay() {
    //When the reset button is clicked, start the game (over if necessary)
    game.startGame();
}

function markButton(event) {
    if (event.target.tagName === 'BUTTON') {
        // Get the selected letter
        const letter = event.target.textContent

        const targetLetter = event.target;

        // Disable letter once its already been selected
        targetLetter.setAttribute('disabled', 'true');

        targetLetter.classList.add('chosen');
        // Pass the event object & letter
        game.handleInteraction(event, letter);

    } else if (event instanceof KeyboardEvent) {
        // Store the letter as lowercase
        const input = event.key.toLowerCase();
        // Verifies the letter is in the alphabet
        const letterReg = /[a-z]/g;
        // Verify the input is a letter
        const inputIsLetter = input.match(letterReg);

        if (inputIsLetter) {
            // Get all the elements on the screen
            const buttonElements = document.querySelectorAll('.key');
            let targetLetter;

            for (let i = 0; i < buttonElements.length; i ++) {
                // Store that element in the target letter
                if (buttonElements[i].textContent === input) {
                    targetLetter = buttonElements[i];
                }
            }
            // Disable the letter that has been selected so it can't be chosen again

            targetLetter.setAttribute('disabled', 'true');
            // Add the class to the chosen element
            targetLetter.classList.add('chosen');
            // Passing the event object to the letter
            game.handleInteraction(event, input);
        }
    }
}

// Listens for button click to reset game
document.getElementById('btn__reset').addEventListener('click', resetDisplay);

// Listens to event clicks on buttons
document.getElementById('qwerty').addEventListener('click', markButton);

// Listens for keyboard clicks
document.addEventListener("keypress", markButton);
