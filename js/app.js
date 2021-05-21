import drawTable from "./main/generate table.js";
import spawnShip from "./main/spawn ship.js";
import spawnCop from "./main/spawn cop.js";
import moveCop from "./main/move cop.js";
import moveShip from "./main/move ship.js";

// SETUP
var table_size = 30;
var energyMax = 20,
    energy = energyMax,
    energyRecharge = 1250; // recharge rate in ms
var sight = 5; // vision range
var time = 1800; // time in s
var bonus_chance = 3; // in percentage
var reward_pool = 2;


/*----------------------------------------------------------------*/
//Time and Energy Bar
var energyBar = document.createElement("h1");
var txt1 = document.createTextNode("Energy: " + energy);
energyBar.appendChild(txt1);
document.body.appendChild(energyBar);

var timeBar = document.createElement("h2");
var txt2 = document.createTextNode("Time(sec): " + time);
timeBar.appendChild(txt2);
document.body.appendChild(timeBar);


/*----------------------------------------------------------------*/
//Initial
drawTable(table_size, bonus_chance);
var first = spawnShip();
spawnCop();
var hx = first[0],
    hy = first[1];


/*----------------------------------------------------------------*/
//Energy Recharge
setInterval(function() {
    if (energy < energyMax) {
        energy++;
        document.querySelector("h1").innerHTML = "Energy: " + energy;
    }
}, energyRecharge);


/*----------------------------------------------------------------*/
//Timer
setInterval(function() {
    if (time > 0) {
        time--;
        document.querySelector("h2").innerHTML = "Time(sec): " + time;
    }
    if (!(time % 1) && time > 0) {
        moveCop(hx, hy, table_size);
    }
}, 1000);


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
    var time_reward = 0;
    var flag = moveShip(move, energy, time, sight, hx, hy, table_size, reward_pool, time_reward);
    hx = flag[0], hy = flag[1], energy = flag[2], time_reward = flag[3];

    if (time_reward) {
        time += 100;
    }
}


/*----------------------------------------------------------------*/