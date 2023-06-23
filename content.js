// 100 chs before it

const window_href = window.location.href;

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
    
        handleSelection(window_href, selectedText, precedingText);
    }
});
