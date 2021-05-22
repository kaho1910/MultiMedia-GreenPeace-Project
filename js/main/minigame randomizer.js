//Minigame Randomizer

var num = 2; // number of minigame

export default function miniGame() {
    var body = document.getElementById("body");
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "minigame");
    var rand = Math.floor(Math.random() * num);
    if (rand == 0) {
        iframe.setAttribute("src", "../html/minigame1.html");
    } else if (rand == 1) {
        iframe.setAttribute("src", "../html/minigame2.html");
    }
    body.appendChild(iframe);
}