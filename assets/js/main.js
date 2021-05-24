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

function beginQuiz() {
    startBtnEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    countdown();
}

// function countdown() {
// 	// Sets interval in variable
// 	var timerInterval = setInterval(function() {
// 	  time--;
// 	  timerEl.textContent = secondsLeft + " seconds left till colorsplosion.";

// 	  if(secondsLeft === 0) {
// 		// Stops execution of action at set interval
// 		clearInterval(timerInterval);
// 		// Calls function to create and append image
// 		sendMessage();
// 	  }

// 	}, 1000);
//   }

function countdown() {
    var timeRemaining = setInterval(function () {
        time--;
        console.log(timeRemaining);
        timerEl.textContent = time;

        if (time === 0) {
            clearInterval(timeRemaining);
        }
    }, 1000);
}

/* EVENT LISTENERS */
startBtnEl.addEventListener("click", beginQuiz);
