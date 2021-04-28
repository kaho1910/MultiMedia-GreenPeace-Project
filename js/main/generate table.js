//Generate table
var tab, row, col;
var i, j;
export default function drawTable(table_size, bonus_chance) {
    tab = document.createElement("table");
    document.body.appendChild(tab);
    for (i = 0; i < table_size; i++) {
        row = document.createElement("tr");
        tab.appendChild(row);
        for (j = 0; j < table_size; j++) {
            col = document.createElement("td");
            col.setAttribute("x", j);
            col.setAttribute("y", i);
            var num = Math.floor(Math.random() * (100 / bonus_chance));
            if (!num) {
                col.setAttribute("player", 'bonus');
            } else {
                col.setAttribute("player", 'normal');
            }
            col.setAttribute("bot", 'normal');
            col.setAttribute("vision", '0');
            row.appendChild(col);
        }
    }
}