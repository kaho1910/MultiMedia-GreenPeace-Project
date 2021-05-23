//Spawn Ship
export default function spawnShip(table_size, sight) {
    var randX = Math.floor(Math.random() * 10) + 11;
    var randY = Math.floor(Math.random() * 10) + 11;
    var ship = document.querySelectorAll(`[x="${randX}"]`)[randY]; //selector
    ship.setAttribute("player", 'ship') //ship spawn
    for (let i = 0; i < table_size; i++) {
        for (let j = 0; j < table_size; j++) {
            var node = document.querySelectorAll(`[x="${j}"]`)[i];
            if (Math.abs(randX - j) + Math.abs(randY - i) > sight) {
                node.style.background = "Tan";
            } else {
                node.style.background = "";
            }
        }
    }
    return [randX, randY];
}