
// Handle Figure
async function handleFig(window_href, selectedText) {
    // extract number from the selected text
    const match = selectedText.match(/\d+/);
    const firstNumber = match ? parseInt(match[0]) : null;
    
    // based on journal in window_href, get the source of the figure
    if (window_href.includes("nature.com")) {
        const imageUrl = await extractImageUrl(window_href, firstNumber);
        
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
        drawer.style.zIndex = 1000;  // make sure the drawer appears on top of all other elements
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
            <img src="${imageUrl}" style="width: 100%; height: 100%;">
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