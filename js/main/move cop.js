//Move Cop
var i, j, cop_check = 0;
export default function moveCop(hx, hy, table_size, cop_sight, sight) {
    var ship = document.querySelectorAll(`[x="${hx}"]`)[hy];
    var cop = document.querySelector('[bot="cop"]');
    var cx = parseInt(cop.getAttribute("x"));
    var cy = parseInt(cop.getAttribute("y"));
    cop.setAttribute("bot", 'cop_walked');
    if ((Math.abs(hx - cx) + Math.abs(hy - cy) <= sight) && !(cop_check)) {
        cop_check = 1;
        window.postMessage("tutorial:3", "*");
    }
    if (ship.getAttribute("bot") == "cop_walked" || (Math.abs(hx - cx) + Math.abs(hy - cy) < cop_sight)) {
        //when ship step on cop_tile
        //or in range of cop vision
        if (hx > cx) {
            cx++;
        } else if (hx < cx) {
            cx--;
        }
        if (hy > cy) {
            cy++;
        } else if (hy < cy) {
            cy--;
        }
        var target = document.querySelector('[bot="cop_target"]');
        if (target != null) {
            target.setAttribute('bot', "normal");
        }
    } else if (document.querySelector('[bot="cop_target"]') != null) {
        //cop fake random move with target
        var target = document.querySelector('[bot="cop_target"]');
        var tx = target.getAttribute("x"),
            ty = target.getAttribute("y");
        if (tx > cx) {
            cx++;
        } else if (tx < cx) {
            cx--;
        }
        if (ty > cy) {
            cy++;
        } else if (ty < cy) {
            cy--;
        }
    } else {
        //cop true random move
        var c1 = 0,
            c2 = 0,
            c3 = 0,
            c4 = 0,
            c5 = 0,
            c6 = 0,
            c7 = 0,
            c8 = 0;
        while (1) {
            var randX = Math.floor(Math.random() * 3) - 1;
            var randY = Math.floor(Math.random() * 3) - 1;
            if (randX == 0 && randY == -1) {
                c1 = 1;
            }
            if (randX == 1 && randY == -1) {
                c2 = 1;
            }
            if (randX == 1 && randY == 0) {
                c3 = 1;
            }
            if (randX == 1 && randY == 1) {
                c4 = 1;
            }
            if (randX == 0 && randY == 1) {
                c5 = 1;
            }
            if (randX == -1 && randY == 1) {
                c6 = 1;
            }
            if (randX == -1 && randY == 0) {
                c7 = 1;
            }
            if (randX == -1 && randY == -1) {
                c8 = 1;
            }
            if (c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8) {
                //cop fake random move
                var min = Math.sqrt(1800);
                var tx, ty;
                for (i = 0; i < table_size; i++) {
                    for (j = 0; j < table_size; j++) {
                        var check = document.querySelectorAll(`[x="${j}"]`)[i];
                        var n1 = Math.abs(cx - j),
                            n2 = Math.abs(cy - i);
                        if (min > Math.sqrt(n1 * n1 + n2 * n2) && check.getAttribute("bot") == "normal") {
                            min = Math.sqrt(n1 * n1 + n2 * n2);
                            tx = j, ty = i;
                        }
                    }
                }
                var target = document.querySelectorAll(`[x="${tx}"]`)[ty];
                target.setAttribute("bot", "cop_target");
                if (tx > cx) {
                    cx++;
                } else if (tx < cx) {
                    cx--;
                }
                if (ty > cy) {
                    cy++;
                } else if (ty < cy) {
                    cy--;
                }
                break;
            }
            if ((cx + randX >= 0) && (cx + randX < table_size) && (cy + randY >= 0) && (cy + randY < table_size)) {
                cx += randX;
                cy += randY;
                var check = document.querySelectorAll(`[x="${cx}"]`)[cy];
                if (check.getAttribute("bot") != "cop_walked") {
                    break;
                }
                cx -= randX;
                cy -= randY;
            }
        }
    }

    var cop_stat = document.querySelectorAll(`[x="${cx}"]`)[cy];
    cop_stat.setAttribute("bot", 'cop');
}