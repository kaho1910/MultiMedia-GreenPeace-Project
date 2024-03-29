import closeGame from "../main/closeMinigame.js";
import rewardCheck from "../main/rewardMinigame.js"

let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');


// set up the core function for the computer that will use math.random to loop through an array and return that value
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// similar to convertcase but just takes lowercase and replaces with titlecase
function convertCase(anythingIwant) {
    if (anythingIwant === 'paper') return 'กระดาษ';
    if (anythingIwant === 'scissors') return 'กรรไกร';
    return 'ค้อน';
}

// Winning Condition - this handles what happens when the user clicks one of the choices where the value is them passed through as a parameter
function win(user, computer) {
    userScore++;
    // console.log('user score is ' + userScore + ' ' + user);
    userScore_span.innerHTML = userScore;
    const userName = ' (คุณ)'.fontsize(3).sup();
    const compName = ' (โจรสลัด)'.fontsize(3).sup();
    result_div.innerHTML = `<p>${convertCase(user)}${userName} กับ ${convertCase(computer)}${compName} คุณชนะ!</p>`;
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('winningStyles');
    setTimeout(() => roundStatus.classList.remove('winningStyles'), 300);
}

// Losing Condition - this handles what happens when the user clicks one of the choices where the value is them passed through as a parameter
function loses(user, computer) {
    computerScore++;
    // console.log('computer score is ' + computerScore + ' ' + computer);
    computerScore_span.innerHTML = computerScore;
    const userName = ' (คุณ)'.fontsize(3).sup();
    const compName = ' (โจรสลัด)'.fontsize(3).sup();
    result_div.innerHTML = `<p>${convertCase(user)}${userName} กับ ${convertCase(computer)}${compName} คุณแพ้!</p>`;
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('losingStyles');
    setTimeout(() => roundStatus.classList.remove('losingStyles'), 300);
}

// Draw Condition - this handles what happens when the user clicks one of the choices where the value is them passed through as a parameter
function draw(user, computer) {
    const userName = ' (คุณ)'.fontsize(3).sup();
    const compName = ' (โจรสลัด)'.fontsize(3).sup();
    result_div.innerHTML = `<p>เสมอกัน อิอิ</p>`;
    // "It was a draw! You both chose " + user + " " + computer; // old js
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('drawStyles');
    setTimeout(() => roundStatus.classList.remove('drawStyles'), 300);
}

// The core game functions that set up and determine the games actual logic aka paper beats rock etc
function game(userChoice) {
    const computerChoice = getComputerChoice();
    // console.log('Game function: user choice is = ' + userChoice);
    // console.log('Game function: computer choice is = ' + computerChoice);

    switch (userChoice + computerChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            win(userChoice, computerChoice);
            // console.log("user wins");
            break;
        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            loses(userChoice, computerChoice);
            // console.log("computer wins");
            break;
        case 'rockrock':
        case 'scissorsscissors':
        case 'paperpaper':
            draw(userChoice, computerChoice);
            // console.log("draw");
            break;
    }

    if (userScore == 3 && computerScore == 0) {
        //alert("คุณชนะแล้ว ทะเลปลอดภัย");
        userScore = 0;
        computerScore = 0;
        computerScore_span.innerHTML = computerScore;
        userScore_span.innerHTML = userScore;
        closeGame();
        rewardCheck(true);
    } else if (computerScore == 3 && userScore == 0) {
        //alert("คุณแพ้แล้ว ทะเลล่มสลาย อิอิ");
        userScore = 0;
        computerScore = 0;
        computerScore_span.innerHTML = computerScore;
        userScore_span.innerHTML = userScore;
        closeGame();
        rewardCheck(false);
    } else {
        if (userScore == 5) {
            //alert("คุณชนะแล้ว ทะเลปลอดภัย");
            userScore = 0;
            computerScore = 0;
            computerScore_span.innerHTML = computerScore;
            userScore_span.innerHTML = userScore;
            closeGame();
            rewardCheck(true);
        } else if (computerScore == 5) {
            //alert("คุณแพ้แล้ว ทะเลล่มสลาย อิอิ");
            userScore = 0;
            computerScore = 0;
            computerScore_span.innerHTML = computerScore;
            userScore_span.innerHTML = userScore;
            closeGame();
            rewardCheck(false);
        }
    }
}
// This function creates and adds an eventlistener to the rock, paper scissors html element and the passes the value of that element to the game function
function main() {
    rock_div.addEventListener('click', () => game('rock'));
    paper_div.addEventListener('click', () => game('paper'));
    scissors_div.addEventListener('click', () => game('scissors'));
}

main();