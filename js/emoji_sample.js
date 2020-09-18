var texts = [];
fetch('/js/emojis.json')
.then(function(r){ return r.json(); })
.then(function(emojis){
    console.log(emojis.people.slice(0,2));
    var size = 50;
    texts = 
        emojis.people.slice(0,5).map(function(e,i){
            return new PointText({
                position: new Point(i*(1.15*size),size),
                fontSize:size,
                content: e.char
            });
        });
    console.log(texts);
})

function onFrame(){
    texts.forEach(function(t){ t.rotate(1) });
}