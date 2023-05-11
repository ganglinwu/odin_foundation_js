let rpsArray = ['rock', 'paper', 'scissors'];


function computerChoice() {
    comChoice = rpsArray.at(Math.floor(Math.random()*10)%3); //generates random number 0, 1 or 2
    return comChoice;
}    

function RPS(playerChoice) {
    
    // RPS will return score in 3 different values
    // -1 means computer win
    // 0 means draw or tie
    // 1 means player win
    // this also helps to implement cumulative counters
    // such as games player, games won by player or com etc
    let score = 0;
    
    
    // playerChoice will be user input from html page
    // computerChoice will be from function above
    let computerChoice = computerChoice(); 


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
        if (computerChoice === rpsArray.at(i)) {
            computerValue = i;
        }    
    }        

    // below we determine winner using value system
    let difference = playerValue - computerValue;

    if (playerValue === computerValue) {
        score = 0
        return score;
    }

    else if (Math.abs(difference) === 2) {
        if (difference < 0) {
            score = 1;
            return score;
        }
        else {
            score = -1;
            return score;
        }
    }
    
    else {
        if (difference < 0) {
            score = -1;
            return score;
        }
        else {
            score = 1;
            return score;
        }
        
    }
}
