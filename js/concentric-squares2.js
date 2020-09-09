/*
      Sb
    ,----.----------,
    |   .           |
 Sa |  .            |
    |t.   Sn        | S
    |.              |
    |               |
    '---------------'
    S = Sa + Sb
    k = Sb / S
    (t = theta)
    Tan t = Sb/Sa = k/(1-k)
*/
var kd = 0.001;
var k = 1/2;
var squares = [];
var k_shrinking = true;

function onFrame(){
    squares.forEach(function(s){
        s.remove();
    })
    squares.splice(0);
    var theta = Math.atan(k/(1-k));
    var thetaD = theta * 180 / Math.PI;
    var sin = Math.sin(theta);
    var s = 150;
    var rotation = 0;
    for(var s = 350; s>8; s = k * s / sin){
        var size = new Size(s,s);
        var path = new Path.Rectangle({
            point: view.center - (size/2),
            size: size,
            opacity:0.3,
            strokeColor: 'black'
        });
        path.rotate(rotation);
        rotation += thetaD;
        squares.push(path);
    }

    if(k < 1/20){
        k_shrinking = false;
    }
    if(k > 1/5){
        k_shrinking = true;
    }

    if(k_shrinking){
        k -= kd;
    } else {
        k += kd;
    }

    statusText.content = 'k = ' + k.toFixed(3) + ' (' + (k_shrinking ? 'shrinking' : 'growing') + ')';

}

var statusText = 
  new PointText({
    position: new Point(150,140),
    content: ''
  })