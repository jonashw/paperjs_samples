var length = 100;
var mass = 5;
var gravity = 1;
var friction = .1;
var amplitude = .6;

/*
constraint: length
variables: velocity, position
*/

var p = new Point(view.center.x, length);
var g = 1;
var rope = new Path({
    segments: [
        new Point(view.center.x, 0),
        p
    ],
    strokeColor: 'black',
    strokeWidth: 4
});
var c = new Path.Circle({
    radius:20,
    center: p,
    fillColor: 'blue'
});


function onMouseDown(e){
    //amplitude += .05;
}

function onFrame(e){
    var theta = amplitude*Math.cos(30*e.time * Math.sqrt(gravity/length));
    p.x = view.center.x + length * Math.sin(theta);
    p.y = length * Math.cos(theta);

    c.position = p;
    rope.segments[1].point = p;
}