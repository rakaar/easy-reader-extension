// extract fig number and subfigure index from a string
function parseString(str) {
    // Function to extract figure number and sub figure  indices from a string
    // Input: "2c-e" or "1a"
    // output: ["2", ["c", "d", "e"]] or ["1", ["a"]]
    let num = str.match(/\d+/)[0];  // Extract the number
    let alpha = str.match(/[a-z]+/g);  // Extract the alphabets
    let alphaRange = [];
  
    if(alpha.length === 1) {
        alphaRange.push(alpha[0]);
    } else if (alpha.length === 2) {
        let start = alpha[0].charCodeAt(0);  // Get the ASCII value of the starting alphabet
        let end = alpha[1].charCodeAt(0);  // Get the ASCII value of the ending alphabet

        for(let i = start; i <= end; i++) {
            alphaRange.push(String.fromCharCode(i));  // Convert the ASCII value back to alphabet and push it into the array
        }
    }
    return [num, alphaRange];
}

module.exports = parseString;