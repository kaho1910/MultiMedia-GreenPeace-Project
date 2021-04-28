//Spawn Ship
export default function spawnShip() {
    var randX = Math.floor(Math.random() * 10) + 11;
    var randY = Math.floor(Math.random() * 10) + 11;
    var node = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    node.setAttribute("player", 'ship') //ship spawn
    return [randX, randY];
}