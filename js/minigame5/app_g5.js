import closeGame from "../main/closeMinigame.js";
import rewardCheck from "../main/rewardMinigame.js";

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
};
let number1 = random(-25, 25);
let number2 = random(-25, 25);
while (number1 == number2) {
    number2 = random(0, 50);
}
console.log(number1);
console.log(number2);
document.querySelector('.results1').innerHTML = number1;
document.querySelector('.results2').innerHTML = number2;

function funcUp() {
    number2 += 1;
    if (number2 > 25) {
        number2 = -25;
    }
    document.querySelector('.results2').innerHTML = number2;
    if (number1 == number2) {
        finish();
    }
}

function funcDown() {
    number2 -= 1;
    if (number2 < -25) {
        number2 = 25;
    }
    document.querySelector('.results2').innerHTML = number2;
    if (number1 == number2) {
        finish();
    }
}

document.getElementById("btn1").addEventListener("click", funcDown);

document.getElementById("btn2").addEventListener("click", funcUp);

function finish() {
    document.getElementsByClassName('results1')[0].style.background = "lightgreen";
    document.getElementsByClassName('results2')[0].style.background = "lightgreen";
    document.getElementById("btn1").removeEventListener('click', funcDown);
    document.getElementById("btn2").removeEventListener('click', funcUp);
    console.log("END");
    closeGame();
    rewardCheck(true);
}