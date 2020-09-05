function range(from,to,step){
    var items = [];
    for(var i=from; i<=to; i+=step){
        items.push(i);
    }
    return items;
}

var s = Math.min(view.size.width/3.5, view.size.height/3.5);
range(0,120,60).map(function(theta){
    var el = new Path.Ellipse({
       center: view.center,
       radius: [3*s/2, s/2],
       //fullySelected:true,
       strokeWidth:s/14,
       strokeColor: {brightness:.7, saturation:1, hue: 2*theta},
       rotation: theta
    });    
    
    el.smooth({type:'continuous',from:0, to: 2});

    var ballColor = {brightness:.7, saturation:1, hue: (180+2*theta)%360};
    var l = 0;//el.length*theta/240;
    var speed = s*2;
    follower(el,l,speed,new Path.Circle({
        radius: s/6,
        fillColor: ballColor,
        applyMatrix: false
    }), function(progress) {
        var s =progress-.5;
        //console.log(s);
        this.scaling = 3*(s*s)+.5;
        //console.log(this.scaling);
    });
    
    follower(el,(l+el.length/2)%el.length, speed, new Path.Circle({
        radius: s/6,
        fillColor: ballColor,
        applyMatrix: false
    }), function(progress) {
        var s =.5-progress;
        //console.log(s);
        this.scaling = 2*(s*s)+.5;
        //console.log(this.scaling);
    });
});
//console.log();


cyclicTween(
    new Path.Circle({
        center: view.center,
        radius: s/8,
        fillColor:'#333',
        applyMatrix: false
    }),
    {scaling: 3/2},
    {scaling: .15},
    900,
    'easeInOutQuad');
   

function cyclicTween(obj,a,b,duration,easing){
    var tweenAB = function(){ obj.tween(a,b,{duration:duration, easing:easing, start: true}).then(function(){tweenBA(); }) };
    var tweenBA = function(){ obj.tween(b,a,{duration:duration, easing:easing, start: true}).then(function(){tweenAB(); }) };
    tweenAB();
}

function follower(path,offset,speed,obj,onProgress){
    obj.onFrame = function (event) {
      if (offset < path.length){
        this.position = path.getPointAt(offset);
        var progress = offset / path.length;
        if(!!onProgress){
            onProgress.call(obj,progress);
        }
        offset+=event.delta*speed;
      }
      else {
        offset=0;
      }
    };
}