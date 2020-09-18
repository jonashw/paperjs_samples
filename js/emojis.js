// So that CORS is not an issue, run this code in your browser's JavaScript console *AFTER* you navigate to https://emojipedia.org.
// After you paste in this code, execute it, and see that a blank window has been opened, click the body of the parent tab to kick off the scraping operation.
const scrapeCategory = async (win,cat) =>
    new Promise((resolve,reject) => {
        win.location.href = 'https://emojipedia.org/' + cat; 
        setTimeout(() => win.onload=() => {
            var emojis = [].slice.call(win.document.querySelectorAll('.emoji-list li'),0).map(e => 
                ({
                    char: e.querySelector('.emoji').innerText.trim(),
                    name: e.innerText.trim().slice(2).trim() 
                }));
            resolve(emojis);
        }, 200)
    });

const scrapeAll = async win => {
	let emojisByCategory = {};
	for(let cat of ['people','nature','food-drink','activity','travel-places','objects','symbols','flags']){
		let emojis = await scrapeCategory(win, cat);
		emojisByCategory[cat] = emojis;
	}
    return emojisByCategory;
};

var win = window.open('');
document.onclick = async () => {
    let emojis = await scrapeAll(win);
	console.log(emojis);
    console.log(JSON.stringify(emojis, null, 2));
}