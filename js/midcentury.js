var g = new Group({insert: false});
var s = 47;
var ss = s * .95;

var circle = new Path.Circle({
    parent: g,
    center: new Point(s/2,s/2),
    radius: ss/2,
    fillColor: 'orange',
    applyMatrix: false
});

var square = new Path.Rectangle({
    parent: g,
    point: new Point(0,s/2),
    size: new Size(s, s),
    fillColor:'teal',
    applyMatrix: false
});

var c = new Path.Circle({ center: view.center });

var pairOffset = s / 20;
var groups = [];
for (var yi=0; yi<view.bounds.height/s - 1; yi++)
for (var xi=0; xi<view.bounds.width/s-1; xi++){
    var box = new Path.Rectangle({
        position: new Point(s/2,s/2),
        size: new Size(s,s),
        fillColor: 'white',
        applyMatrix: false
    })
    var a = circle.subtract(square);
    var b = circle.intersect(square);
    if(Math.random() < 0.9){
        a.rotate(180);
        b.rotate(180);
    }
    //b.position.y += pairOffset;
    var result = new Group({
        children: [box, a, b],
        position: new Point(s/2,s/2) * [2*xi+1,2*yi+1],
        applyMatrix: false
    });
    if(Math.random() < 0.5){
        result.rotate(90);
    }
    result.insertAbove(c)
    groups.push(result);
}

setInterval(function(){
    var i = Math.floor(Math.random() * groups.length);
    if(Math.random() < 0.8){
        groups[i].rotate(90);
    } else {
        groups[i].children.forEach(function(c){ c.rotate(180); });
    }
}, 1000);

function onMouseDown(e){
    console.log(e);
    var group = groups.filter(function(g){ return g.bounds.contains(e.point)})[0];
    if(!group){
        return;
    }
    if(e.modifiers.shift){
        group.rotate(90);
    } else {
        group.children.forEach(function(c){ c.rotate(180); });
    }
}