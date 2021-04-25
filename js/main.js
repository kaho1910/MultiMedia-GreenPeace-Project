//SETUP
var table_size = 30;
var energy = 5,
    energyMax = 5,
    energyRecharge = 1100; // recharge rate in ms
var sight = 5; // vision range
var time = 1800; // start time in s
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
            col.setAttribute("player", 'normal');
            col.setAttribute("bot", 'normal');
            col.setAttribute("vision", '0');
            row.appendChild(col);
        }
    }
}


//Spawn Cop
function spawnCop() {
    var randX = Math.floor(Math.random() * 2) * 29;
    var randY = Math.floor(Math.random() * 2) * 29;
    var node = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    node.setAttribute("bot", 'cop'); //cop spwan
}


//Spawn Ship
function spawnShip() {
    var randX = Math.floor(Math.random() * 10) + 11;
    var randY = Math.floor(Math.random() * 10) + 11;
    var node = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    node.setAttribute("player", 'ship') //ship spawn
    return [randX, randY];
}


drawTable();
var first = spawnShip();
spawnCop();
hist_x = first[0], hist_y = first[1];


function moveCop() {
    var mx = hist_x,
        my = hist_y;
    var ship = document.querySelectorAll(`[x="${mx}"]`)[my];
    cop = document.querySelector('[bot="cop"]');
    cx = parseInt(cop.getAttribute("x"));
    cy = parseInt(cop.getAttribute("y"));
    cop.setAttribute("bot", 'cop_walked');
    if (ship.getAttribute("bot") == "cop_walked") {
        //when step on cop_tile
        if (cx < mx && cy < my) {
            cx++, cy++;
        } else if (cx == mx && cy < my) {
            cy++;
        } else if (cx > mx && cy < my) {
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
        //cop randomly move
        var c1 = 0,
            c2 = 0,
            c3 = 0,
            c4 = 0,
            c5 = 0,
            c6 = 0,
            c7 = 0,
            c8 = 0;
        var skip = 0;
        while (1) {
            var randX = Math.floor(Math.random() * 3) - 1;
            var randY = Math.floor(Math.random() * 3) - 1;
            if (randX == 0 && randY == -1) {
                c1 = 1;
            }
            if (randX == 1 && randY == -1) {
                c2 = 1;
            }
            if (randX == 1 && randY == 0) {
                c3 = 1;
            }
            if (randX == 1 && randY == 1) {
                c4 = 1;
            }
            if (randX == 0 && randY == 1) {
                c5 = 1;
            }
            if (randX == -1 && randY == 1) {
                c6 = 1;
            }
            if (randX == -1 && randY == 0) {
                c7 = 1;
            }
            if (randX == -1 && randY == -1) {
                c8 = 1;
            }
            if ((cx + randX >= 0) && (cx + randX < table_size) && (cy + randY >= 0) && (cy + randY < table_size)) {
                cx += randX;
                cy += randY;
                var check = document.querySelectorAll(`[x="${cx}"]`)[cy];
                if (check.getAttribute("bot") != "cop_walked" || (c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8)) {
                    break;
                }
                cx -= randX;
                cy -= randY;
            }
        }
    }

    var cop_stat = document.querySelectorAll(`[x="${cx}"]`)[cy];
    cop_stat.setAttribute("bot", 'cop');
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


document.addEventListener('keydown', keyEvent, false);

function keyEvent(key) {
    var check = document.querySelector('[player="ship"]');
    //console.log(check);
    var cx = check.getAttribute("x");
    var cy = check.getAttribute("y");
    if (key.keyCode == 87) {
        cy--;
        //move = document.querySelectorAll(`[x="${cx}"]`)[cy - 1];
    } else if (key.keyCode == 83) {
        cy++;
        //move = document.querySelectorAll(`[x="${cx}"]`)[cy++];
    } else if (key.keyCode == 65) {
        cx--;
        //move = document.querySelectorAll(`[x="${cx - 1}"]`)[cy];
    } else if (key.keyCode == 68) {
        cx++;
        //move = document.querySelectorAll(`[x="${cx++}"]`)[cy];
    }
    var move = document.querySelectorAll(`[x="${cx}"]`)[cy];
    //console.log("--->" + move);
    moveShip(move);
}


function moveShip(e) {
    if (energy && time > 0) {
        mx = e.getAttribute("x");
        my = e.getAttribute("y");
        //alert(mx + " " + my);

        //move
        if ((Math.abs(mx - hist_x) == 1 && Math.abs(my - hist_y) == 1) || (Math.abs(mx - hist_x) == 0 && Math.abs(my - hist_y) == 1) || (Math.abs(mx - hist_x) == 1 && Math.abs(my - hist_y) == 0)) {
            var node = document.querySelectorAll(`[x="${hist_x}"]`)[hist_y];
            //node.style.background = "yellow";
            node.setAttribute("player", 'ship_walked');

            node = document.querySelectorAll(`[x="${mx}"]`)[my];
            node.setAttribute("player", 'ship');
            hist_x = mx, hist_y = my;

            //energy fee
            //energy--;
            document.querySelector("h1").innerHTML = "Energy: " + energy;
        }

        //Vision Range
        for (i = 0; i < table_size; i++) {
            for (j = 0; j < table_size; j++) {
                //break;
                node = document.querySelectorAll(`[x="${j}"]`)[i];
                if (Math.abs(hist_x - j) + Math.abs(hist_y - i) > sight) {
                    node.setAttribute("vision", '0');
                    //node.style.background = "grey";
                } else {
                    node.setAttribute("vision", '1');
                    //node.style.background = "";
                }
            }
        }
    }
}