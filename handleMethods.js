// handle method
async function handleMethod(window_href, precedingText) {
    if (window_href.includes("nature.com")) {
        // get all methods
        const allMethods = await extractMethods(window_href, precedingText)
        console.log("all methods are ", allMethods)
        // find top 3 similar methods
        const mostSimilarMethods = findSimilarMethods(precedingText, allMethods)
        console.log("text is ", precedingText)
        console.log("most similar methods are ", mostSimilarMethods)
        // display in a drawer
        // Create a new div with a side drawer and cross button
        const drawer = document.createElement('div');
        drawer.style.position = 'fixed';
        drawer.style.zIndex = 1000;  // make sure the drawer appears on top of all other elements
        drawer.style.right = '0';  // align the drawer to the right side of the page
        drawer.style.top = '0';    // align the drawer to the top of the page
        drawer.style.height = '100vh';  // make the drawer full height
        drawer.style.width = '40%';  // make the drawer 30% of the width of the page
        drawer.style.backgroundColor = '#fff';  // adjust as needed
        drawer.style.overflow = 'auto';  // add scrolling if the content is too long
        drawer.style.padding = '20px';  // adjust as needed
        drawer.style.boxShadow = '-2px 0 8px rgba(0, 0, 0, 0.2)';  // add a shadow effect

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
            drawer.parentNode.removeChild(drawer);
        });

        
    }
}