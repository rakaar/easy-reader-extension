function calculateSimilarity(text1, text2) {
    // Create a regular expression to match HTML tags
    const regex = /(<([^>]+)>)/ig;

    // Use the replace method to remove HTML tags from the content strings
    text1 = text1.replace(regex, '');
    text2 = text2.replace(regex, '');

    // Check if the inputs are strings, if not convert them to string
    if (typeof text1 !== 'string') {
        text1 = String(text1);
    }
    if (typeof text2 !== 'string') {
        text2 = String(text2);
    }

    // Define common English words to exclude
    const commonWords = ["the", "a", "an", "of", "and", "is", "in", "it", "you", "that"];

    // Convert both texts to lowercase, split into words and filter out common words
    let words1 = text1.toLowerCase().split(/\W+/).filter(word => !commonWords.includes(word));
    let words2 = text2.toLowerCase().split(/\W+/).filter(word => !commonWords.includes(word));

    // Count the number of occurrences of each word in both texts
    let counts1 = words1.reduce(countOccurrences, {});
    let counts2 = words2.reduce(countOccurrences, {});

    // Sum the counts of the common words
    let commonWordCount = Object.keys(counts1).reduce((sum, word) => {
        if(word in counts2) {
            sum += Math.min(counts1[word], counts2[word]);
        }
        return sum;
    }, 0);

    // Return the score
    return commonWordCount;
}

function countOccurrences(counts, word) {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
}

function findSimilarMethods(text, objects) {
    // Calculate the similarity scores
    let scores = objects.map((object, index) => ({
        index: index,
        score: calculateSimilarity(text, object.title + ' ' + object.content)
    }));

    // Sort by score in descending order and take the top 3
    scores.sort((a, b) => b.score - a.score);
    // let top3 = scores.slice(0, 3);
    let top3 = scores; // TEMP for now, give all, not just top 3
    // Return the top 3 objects
    return top3.map(score => objects[score.index]);
}
