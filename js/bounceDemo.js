var sound = new Howl({
    src: ['assets/click.mp3']
  });

var Ball = function(point, radius, velocity, item) {
    this.velocity = velocity * 1;
    this.velocity /= 20;
	this.point = point;
	this.gravity = 0.00;
    this.bounce = -1.0;
    this.radius = radius;
    var d = 2 * radius;
    this.aabb = new Rectangle(point,new Size(d,d));
	// Wrap CompoundPath in a Group, since CompoundPaths directly 
	// applies the transformations to the content, just like Path.
	this.item = new Group({
		children: [item],
		transformContent: false,
		position: this.point
    });
    this.intersectionMag = new Rectangle();
}

Ball.createFill = function(point, radius, velocity, color){
	var gradient = new Gradient([color, 'black'], true);
	var item = new CompoundPath({
		children: [
			new Path.Circle({
				radius: radius
			}),
			new Path.Circle({
				center: radius / 8,
				radius: radius / 3
			})
		],
		fillColor: new Color(gradient, 0, radius, radius / 8),
	});
    return new Ball(point, radius, velocity, item);
}

Ball.createRaster = function(point, radius, velocity, imgId){
    var r = new Raster(imgId);
    var targetDiameter = radius*2;
    var targetScale = targetDiameter / r.size.width;
    r.scale(targetScale);
    return new Ball(point, radius, velocity, r);
}

Ball.prototype.playBounceSound = function(){
    var soundId = sound.play();
    sound.once('play', function () {
        // Set the position of the speaker in 3D space.
        //sound.pos(this.aabb.x + 0.5, this.aabb.y + 0.5, -0.5, soundId);
        sound.volume(0.2, soundId);
    });
}

Ball.prototype.iterate = function(containerRectangle) {
    intersectionMagnitude(this.intersectionMag, containerRectangle, this.aabb);
    if(this.intersectionMag.isEmpty()){
        //If there is no intersection, the ball is OUTSIDE its container!
        return;
    }
	this.velocity.y += this.gravity;
    var d = 2*this.radius;
    var m = this.intersectionMag;
    var xAdjust = 0;
    var yAdjust = 0;
    if(!m.width || m.width <= d){
        xAdjust = (this.aabb.width - m.width) * (this.velocity.x < 0 ? 1 : -1);
        this.velocity.x *= -1;
        this.playBounceSound();
    }
    if(!m.height || m.height <= d){
        yAdjust = (this.aabb.height - m.height) * (this.velocity.y < 0 ? 1 : -1);
        this.velocity.y *= -1;
        this.playBounceSound();
    }
    var nextPosition = this.aabb.center + this.velocity;
    nextPosition.y += yAdjust;
    nextPosition.x += xAdjust;
	this.item.position = this.aabb.center = nextPosition;
    this.item.rotate(this.velocity.x);
    var vMax = 10;
    this.velocity.y = clamp(-vMax,this.velocity.y,vMax);
};

function clamp(min,value,max){
    return Math.max(min, Math.min( max, value));
}

var rect = new Rectangle(new Point(10,10), new Point(290,140));
var containerRect = new Path.Rectangle(rect);
containerRect.strokeColor = 'blue';
console.log(rect);

function shouldEqual(actual,expected,msg){
    if(actual == expected){
        var m = !!msg ? (': ' + msg).trim() : '';
        console.info('PASS' + m);
    } else {
        var m = !!msg ? (msg + ' ').trim() : '';
        console.error(
            'FAIL: ' 
            + m 
            + ' is ' 
            + actual.toString() 
            + ' but should be ' 
            + expected.toString());
    }
}

function tests(){
    function test1(o){
        var m = new Rectangle();
        var a = new Rectangle(new Point(50,50) + o, new Size(50,50));
        var b = new Rectangle(new Point(40,40) + o, new Size(50,50));
        intersectionMagnitude(m, a, b);
        console.info(m);
        drawRect(a);
        drawRect(b);
        drawRect(m,'blue');
        shouldEqual(m.width,  40, 'width');
        shouldEqual(m.height, 40, 'height');
        shouldEqual(m.x, 50 + o.x, 'x');
        shouldEqual(m.y, 50 + o.y, 'y');
    }
    function test2(o){
        var m = new Rectangle();
        var a = new Rectangle(new Point(40,50) + o, new Size(50,50));
        var b = new Rectangle(new Point(50,40) + o, new Size(50,50));
        intersectionMagnitude(m, a, b);
        console.info(m);
        drawRect(a);
        drawRect(b);
        drawRect(m,'blue');
        shouldEqual(m.width,  40, 'width');
        shouldEqual(m.height, 40, 'height');
        shouldEqual(m.x, 50 + o.x, 'x');
        shouldEqual(m.y, 50 + o.y, 'y');
    }
    function test3(o){
        var m = new Rectangle();
        var a = new Rectangle(new Point(45,45) + o, new Size(50,50));
        var b = new Rectangle(new Point(45,45) + o, new Size(50,50));
        intersectionMagnitude(m, a, b);
        console.info(m);
        drawRect(a);
        drawRect(b);
        drawRect(m,'blue');
        shouldEqual(m.width,  50, 'width');
        shouldEqual(m.height, 50, 'height');
        shouldEqual(m.x, 45 + o.x, 'x');
        shouldEqual(m.y, 45 + o.y, 'y');
    }

    function drawRect(r,fillColor){
        var br = new Path.Rectangle(r);
        br.strokeColor = 'black';
        if(fillColor){
            br.fillColor = fillColor;
        }
    }
    var oy = 10;
    test1(new Point(0,oy));
    test2(new Point(70,oy));
    test3(new Point(70 + 70,oy));
}

function intersectionMagnitude(outRect,a,b){
    if(!a.intersects(b)){
        outRect.x = 0;
        outRect.y = 0;
        outRect.width = 0;
        outRect.height = 0;
        return;
    }

    if(between(a.left, b.left, a.right)){
        outRect.x = b.left;
        outRect.width = a.right - b.left;
    } else
    if (between(a.left, b.right, a.right)){
        outRect.x = a.left;
        outRect.width = b.right - a.left;
    }

    if(between(a.top, b.top, a.bottom)){
        outRect.y = b.top;
        outRect.height = a.bottom - b.top;
    } else
    if (between(a.top, b.bottom, a.bottom)){
        outRect.y = a.top;
        outRect.height = b.bottom - a.top;
    }
}

function between(min,v,max){
    return min <= v && v <= max;
}

tests();

function map(arr,fn){
    var results = [];
    for(var i=0; i<arr.length; i++){
        results.push(fn(arr[i]));
    }
    return results;
}
  

var balls = map(
    [
        'lion'
        /*
         'random'
        ,'random'
        ,'cooper'
        ,'maizy'
        ,'lion'
        ,'gorilla'
        ,'koala'
        ,'mama'
        ,'papa'
        ,'sawyer'
        */
    ], function(t){
        var radius = 25;
        var safeSpawnArea = 
            new Size(
                rect.x - radius + (rect.width  * Math.random()),
                rect.y - radius + (rect.height * Math.random()));
        var position = new Point(radius,radius) + Point.random() * safeSpawnArea;
        var velocity = (Point.random() - [0.5, 0]) * [50, 60];
        if(t == 'random'){
            var color = {
                hue: Math.random() * 360,
                saturation: 1,
                brightness: 1
            };
            return Ball.createFill(position, radius, velocity, color);
        }
        return Ball.createRaster(position, radius, velocity, t);
    });

var textItem = new PointText({
	point: [20, 30],
	fillColor: 'black',
	content: 'Click, drag and release to add balls.'
});

var lastDelta;
function onMouseDrag(event) {
	lastDelta = event.delta;
}

function onMouseUp(event) {
    var color = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
    };
    var radius = 10 * Math.random() + 10;
    var velocity = lastDelta || new Point(0,0);
    var ball = Ball.createFill(event.point, radius, velocity, color);
	balls.push(ball);
	lastDelta = null;
}

function onFrame() {
	for (var i = 0, l = balls.length; i < l; i++)
		balls[i].iterate(rect);
}