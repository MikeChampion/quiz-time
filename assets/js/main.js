/** QUIZ
 * UI - basically DONE (may need minor tweaks as progress is made)
 * timer countdown - DONE
 * previous answer status - DONE
 * display question - DONE
 * 		multiple choice - DONE
 *      randomize the questions - DONE
 * 		randomize the multiple choice - DONE
 * if right score++; else decrement remaining time - DONE
 * if prev answer; else prev answer - DONE
 * game end trigger for no time or questions left - DONE
 *
 * at game end
 * 		Enter initials (alert?)
 * 		record score and initials in local storage
 * 		(High score list of top 5?)
 *  */

/* HTML VARIABLES */
const timerEl = document.querySelector("#timer");
const top1El = document.querySelector("#top-1");
const top2El = document.querySelector("#top-2");
const top3El = document.querySelector("#top-3");
const top4El = document.querySelector("#top-4");
const top5El = document.querySelector("#top-5");
//const startBtnContEl = document.querySelector("#start-btn-container");
const startBtnEl = document.querySelector(".start-btn");
const quizContainerEl = document.querySelector(
    "#question-answer-result-container"
);
const questCountEl = document.querySelector("#question-count");
const questionEl = document.querySelector("#question");
const ansContEl = document.querySelector("#answer-btn-container");
const a1El = document.querySelector("#a1");
const a2El = document.querySelector("#a2");
const a3El = document.querySelector("#a3");
const a4El = document.querySelector("#a4");
const prevAnsContEl = document.querySelector(".prev-question-result");
const prevAnsEl = document.querySelector("#prev-q-result");
const formEl = document.querySelector(".init-form");

/* QUESTION ARRAY */
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
        question:
            "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "parentheses", correct: false },
            { text: "brackets", correct: false },
            { text: "quotes", correct: true },
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
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "back ticks", correct: false },
            { text: "terminal", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true },
        ],
    },
];

/* VARIABLES */
let shuffQuestAnsArr = shuffleArray(questAnsArr);
let top5Li = [top1El, top2El, top3El, top4El, top5El];
let ansLi = [a1El, a2El, a3El, a4El];
let count = 0;
let prevAns = "";
let score = 0;
let time;
renderTopScores();

/* TRIGGERED BY EVENT LISTENER ON START BUTTON */
function beginQuiz() {
    count = 0;
    score = 0;
    startBtnEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    prevAnsContEl.classList.add("hidden");
    pickQuestion();
}

function countdown() {
    time = 10;
    timerEl.textContent = time;
    timeRemaining = setInterval(function () {
        time--;

        if (time >= 10) {
            timerEl.textContent = time;
        }

        if (time < 10) {
            timerEl.textContent = "0" + time;
        }

        if (time === -1) {
            endGame();
            return;
        }
    }, 1000);
}

function pickQuestion() {
    if (count === shuffQuestAnsArr.length) {
        endGame();
        return;
    }
    i = count;

    var qa = shuffQuestAnsArr[i];
    renderQuestAns(qa, i);
    count++;
}

function renderQuestAns(question, i) {
    questCountEl.textContent = i + 1;
    questionEl.textContent = question.question;
    let answers = shuffleArray(question.answers);
    for (let i = 0; i < answers.length; i++) {
        console.log(answers[i].text);
        ansLi[i].textContent = answers[i].text;
        ansLi[i].dataset.correct = answers[i].correct;
    }
    if (prevAns === "") {
        prevAnsContEl.classList.add("hidden");
    } else if (prevAns == "true") {
        prevAnsContEl.classList.remove("hidden");
        prevAnsEl.textContent = "correct";
    } else {
        prevAnsContEl.classList.remove("hidden");
        prevAnsEl.textContent = "wrong";
    }
}

function chooseAnswer(e) {
    prevAns = e.target.dataset.correct;
    let correct = e.target.dataset.correct;
    if (correct == "true") {
        score++;
    } else {
        time--;
    }
    pickQuestion();
}

function endGame() {
    prevAns = "";
    clearInterval(timeRemaining);
    timerEl.textContent = "00";
    quizContainerEl.classList.add("hidden");
    formEl.classList.remove("hidden");
}

/* GETS FORM INPUT OF INITIALS AND SAVES WITH SCORE TO 'TOPSCORES' */
/* SORTS TOPSCORES BY SCORE */
function saveScore(event) {
    event.preventDefault();
    let topScores = JSON.parse(localStorage.getItem("topScores"));
    if (!topScores) {
        topScores = [];
    }
    var init1 = document.querySelector("#init1").value;
    var init2 = document.querySelector("#init2").value;
    var init3 = document.querySelector("#init3").value;
    let initials = init1.concat(init2, init3);
    initials = initials.toUpperCase();
    let newScore = { name: initials, score: score };
    topScores.push(newScore);
    topScores.sort((a, b) => (b.score > a.score ? 1 : -1));
    topScores = JSON.stringify(topScores);
    localStorage.setItem("topScores", topScores);
    formEl.classList.add("hidden");
    startBtnEl.classList.remove("hidden");
    renderTopScores();
}

/* RENDERS LOCALSTORAGE SCORES TO THE TOP 5 LIST */
function renderTopScores() {
    let top5get = JSON.parse(localStorage.getItem("topScores"));
    if (!top5get) {
        return;
    }
    for (let i = 0; i < top5get.length; i++) {
        let t5 = `  ${top5get[i].name}  ${top5get[i].score}`;
        top5Li[i].textContent = t5;
    }
}

/* SHUFFLES QUESTION ARRAY AND ANSWERS */
function shuffleArray(arr) {
    for (var x = arr.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var temp = arr[x];
        arr[x] = arr[holder];
        arr[holder] = temp;
    }
    return arr;
}

/* EVENT LISTENERS */
startBtnEl.addEventListener("click", beginQuiz);
startBtnEl.addEventListener("click", countdown);
ansContEl.addEventListener("click", chooseAnswer);
formEl.addEventListener("submit", saveScore);
