var t = new Path.Circle();
var word = "SAWYER";

var letterItems = word.split('').map(function(l,i){
    var r = 15;
    var li = new PointText(new Point(-1,r/3));
    li.fontSize = r;
    li.content = l;
    li.fillColor = 'white';
    li.strokeColor = 'black';
    li.strokeColor.alpha = '0.5';
    li.fontWeight = 'bold';
    li.justification = 'center';
    var circle = new Path.Circle(new Point(0,0), r);
    circle.fillColor = 'blue';
    var group = new Group([circle,li]);
    group.position = new Point(3*r*(i+1), view.bounds.height + r);
    group.acceleration = 0;
    group.rotationAcceleration = 0;
    group.velocity = new Point(0,0);
    group.applyMatrix = false;
    return group;
});

function onMouseDown(e){
    launch();
    console.log(e);
}

function launch(){
    var rotations = stepRange(-15,15,letterItems.length);
    var rotationAccels = stepRange(-0.5,0.5,letterItems.length);
    //rotationAccels = binarySplit(-0.25, 0.25, letterItems.length);
    //rotationAccels = replicate(-0.125, letterItems.length);
    var colors = cycle(
        ['red','orange','yellow','green','blue','indigo','violet'],
        letterItems.length);
    letterItems.forEach(function(li,i){
        li.position.y = view.bounds.height + 30;
        li.velocity.y = -2.5;
        li.acceleration = 0.02;
        li.children[0].fillColor = colors[i];
        li.rotation = rotations[i];
        li.rotationAcceleration = rotationAccels[i];
    });
}

launch();
setInterval(launch,5000);

function replicate(value,count){
    var values = [];
    for(var i=0; i<count; i++){
        values.push(value);
    }
    return values;
}

function binarySplit(a,b,count){
    var aCount = count/2;
    var bCount = count - aCount;
    var values = [];
    for(var i=0; i<aCount; i++){
        values.push(a);
    }
    for(var i=0; i<bCount; i++){
        values.push(b);
    }
    return values;
}

function CircularArray(items){
    var _i = -1;
    this.getNext = function(){
        if(++_i >= items.length){
            _i = 0;
        }
        return items[_i];
    }
}

function cycle(items, desiredItemCount){
    var cycledItems = [];
    var i=0;
    for(var n=0; n<desiredItemCount; n++){
        cycledItems.push(items[n]);
        if(++i >= items.length){
            i = 0;
        }
    }
    return cycledItems;
}

function stepRange(min,max,stepCount){
    var stepSize = (max - min)/stepCount;
    var values = [];
    for(var i=0; i<stepCount; i++){
        values.push(min + i*stepSize);
    }
    return values;
}

function onFrame(e){
    letterItems.forEach(function(li){
        li.position += li.velocity;
        li.velocity.y += li.acceleration;
        li.rotation += li.rotationAcceleration;
    });
}