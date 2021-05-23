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
var minigame_num = 5; // number of minigame
var bonus_chance = 3; // in percentage
var reward_pool = 4;


/*----------------------------------------------------------------*/
//Time and Energy Bar
var energyBar = document.createElement("h1");
energyBar.setAttribute("id", "energyBar");
var txt1 = document.createTextNode("Energy: " + energy + " / " + energyMax);
energyBar.appendChild(txt1);
document.body.appendChild(energyBar);

var timeBar = document.createElement("h2");
timeBar.setAttribute("id", "timeBar");
var txt2 = document.createTextNode("Time(sec): " + time);
timeBar.appendChild(txt2);
document.body.appendChild(timeBar);


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
    if ((ship_x == cop_x && ship_y == cop_y) || (!time)) {
        window.postMessage("removetheiframe", "*");
        clearInterval(energyPointInterval);
        clearInterval(timerInterval);
        document.removeEventListener('keydown', keyEvent);

        var count = document.querySelectorAll("[player='ship_walked']").length + 1;

        alert("END");
        alert("tile(s) count : " + count);

        cop.style.background = "url('../img/cop.gif')";
        cop.style.backgroundSize = "cover";
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
        moveCop(hx, hy, table_size, cop_sight);
    }
    checkEndMain();
}
var timerInterval = setInterval(timer, 1000);


/*----------------------------------------------------------------*/
//Key Control
document.addEventListener('keydown', keyEvent, false);

function keyEvent(key) {
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
}


/*----------------------------------------------------------------*/
//Closing Minigame
function endMessage(event) {
    var element = document.getElementById("minigame");
    if (event.data == "removetheiframe" && element != null) {
        element.parentNode.removeChild(element);
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
        if (rewardRandom == 0) {
            // 0 energy += 1
            console.log("reward: energy");
            alert("energy");
            energy += 10;
            document.getElementById("energyBar").innerHTML = "Energy: " + energy + " / " + energyMax;
        } else if (rewardRandom == 1) {
            // 1 time += 5
            console.log("reward: time");
            alert("time");
            time += 30;
        } else if (rewardRandom == 2) {
            // 2 area bomb
            console.log("reward: area");
            alert("area");
            rewardArea(table_size);
        } else if (rewardRandom == 3) {
            // 3 energy max
            console.log("reward: energy max");
            alert("energ max");
            energyMax += 5;
        }

    } else if (event.data == "reward=0") {
        //reward = no
        console.log("reward=no");
    }
}
window.addEventListener("message", rewardMessage, false);


/*----------------------------------------------------------------*/