//Minigame Randomizer
import start_game1 from "../minigame1/app_g1.js"

var num = 1; // number of game

export default function game() {
    var rand = Math.floor(Math.random() * num);
    if (rand == 0) {
        var win = start_game1();
        $("#minigame1").modal({ backdrop: "static" }, "show");
    }
    return win;
}