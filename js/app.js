// Create a new instance of the Game class
const game = new Game();

// Add event listener to the "Start Game" button
const startButton = document.getElementById('btn__reset');
startButton.addEventListener('click', () => {
  game.startGame();
});

// Add event listeners to the onscreen keyboard buttons
const keyboard = document.getElementById('qwerty');
keyboard.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    game.handleInteraction(event.target);
  }
});
