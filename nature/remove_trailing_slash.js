function removeTrailingSlash(url) {
    if (url.endsWith('/')) {
        return url.slice(0, -1);  // Remove the last character
    } else {
        return url;  // Return the original string if it doesn't end with a slash
    }
}

module.exports = removeTrailingSlash;

