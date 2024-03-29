import drawTable from "./main/generate table.js";
import spawnShip from "./main/spawn ship.js";
import spawnCop from "./main/spawn cop.js";
import moveCop from "./main/move cop.js";
import moveShip from "./main/move ship.js";
import rewardArea from "./main/reward/area bomb.js"

// SETUP
var table_size = 30;
var energyMax = 30,
    energy = energyMax,
    energyRecharge = 1250; // recharge rate in ms
var sight = 5; // vision range
var cop_sight = 5; // cop vision range
var time = 150; // time in s
var minigame_num = 8; // number of minigame
var bonus_chance = 3; // in percentage
var reward_pool = 8;
window.count = 0;

/*----------------------------------------------------------------*/
//Time and Energy Bar
function energyInit() {
    var energyBar = document.createElement("h1");
    energyBar.setAttribute("id", "energyBar");
    var txt1 = document.createTextNode("Energy: " + energy + " / " + energyMax);
    energyBar.appendChild(txt1);
    document.body.appendChild(energyBar);
}

function timeInit() {
    var timeBar = document.createElement("h2");
    timeBar.setAttribute("id", "timeBar");
    var txt2 = document.createTextNode("Time(sec): " + time);
    timeBar.appendChild(txt2);
    document.body.appendChild(timeBar);
}
energyInit()

/*----------------------------------------------------------------*/
//Initial
drawTable(table_size, bonus_chance);
var first = spawnShip(table_size, sight);
spawnCop();
var hx = first[0],
    hy = first[1];


/*----------------------------------------------------------------*/
//Energy Recharge
function energyPoint() {
    if (energy < energyMax) {
        energy++;
        document.getElementById("energyBar").innerHTML = "Energy: " + energy + " / " + energyMax;
    }
}
var energyPointInterval = setInterval(energyPoint, energyRecharge);


/*----------------------------------------------------------------*/
//Check end main game
function checkEndMain() {
    var ship = document.querySelector(`[player="ship"]`);
    var ship_x = ship.getAttribute("x");
    var ship_y = ship.getAttribute("y");
    var cop = document.querySelector(`[bot="cop"]`);
    var cop_x = cop.getAttribute("x");
    var cop_y = cop.getAttribute("y");
    if (ship_x == cop_x && ship_y == cop_y) {
        cop.style.background = "url('../img/cop.gif')";
        cop.style.backgroundSize = "cover";
    }
    window.count = document.querySelectorAll("[player='ship_walked']").length + 1;
    if ((ship_x == cop_x && ship_y == cop_y) || (!time) || (window.count == (table_size * table_size))) {
        window.postMessage("removetheiframe", "*");
        clearInterval(energyPointInterval);
        clearInterval(timerInterval);
        document.removeEventListener('keydown', keyEvent);

        window.percent = parseInt(window.count / 9);
        if (window.count == (table_size * table_size)) {
            window.postMessage("end:win", "*");
        } else if (!time) {
            window.postMessage("end:time", "*");
        } else {
            window.postMessage("end:cop", "*");
        }
    }
}


/*----------------------------------------------------------------*/
//Timer
function timer() {
    if (time > 0) {
        time--;
        document.getElementById("timeBar").innerHTML = "Time(sec): " + time;
    }
    if (!(time % 1) && time > 0) {
        moveCop(hx, hy, table_size, cop_sight, sight);
    }
    checkEndMain();
}
var timerInterval


/*----------------------------------------------------------------*/
//Key Control

function keyEvent(key) {
    if (key.keyCode == 87 || key.keyCode == 38 || key.keyCode == 83 || key.keyCode == 40 || key.keyCode == 65 || key.keyCode == 37 || key.keyCode == 68 || key.keyCode == 39) {
        var check = document.querySelector('[player="ship"]');
        var cx = check.getAttribute("x");
        var cy = check.getAttribute("y");
        if (key.keyCode == 87 || key.keyCode == 38) {
            cy--;
        } else if (key.keyCode == 83 || key.keyCode == 40) {
            cy++;
        } else if (key.keyCode == 65 || key.keyCode == 37) {
            cx--;
        } else if (key.keyCode == 68 || key.keyCode == 39) {
            cx++;
        }
        var move = document.querySelectorAll(`[x="${cx}"]`)[cy];
        var flag = moveShip(move, energy, time, sight, hx, hy, table_size, energyMax, minigame_num);
        hx = flag[0], hy = flag[1], energy = flag[2];

        window.postMessage("tutorial:1-check", "*");
    }
}



/*----------------------------------------------------------------*/
//Tutorial
window.addEventListener("message", tutorial, false);

var tutorialCop, tutorialCopCont;
var tutor3 = 1;
var tutorial_check = 0

function tutorial(event) {
    console.log("check");
    if (event.data == "tutorial:start" && !tutorial_check) {
        console.log("check tutorial");
        tutorial_check = 1;
    }
    if (tutorial_check) {
        if (event.data == "tutorial:1-0") {
            document.addEventListener('keydown', keyEvent, false);
        } else if (event.data == "tutorial:1-check") {
            window.postMessage("tutorial:2", "*");
        } else if (event.data == "tutorial:2-check") {
            cop_sight = 60;
            tutorialCop = setInterval(function() {
                moveCop(hx, hy, table_size, cop_sight, sight)
            }, 1000);
        } else if (event.data == "tutorial:3" && tutor3) {
            clearInterval(tutorialCop);
            clearInterval(energyPointInterval);
            window.postMessage("tutorial:3-1", "*");
            tutor3 = 0;
            energy = 0;
            document.getElementById("energyBar").innerHTML = "Energy: " + energy + " / " + energyMax;
        } else if (event.data == "tutorial:4-1") {
            tutorialCopCont = setInterval(function() {
                moveCop(hx, hy, table_size, cop_sight, sight)
            }, 1000);
        } else if (event.data == "tutorial:bust") {
            document.removeEventListener('keydown', keyEvent);
            clearInterval(tutorialCopCont);
            window.postMessage("tutorial:end", "*");
        }
        /*else if (event.data == "backmain") {
               window.removeEventListener("message", tutorial, false);
           }
        */
    }
}


/*----------------------------------------------------------------*/
//Click to Start Game
window.addEventListener("message", start, false);

function start(event) {
    if (event.data == "main:start") {
        document.removeEventListener("message", start, false);

        timeInit() //insert timebar
        document.addEventListener('keydown', keyEvent, false);
        timerInterval = setInterval(timer, 1000);
    }
}


/*----------------------------------------------------------------*/
//Remove keydown function
function reKeydown(event) {
    if (event.data == "keydown-remove") {
        document.removeEventListener('keydown', keyEvent, false);
    }
}
document.addEventListener('keydown', reKeydown, false);


/*----------------------------------------------------------------*/
//Closing Minigame
function endMessage(event) {
    var element = document.getElementById("minigame");
    if (event.data == "removetheiframe" && element != null) {
        document.addEventListener('keydown', keyEvent, false);
        while (1) {
            var element = document.getElementById("minigame");
            if (element == null) {
                break;
            }
            element.parentNode.removeChild(element);
        }
    }
}
window.addEventListener("message", endMessage, false);


/*----------------------------------------------------------------*/
//Reward from Minigame
function rewardMessage(event) {
    if (event.data == "reward=1") {
        //reward = yes
        console.log("reward=yes");

        var rewardRandom = Math.floor(Math.random() * reward_pool);
        console.log("rewardRandom = " + rewardRandom);
        if (rewardRandom == 0 || rewardRandom == 1 || rewardRandom == 2) {
            // 0 energy += 1
            console.log("reward: energy");
            window.postMessage("reward:energy", "*");
            energy += 10;
            document.getElementById("energyBar").innerHTML = "Energy: " + energy + " / " + energyMax;
        } else if (rewardRandom == 3) {
            // 1 time += 30
            console.log("reward: time");
            window.postMessage("reward:time", "*");
            time += 30;
        } else if (rewardRandom == 4) {
            // 2 area bomb
            console.log("reward: area");
            window.postMessage("reward:areabomb", "*");
            rewardArea(table_size);
        } else if (rewardRandom == 5 || rewardRandom == 6) {
            // 3 energy max
            console.log("reward: energy max");
            window.postMessage("reward:energymax", "*");
            energyMax += 5;
            energy += 5;
            document.getElementById("energyBar").innerHTML = "Energy: " + energy + " / " + energyMax;
        } else if (rewardRandom == 7) {
            // 4 sight += 1
            console.log("reward: sight");
            window.postMessage("reward:sight", "*");
            sight += 1;
            for (let i = 0; i < table_size; i++) {
                for (let j = 0; j < table_size; j++) {
                    var node = document.querySelectorAll(`[x="${j}"]`)[i];
                    if (Math.abs(hx - j) + Math.abs(hy - i) > sight) {
                        node.style.background = "Tan";
                    } else {
                        node.style.background = "";
                    }
                }
            }
        }

    } else if (event.data == "reward=0") {
        //reward = no
        console.log("reward=no");
        window.postMessage("reward:none", "*");
    }
}
window.addEventListener("message", rewardMessage, false);


/*----------------------------------------------------------------*/