//Move Ship
import miniGame from "./minigame randomizer.js";
var i, j, cop_check = 0;
export default function moveShip(move, energy, time, sight, hx, hy, table_size, energyMax, minigame_num) {
    if (energy && time > 0) {
        var mx = move.getAttribute("x");
        var my = move.getAttribute("y");

        //move
        var node = document.querySelectorAll(`[x="${hx}"]`)[hy];
        node.setAttribute("player", 'ship_walked');
        node = document.querySelectorAll(`[x="${mx}"]`)[my];

        //if step on Bonus Tile
        var step_bonus = 0;
        if (node.getAttribute("player") == "bonus") {
            step_bonus = 1;
        }
        node.setAttribute("player", 'ship');
        hx = mx, hy = my;

        //energy fee
        energy--;
        document.getElementById("energyBar").innerHTML = "Energy: " + energy + " / " + energyMax;

        if (step_bonus) {
            console.log("bonus");
            miniGame(minigame_num);
        }

        //Vision Range
        for (i = 0; i < table_size; i++) {
            for (j = 0; j < table_size; j++) {
                //break;
                node = document.querySelectorAll(`[x="${j}"]`)[i];
                if (Math.abs(hx - j) + Math.abs(hy - i) > sight) {
                    //node.setAttribute("vision", '0');
                    node.style.background = "Tan";
                } else {
                    //node.setAttribute("vision", '1');
                    node.style.background = "";
                    if (document.querySelectorAll(`[x="${j}"]`)[i].getAttribute("bot") == "cop" && !cop_check) {
                        cop_check = 1;
                        window.postMessage("tutorial:3", "*");
                    }
                }
            }
        }
    }
    return [hx, hy, energy];
}