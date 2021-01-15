'use strict';

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

const element = localStorage.getItem("HighScore");
document.querySelector('.highscore').textContent = element;

const displayMessage = (message) => {
    document.querySelector('.message').textContent = message;
}

const checkGame = function() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);
    
    if(!guess) {
        displayMessage('No number');
        //player wins
    } else if (guess === secretNumber) {
        
        displayMessage('Correct number');
        document.querySelector('.number').textContent = secretNumber;

        document.querySelector('body').style.backgroundColor = 'green';

        document.querySelector('.number').style.width = '30rem';

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("HighScore", highScore);
            const element = localStorage.getItem("HighScore");
            document.querySelector('.highscore').textContent = element;
        }

        //wrong
    } else if (guess !== secretNumber) {
        if (score > 1) {
        
            score--;
            displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
            document.querySelector('.score').textContent = score;
            document.querySelector('.guess').value = '';
            document.querySelector('.guess').focus();
            
        } else {
            
            displayMessage('You lost the game');
            document.querySelector('.score').textContent = 0;
    
            document.querySelector('body').style.backgroundColor = 'red';
        }
    }
}

window.onload = () => {
    document.querySelector('.guess').focus();
  }

document.querySelector('.check').addEventListener('click', checkGame);

document.querySelector('.guess').addEventListener('keypress', (e) => {
    const gNumber = Number(document.querySelector('.guess').value);
    if (e.key === 'Enter') {
      checkGame();
    }
});

document.querySelector('.again').addEventListener('click', () => {

    score = 20;
    document.querySelector('.score').textContent = score;
    secretNumber = Math.trunc(Math.random()*20)+1;
    document.querySelector('.number').textContent = '?';
    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#4b4a4a';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';
});

