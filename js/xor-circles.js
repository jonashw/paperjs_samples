//let's make sure the circles stay within view
var radius = Math.min(view.size.width/3, view.size.height/3);
var offset = radius/3;
var circles = [];
for(var i=0; i<12; i++){
    var circle = new Path.Circle({
        radius: radius,
        position: view.center-[offset,offset],
        blendMode: 'xor',
        fillColor:'#00b7fd'
    });
    circles.push(circle);
}

function onFrame(e){
    circles.forEach(function(c,i,cs){
        c.rotate(i/8, view.center);
    });
}