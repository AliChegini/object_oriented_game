class Game {
    constructor() {
      this.missed = 0;
      this.phrases = [
        new Phrase('Phrase one'),
        new Phrase('Phrase two'),
        new Phrase('Phrase three'),
        new Phrase('Phrase four'),
        new Phrase('Phrase five')
      ];
      this.activePhrase = null;
    }
  
    // Method to start the game
    startGame() {
      // Hide the start screen overlay
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';
  
      // Set the active phrase to a random phrase and add it to the board
      this.activePhrase = this.getRandomPhrase();
      this.activePhrase.addPhraseToDisplay();
    }
  
    // Method to get a random phrase from the phrases array
    getRandomPhrase() {
      const index = Math.floor(Math.random() * this.phrases.length);
      return this.phrases[index];
    }
  
    // Method to handle player interactions with the onscreen keyboard
    handleInteraction(button) {
      // Disable the selected letter's onscreen keyboard button
      button.disabled = true;
  
      // Check if the selected letter is in the active phrase
      if (this.activePhrase.checkLetter(button.textContent)) {
        // Add the chosen CSS class to the selected letter's keyboard button
        button.classList.add('chosen');
  
        // Reveal the matching letter(s) on the board
        this.activePhrase.showMatchedLetter(button.textContent);
  
        // Check if the player has won the game
        if (this.checkForWin()) {
          this.gameOver(true);
        }
      } else {
        // Add the wrong CSS class to the selected letter's keyboard button
        button.classList.add('wrong');
  
        // Remove a life from the scoreboard
        this.removeLife();
      }
    }
  
    // Method to remove a life from the scoreboard
    removeLife() {
      // Replace a liveHeart.png image with a lostHeart.png image
      const hearts = document.querySelectorAll('.tries img');
      hearts[this.missed].src = 'images/lostHeart.png';
  
      // Increment the missed property
      this.missed++;
  
      // End the game if the player has used up all their lives
      if (this.missed === 5) {
        this.gameOver(false);
      }
    }
  
    // Method to check if the player has revealed all of the letters in the active phrase
    checkForWin() {
      const hiddenLetters = document.querySelectorAll('.hide');
      return hiddenLetters.length === 0;
    }
  
    // Method to end the game and display the start screen overlay with the game outcome
    gameOver(gameWon) {
      const overlay = document.getElementById('overlay');
      overlay.style.display = '';
  
      const message = document.getElementById('game-over-message');
      if (gameWon) {
        message.textContent = 'Congratulations, you won!';
        overlay.classList.replace('start', 'win');
      } else {
        message.textContent = 'Sorry, better luck next time!';
        overlay.classList.replace('start', 'lose');
      }
  
      // Reset the game board and properties
      const phraseUl = document.getElementById('phrase').firstElementChild;
      phraseUl.innerHTML = '';
      const keys = document.querySelectorAll('.key');
      keys.forEach(key => {
        key.classList.remove('wrong', 'chosen');
        key.disabled = false;
      });
      const hearts = document.querySelectorAll('.tries img');
      hearts.forEach(heart => heart.src = 'images/liveHeart.png');
      this.missed = 0;
    }

    /**
    * Reset the gameboard between games
    */
    reset() {
        // Remove all li elements from the Phrase ul element
        const phraseUl = document.querySelector('#phrase ul');
        phraseUl.innerHTML = '';

        // Enable all of the onscreen keyboard buttons and update each to use the key CSS class
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.disabled = false;
            key.classList.remove('chosen');
            key.classList.remove('wrong');
            key.classList.add('key');
        });

        // Reset all of the heart images in the scoreboard to display the liveHeart.png image
        const hearts = document.querySelectorAll('.tries img');
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });

        // Reset the number of missed guesses to 0
        this.missed = 0;
    }

  }
  