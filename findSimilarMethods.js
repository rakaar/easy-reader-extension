function calculateSimilarity(referenceText, largeText) {
    // Check if the inputs are strings, if not convert them to string
    if (typeof referenceText !== 'string') {
        referenceText = String(referenceText);
    }
    if (typeof largeText !== 'string') {
        largeText = String(largeText);
    }

    // Regular expression to match numeric strings
    const numericRegex = /^\d+$/;

    // Convert both texts to lowercase, split into words, and filter out numeric strings from the referenceText
    let wordsReference = referenceText.toLowerCase().split(/\W+/).filter(word => !numericRegex.test(word));
    let wordsLarge = largeText.toLowerCase().split(/\W+/);

    let weight = 1; // Initial weight for the last word
    let totalScore = 0; // Total score

    // Iterate over the words in the referenceText in reverse order
    for (let i = wordsReference.length - 1; i >= 0; i--) {
        // Calculate the probability of the word appearing in largeText
        let wordOccurrences = wordsLarge.filter(word => word === wordsReference[i]).length;
        let probability = wordOccurrences / wordsReference.length;

        totalScore += (weight * probability); // Add the weighted probability to the total score
        weight /= 2; // Halve the weight for the next word
    }

    console.log("totalScrore ", totalScore)
    return totalScore;
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
