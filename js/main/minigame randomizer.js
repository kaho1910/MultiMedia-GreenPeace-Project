//Minigame Randomizer

var num = 4; // number of minigame

export default function miniGame() {
    var body = document.getElementById("body");
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "minigame");
    var rand = Math.floor(Math.random() * num) + 1;
    iframe.setAttribute("src", `../html/minigame${rand}.html`);
    body.appendChild(iframe);
}