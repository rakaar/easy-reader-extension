// 100 chs before it

const window_href = window.location.href;

document.addEventListener('mouseup', function() {
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


// document.addEventListener('mouseup', function() {
//     var selection = window.getSelection();
//     var selectedText = selection.toString();

//     if (selectedText) {
//         var precedingNode = selection.anchorNode.previousSibling;
//         var precedingText = "";

//         // Collect text from preceding sibling nodes
//         while (precedingNode && precedingText.split(/\s+/).length <= 10) {
//             precedingText = precedingNode.textContent + " " + precedingText;
//             precedingNode = precedingNode.previousSibling;
//         }

//         var words = precedingText.split(/\s+/);
//         var lastTenWords = words.slice(Math.max(words.length - 10, 0)).join(" ");

//         console.log(`Selected text: ${selectedText}`);
//         console.log(`Last 10 words before selection: ${lastTenWords}`);
//     }
// });


//WORKS BUT does't take before tag
// document.addEventListener('mouseup', function() {
//     var selection = window.getSelection();
//     var selectedText = selection.toString();

//     if (selectedText) {
//         var parentNode = selection.anchorNode.parentNode;
//         var parentText = parentNode.textContent;
//         var startIndex = parentText.indexOf(selectedText);

//         if (startIndex > 0) {
//             var precedingText = parentText.substring(0, startIndex).trim();

//             var words = precedingText.split(/\s+/);
//             var lastTenWords = words.slice(Math.max(words.length - 10, 0)).join(" ");

//             console.log(`Selected text: ${selectedText}`);
//             console.log(`Last 10 words before selection: ${lastTenWords}`);
//         } else {
//             console.log(`Selected text: ${selectedText}`);
//             console.log('Selection is at the start of the text.');
//         }
//     }
// });


//  WORKS
// document.addEventListener('mouseup', function() {
//     var selectedText = window.getSelection().toString();
//     if (selectedText) {
//         console.log(selectedText);
//     }
// });
