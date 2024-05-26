// Lists of adjectives and nouns
const adjectives = ['Brika', 'Chapati', 'Ojja', 'Pizza', 'Lablebi', 'mlokhia'];
const nouns = ['Bel Fraise', 'Bel Harissa', 'Bel Thon', 'Bel Adhma', 'Bel Ananas'];

// Function to generate a random quiz name
function generateQuizName() {
    // Randomly select an adjective and a noun
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    // Combine the adjective and noun to form the quiz name
    const quizName = `${randomAdjective} ${randomNoun}`;

    return quizName;
}

export const randomQuizName = generateQuizName();