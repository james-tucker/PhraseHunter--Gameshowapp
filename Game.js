class Game {
    // Constructor initiliazes value(s)
    constructor() {
        this.missed = 0;
        this.phrases = ['Mamba Mentality', 'Ship It', 'Go Rams', 'How are you', 'If you fall get up'];
        //Set in the gameStart method
        this.phraseClass = '';
    }

    getRandomPhrase() {
        // Get a random phrase from this.phrases from the contstructor, but not more than the length of the largest
        const randomNum = Math.floor(Math.random() * this.phrases.length);
        // Use a random number to get the phrase
        this.chosenPhrase = this.phrases[randomNum];
        // Return the randomly selected phrase
        return this.chosenPhrase;
    }

    handleInteraction(event, letter) {

        // Checks to see if the letter is present in the phrase 
        const letterIsInPhrase = this.phraseClass.checkLetter(letter);

        if (letterIsInPhrase) {
            // If the letter is in, then display the letter
            this.phraseClass.showMatchedLetter(letter);
            // Check to see if the player has won the game
            this.checkForWin();
        } else {
            // If the letter is not in the phrase, use this else statement
            // Check for the keyboard event
            if (event instanceof KeyboardEvent) {
                // Save the elements that are not in the phrase
                const wrongInputs = document.querySelectorAll('.wrong');

                // If any wrong inputs (letters not in the phrase)
                if (wrongInputs) {
                    /* loop over the elements and if their textContent equals
                    the typed letter, prevent the script from running further
                    so te player does not lose lives by typing the wrong letter
                     multiple times */
                    for (let i = 0; i < wrongInputs.length; i ++) {
                        if (wrongInputs[i].textContent === letter) {
                            return false;
                        }
                    }
                }

                //Get all button elements that have the key class
                const buttonElements = document.querySelectorAll('.key');
                let targetLetter;

                // Loop over all the button elements
                for (let i = 0; i < buttonElements.length; i ++) {
                    
                    if (buttonElements[i].textContent === letter) {
                        targetLetter = buttonElements[i];
                    }
                }

                targetLetter.classList.add('wrong');
            } else {
                //If the wrong letter is clicked, add the wrong class
                event.target.classList.add('wrong');
            }

         //Removes a life, see ya!
            this.removeLife();
        }
    }

    removeLife() {
        // Adding 1 to missed entries
        this.missed += 1;
        // Removes the heart (life) from the screen
        document.getElementsByClassName('tries')[0].remove();

        // Game over! If five wrong tries
        if (this.missed === 5) {
            // call gameover and pass some text
            this.gameOver('lost, no more lives left!');
        }
    }

    checkForWin() {
        // How many letters have the show class
        const showCount = document.querySelectorAll('.show').length;
        // Checks the length of the phrase(s)
        const letterCount = this.phraseClass.phrase.length;

        // When the show count = the letter count the game is over (winner winner chicken dinner!)
        if (letterCount === showCount) {
            // call gameover and pass the text including the guessed phrase
            this.gameOver(`You won! The phrase was <i>"${this.chosenPhrase}</i>"`);
        }
    }

    gameOver(message) {
        document.getElementById('overlay').style.display = 'block';
        // Shows the message in an overlay
        document.getElementById('game-over-message').innerHTML = message;
        // changes the start game button to reset
        document.getElementById('btn__reset').textContent = 'Reset Game';
    }

    startGame() {
      //Start the game!
        if (document.getElementById('btn__reset').textContent === 'Reset Game') {
            window.location.reload(true);
            return false;
        }

        // Grabs one of the random phrases from the array this.phrases
        const phrase = this.getRandomPhrase();

        this.phraseClass = new Phrase(phrase);
        // Shows the phrase on the screen
        this.phraseClass.addPhraseToDisplay();
        // Just hiding the overlay
        document.getElementById('overlay').style.display = 'none';
    }
}
