/** QUIZ
 * timer countdown
 * display question
 * 		multiple choice
 * 		randomize the multiple choice

 * if right score++
 * if wrong decrement remaining time
 * at game end 
 * 		Enter initials
 * 		record score and initials in local storage
 * 		(High score list of top 5?)
 *
 *  */

/* VARIABLES */
const timerEl = document.getElementById("timer");
const startBtnEl = document.getElementById("start-btn");
const quizContainerEl = document.getElementById(
    "question-answer-result-container"
);
const questionEl = document.getElementById("question");
const a1El = document.getElementById("a1");
const gameOverEl = document.getElementById("game-over-container");

const questAnsList = [
    {
        question: "Which is not a basic data type?",
        boolean: "wrong",
        undefined: "wrong",
        unknown: "correct",
        number: "wrong",
    },
];
let time = 10;
let qCount = 0;

function beginQuiz() {
    startBtnEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    countdown();
    renderQuestion();
}

function renderQuestion() {
    for (qCount; qCount < questAnsList.length; qCount++) {
        questionEl.textContent = questAnsList[qCount].value;
        console.log(questAnsList[qCount].value);
    }
}

function countdown() {
    var timeRemaining = setInterval(function () {
        time--;

        if (time >= 10) {
            timerEl.textContent = time;
        }

        if (time < 10) {
            timerEl.textContent = "0" + time;
        }

        if (time === 0) {
            clearInterval(timeRemaining);
            // startBtnEl.classList.remove("hidden");
            // quizContainerEl.classList.add("hidden");
            // gameOverEl.classList.remove("hidden");
        }
    }, 1000);
}

/* EVENT LISTENERS */
startBtnEl.addEventListener("click", beginQuiz);
