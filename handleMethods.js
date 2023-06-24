// handle method
async function handleMethod(window_href, precedingText) {
    let mostSimilarMethods = null;
    if (window_href.includes("nature.com")) {
        // get all methods
        if (localStorage.getItem('eprMethods') === null) {
            const allMethods = await extractMethods(window_href, precedingText)
            mostSimilarMethods = findSimilarMethods(precedingText, allMethods)
        } else {
            const allMethods = JSON.parse(localStorage.getItem('eprMethods'));
            mostSimilarMethods = findSimilarMethods(precedingText, allMethods)
        }

       
        // display in a drawer
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

        // Loop through each method and add its title and content to the HTML string
        for(let method of mostSimilarMethods) {
            drawerHTML += `
                <h3>${method.title}</h3>
                <div>${method.content}</div>
            `;
        }

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