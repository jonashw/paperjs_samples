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
//new Path.Circle({radius:5, center: [10,10], fillColor:'black'})
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

curves.forEach(function(c,i){
    var path = new Path({
        //segments: c.points.map(function(s){ return new Point(s) * 10 + [40,40*(i+1)]; }),
        segments: repeat(c.vectors,14).reduce(function(points,v){
            var nextPoint = points[points.length-1] + v;
            points.push(nextPoint);
            return points;
        }, [new Point(0,0)])
        .map(function(p){ return p * [5,10] + [1,30*(i+1)]; }),
        strokeColor: 'black',
        strokeWidth: 2});
    if(c.smooth){
        path.smooth();
    }
});
