var dtheta = 7;
var theta = dtheta;
for(var s = 200; s>= 10; s-=10){
    var size = new Size(s,s);
    var path = new Path.Rectangle({
        point: view.center - (size/2),
        size: size,
        fillColor: 'white',
        strokeColor: 'black'
    });
    path.rotate(theta);
    theta += dtheta;
}