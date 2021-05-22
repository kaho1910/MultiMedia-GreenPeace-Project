import closeGame from "../main/closeMinigame.js";
import rewardCheck from "../main/rewardMinigame.js"

let count = 0;
var keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;
keys.W = 87;
keys.A = 65;
keys.S = 83;
keys.D = 68;
var item = {
    x: 20,
    y: 20,
    speedMultiplier: 2,
    element: document.getElementById("item")
};

document.body.onkeyup =
    document.body.onkeydown = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        var kc = e.keyCode || e.which;
        keys[kc] = e.type == 'keydown';
    };

function overlapreset(x, y) {
    if ((x < 0 || x > 950) || (y < 0 || y > 600)) {
        console.log('out of area');
        count++;
    }
    //a
    else if ((x >= 40.5 && x <= 120.5) && (y >= 0 && y <= 238)) {
        console.log('overlap');
        count++;
    } else if ((x >= 40.5 && x <= 120.5) && (y >= 282 && y <= 600)) {
        console.log('overlap');
        count++;
    }
    //0
    else if ((x >= 134 && x <= 214) && (y >= 0 && y <= 292)) {
        console.log('overlap');
        count++;
    } else if ((x >= 134 && x <= 214) && (y >= 322 && y <= 600)) {
        console.log('overlap');
        count++;
    }
    //1
    else if ((x >= 229 && x <= 293) && (y >= 0 && y <= 160)) {
        console.log('overlap');
        count++;
    } else if ((x >= 229 && x <= 293) && (y >= 182 && y <= 600)) {
        console.log('overlap');
        count++;
    }
    //2
    else if ((x >= 315 && x <= 390) && (y >= 0 && y <= 148)) {
        console.log('overlap');
        count++;
    } else if ((x >= 315 && x <= 390) && (y >= 174 && y <= 600)) {
        console.log('overlap');
        count++;
    }
    //3
    else if ((x >= 408 && x <= 490) && (y >= 0 && y <= 258)) {
        console.log('overlap');
        count++;
    } else if ((x >= 408 && x <= 490) && (y >= 277 && y <= 600)) {
        console.log('overlap');
        count++;
    }
    //4
    else if ((x >= 514 && x <= 596) && (y >= 16 && y <= 600)) {
        console.log('overlap');
        count++;
    }
    //5
    else if ((x >= 609 && x <= 690) && (y >= 0 && y <= 565)) {
        console.log('overlap');
        count++;
    }
    //6
    else if ((x >= 708 && x <= 890) && (y >= 0 && y <= 280)) {
        console.log('overlap');
        count++;
    } else if ((x >= 708 && x <= 890) && (y >= 301 && y <= 600)) {
        console.log('overlap');
        count++;
    } else if ((x > 880) && (y >= 280 && y <= 300)) {
        count--;
    }
}
var moveitem = function(dx, dy) {
    item.x += (dx || 0) * item.speedMultiplier;
    item.y += (dy || 0) * item.speedMultiplier;
    item.element.style.left = item.x + 'px';
    item.element.style.top = item.y + 'px';
    console.log('x ' + item.element.style.left);
    console.log('y ' + item.element.style.top);
    overlapreset(item.x, item.y);
    if (count > 0) {
        closeGame();
        rewardCheck(false);
        count = 0;
    }
    if (count < 0) {
        console.log('in finished');
        closeGame();
        rewardCheck(true);
        count = 0;
    }
    console.log(count);
};

var detectitemMovement = function() {
    if ( keys[keys.LEFT] || keys[keys.A]) {
        moveitem(-1, 0);
      }
    if ( keys[keys.RIGHT] || keys[keys.D]) {
        moveitem(1, 0);
      }
    if ( keys[keys.UP] || keys[keys.W]) {
        moveitem(0, -1);
      }
    if ( keys[keys.DOWN] || keys[keys.S]) {
        moveitem(0, 1);
      }
    };

moveitem();

setInterval(function() {
    detectitemMovement();
}, 1000 / 67);