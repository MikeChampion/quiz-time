/** QUIZ
 * timer countdown
 * display question
 * 		multiple choice
 * 		randomize the multiple choice?

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
const questCountEl = document.getElementById("question-count");
const questionEl = document.getElementById("question");
const ansContEl = document.getElementById("answer-btn-container");
const a1El = document.getElementById("a1");
const a2El = document.getElementById("a2");
const a3El = document.getElementById("a3");
const a4El = document.getElementById("a4");
const gameOverEl = document.getElementById("game-over-container");

const questAnsArr = [
    {
        question: "Which of these is not a type of JavaScript?",
        answers: [
            { text: "ReactJS", correct: false },
            { text: "VueJS", correct: false },
            { text: "NodeJS", correct: false },
            { text: "Java", correct: true },
        ],
    },
    {
        question: "Which is not a basic data type?",
        answers: [
            { text: "undefined", correct: false },
            { text: "unknown", correct: true },
            { text: "boolean", correct: false },
            { text: "number", correct: false },
        ],
    },
];
let ansLi = [a1El, a2El, a3El, a4El];
let count = 0;
let time = 10;

function beginQuiz() {
    startBtnEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    countdown();
    pickQuestion();
}

function pickQuestion() {
    let i = count;
    var qa = questAnsArr[i];
    console.log(qa);
    renderQuestAns(qa, i);

    count++;
}

function renderQuestAns(question, i) {
    questCountEl.textContent = i + 1;
    questionEl.textContent = question.question;
    let answers = question.answers;
    for (let i = 0; i < answers.length; i++) {
        ansLi[i].textContent = answers[i].text;
        ansLi[i].dataset.correct = answers[i].correct;
    }
}

function chooseAnswer(e) {
    //validate answer
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

ansContEl.addEventListener("click", checkAnswer);
