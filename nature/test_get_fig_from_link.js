const extractImageUrl = require('./get_fig_from_link.js');

// Tests for extractImageUrl() in test_get_fig_from_link.js
async function run() {
    const imageUrl = await extractImageUrl("https://www.nature.com/articles/s41586-023-05910-2", 3);
    console.log(imageUrl);
}

run();
