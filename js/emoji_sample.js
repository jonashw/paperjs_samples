var texts = [];
var emoji_rows = [
    [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "🥰",
    ],
    [
        "🐐",
        "🐪",
        "🐫",
        "🦙",
        "🦒",
        "🐺",
    ],
    [
        "🍃",
        "🍄",
        "🌰",
        "🦀",
        "🦞",
        "🌪",
    ]
];
var size = 44;

texts = 
    emoji_rows.flatMap((row,ri) =>
    row.map((e,xi) =>
    new PointText({
        position: new Point(xi*(1.15*size),(ri*1.15 + .85)*size),
        fontSize:size,
        content: e
    })));

function onFrame(e){
    console.log(e);
    texts.forEach(function(t){ t.rotate(1) });
}