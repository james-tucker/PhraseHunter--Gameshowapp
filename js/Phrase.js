class Phrase {
    // Adding constructor method to save to class
    constructor(phrase) {
        this.phrase = phrase;
    }

    addPhraseToDisplay() {
        // gets the phrase
        const phrase = this.phrase;
        // Gets the item to append letters
        const list = document.getElementById('phrase').firstElementChild;

        // Loop the phrase
        for (let i = 0; i < phrase.length; i ++ ) {
            let letterItem = '';

            if (phrase[i] === ' ') {
                letterItem = `<li class="hide show letter ${phrase[i]}"> ${phrase[i]} </li>`;
            } else {
                // If the item is a letter, add it to the list
                letterItem = `<li class="letter ${phrase[i]}"> ${phrase[i]} </li>`;
            }

            list.insertAdjacentHTML('beforeEnd', letterItem)
        }
    }

    checkLetter(letter) {
        //If the selected letter matches, show as true
        return !!this.phrase.match(letter);
    }

    showMatchedLetter(letter) {
        // Get elements that have the same class name
        const letterElements = document.getElementsByClassName(letter);
        for (let i = 0; i < letterElements.length; i ++) {
            letterElements[i].classList.add('show');
        }
    }
}
