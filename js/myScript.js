
var bounceDemo = createBounceDemo(new Point(1,1), new Size(200,20));
var handleDemo = createHandleDemo(new Point(20,40));
var simpleDemo = createSimpleDemo(new Point(50,120));

function createBounceDemo(topLeft, size){
    var rect = new Path.Rectangle(topLeft, size);
    rect.strokeColor = 'red';
    rect.strokeWidth = 1;
    var ball = new Path.Circle(topLeft + [2,2], size.height/2);
    ball.position.top = topLeft.y + 1;
    ball.position.left = topLeft.x + 1;
    ball.fillColor = 'black';
    return {
        update: function(){
            //rect.position += [1,1];
        }
    };
}

function createSimpleDemo(position){
    var line = new Path();
    line.strokeColor = 'black';
    line.moveTo(position);
    line.lineTo(position + [ 100, 20 ]); // Note the plus operator on Point objects. // PaperScript does that for us, and much more!
    var circle = new Path.Circle({
        center: position,
        radius: 10,
        strokeColor: 'blue'
    });
    return {
        line: line,
        circle: circle
    };
}

function onResize(event){
    console.log('resize:',event);
}

function onFrame(event){
	handleDemo.a.fillColor.hue += 1;
    handleDemo.b.fillColor.hue -= 1;
    bounceDemo.update();
}

function createHandleDemo(offset){
    var path = new Path();
    path.strokeColor = 'black';
    path.fillColor = 'blue';
    path.add(new Point(0, 50) + offset); 
    path.add(new Point(0, 0) + offset); 
    path.add(new Point(50, 0) + offset);
    path.add(new Point(50, 50) + offset);
    path.closed = true;
    path.fullySelected = true; // This is so we can see its handles.
    var copy = path.clone();
    copy.fullySelected = true;
    copy.position.x += 100;
    copy.smooth();
    return {
        a: path,
        b: copy
    };
}