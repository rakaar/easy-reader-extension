// extract Ref from link and number
async function extractRef(windowHref,refNum) {
    console.log("Extract Refis")
    // Fetch HTML content from the given URL
    const response = await fetch(windowHref);
    const html = await response.text();

    console.log("got HTML")

    // Use DOMParser to convert the HTML string to a Document object
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    console.log("doc")
    // Query the document for the list items that contain the references
    const items = doc.querySelectorAll('.c-article-references__item');

    // console.log("items is ", items)
    // Map each item to an object that contains the extracted information
    const references = Array.from(items).map(item => {
        const title = item.querySelector('.c-article-references__text').textContent;
        const pubMedLinkElement = item.querySelector('a[data-track-action="pubmed reference"]');
        const googleScholarLinkElement = item.querySelector('a[data-track-action="google scholar reference"]');
        const casLinkElement = item.querySelector('a[data-track-action="cas reference"]');
        const articleLinkElement = item.querySelector('a[data-track-action="article reference"]');

        return {
            Title: title,
            PubMedLink: pubMedLinkElement ? pubMedLinkElement.href : "",
            GoogleScholarLink: googleScholarLinkElement ? googleScholarLinkElement.href : "",
            CASLink: casLinkElement ? casLinkElement.href : "",
            ArticleLink: articleLinkElement ? articleLinkElement.href : "",
        };
    });
    console.log("references are ", references)

    return references[refNum-1];
}