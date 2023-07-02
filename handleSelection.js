// when text selected, handle it
function handleSelection(windowHref, selectedText, precedingText) {
    
    // find if selected text is a method/figure/reference
    // convert to lowercase
    let selectedTextLower = selectedText.toLowerCase();
    let precedingTextLower = precedingText.toLowerCase();

    // initialize context as an empty string
    let context = '';

    // check for 'method', 'fig', and 'ref'
    if (selectedTextLower.includes('method')) {
        context = 'method';
        showMethods(windowHref, precedingText)
    } else if (selectedTextLower.includes('fig') || precedingTextLower.includes('fig')) {
        context = 'fig';
        showFig(windowHref, selectedText)
    } else if (extractLastNumber(selectedText) !== null) {
        context = 'ref';
        showRef(windowHref, extractLastNumber(selectedText));
    }
}


function extractLastNumber(selectedText) {
    const hasNumber = /\d/.test(selectedText);
    
    if (hasNumber) {
      // This regular expression matches the last sequence of digits in the string
      const lastNumberMatch = selectedText.match(/(\d+)(?!.*\d)/);
      
      if (lastNumberMatch) {
        return Number(lastNumberMatch[0]);
      }
    }
  
    return null;
  }
  
  
  
  