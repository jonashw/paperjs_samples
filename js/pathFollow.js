var reductionFactor = 3;
var path = new Path({
    segments: [
        new Point(200, 100)/reductionFactor,
        new Point(200, 400)/reductionFactor,
        new Point(700, 100)/reductionFactor,
        new Point(700, 400)/reductionFactor
    ],
    closed: true
});

function pathVisible(visible){
    path.fullySelected = !!visible;
    path.strokeColor = !!visible ? 'black' : null;
}

pathVisible(true);

var circle = new Path.Circle(100,100,10);

circle.strokeColor = 'red'

var offset = 0;

circle.onFrame = function (event) {
  if (offset< path.length){
    circle.position =path.getPointAt(offset);
    offset+=event.delta*150; // speed - 150px/second
  }
  else {
    offset=0;
  }
}

function onMouseDown(e){
    switch(e.event.button){
        case 0:
            path.smooth();
            break;
        case 1:
            pathVisible(false);
            break;
        case 2:
            break;
    }
}

function onMouseUp(e){
    switch(e.event.button){
        case 0:
            path.clearHandles();
            break;
        case 1:
            pathVisible(true);
            break;
        case 2:
            break;
    }
    e.event.preventDefault();
    e.event.stopPropagation();
}