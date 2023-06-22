// Tests for parseString() in from_str_get_fig_indices.js
const parseString = require('./from_str_get_fig_indices');
// tests
r = parseString("2c-e");
console.log(r[0]);  // ["2", ["c", "d", "e"]]
console.log(r[1]);  // ["2", ["c", "d", "e"]]

r = parseString("1a");
console.log(r[0]);  // ["1", ["a"]]
console.log(r[1]);  // ["1", ["a"]]