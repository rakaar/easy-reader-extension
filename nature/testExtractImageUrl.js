// testing NatureScrapeImageUrl() in NatureScrapeImageUrl.js
const NatureScrapeImageUrl = require('./NatureScrapeImageUrl.js');

// Tests for NatureScrapeImageUrl() in test_get_fig_from_link.js
async function run() {
    const imageUrl = await NatureScrapeImageUrl("https://www.nature.com/articles/s41586-023-05910-2", 3);
}

run();
