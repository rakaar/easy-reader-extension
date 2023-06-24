// when text selected, handle it
function handleSelection(window_href, selectedText, precedingText) {
    
    // find if selected text is a method/figure/reference
    // convert to lowercase
    let selectedTextLower = selectedText.toLowerCase();
    let precedingTextLower = precedingText.toLowerCase();

    // initialize context as an empty string
    let context = '';

    // check for 'method', 'fig', and 'ref'
    if (selectedTextLower.includes('method')) {
        context = 'method';
        handleMethod(window_href, precedingText)
    } else if (selectedTextLower.includes('fig') || precedingTextLower.includes('fig')) {
        context = 'fig';
        handleFig(window_href, selectedText)
    } else if (extractLastNumber(selectedText) !== null) {
        context = 'ref';
        handleRef(window_href, extractLastNumber(selectedText));
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
  
  
  
  