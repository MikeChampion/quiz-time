/** QUIZ
 * UI - basically DONE (may need minor tweaks as progress is made)
 * timer countdown - DONE
 * previous answer status - DONE
 * display question - DONE
 * 		multiple choice - DONE
 *      randomize the questions - DONE 
 * 		randomize the multiple choice - DONE 

 * if right score++
 * else decrement remaining time
 * 
 * if prev answer
 * else prev answer
 * 
 * game end trigger for no time or questions left - DONE
 * at game end 
 * 		Enter initials (alert?)
 * 		record score and initials in local storage
 * 		(High score list of top 5?)
 *  */

/* HTML VARIABLES */
const timerEl = document.querySelector("#timer");
const startBtnEl = document.querySelector("#start-btn");
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
// const prevAnsContEl = document.querySelector(".prev-question-result");
// const prevAnsEl = document.querySelector("#prev-q-result");

/* EVENT LISTENERS */
startBtnEl.addEventListener("click", beginQuiz);
startBtnEl.addEventListener("click", countdown);
ansContEl.addEventListener("click", chooseAnswer);

/* JS VARIABLES */
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
let prevAns = "";
let score = 0;
let time;
let topScores = [{ MC: 5 }, { MC: 3 }, { NOV: 4 }];

function beginQuiz() {
    // gameOverEl.classList.add("hidden");
    count = 0;
    prevAns = "";
    score = 0;
    startBtnEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    // prevAnsContEl.classList.add("hidden");
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
    // if (prevAns === true) {
    //     prevAnsEl.classList.remove("hidden");
    //     prevAnsEl.textContent = "correct";
    // } else if (prevAns === false) {
    //     prevAnsEl.classList.remove("hidden");
    //     prevAnsEl.textContent = "wrong";
    // }
}

function chooseAnswer(e) {
    const correct = e.target.dataset.correct;
    if (Boolean(correct === true)) {
        score++;
    } else {
        time--;
    }
    // renderPrevAns(correct);
    pickQuestion();
}

// function renderPrevAns(correct) {
//     prevAns = "";
//     prevAnsContEl.classList.remove("hidden");
//     prevAnsEl.textContent = "test";
//     if (Boolean(correct === true)) {
//         prevAnsEl.textContent = "right";
//     } else {
//         prevAnsEl.textContent = "wrong";
//     }
// }

function endGame() {
    timerEl.textContent = "00";
    clearInterval(timeRemaining);
    startBtnEl.classList.remove("hidden");
    quizContainerEl.classList.add("hidden");
    // gameOverEl.classList.remove("hidden");
    // alert("GAME OVER");
    prompt("Please enter your initials.");
    // local storage initials and score
    // render topFive();
    // saveScore();
    renderTopScores();
    return;
}

// function saveScore() {
//     // save score and initials to localstorage (string)
//     initials = input;
//     score = score;
//     localStorage.setItem(initials, score);
// }

function renderTopScores() {}

function shuffleArray(arr) {
    for (var x = arr.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var temp = arr[x];
        arr[x] = arr[holder];
        arr[holder] = temp;
    }
    return arr;
}
