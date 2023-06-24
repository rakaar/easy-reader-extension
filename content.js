// 100 chs before it

let windowHref = window.location.href;
// remove any trailing #
let windowHrefSplit = windowHref.split('#');
let windowHrefNoHash = windowHrefSplit[0];

document.addEventListener('mouseup', function(event) {
    // If the mouseup event is happening on the 'X' button, just return
    if (event.target.id === 'closeDrawer') {
        return;
    }
    var selection = window.getSelection();
    var selectedText = selection.toString();

   
    if (selectedText) {
        var parentNode = selection.anchorNode.parentNode;
        var parentText = parentNode.textContent;
        var startIndex = parentText.indexOf(selectedText);
        var precedingIndex = Math.max(0, startIndex - 100);
        var precedingText = parentText.substring(precedingIndex, startIndex).trim();
    
        handleSelection(windowHrefNoHash, selectedText, precedingText);
    }
});



// wait until the DOM is fully loaded
if (document.readyState !== 'loading') {
    scrapeMethodsAndRefs();
} else {
    document.addEventListener('DOMContentLoaded', scrapeMethodsAndRefs);
}

async function scrapeMethodsAndRefs() {
    console.log("DOM Content Loaded");
    let windowHref = window.location.href;
    // remove any trailing #
    let windowHrefSplit = windowHref.split('#');
    let windowHrefNoHash = windowHrefSplit[0];

    // scrape the data
    const allMethods = await NatureScrapeMethods(windowHrefNoHash);
    const allRefs = await NatureScrapeRef(windowHrefNoHash);

    console.log("All Methods are ", allMethods)
    console.log("All Refs are ", allRefs)
    
    localStorage.setItem('eprMethods', JSON.stringify(allMethods));
    localStorage.setItem('eprRefs', JSON.stringify(allRefs));
}

// scrape methods from a nature paper
async function NatureScrapeMethods(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');

        let methodsSection = doc.querySelector('section[data-title="Methods"]');
        let methodTitles = methodsSection.querySelectorAll('h3');

        let methods = Array.from(methodTitles).map((titleElement) => {
            let contentElements = [];
            let sibling = titleElement.nextElementSibling;

            while (sibling && sibling.tagName !== 'H3') {
                contentElements.push(sibling.outerHTML); 
                sibling = sibling.nextElementSibling;
            }

            return {
                title: titleElement.textContent,
                content: contentElements.join('\n') 
            };
        });

        return methods;
    } catch (err) {
        console.log('Failed to fetch page: ', err);
    }
}

// extract Ref from link and number
async function NatureScrapeRef(url) {
    console.log("Extract Refis")
    // Fetch HTML content from the given URL
    const response = await fetch(url);
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

    return references;
}
