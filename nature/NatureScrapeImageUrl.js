// extract an image path link from URL of article and fig number
// Function to remove trailing slash

async function NatureScrapeImageUrl(article_link, fig_num) {
    // Function to extract figure of certain number from a link
    // Input: "https://www.nature.com/articles/s41586-020-03145-4", 2
    // Output: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-05910-2/MediaObjects/41586_2023_5910_Fig2_HTML.png"

    article_link = removeTrailingSlash(article_link);
    try {
        const figUrl = `${article_link}/figures/${fig_num}`;
        const response = await fetch(figUrl);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const imageUrl = doc.querySelector(`img[alt="Fig. ${fig_num}"]`).src;
        return imageUrl;
    } catch (error) {
        console.log(`Error in request to link - ${article_link}/figures/${fig_num}`)
        console.error(error);
        return null
    }
}

// if a link ends with '/', remove it
function removeTrailingSlash(url) {
    if (url.endsWith('/')) {
        return url.slice(0, -1);  // Remove the last character
    } else {
        return url;  // Return the original string if it doesn't end with a slash
    }
}



