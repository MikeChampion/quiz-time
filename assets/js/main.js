/** QUIZ
 * UI - basically DONE may need minor tweaks as progress is made
 * timer countdown - DONE
 * display question - DONE
 * 		multiple choice - DONE
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
const prevAnsContEl = document.querySelector(".prev-question-result");
const prevAnsEl = document.getElementById("prev-q-result");

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
let shuffQuestAnsArr = shuffleArray(questAnsArr);
let ansLi = [a1El, a2El, a3El, a4El];
let count = 0;
let time = 10;
let prevAns = "";
let score = 0;

function beginQuiz() {
    gameOverEl.classList.add("hidden");
    count = 0;
    time = 10;
    prevAns = "";
    score = 0;
    startBtnEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    countdown();
    pickQuestion();
}

function pickQuestion() {
    console.log(score);
    if (count === shuffQuestAnsArr.length) {
        endGame();
        return;
    }
    let i = count;
    var qa = shuffQuestAnsArr[i];
    renderQuestAns(qa, i);
    count++;
}

function renderQuestAns(question, i) {
    questCountEl.textContent = i + 1;
    questionEl.textContent = question.question;
    let answers = shuffleArray(question.answers);
    for (let i = 0; i < answers.length; i++) {
        ansLi[i].textContent = answers[i].text;
        ansLi[i].dataset.correct = answers[i].correct;
    }
    if (prevAns === true) {
        prevAnsEl.classList.remove("hidden");
        prevAnsEl.textContent = "correct";
    } else if (prevAns === false) {
        prevAnsEl.classList.remove("hidden");
        prevAnsEl.textContent = "wrong";
    }
}

function chooseAnswer(e) {
    const correct = e.target.dataset.correct;
    console.log(correct);
    // correct ? score++ : time--;
    if (correct) {
        score++;
        console.log(score);
    } else if (!correct) {
        time--;
        console.log("wrong answer");
    }
    renderPrevAns(correct);
    pickQuestion();
}

function renderPrevAns(correct) {
    console.log(correct);
    prevAnsContEl.classList.remove("hidden");
    prevAnsEl.textContent = "test";

    if (correct == true) {
        prevAnsEl.textContent = "right";
        console.log("right");
    } else {
        prevAnsEl.textContent = "wrong";
        console.log("wrong");
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
            endGame();
            return;
        }
    }, 1000);
}

function endGame() {
    // startBtnEl.classList.remove("hidden");
    // quizContainerEl.classList.add("hidden");
    // gameOverEl.classList.remove("hidden");
    alert("GAME OVER");
    return;
}

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
ansContEl.addEventListener("click", chooseAnswer);
