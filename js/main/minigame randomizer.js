//Minigame Randomizer

var num = 1; // number of game

export default function game() {
    var rand = Math.floor(Math.random() * num);
    if (rand == 0) {
        var body = document.getElementById("body");
        var run = document.createElement("iframe");
        run.setAttribute("src", "../html/minigame1.html");
        run.setAttribute("id", "minigame1");
        body.appendChild(run);
    }
}