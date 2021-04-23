//SETUP
var table_size = 30;
var energy = 5,
    energyMax = 5,
    energyRecharge = 2000; // recharge rate in ms
var sight = 5;
var time = 180; // start time in s
/*----------------------------------------------------------------*/

var mx, my, cx, cy;
var cop;
var i, j;
var col, row, tab;
var energyBar = document.createElement("h1");
var txt1 = document.createTextNode("Energy: " + energy);
energyBar.appendChild(txt1);
document.body.appendChild(energyBar);

var timeBar = document.createElement("h2");
var txt2 = document.createTextNode("Time(sec): " + time);
timeBar.appendChild(txt2);
document.body.appendChild(timeBar);


//Generate table
function drawTable() {
    tab = document.createElement("table");
    document.body.appendChild(tab);
    for (i = 0; i < table_size; i++) {
        row = document.createElement("tr");
        tab.appendChild(row);
        for (j = 0; j < table_size; j++) {
            col = document.createElement("td");
            col.setAttribute("x", j);
            col.setAttribute("y", i);
            col.setAttribute("onclick", "moveShip(this)")
            col.setAttribute("status", 'normal');
            col.setAttribute("status2", 'normal');
            row.appendChild(col);
        }
    }
}


//Spawn Cop
function spawnCop() {
    var randX = Math.floor(Math.random() * 2) * 29;
    var randY = Math.floor(Math.random() * 2) * 29;
    var node = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    node.setAttribute("status2", 'cop'); //cop spwan
}


//Spawn Ship
function spawnShip() {
    var randX = Math.floor(Math.random() * 10) + 11;
    var randY = Math.floor(Math.random() * 10) + 11;
    var node = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    node.setAttribute("status", 'ship') //ship declare
    return [randX, randY];
}


//main function
drawTable();
var first = spawnShip();
spawnCop();
hist_x = first[0], hist_y = first[1];


function moveCop() {
    var mx = hist_x,
        my = hist_y;
    var ship = document.querySelectorAll(`[x="${mx}"]`)[my];
    cop = document.querySelector(`[status2="cop"]`);
    cx = parseInt(cop.getAttribute("x"));
    cy = parseInt(cop.getAttribute("y"));
    cop.setAttribute("status2", 'cop_walked');
    if (ship.getAttribute("status2") == "cop_walked") {
        console.log("danger");
        if (cx < mx && cy < my) {
            cx++, cy++;
        } else if (cx == mx && cy < my) {
            cy++;
        } else if (cx > mx && cy > my) {
            cx--, cy++;
        } else if (cx > mx && cy == my) {
            cx--;
        } else if (cx > mx && cy > my) {
            cx--, cy--;
        } else if (cx == mx && cy > my) {
            cy--;
        } else if (cx < mx && cy > my) {
            cx++, cy--;
        } else if (cx < mx && cy == my) {
            cx++;
        }
    } else {
        //UPDATE
        //need new random pattern to avoid cop_walked
        //and when exiting a pursue
        var randX = Math.floor(Math.random() * 3) - 1;
        var randY = Math.floor(Math.random() * 3) - 1;
        if ((cx + randX >= 0) && (cx + randX < table_size)) {
            cx += randX;
        }
        if ((cy + randY >= 0) && (cy + randY < table_size)) {
            cy += randY;
        }
    }
    cop = document.querySelectorAll(`[x="${cx}"]`)[cy];
    cop.setAttribute("status2", 'cop');
}


//Energy Recharge
setInterval(function() {
    if (energy < energyMax) {
        energy++;
        document.querySelector("h1").innerHTML = "Energy: " + energy;
    }
}, energyRecharge);


//Timer
setInterval(function() {
    if (time > 0) {
        time--;
        document.querySelector("h2").innerHTML = "Time(sec): " + time;
    }
    if (!(time % 1)) {
        moveCop();
    }
}, 1000);


function moveShip(e) {
    if (energy && time > 0) {
        mx = e.getAttribute("x");
        my = e.getAttribute("y");
        //alert(mx + " " + my);

        //move
        if ((Math.abs(mx - hist_x) == 1 && Math.abs(my - hist_y) == 1) || (Math.abs(mx - hist_x) == 0 && Math.abs(my - hist_y) == 1) || (Math.abs(mx - hist_x) == 1 && Math.abs(my - hist_y) == 0)) {
            var node = document.querySelectorAll(`[x="${hist_x}"]`)[hist_y];
            //node.style.background = "yellow";
            node.setAttribute("status", 'ship_walked');

            node = document.querySelectorAll(`[x="${mx}"]`)[my];
            node.setAttribute("status", 'ship');
            hist_x = mx, hist_y = my;

            //energy fee
            //energy--;
            document.querySelector("h1").innerHTML = "Energy: " + energy;
        }

        //Vision Length
        for (i = 0; i < table_size; i++) {
            for (j = 0; j < table_size; j++) {
                break;
                node = document.querySelectorAll(`[x="${j}"]`)[i];
                if (Math.abs(hist_x - j) + Math.abs(hist_y - i) > sight) {
                    node.style.background = "grey";
                } else {
                    node.style.background = "";
                }
            }
        }
    }
}