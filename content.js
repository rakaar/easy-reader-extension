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

// scrape methods and refs in advance
async function scrapeMethodsAndRefs() {
    let windowHref = window.location.href;
    // remove any trailing #
    let windowHrefSplit = windowHref.split('#');
    let windowHrefNoHash = windowHrefSplit[0];

    // scrape the data
    if (windowHref.contains("nature.com")) {
        const allMethods = await NatureScrapeMethods(windowHrefNoHash);
        const allRefs = await NatureScrapeRef(windowHrefNoHash);
        
        localStorage.setItem('eprMethods', JSON.stringify(allMethods));
        localStorage.setItem('eprRefs', JSON.stringify(allRefs));
    }
    
}
