
// Handle Figure
async function showFig(windowHref, selectedText) {
    // extract number from the selected text
    const match = selectedText.match(/\d+/);
    const firstNumber = match ? parseInt(match[0]) : null;
    
    let imageUrl = null;
    // nature
    if (windowHref.includes("nature.com")) {
        imageUrl = await NatureScrapeImageUrl(windowHref, firstNumber);
    } else if (windowHref.includes("science.org")) {
        imageUrl = await ScienceScrapeImageUrl(windowHref, firstNumber);
    }
    // todo science


    if (imageUrl != null) {
        
        // inserting the image
        // Remove any existing drawers
        const existingDrawer = document.getElementById('sideDrawer');
        if (existingDrawer) {
        existingDrawer.remove();
        }

        // Create a new div with a side drawer and cross button
        const drawer = document.createElement('div');
        drawer.id = 'sideDrawer'; // Assign an id to the drawer
        drawer.style.position = 'fixed';
        drawer.style.zIndex = 9999;  // make sure the drawer appears on top of all other elements
        drawer.style.right = '0';  // align the drawer to the right side of the page
        drawer.style.top = '0';    // align the drawer to the top of the page
        drawer.style.height = '100vh';  // make the drawer full height
        drawer.style.width = '40%';  // make the drawer 30% of the width of the page
        drawer.style.backgroundColor = '#fff';  // adjust as needed
        drawer.style.overflow = 'auto';  // add scrolling if the content is too long
        drawer.style.padding = '20px';  // adjust as needed
        drawer.style.boxShadow = '-2px 0 8px rgba(0, 0, 0, 0.2)';  // add a shadow effect

        // Add an image and a cross button to the drawer
        drawer.innerHTML = `
        <button id="closeDrawer" style="position: fixed; right: 20px; top: 20px; background: none; border: none; font-size: 20px;">&times;</button>
        <div style="padding: 20px;">
            <img src="${imageUrl}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        `;


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