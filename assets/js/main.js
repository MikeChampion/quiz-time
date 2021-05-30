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
const startBtnContEl = document.querySelector("#start-btn-cont");
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
const gameOverEl = document.querySelector("#game-over-container");
const prevAnsContEl = document.querySelector(".prev-question-result");
const prevAnsEl = document.querySelector("#prev-q-result");
const formEl = document.querySelector(".init-form");
const formBtnEl = document.querySelector(".form-submit-btn");

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
let ansLi = [a1El, a2El, a3El, a4El];
let count = 0;
let prevAns = "";
let score = 0;
let time;
let topScores = [{ MC: 5 }, { MC: 3 }, { NOV: 4 }];

/* TRIGGERED BY EVENT LISTENER ON START BUTTON */
function beginQuiz() {
    // gameOverEl.classList.add("hidden");
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
    timerEl.textContent = "00";
    clearInterval(timeRemaining);
    quizContainerEl.classList.add("hidden");
    // gameOverEl.classList.remove("hidden");
    formEl.classList.remove("hidden");

    // local storage initials and score
    // render topFive();
    // saveScore();
    // renderTopScores();

    // return;
}

function saveScore(e) {
    const initials = document.querySelector("init-form");
    e.preventDefault();
    console.log(initials);
    // console.log(event.target);
    // console.log(event.target.elements[0].value);

    // grabs the entire form as an object
    // const form = event.target;

    // `${name} is ${age} years old`
    // shoppingList.innerHTML += `<li>${form.elements[0].value}</li>`;
    // form.removeEventListener();
    // });

    // const form = e.target;
    // e.preventDefault();
    // console.log(e.target.elements.value);

    //     // save score and initials to localstorage (string)
    //     initials = input;
    //     score = score;
    //     localStorage.setItem(initials, score);
    formEl.classList.add("hidden");
    startBtnEl.classList.remove("hidden");
}

// function renderTopScores() {}

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
formBtnEl.addEventListener("click", saveScore);
