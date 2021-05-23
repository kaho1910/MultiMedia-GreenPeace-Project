import closeGame from "../main/closeMinigame.js";
import rewardCheck from "../main/rewardMinigame.js";

"use strict"
var stage = {
    w: 1280,
    h: 720
}
var _pexcanvas = document.getElementById("canvas");
_pexcanvas.width = stage.w;
_pexcanvas.height = stage.h;
var ctx = _pexcanvas.getContext("2d");

_pexcanvas.style.backgroundImage = "url('https://sv1.picz.in.th/images/2021/05/22/Pq5ps0.png')";
var pointer = {
    x: stage.w,
    y: 0,
    tx: stage.w,
    ty: 0
}
var scale = 1;
var portrait = true;
var loffset = 0;
var toffset = 0;
var mxpos = 0;
var mypos = 0;

function drawHeart(x, y, w) {
    ctx.beginPath();
    ctx.arc(x - w / 4, y, w / 4, 0.75 * Math.PI, 0);
    ctx.arc(x + w / 4, y, w / 4, 1 * Math.PI, 2.25 * Math.PI);
    ctx.lineTo(x, y + w / 1.5);
    ctx.closePath();
    ctx.fill();
}
var Power = function() {
    this.type = Math.floor(Math.random() * 2) + 1;
    this.a = Math.random() * Math.PI * 2;
    this.v = 3 + Math.random() * 5;
    this.x = stage.w + 100;
    this.y = Math.floor(Math.random() * (stage.h - 100) + 50);
    this.r = 30;
    this.dis = false;
    this.op = 1;
}
var powers = [];
var powertm = 0;
var powermax = Math.random() * 100 + 300;
var handImg = new Image();
handImg.src = 'https://sv1.picz.in.th/images/2021/05/22/PqqVDV.png';

var webImg = new Image();
webImg.src = 'https://sv1.picz.in.th/images/2021/05/22/PqjfUP.png';

var expImg = new Image();
expImg.src = 'https://sv1.picz.in.th/images/2021/05/03/AvriCE.png';

var shipImg = new Image();
shipImg.src = 'https://sv1.picz.in.th/images/2021/05/03/AvGxvD.png';

var shipFireImg = new Image();
shipFireImg.src = 'https://sv1.picz.in.th/images/2021/05/03/AvGrgt.png';

var bulletImg = new Image();
bulletImg.src = 'https://sv1.picz.in.th/images/2021/05/03/AvGxvD.png';

var health = 20;
var sHealth = 0;
var score = 0;
var sScore = 0;
var gameOver = false;
/////////////////////ตำแหน่งมือ/////////////////////////
var hand = {
    x: 270,
    y: 410,
    a: 0,
    l: 10
}

function rotateHand(xpos, ypos) {
    var dx = xpos - hand.x;
    var dy = ypos - hand.y;
    var ang = Math.atan(dy / dx);
    if (xpos > hand.x) {
        hand.a = ang;
    } else {

        hand.a = ang + Math.PI;
    }
}
/////////////////////////กระสุน//////////////////
function bullet(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.l = 0;
    this.tl = 120;
    this.v = 20;
}
var webs = [];

function shoot() {
    webs.push(new bullet(hand.x, hand.y, hand.a));
}
var shootActive = false;
var shootTm = 0;
var Enemy = function() {
    this.w = 70;
    this.h = 70;
    this.x = Math.floor(Math.random() * (stage.w / 2)) + stage.w;
    this.y = Math.floor(Math.random() * (stage.h - this.h));
    this.dead = false;
    this.frame = 0;
    this.tm = 0;
    this.dtm = 0;
    this.a = 0;
    this.v = 2;
}
var enemies = [];
var Bullet = function(x, y, tx, ty) {
    this.w = 30;
    this.h = 16;
    this.x = x;
    this.y = y;
    this.a = 0;
    this.v = 4;
    this.tx = tx;
    this.ty = ty;
}
var bullets = [];
for (var i = 0; i < 5; i++) {
    enemies[i] = new Enemy();
    if (i < 1) {
        enemies[i].x -= stage.w / 2;
    }
}
var Explosion = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.frame = 0;
    this.tm = 0;
}

var explosions = [];

var redAlert = 0;
var redAlertColor = "255,255,0";

var auto = true;
var autoTm = 0;

function enginestep() {


    ctx.clearRect(0, 0, stage.w, stage.h);
    if (auto) {
        pointer.x += (pointer.tx - pointer.x) / 10;
        pointer.y += (pointer.ty - pointer.y) / 10;
        rotateHand(pointer.x, pointer.y);
        autoTm++;
        if (autoTm == 15) {
            shoot();
        }
        if (autoTm > 20) {
            autoTm = 0;
            pointer.tx = stage.w / 2;
            pointer.ty = Math.floor(Math.random() * stage.h);

        }

    }
    if (!gameOver) {
        powertm++;
        if (powertm > powermax) {
            powers.push(new Power());
            powertm = 0;
            powermax = Math.random() * 1200 + 600;
        }
    }

    for (var i = 0; i < webs.length; i++) {

        var wb = webs[i];

        wb.x += Math.cos(wb.a) * wb.v;
        wb.y += Math.sin(wb.a) * wb.v;
        wb.l += (wb.tl - wb.l) / 3;
        var randy1 = Math.random() * 0.4 - 0.2;
        var randy2 = Math.random() * 0.1 - 0.05;
        var randy3 = Math.random() * 0.05 - 0.025;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(wb.x, wb.y);
        ctx.lineTo(wb.x + Math.cos(wb.a + randy2) * wb.l / 2, wb.y + Math.sin(wb.a + randy2) * wb.l / 2);
        ctx.lineTo(wb.x + Math.cos(wb.a + randy3) * wb.l, wb.y + Math.sin(wb.a + randy3) * wb.l);
        ctx.stroke();
        var randy1 = Math.random() * 0.4 - 0.2;
        var randy2 = Math.random() * 0.1 - 0.05;
        var randy3 = Math.random() * 0.05 - 0.025;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 2;
        ctx.beginPath()
        ctx.moveTo(wb.x, wb.y);
        ctx.lineTo(wb.x + Math.cos(wb.a + randy2) * wb.l / 2, wb.y + Math.sin(wb.a + randy2) * wb.l / 2);
        ctx.lineTo(wb.x + Math.cos(wb.a + randy3) * wb.l, wb.y + Math.sin(wb.a + randy3) * wb.l);
        ctx.stroke();
        var randy1 = Math.random() * 0.4 - 0.2;
        var randy2 = Math.random() * 0.1 - 0.05;
        var randy3 = Math.random() * 0.05 - 0.025;
        ctx.lineCap = 'round';
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 2;
        ctx.beginPath()
        ctx.moveTo(wb.x, wb.y);
        ctx.lineTo(wb.x + Math.cos(wb.a + randy2) * wb.l / 2, wb.y + Math.sin(wb.a + randy2) * wb.l / 2);
        ctx.lineTo(wb.x + Math.cos(wb.a + randy3) * wb.l, wb.y + Math.sin(wb.a + randy3) * wb.l);
        ctx.stroke();
        if (wb.x < -wb.l || wb.x > stage.w + wb.l || wb.y < -wb.l || wb.y > stage.h + wb.l) {
            webs.splice(i, 1);
            i--;
        } else {
            var tdid = false;

            var nx = wb.x + Math.cos(wb.a) * wb.l;
            var ny = wb.y + Math.sin(wb.a) * wb.l;
            if (gameOver && !tdid && nx > playBtn.x && nx < playBtn.x + playBtn.w && ny > playBtn.y && ny < playBtn.y + playBtn.h) {
                playBtn.p += 20;
                if (playBtn.p > 100) {
                    gameOver = false;
                    for (var ep = 0; ep < 10; ep++) {
                        enemies[ep] = new Enemy();
                        health = 20;
                        score = 0;
                        playBtn.p = 0;
                    }
                }
                webs.splice(i, 1);
                i--;
                tdid = true;
            }
            for (var e = 0; e < enemies.length; e++) {
                var en = enemies[e];
                if (!tdid && en.x < stage.w - en.w && !en.dead && nx > en.x && nx < en.x + en.w && ny > en.y && ny < en.y + en.h) {
                    en.dead = true;
                    webs.splice(i, 1);
                    i--;
                    tdid = true;
                }
            }
            if (!tdid) {
                for (var b = 0; b < bullets.length; b++) {
                    var bl = bullets[b];
                    if (!tdid && nx > bl.x && nx < bl.x + bl.w && ny > bl.y && ny < bl.y + bl.h) {
                        bullets.splice(b, 1);
                        webs.splice(i, 1);
                        explosions.push(new Explosion(bl.x - 24, bl.y - 24, 48));
                        if (!auto) {
                            score += 10;
                        }
                        i--;
                        tdid = true;
                    }
                }
            }

            for (var p = 0; p < powers.length; p++) {
                var po = powers[p];
                if (!tdid && po.x < stage.w - po.r * 2 && nx > po.x - po.r && nx < po.x + po.r && ny > po.y - po.r && ny < po.y + po.r) {

                    webs.splice(i, 1);
                    i--;
                    if (po.type == 2) {
                        powers.splice(p, 1);
                        explosions.push(new Explosion(po.x - 100, po.y - 100, 200));
                        for (var e = 0; e < enemies.length; e++) {
                            var en = enemies[e];
                            explosions.push(new Explosion(en.x - 10, en.y - 10, 96));
                            if (en.x < stage.w - en.w) {
                                score += 100;
                            }
                            enemies[e] = new Enemy();
                        }
                        for (var e = 0; e < bullets.length; e++) {
                            var en = bullets[e];
                            explosions.push(new Explosion(en.x - 24, en.y - 24, 48));
                            if (en.x < stage.w - en.w) {
                                score += 10;
                            }
                        }
                        bullets = [];
                        redAlert = 30;
                        redAlertColor = '255,255,0'
                    } else {
                        health = 20;
                        po.des = true;
                    }
                    tdid = true;
                }
            }
        }
    }
    //////////////////////////ปลา///////////////////////////
    for (var i = 0; i < (enemies.length) - 7; i++) {
        var en = enemies[i];
        if (!en.dead) {
            var dx = hand.x - en.x;
            var dy = hand.y - en.y;
            var dis = dx * dx + dy * dy;
            en.a = Math.atan(dy / dx);
            if (dis > 200 * 20) {
                en.x -= Math.cos(en.a) * en.v;
                en.y -= Math.sin(en.a) * en.v;
            }
        }
        var randw = Math.floor(Math.random() * 28);
        ctx.save();
        ctx.translate(en.x + en.w / 2, en.y + en.h / 2);
        ctx.rotate(en.a);
        ctx.translate(-(en.x + en.w / 2), -(en.y + en.h / 2));
        ctx.drawImage(shipFireImg, en.x + 53, en.y + 31, randw, 8);
        if (!en.dead) {
            /////////////////////////////จำนวนปลา////////////////////
            var blrand = Math.floor(Math.random() * 300);
            if (blrand == 1) {
                bullets.push(new Bullet(en.x, en.y + 20, hand.x - Math.floor(Math.random() * 50), hand.y + Math.floor(Math.random() * 80)));
            }
        }
        ctx.drawImage(shipImg, en.x, en.y);
        ctx.restore();

        if (en.dead) {
            ctx.drawImage(webImg, en.x - 5, en.y - 3);
            en.dtm++;
            if (en.dtm > 60) {
                explosions.push(new Explosion(en.x - 10, en.y - 10, 96));
                enemies[i] = new Enemy();
                if (!auto) {
                    score += 100;
                }

            }
        }
    }

    for (var i = 0; i < powers.length; i++) {
        var st = powers[i];

        if (!st.des) {
            st.x -= 8;

        } else {
            st.x += (hand.x - st.x) / 10;
            st.y += (hand.y - st.y) / 10;
            st.r += (0 - st.r) / 10;
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(hand.x, hand.y);
            ctx.lineTo(st.x, st.y);
            ctx.stroke();
        }
        if (st.type == 1) {
            ctx.fillStyle = "rgba(192,0,0,0.8)";

            drawHeart(st.x, st.y - st.r / 4, st.r * 2);

        } else {
            ctx.fillStyle = "rgba(0,0,0," + st.op + ")";
            ctx.strokeStyle = "rgba(255,255,0," + st.op + ")";
            ctx.lineWidth = st.r / 10;
            ctx.beginPath();
            ctx.arc(st.x, st.y, st.r, 2 * Math.PI, 0);
            ctx.stroke();
            ctx.fill();

            ctx.fillStyle = "rgba(255,255,0," + st.op + ")";

            ctx.beginPath();
            ctx.arc(st.x, st.y, st.r * 0.15, 2 * Math.PI, 0);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(st.x, st.y, st.r * 0.85, 1.67 * Math.PI, 2 * Math.PI);
            ctx.arc(st.x, st.y, st.r * 0.25, 2 * Math.PI, 1.67 * Math.PI, true);

            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(st.x, st.y, st.r * 0.85, 3 * Math.PI, 3.33 * Math.PI);
            ctx.arc(st.x, st.y, st.r * 0.25, 3.33 * Math.PI, 3 * Math.PI, true);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(st.x, st.y, st.r * 0.85, 2.33 * Math.PI, 2.67 * Math.PI);
            ctx.arc(st.x, st.y, st.r * 0.25, 2.67 * Math.PI, 2.33 * Math.PI, true);
            ctx.lineTo(st.x, st.y);
            ctx.closePath();
            ctx.fill();

        }
        if (st.r < 0.1 || st.x < -st.r) {
            powers.splice(i, 1);

            i--;
        }
    }

    ctx.save();
    ctx.translate(hand.x, hand.y);
    ctx.rotate(hand.a + Math.PI / 22);
    ctx.translate(-hand.x, -hand.y);
    ctx.drawImage(handImg, hand.x - 10, hand.y - 20);
    ctx.restore();

    for (var i = 0; i < explosions.length; i++) {
        var ex = explosions[i];
        var mkx = ex.frame % 5 * 48;
        var mky = Math.floor(ex.frame / 5) * 48;
        ctx.drawImage(expImg, mkx, mky, 48, 48, ex.x, ex.y, ex.r, ex.r);
        ex.tm++;
        if (ex.tm > 2) {
            ex.tm = 0;
            if (ex.frame < 19) {
                ex.frame++;
            } else {
                explosions.splice(i, 1);
                i--;
            }
        }
    }
    for (var i = 0; i < bullets.length; i++) {
        var bl = bullets[i];

        var dx = bl.tx - bl.x;
        var dy = bl.ty - bl.y;
        bl.a = Math.atan(dy / dx);
        bl.x -= Math.cos(bl.a) * bl.v;
        bl.y -= Math.sin(bl.a) * bl.v;
        ctx.save();
        ctx.translate(bl.x, bl.y);
        ctx.rotate(bl.a);
        ctx.translate(-(bl.x), -(bl.y));
        ctx.drawImage(bulletImg, bl.x, bl.y);
        ctx.restore();
        var dis = dx * dx + dy * dy;
        if (dis < 10 * 10) {
            bullets.splice(i, 1);
            i--;
            explosions.push(new Explosion(bl.x - 24, bl.y - 24, 48));
            if (!auto) {
                health -= 10;
                redAlertColor = '255,0,0';
                redAlert = 20;
            }
            if (health <= 0) {
                health = 0;
                gameOver = true;
                for (var e = 0; e < enemies.length; e++) {
                    var en = enemies[e];
                    explosions.push(new Explosion(en.x - 10, en.y - 10, 96));
                }
                for (var e = 0; e < bullets.length; e++) {
                    var en = bullets[e];
                    explosions.push(new Explosion(en.x - 24, en.y - 24, 48));
                }
                for (var p = 0; p < powers.length; p++) {
                    var po = powers[p];
                    explosions.push(new Explosion(po.x - 24, po.y - 24, 48));
                }
                bullets = [];
                enemies = [];
                powers = [];
                redAlert = 60;
                redAlertColor = '255,0,0';
                gameOver = true;
            }
        } else if (bl.x < -bl.w || bl.x > stage.w + bl.w || bl.y < -bl.h || bl.y > stage.h + bl.h) {
            bullets.splice(i, 1);
            i--;
        }
    }
    if (score >= 500) {
        closeGame();
        rewardCheck(true);
    } else if (!gameOver) {
        ctx.fillStyle = 'rgba(192,0,0,1)';
        ctx.strokeStyle = 'rgba(0,0,128,1)';
        ctx.font = "24px arial";
        ctx.textAlign = "left";
        ctx.textBaseline = 'middle';
        sHealth += (health - sHealth) / 10;
        sScore += (score - sScore) / 4;
        if (Math.abs(score - sScore) < 1) {
            sScore = score;
        }
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30 + 20, 30);
        ctx.lineTo(30 + sHealth * 3 + 20, 30);
        ctx.lineTo(30 + sHealth * 3, 30 + 20);
        ctx.lineTo(30, 30 + 20);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(30 + 20, 30);
        ctx.lineTo(30 + 300 + 20, 30);
        ctx.lineTo(30 + 300, 30 + 20);
        ctx.lineTo(30, 30 + 20);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'rgba(0,0,128,1)';
        ctx.fillText("Score: " + Math.floor(sScore), 30, 70);
        if (auto) {
            ctx.font = "50px monospace";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.clearRect(canvas.width / 2 - 10, canvas.height / 2 - 40, 20, 60);
            ctx.fillText("กดเพื่อเล่น ต้องได้คะแนนมากกว่า500ขึ้นไป", canvas.width / 2, canvas.height / 2);
        }
    } else {
        /*
        ctx.fillStyle = 'rgba(192,0,0,1)';
        ctx.font = "bold 100px arial";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText("GAME OVER", stage.w / 2, 100);
        ctx.font = "bold 40px arial";
        ctx.fillText("Score: " + score, stage.w / 2, 100 + 80);

        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = 'rgba(192,0,0,0.2)';
        ctx.lineWidth = 2;
        ctx.fillRect(playBtn.x, playBtn.y, playBtn.p / 100 * playBtn.w, playBtn.h);
        ctx.strokeRect(playBtn.x, playBtn.y, playBtn.w, playBtn.h);
        ctx.font = "bold 30px arial";
        ctx.fillStyle = '#ffffff';
        ctx.fillText("Play Again", playBtn.x + playBtn.w / 2, playBtn.y + playBtn.h / 2);*/
        closeGame();
        if (score > 500) {
            rewardCheck(true);
        } else {
            rewardCheck(false);
        }
    }
    if (redAlert > 0) {
        redAlert--;
        ctx.fillStyle = 'rgba(' + redAlertColor + ',' + redAlert / 90 + ')';
        ctx.fillRect(0, 0, stage.w, stage.h);
    }
}
//==========================ปุ่มrestart================================
var playBtn = {
    w: 200,
    h: 50,
    x: stage.w / 2 - 100,
    y: 258 - 25,
    p: 100
}

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
}

function mousestart(e) {
    mxpos = (e.pageX - loffset) * scale;
    mypos = (e.pageY - toffset) * scale;
    pointer.x = mxpos;
    pointer.y = mypos;

    rotateHand(mxpos, mypos);
    shoot();
    if (auto) {
        auto = false;
        bullets = [];
        powers = [];
        for (var en = 0; en < 10; en++) {
            enemies[en] = new Enemy();
        }
    }
}

function mousemove(e) {
    mxpos = (e.pageX - loffset) * scale;
    mypos = (e.pageY - toffset) * scale;
    pointer.x = mxpos;
    pointer.y = mypos;
    rotateHand(mxpos, mypos);

    if (auto) {
        auto = false;
        bullets = [];
        powers = [];
        for (var en = 0; en < 10; en++) {
            enemies[en] = new Enemy();
        }
    }
}

function mouseend(e) {}
window.addEventListener('mousedown', function(e) {
    mousestart(e);
}, false);
window.addEventListener('mouseup', function(e) {
    mouseend(e);
}, false);

function _pexresize() {
    var cw = window.innerWidth;
    var ch = window.innerHeight;
    if (cw <= ch * stage.w / stage.h) {
        portrait = true;
        scale = stage.w / cw;
        loffset = 0;
        toffset = Math.floor(ch - (cw * stage.h / stage.w)) / 2;
        _pexcanvas.style.width = cw + "px";
        _pexcanvas.style.height = Math.floor(cw * stage.h / stage.w) + "px";
    } else {
        scale = stage.h / ch;
        portrait = false;
        loffset = Math.floor(cw - (ch * stage.w / stage.h)) / 2;
        toffset = 0;
        _pexcanvas.style.height = ch + "px";
        _pexcanvas.style.width = Math.floor(ch * stage.w / stage.h) + "px";
    }
    _pexcanvas.style.marginLeft = loffset + "px";
    _pexcanvas.style.marginTop = toffset + "px";
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 20);
        };
})();

var fps = 60;
var nfcount = 0;

var debug = false;

function animated() {
    requestAnimFrame(animated);
    enginestep();

    nfcount++;
    ctx.fillStyle = '#fff';
    ctx.font = "12px arial";
    ctx.textAlign = "left";

}
_pexresize();
animated();

function countfps() {
    fps = nfcount;
    nfcount = 0;
}
setInterval(countfps, 1000);