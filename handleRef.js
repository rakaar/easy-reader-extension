// handle ref
async function handleRef(window_href, ref_num) {
    let ref = null;
    if (window_href.includes("nature.com")) {
        if (localStorage.getItem('eprRefs') === null) {
            const allRefs = await NatureScrapeRef(window_href);
            ref = allRefs[ref_num-1];
        } else {
            const allRefs = JSON.parse(localStorage.getItem('eprRefs'));
            ref = allRefs[ref_num-1];
        }

        
        // ref has keys
        // Title,PubMedLink, GoogleScholarLink,CASLink, ArticleLink
    }

    let refPaperContent = {'title': '', 'authors': [], 'abstract': ''};

    let pubmedContent = null;
    if (ref != null && ref.PubMedLink != ''){
        pubmedContent = await scrapePubmed(ref.PubMedLink);
        if (!isObjEmpty(pubmedContent)) {
            refPaperContent.title = pubmedContent.title;
            refPaperContent.authors = pubmedContent.authors.join(', ');
            refPaperContent.abstract = pubmedContent.abstract;
        } else {
            const articleDoi = ref.ArticleLink.replace("https://doi.org/", "");
            crossRefContent = await getCrossRef(articleDoi);
            let { title, author, abstract } = crossRefContent.message;
            // Convert the authors array into a string, with each author separated by a comma
            let authorsNames = author.map(a => a.given + ' '  + a.family);
            let authorsStr = authorsNames.join(', ');

            refPaperContent.title = title;
            refPaperContent.authors = authorsStr;
            refPaperContent.abstract = abstract;

        }         
            
    }
    
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
        <h3>${ref_num}. ${refPaperContent.title}</h3>
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

