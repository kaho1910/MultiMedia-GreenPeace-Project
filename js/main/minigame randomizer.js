//Minigame Randomizer

var num = 1; // number of minigame

export default function miniGame() {
    var body = document.getElementById("body");
    var iframe = document.createElement("iframe");
    var rand = Math.floor(Math.random() * num);
    if (rand == 0) {
        iframe.setAttribute("src", "../html/minigame1.html");
        iframe.setAttribute("id", "minigame1");
        body.appendChild(iframe);
    }
}