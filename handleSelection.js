// when text selected, handle it
function handleSelection(window_href, selectedText, precedingText) {
    console.log('**** In function handleSelection *******')
    console.log(`URL: ${window_href}`);
    console.log(`Selected text: ${selectedText}`);
    console.log(`Preceding text: ${precedingText}`);
    console.log('***********************************')

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
        console.log("ref num is ", extractLastNumber(selectedText))
        handleRef(window_href, extractLastNumber(selectedText));
    }

    

    console.log(`Context: ${context}`);

    //  selected text could be
    // 1. methods
    // see method in selected text
    // scrape all methods section wise
    // find similarity index of preceeding text with all sections
    // show the most similar section

    // 2. figures
    // see Fig in selected text or preceding text
    // if yes, get the number
    // from number and article link, get source of figure
    // show the figure

    // 3. references
    // see Ref in selected text or preceding text
    // if yes, get the number
    // from number and article link, get source of reference
    // hit google scholar API and get the abstract
    // show the abstract
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
  
  
  
  