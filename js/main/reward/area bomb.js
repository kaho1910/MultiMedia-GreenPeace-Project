//Reward Area Bomb
export default function rewardArea(table_size) {
    var ship = document.querySelector("[player='ship']");
    var ship_x = ship.getAttribute("x");
    var ship_y = ship.getAttribute("y");
    for (let i = 0; i < table_size; i++) {
        for (let j = 0; j < table_size; j++) {
            var node = document.querySelectorAll(`[x="${j}"]`)[i];
            if (Math.abs(ship_x - j) + Math.abs(ship_y - i) < 4) {
                node.setAttribute("player", 'ship_walked');
            }
            if (ship_x == j && ship_y == i) {
                node.setAttribute("player", 'ship')
            }
        }
    }
}