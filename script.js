const questions = [
    {
        question: "How are you feeling today?",
        answers: [
            { text: "Happy", mood: "happy" },
            { text: "Relaxed", mood: "relaxed" },
            { text: "Energetic", mood: "energetic" },
            { text: "Sad", mood: "sad" }
        ]
    },
    {
        question: "What type of activity do you feel like doing?",
        answers: [
            { text: "Dancing", mood: "energetic" },
            { text: "Reading", mood: "relaxed" },
            { text: "Reflecting", mood: "sad" },
            { text: "Having fun with friends", mood: "happy" }
        ]
    },
    {
        question: "Which scenery resonates with you the most?",
        answers: [
            { text: "Sunny beach", mood: "happy" },
            { text: "Mountain peak", mood: "energetic" },
            { text: "Quiet forest", mood: "relaxed" },
            { text: "Rainy day", mood: "sad" }
        ]
    }
];

let selectedMoods = [];
let currentQuestionIndex = 0;

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");

    questionText.innerText = question.question;
    answerButtons.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", answer.mood);
        button.onclick = () => selectAnswer(answer.mood);
        answerButtons.appendChild(button);
    });

    updateControlButtons();
}

function selectAnswer(mood) {
    selectedMoods.push(mood);
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    const resultDiv = document.getElementById("result");
    const moodCount = {};

    selectedMoods.forEach(mood => {
        moodCount[mood] = (moodCount[mood] || 0) + 1;
    });

    const maxMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);
    
    resultDiv.innerText = `Your mood seems to be: ${maxMood.charAt(0).toUpperCase() + maxMood.slice(1)}!`;

    const playlistLinks = {
        happy: 'https://open.spotify.com/playlist/0tPNEuXuJ3JGoeOfppeSc8',
        relaxed: 'https://open.spotify.com/genre/0JQ5DAqbMKFKDIyhfS9NTT',
        energetic: 'https://open.spotify.com/playlist/0eXxqedDSEHxA5tf5pjT8w',
        sad: 'https://open.spotify.com/playlist/37i9dQZF1EIdChYeHNDfK5'
    };

    const moodImages = {
        happy: 'images/happy.jpeg',
        relaxed: 'images/relax.jpeg',
        energetic: 'images/hype.jpeg',
        sad: 'images/sad.jpg'
    };

    const playlistLinkDiv = document.getElementById("playlist-link");
    playlistLinkDiv.innerHTML = `
        <a href="${playlistLinks[maxMood]}" target="_blank">
            <img src="${moodImages[maxMood]}" alt="${maxMood} playlist" class="mood-image">
            <p class="click-text">CLICK</p>
        </a>
    `;
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
    }
}

function resetQuiz() {
    selectedMoods = [];
    currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);
    document.getElementById("result").innerText = "";
    document.getElementById("playlist-link").innerHTML = "";
    updateControlButtons();
}

function updateControlButtons() {
    const previousBtn = document.getElementById("previous-btn");
    const resetBtn = document.getElementById("reset-btn");

    previousBtn.disabled = currentQuestionIndex === 0;

    resetBtn.innerText = currentQuestionIndex === questions.length ? "Restart Quiz" : "Reset";
}

startQuiz();
