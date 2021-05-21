//Move Ship
import miniGame from "./minigame randomizer.js";
var i, j;
export default function moveShip(move, energy, time, sight, hx, hy, table_size, reward_pool) {
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
        document.querySelector("h1").innerHTML = "Energy: " + energy;

        if (step_bonus) {
            console.log("bonus");
            miniGame();
        }

        //Vision Range
        for (i = 0; i < table_size; i++) {
            for (j = 0; j < table_size; j++) {
                //break;
                node = document.querySelectorAll(`[x="${j}"]`)[i];
                if (Math.abs(hx - j) + Math.abs(hy - i) > sight) {
                    node.setAttribute("vision", '0');
                    //node.style.background = "grey";
                } else {
                    node.setAttribute("vision", '1');
                    //node.style.background = "";
                }
            }
        }
    }
    return [hx, hy, energy];
}