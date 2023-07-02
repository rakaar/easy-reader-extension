// Take a website link and reference number, show title, authors, abstract in the modal

async function showRef(windowHref, refNum) {
    // from current paper, get the refernce paper details
    // ref is an object with following keys: Title,PubMedLink, GoogleScholarLink,CASLink, ArticleLink
    let ref = null;
    if (localStorage.getItem('eprRefs') != null) {
        const allRefs = JSON.parse(localStorage.getItem('eprRefs'));
        ref = allRefs[refNum-1];
    } else {
        // nature
        if (windowHref.includes("nature.com")) {
            const allRefs = await NaturePreScrapeRef(windowHref);
            ref = allRefs[refNum-1];
        }
        // TODO science
    }
     
 
    
    let refPaperContent = {'title': '', 'authors': '', 'abstract': ''};
    // Plan: try extracting all 3 detials from pubmed. If it fails, extract from crossref
    if (ref != null) {
        if (ref.PubMedLink != '' || ref.ArticleLink != '') { // either pubmed or cross ref
            // try pubmed first
            let pubmedContent = null;
            if (ref.PubMedLink != '') {
                pubmedContent = await scrapePubmed(ref.PubMedLink);
            } else {
                pubmedContent = {};
            }

            if (!isObjEmpty(pubmedContent)) {
                refPaperContent.title = pubmedContent.title;
                refPaperContent.authors = pubmedContent.authors.join(', ');
                refPaperContent.abstract = pubmedContent.abstract;
            } else { // if no content from pubmed, try crossref
                if (ref.ArticleLink != '') {
                    const articleDoi = ref.ArticleLink.replace("https://doi.org/", "");
                    crossRefContent = await getCrossRef(articleDoi);
                    const { title, author, abstract } = crossRefContent.message;
                    // Convert the authors array into a string, with each author separated by a comma
                    const authorsNames = author.map(a => a.given + ' '  + a.family);
                    const authorsStr = authorsNames.join(', ');

                    refPaperContent.title = title;
                    refPaperContent.authors = authorsStr;
                    refPaperContent.abstract = abstract;
                }
            }
        } else { // no pubmed, no cross ref, just show title
            refPaperContent.title = ref.Title;
        }

    } // ref != null
    
    if (refPaperContent.title !=  ''){
       // Remove any existing drawers
       const existingDrawer = document.getElementById('sideDrawer');
       if (existingDrawer) {
       existingDrawer.remove();
       }

       // Create a new div with a side drawer and cross button
       const drawer = document.createElement('div');
       drawer.id = 'sideDrawer'; // Assign an id to the drawer
       drawer.style.position = 'fixed';
       drawer.style.zIndex = 1000;
       drawer.style.right = '0';
       drawer.style.top = '0';
       drawer.style.height = '100vh';
       drawer.style.width = '40%';
       drawer.style.backgroundColor = '#fff';
       drawer.style.overflow = 'auto';
       drawer.style.padding = '20px';
       drawer.style.boxShadow = '-2px 0 8px rgba(0, 0, 0, 0.2)';

       // Begin constructing the HTML to be inserted into the drawer
       let drawerHTML = `
           <button id="closeDrawer" style="position: fixed; right: 20px; top: 20px; background: none; border: none; font-size: 20px;">&times;</button>
       `;

       
        // Generate the HTML string
        // drawerHTML += `
        // <h3>${title}</h3>
        // <h5>${authorsStr}</h5>
        // <p>${abstract}</p>
        // `;
        drawerHTML += `
        <h3>${refNum}. ${refPaperContent.title}</h3>
        <h5>${refPaperContent.authors}</h5>
        <p>${refPaperContent.abstract}</p>
        `;
       
       // Set the drawer's HTML
       drawer.innerHTML = drawerHTML;

       // Add the drawer to the page
       document.body.appendChild(drawer);

       // Add an event listener for the cross button
       document.getElementById('closeDrawer').addEventListener('click', function() {
           // Remove the selection (highlight) from the page, else closed drawer will reopen
           window.getSelection().removeAllRanges();

           // close the drawer
           drawer.remove();
       });
    }
}

function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
}

