async function scrapePubmed(pubmed_link) {
    // Send a request to the website
    const response = await fetch(pubmed_link);
    const html = await response.text();
    
    // Parse the website's content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract title
    const title = doc.querySelector('h1.heading-title').textContent.trim();
    
    // Extract authors
    const repeatedAuthors = Array.from(doc.querySelectorAll('.authors-list-item .full-name')).map(a => a.textContent.trim());
    const authors =[...new Set(repeatedAuthors)];
    
    // Extract abstract
    const abstract = doc.querySelector('.abstract-content.selected p').textContent.trim();
    
    // Return the data as an object
    return {title, authors, abstract};
}


