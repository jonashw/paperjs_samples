var amount = 100;
var height = 15;
var waves = [
    {fn: Math.sin, smooth: true},
    {fn: function(t){ return t % 6 < 3 ? 3 : 0 } },
    {fn: function(t){ return Math.abs((t % 6) - 3);; }}
    //{fn: Math.tan},
];
waves.forEach(function(w){
    var path = new Path({
        strokeColor: [0.8],
        strokeWidth: 3,
        strokeCap: 'square'
    });

    // Add 5 segment points to the path spread out
    // over the width of the view:
    for (var i = 0; i <= amount; i++) {
        path.add(new Point(i / amount * view.bounds.width, 100));
    }

    w.path = path;
});

function onFrame(event) {
    waves.forEach(function(w,wi){
        var path = w.path;
        if(!path){
            return;
        }
        for (var i = 0; i <= amount; i++) {
            var segment = path.segments[i];
            var y = w.fn(event.time * 3 + i);
            segment.point.y = y * height + 20 + 45*wi;
        }
        //path.selected = true;
        if(w.smooth){
            path.smooth();
        }
    });
}