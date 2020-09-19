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

var easeFns = [
    e => 2 * Math.sin(e.time%1),
    e => 5 * Math.sin(e.time),
    e => 2 * easeInOutBounce((e.time/12)%1),
];

function onFrame(e){
    
    texts.forEach((t,i) => {
        let theta = easeFns[i % easeFns.length](e);
        t.rotate(theta);
    });
}

function easeInOutBounce(x){
    return x < 0.5
        ? (1 - easeOutBounce(1 - 2 * x)) / 2
        : (1 + easeOutBounce(2 * x - 1)) / 2;
}

function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}