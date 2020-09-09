var speed = 4;
var scale = new Size(5,10) * [3,1.35];

function Circular(arr, startIntex){
    this.arr = arr;
    this.currentIndex = startIntex || 0;
  }
  
  Circular.prototype.next = function(){
    var i = this.currentIndex, arr = this.arr;
    this.currentIndex = i < arr.length-1 ? i+1 : 0;
    return this.current();
  }
  
  Circular.prototype.prev = function(){
    var i = this.currentIndex, arr = this.arr;
    this.currentIndex = i > 0 ? i-1 : arr.length-1;
    return this.current();
  }
  
  Circular.prototype.current = function(){
    return this.arr[this.currentIndex];
  }

var curves = [
    {
        id:'sine',
        smooth: true,
        vectors: [[1,1],[1,-1],[1,-1],[1,1]]
    },
    {
        id:'square',
        smooth: false,
        vectors: [[0,1],[2,0],[0,-2],[2,0],[0,1]]
    },
    {
        id:'triangle',
        smooth: false,
        vectors: [[1,1],[2,-2],[1,1]]
    },
    {
        id:'sawtooth',
        smooth: false,
        vectors: [[2,1],[0,-2],[2,1]]
    },
];

function repeat(arr,n){
    var repeated = arr.slice(0);
    for(var i=0; i<n; i++){
        repeated = repeated.concat(arr);
    }
    return repeated;
}

var wavePaths = curves.map(function(c,i){
    var path = new Path({
        //segments: c.points.map(function(s){ return new Point(s) * 10 + [40,40*(i+1)]; }),
        segments: repeat(c.vectors,14).reduce(function(points,v){
            var nextPoint = points[points.length-1] + v;
            points.push(nextPoint);
            return points;
        }, [new Point(0,0)])
        .map(function(p){ return p * scale + [1,30*(i+1)]; }),
        strokeColor: 'black',
        strokeWidth: 2});
    if(c.smooth){
        path.smooth();
    }
    c.path = path;
    return path;
});

var circle = 
    new Path.Circle({
        center: view.center,
        radius: 70,
        fillColor: '#dddddd',
        strokeColor: 'black',
        strokeWidth:2
    });

new Group({
    children: [
        circle.clone()
    ].concat(wavePaths),
    clipped: true
});


new PointText({
    position: new Point(20,75),
    content: 'Drag to\nchange\nspeed\n<- ->'
})

function onMouseDrag(event) {
    speed = 1 + 10*(event.middlePoint.x / view.bounds.width);
}

function onFrame(e){
    curves.forEach(function(c){
        c.path.position.x+= speed;
        if(c.path.position.x > view.bounds.width - scale.width * 4){
            c.path.position.x = scale.width * 4;
        }
        if(c.path.position.x < scale.width * 4){
            c.path.position.x = view.bounds.width - scale.width * 4;
        }
    })
}