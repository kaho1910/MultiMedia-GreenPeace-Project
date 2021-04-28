//Spawn Cop
export default function spawnCop() {
    var randX = Math.floor(Math.random() * 2) * 29;
    var randY = Math.floor(Math.random() * 2) * 29;
    var node = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    node.setAttribute("bot", 'cop'); //cop spwan
}