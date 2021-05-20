var c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0,
    c5 = 0;
var div1,
    div2,
    div3,
    div4,
    div5;
export default function start_game1() {
    var x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, w1, w2, w3, w4, w5, h1, h2, h3, h4, h5;
    c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;
    //alert(c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' + c5);

    for (var i = 1; i < 6; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", `box box${i}`);
        div.setAttribute("id", `box${i}`);
        var modal = document.querySelector("#minigame1");
        modal.appendChild(div);
    }

    div1 = document.getElementById("box1");
    div2 = document.getElementById("box2");
    div3 = document.getElementById("box3");
    div4 = document.getElementById("box4");
    div5 = document.getElementById("box5");

    var mousePosition1;
    var offset1 = [0, 0];
    var isDown1 = false;

    function overlab1() {
        var rect1 = div1.getBoundingClientRect();
        x1 = rect1.left;
        y1 = rect1.top;
        w1 = rect1.width;
        h1 = rect1.height;
        if (x1 + w1 > 1720 && y1 + h1 > 800) {
            c1 = 1;
            div1.remove();
        }
    }
    if (c1 == 0 || c2 == 0 || c3 == 0 || c4 == 0 || c5 == 0) {
        div1.addEventListener('mousedown', function(e) {
            isDown1 = true;
            offset1 = [
                div1.offsetLeft - e.clientX,
                div1.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown1 = false;
            overlab1();
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown1) {
                mousePosition1 = {

                    x: event.clientX,
                    y: event.clientY

                };
                div1.style.left = (mousePosition1.x + offset1[0]) + 'px';
                div1.style.top = (mousePosition1.y + offset1[1]) + 'px';
            }
        }, true);
    }
    var mousePosition2;
    var offset2 = [0, 0];
    var isDown2 = false;

    function overlab2() {
        var rect2 = div2.getBoundingClientRect();
        x2 = rect2.left;
        y2 = rect2.top;
        w2 = rect2.width;
        h2 = rect2.height;
        if (x2 + w2 > 1720 && y2 + h2 > 800) {
            c2 = 1;
            div2.remove();
        }
    }
    if (c1 == 0 || c2 == 0 || c3 == 0 || c4 == 0 || c5 == 0) {
        div2.addEventListener('mousedown', function(e) {
            isDown2 = true;
            offset2 = [
                div2.offsetLeft - e.clientX,
                div2.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown2 = false;
            overlab2();
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown2) {
                mousePosition2 = {

                    x: event.clientX,
                    y: event.clientY

                };
                div2.style.left = (mousePosition2.x + offset2[0]) + 'px';
                div2.style.top = (mousePosition2.y + offset2[1]) + 'px';
            }
        }, true);
    }


    var mousePosition3;
    var offset3 = [0, 0];
    var isDown3 = false;

    function overlab3() {
        var rect3 = div3.getBoundingClientRect();
        x3 = rect3.left;
        y3 = rect3.top;
        w3 = rect3.width;
        h3 = rect3.height;
        if (x3 + w3 > 1720 && y3 + h3 > 800) {
            c3 = 1;
            div3.remove();
        }
    }
    if (c1 == 0 || c2 == 0 || c3 == 0 || c4 == 0 || c5 == 0) {
        div3.addEventListener('mousedown', function(e) {
            isDown3 = true;
            offset3 = [
                div3.offsetLeft - e.clientX,
                div3.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown3 = false;
            overlab3();
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown3) {
                mousePosition3 = {

                    x: event.clientX,
                    y: event.clientY

                };
                div3.style.left = (mousePosition3.x + offset3[0]) + 'px';
                div3.style.top = (mousePosition3.y + offset3[1]) + 'px';
            }
        }, true);
    }



    var mousePosition4;
    var offset4 = [0, 0];
    var isDown4 = false;

    function overlab4() {
        var rect4 = div4.getBoundingClientRect();
        x4 = rect4.left;
        y4 = rect4.top;
        w4 = rect4.width;
        h4 = rect4.height;
        if (x4 + w4 > 1720 && y4 + h4 > 800) {
            c4 = 1;
            div4.remove();
        }
    }
    if (c1 == 0 || c2 == 0 || c3 == 0 || c4 == 0 || c5 == 0) {
        div4.addEventListener('mousedown', function(e) {
            isDown4 = true;
            offset4 = [
                div4.offsetLeft - e.clientX,
                div4.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown4 = false;
            overlab4();
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown4) {
                mousePosition4 = {

                    x: event.clientX,
                    y: event.clientY

                };
                div4.style.left = (mousePosition4.x + offset4[0]) + 'px';
                div4.style.top = (mousePosition4.y + offset4[1]) + 'px';
            }
        }, true);
    }



    var mousePosition5;
    var offset5 = [0, 0];
    var isDown5 = false;


    function overlab5() {
        var rect5 = div5.getBoundingClientRect();
        x5 = rect5.left;
        y5 = rect5.top;
        w5 = rect5.width;
        h5 = rect5.height;
        if (x5 + w5 > 1720 && y5 + h5 > 800) {
            c5 = 1;
            div5.remove();
        }
    }
    if (c1 == 0 || c2 == 0 || c3 == 0 || c4 == 0 || c5 == 0) {
        div5.addEventListener('mousedown', function(e) {
            isDown5 = true;
            offset5 = [
                div5.offsetLeft - e.clientX,
                div5.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown5 = false;
            overlab5();
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown5) {
                mousePosition5 = {

                    x: event.clientX,
                    y: event.clientY

                };
                div5.style.left = (mousePosition5.x + offset5[0]) + 'px';
                div5.style.top = (mousePosition5.y + offset5[1]) + 'px';
            }
        }, true);
    }
    document.addEventListener('mouseup', function() {
        //alert('before: if' + c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' + c5);
        if (c1 == 1 && c2 == 1 && c3 == 1 && c4 == 1 && c5 == 1) {
            //alert(c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' + c5);

            //return
            $("#minigame1").modal('hide');
            return true;
        }
    }, true);
}

/*
var i, j;
var x, y, w, h;
var check = [0, 0, 0, 0, 0];
var mousePosition;
var offset = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
];
var isDown = [false, false, false, false, false];



function run(t) {
    i = t.getAttribute("id")[i];
    var div = document.querySelectorAll("div")[i];
    console.log(div);

    function overlab() {
        var rect = div.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
        w = rect.width;
        h = rect.height;
        if (x + w > 1720 && y + h > 800) {
            check[i] = 1;
            div[i].remove();
        }
    }
    if (!check[0] || !check[1] || !check[2] || !check[3] || !check[4]) {
        div.addEventListener('mousedown', function(e) {
            isDown[i] = true;
            offset[i] = [
                check.offsetLeft - e.clientX,
                check.offsetTop - e.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function() {
            isDown[i] = false;
            overlab();
        }, true);

        document.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown[i]) {
                mousePosition = {

                    x: event.clientX,
                    y: event.clientY

                };
                div.style.left = (mousePosition.x + offset[i][0]) + 'px';
                div.style.top = (mousePosition.y + offset[i][1]) + 'px';
            }
        }, true);
    }
    document.addEventListener('mouseup', function() {
        if (check[0] && check[1] && check[2] && check[3] && check[4]) {
            //alert("END");
            document.location.reload(true)
        }
    }, true);
};
*/