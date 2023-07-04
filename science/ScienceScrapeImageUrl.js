// Function to extract an image path link from URL of article and figure number
async function ScienceScrapeImageUrl(article_link, fig_num) {
    // Remove trailing slash from the URL
    article_link = removeTrailingSlash(article_link);

    try {
        // Fetch the HTML from the page
        const response = await fetch(article_link);
        const html = await response.text();

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Find the image URL
        const figure = doc.querySelector(`figure[id="F${fig_num}"].graphic`);
        const imageUrl = figure.querySelector('img').src;

        // Prepend the base URL if the image URL is relative
        if (!imageUrl.startsWith('http')) {
            return `https://www.science.org${imageUrl}`;
        } else {
            return imageUrl;
        }

    } catch (error) {
        console.log(`Error in request to link - ${article_link}`);
        console.error(error);
        return null;
    }
}

// Function to remove trailing slash from a URL
function removeTrailingSlash(url) {
    return url.replace(/\/$/, "");
}
