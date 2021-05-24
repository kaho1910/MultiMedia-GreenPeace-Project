import closeGame from "../main/closeMinigame.js";
import rewardCheck from "../main/rewardMinigame.js";

// get a reference to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// this array holds all spawned object
var objects = [];

// newly spawned objects start at Y=25
var spawnLineY = 0;

// spawn a new object every 1500ms
var spawnRate = 1000;

// set how fast the objects will fall
var spawnRateOfDescent = 1.5;

// when was the last object spawned
var lastSpawn = -1;

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

var mouse;

var radarX = 0;
var radarY = 0;
var speed = 2.5;
var c = "red";

var score = 0;
var miss = 0;

// start animating
animate();



function spawnRandomObject() {

    // select a random type for this new object
    var t;

    // About Math.random()
    // Math.random() generates a semi-random number
    // between 0-1. So to randomly decide if the next object
    // will be A or B, we say if the random# is 0-.49 we
    // create A and if the random# is .50-1.00 we create B

    if (Math.random() < 0.33) {
        t = "red";
    } else if (Math.random() >= 0.33 && Math.random() < 0.66) {
        t = "blue";
    } else {
        t = "green";
    }



    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,
    }


    // add the new object to the objects[] array
    objects.push(object);

}

function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.font = "30px Helvetica";
    // ctx.fillText("Score : " + score, 10, 30);

    ctx.beginPath();
    ctx.rect(radarX, radarY, canvas.width, 20);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();

    draw();
    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];

        object.y += spawnRateOfDescent;

        ctx.beginPath();
        ctx.arc(object.x, object.y, 30, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();

        if (object.y > canvas.height + 30) {
            objects.shift();
        }

    }
}

function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

var great = document.getElementById("great");
great.style.display = "none";

console.log(canvas.offsetLeft)

canvas.addEventListener(
    "mousedown",
    function(event) {
        mouse = oMousePos(canvas, event);
        objects.some(function(object) {
            if (mouse.x <= object.x + 30 && mouse.x >= object.x - 30 &&
                mouse.y <= object.y + 30 && mouse.y >= object.y - 30) {
                console.log(mouse)
                var count = 0;
                if (radarY <= object.y + 30 && radarY >= object.y - 30 && object.type == c) {
                    score += 1;
                    count = 1;
                    console.log(score);
                    console.log("overlap");
                    document.getElementById("score").innerText = "Score : " + score;
                    great.style.top = mouse.y - 60;
                    great.style.left = canvas.offsetLeft + mouse.x - 55;
                    if (great.style.display === "none") {
                        great.style.display = "block";
                    }
                    setTimeout(() => {
                        great.style.display = "none";
                    }, 500);
                }
                if (!count) {
                    miss++;
                    console.log("miss : " + miss)
                }
                if (miss >= 5) {
                    closeGame();
                    rewardCheck(false);
                }
                if (score >= 5) {
                    closeGame();
                    rewardCheck(true);
                }
            }
        })
    },
    false
);


function draw() {

    if (radarY > canvas.height || radarY < 0) {
        speed = -speed;
        if (Math.random() < 0.33) {
            c = "red";
        } else if (Math.random() >= 0.33 && Math.random() < 0.66) {
            c = "blue";
        } else {
            c = "green";
        }
    }
    radarY += speed;

}