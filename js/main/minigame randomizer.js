//Minigame Randomizer
export default function miniGame(minigame_num) {
    var body = document.getElementById("body");
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "minigame");
    while (1) {
        var rand = Math.floor(Math.random() * minigame_num) + 1;
        if (rand != 4) {
            break;
        }
    }
    iframe.setAttribute("src", `../html/minigame${rand}.html`);
    body.appendChild(iframe);
}