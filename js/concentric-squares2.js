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
var k = 1/10;
var theta = Math.atan(k/(1-k));
var thetaD = theta * 180 / Math.PI;
var sin = Math.sin(theta);
var s = 150;
var rotation = 0;
for(var s = 150; s>8; s = k * s / sin){
    var size = new Size(s,s);
    var path = new Path.Rectangle({
        point: view.center - (size/2),
        size: size,
        fillColor: 'white',
        strokeColor: 'black'
    });
    path.rotate(rotation);
    rotation += thetaD;
}