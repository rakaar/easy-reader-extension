// extract an image path link from URL of article and fig number
const axios = require('axios');
const cheerio = require('cheerio');
const removeTrailingSlash = require('./remove_trailing_slash.js');

async function extractImageUrl(article_link, fig_num) {
    // Function to extract figure of certain number from a link
    // Input: "https://www.nature.com/articles/s41586-020-03145-4", 2
    // Output: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-05910-2/MediaObjects/41586_2023_5910_Fig2_HTML.png"


    article_link = removeTrailingSlash(article_link);
    try {
        const figUrl = `${article_link}/figures/${fig_num}`;
        const response = await axios.get(figUrl);
        const $ = cheerio.load(response.data);
        const imageUrl = $(`img[alt="Fig. ${fig_num}"]`).attr('src');
        return `https:${imageUrl}`
    } catch (error) {
        console.log("Error occurred to URL ", article_link, " and figure number ", fig_num);
        console.log(`Final link - ${article_link}/figures/${fig_num}`)
        console.error(error);
        return null
    }
}

module.exports = extractImageUrl;
