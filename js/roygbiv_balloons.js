var colors = [0, 30, 60, 120, 210, 230, 274].map(function(h){ 
    return {hue: h, saturation: 1, brightness:1};
});

var h = view.bounds.height / colors.length;
var h_ = view.bounds.height / (colors.length+1);
var w = view.bounds.width / colors.length;

var bands =
    zipWith([
        replicate(view.center.x, colors.length),
        range(1,colors.length).map(function(i){ return h*(i-0.5);}),
        colors
    ],function(arr){
        console.log(arr);
        var x = arr[0];
        var y = arr[1];
        var c = arr[2];
        return new Path.Rectangle({
            position: [x, y],
            size: new Size(view.bounds.width, h+2),
            fillColor: c
        });
    });

var balloons =
    zipWith([
        range(1,colors.length).map(function(i){ return w*(i-0.5);}),
        range(1,colors.length).map(function(i){ return view.bounds.height - h_*(i/2 + 2);}),
        colors
    ],function(arr){
        console.log(arr);
        var x = arr[0];
        var y = arr[1];
        var c = arr[2];
        return new Path.Ellipse({
            center: [x, y],
            strokeColor:'white', 
            strokeWidth:2,
            radius: [.7*Math.min(w,h_),Math.min(w,h_)],
            fillColor: c
        });
    });

function range(from,to){
    var ns = [];
    for(var i=from; i<=to; i++){
        ns.push(i);
    }
    return ns;
}

function zipWith(arrs,f){
    var zipped = [];
    if(arrs.length === 0){
        return [];
    }
    var smallestArrayLength = arrs.reduce(function(max,arr){ return Math.min(max, arr.length); }, arrs[0].length);
    console.log('smallestArrayLength',smallestArrayLength);
    for(var i=0; i<smallestArrayLength; i++){
        var xs = arrs.map(function(arr){ return arr[i]; });
        zipped.push(f(xs));
    }
    return zipped;
}

function replicate(value,n){
    var values = [];
    for(var i=0; i<n; i++){
        values.push(value);
    }
    return values;
}