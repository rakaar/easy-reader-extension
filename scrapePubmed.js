pubmedAPIlink = "https://pubmed-api-q1u2.onrender.com";

async function scrapePubmed(pubMedPaperLink) {
    pubMedPaperLink = modifyNcbiLink(pubMedPaperLink);
    console.log(`In scrapePubmed, fetch sent to =  ${pubmedAPIlink}?link=${pubMedPaperLink}`)
    return fetch(`${pubmedAPIlink}?link=${pubMedPaperLink}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.error('Error:', err);
        return {};
    });
}


function modifyNcbiLink(originalLink) {
    let url = new URL(originalLink);

    // Check if the hostname includes "ncbi.nlm.nih.gov"
    if (url.hostname.includes("ncbi.nlm.nih.gov")) {
        let list_uids = url.searchParams.get("list_uids");

        // Ensure list_uids param exists and is a valid number
        if (list_uids && !isNaN(list_uids)) {
            // Construct the new link
            return `https://www.pubmed.ncbi.nlm.nih.gov/${list_uids}`;
        }
    }

    // If conditions aren't met, return the original link
    return originalLink;
}

