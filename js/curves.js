var amount = 40;
var height = 10;
var resolution = 1;
var waves = [
    {fn: Math.sin, smooth: true},
    {fn: function(t){ return t % 4 < 2 ? 1 : -1 } },
    {fn: function(t){ return Math.abs((t % 4) - 2) -1; }},
    {fn: function(t){ return (t % 4)/2 - 1; }}
];
waves.forEach(function(w){
    var path = new Path({
        strokeColor: [0],
        strokeWidth: 2,
        strokeCap: 'square',
        strokeJoin: 'round'
    });

    // Add 5 segment points to the path spread out
    // over the width of the view:
    for (var i = 0; i <= amount; i++) {
        //path.add(new Point(i / amount * view.bounds.width, 100));
    }
    for (var x = 0; x <= view.bounds.width; x += resolution) {
        path.add(new Point(x, 0));
    }

    w.path = path;
}); 
 
function onFrame(event) {
    waves.forEach(function(w,wi){
        var path = w.path;
        if(!path){
            return;
        }
        path.segments.forEach(function(segment,i){
            var y = w.fn(segment.point.x/10 + event.time*10);
            segment.point.y = y * height + 30 + 30*wi;
        })
        //path.selected = true;
        if(w.smooth){
            path.smooth();
        }
    });
}