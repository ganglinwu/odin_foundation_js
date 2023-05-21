let rpsArray = ['rock', 'paper', 'scissors'];

// let's initialize some counters for stats
var gamesPlayed = 0;
var playerWins = 0;
var computerWins = 0;
var winPercentage = 0;


function computerChoice() {
    let comChoice = rpsArray.at(Math.floor(Math.random()*10)%3); //generates random number 0, 1 or 2
    return comChoice;
}

// event listener for buttons
var rockbtn = document.querySelector('#rockbtn');
var paperbtn = document.querySelector('#paperbtn');
var scissorsbtn = document.querySelector('#scissorsbtn');


rockbtn.addEventListener('click', () => {
    RPS('rock');
});

paperbtn.addEventListener('click', () => {
    RPS('paper');
});

scissorsbtn.addEventListener('click', () => {
    RPS('scissors');
});



function RPS(playerChoice) {
    
    // RPS win 3 different values
    // -1 means computer win
    // 0 means draw or tie
    // 1 means player win
    // this also helps to implement cumulative counters
    // such as games player, games won by player or com etc
    let score = 0;
    
    
    // playerChoice will be user input from html page
    // computerChoice will be from function above
    let compChoice = computerChoice(); 
    
    
    // to compare rock, paper, scissors let's implement values
    // by using values we can shorten the number of cases to consider
    let playerValue, computerValue = 0;
    
    // assign rock = 0 
    // paper = 1
    // scissors = 2 
    for (let i=0; i<3; i++) {
        if (playerChoice === rpsArray.at(i)) {
            playerValue = i;
        }    
        if (compChoice === rpsArray.at(i)) {
            computerValue = i;
        }    
    }        
    
    // below we determine winner using value system
    let difference = playerValue - computerValue;
    
    if (playerValue === computerValue) {
        score = 0;
    }
    
    else if (Math.abs(difference) === 2) {
        if (difference < 0) {
            score = 1;
        }
        else {
            score = -1;
        }
    }
    
    else {
        if (difference < 0) {
            score = -1;
        }
        else {
            score = 1;
        }
        
    }
    
    // let's update html page with computer choice
    
    document.getElementById('comChoice').textContent = `Computer chose: ${compChoice}`;
    
    // let's update stats and counters
    gamesPlayed += 1;
    if (score == 1) {
        playerWins += 1;
        document.getElementById('winner').textContent = `You chose: ${playerChoice}.. You WIN!`;
    }
    else if (score == -1) {
        computerWins += 1;
        document.getElementById('winner').textContent = `You chose: ${playerChoice}.. You lost..`;
    }
    else {
        document.getElementById('winner').textContent = `You chose: ${playerChoice}.. It's a tie`;
    }
    winPercentage = (playerWins/gamesPlayed*100).toFixed(2);
    
    document.getElementById('gamesPlayed').textContent = `${gamesPlayed}`;
    document.getElementById('playerScore').textContent = `${playerWins}`;
    document.getElementById('comScore').textContent = `${computerWins}`;
    document.getElementById('winPercentage').textContent = `${winPercentage}%`;

    if (playerWins == 5) {
        winnerIsPlayer();
    } else if (computerWins == 5) {
        winnerIsComputer();
    }
}


function winnerIsPlayer() {
    let buttons = document.querySelectorAll('button')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    document.body.style.cssText = 'background-color:green;'
    document.querySelector('h1').textContent = 'PLAYER WINS!!!'
}

function winnerIsComputer() {
    let buttons = document.querySelectorAll('button')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    document.body.style.cssText = 'background-color:red;'
    document.querySelector('h1').textContent = 'Computer wins!!!'
}