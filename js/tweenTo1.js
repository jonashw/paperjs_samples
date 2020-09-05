var s = view.bounds.width/3;
var rectangle = new Rectangle(view.center-s/2, new Size(s, s));
var cornerSize = new Size(s/8, s/8);
var path = new Path.Rectangle(rectangle, cornerSize);
path.applyMatrix=false;
path.strokeColor = {brightness:.4, saturation:.4, hue: 250};
path.strokeWidth = 4;
path.fillColor   = {brightness:1, saturation:.4, hue: 250};
path.opacity = .2;

function onMouseDown(e){
    console.log(e);
    path.tween(
        {
            'rotation': '+= 90'
        },
        {
            duration:1000,
            easing:'easeInOutQuad', start: true
        });
}