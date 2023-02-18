class Phrase {
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }
  
    addPhraseToDisplay() {
      // Get the unordered list element with an ID of "phrase"
      const phraseList = document.querySelector('#phrase ul');
      let phraseHTML = '';
      for (let i = 0; i < this.phrase.length; i++) {
        // If the current character is a space, add an empty box
        if (this.phrase[i] === ' ') {
          phraseHTML += '<li class="space"></li>';
        } else {
          // Otherwise, add a hidden letter box with a class matching the current letter
          phraseHTML += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
        }
      }
      // Set the HTML of the unordered list element to the generated HTML
      phraseList.innerHTML = phraseHTML;
    }
  
    checkLetter(letter) {
      // Check if the selected letter is included in the phrase
      return this.phrase.includes(letter);
    }
  
    showMatchedLetter(letter) {
      // Get all elements with a class matching the selected letter
      const matchedLetters = document.querySelectorAll(`.${letter}`);
      for (let i = 0; i < matchedLetters.length; i++) {
        // Remove the "hide" class and add the "show" class to reveal the letter on the screen
        matchedLetters[i].classList.remove('hide');
        matchedLetters[i].classList.add('show');
      }
    }
  }
  