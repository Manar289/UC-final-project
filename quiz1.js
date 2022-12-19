//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "A key role of Management Information Systems is",
    options: ["To develop and share documents that support day-today organizational activities.", "To process business information", "To materialize the business transaction data and produce insightful information which assists managers in decision making", "None of the above"],
    correct: "To materialize the business transaction data and produce insightful information which assists managers in decision making",
  },
  {
    id: "1",
    question: "Which one of the following is not a prerequisite for a good MIS",
    options: ["Database", "Support from Staff", "Control and maintenance of MIS", "MIS executives"],
    correct: "Support from Staff",
  },

  {id: "2",
  question: "What amongst the followings are the primary characteristics which must be processed by information?",
  options: ["Availability", "Timeliness", "Accuracy", "All of these"],
  correct: "All of these",
  },

  {id: "3",
  question: " It is a necessity of the data to be ... before it can be converted into information.",
  options: ["Processed", "Transformed", "Edited", "None of these"],
  correct: "Processed",
},

{id: "4",
question: " Which of the following is not an objective of MIS?",
options: ["Supports in decision-making", "Provides insightful information", "Assist management people", "Recruit people for system"],
correct: "Recruit people for system",
},

{id: "5",
question: "Which one is the organization's Back Bone?",
options: ["Capital", "Employee", "Management", "Information"],
correct: "Information",
},

{id: "6",
question: " Amongst following, which cannot be considered as a business driver in information system?",
options: ["Redesign a business process", "Information security and privacy", "Proliferation of networks and the Internet", "None of these"],
correct: "Proliferation of networks and the Internet",
},

{id: "7",
question: " An MIS information comes from,",
options: ["Internal source", "External source", "Both internal and external source", "None of the above"],
correct: "Both internal and external source",
},

{id: "8",
question: " Which one is an internal source of information for MIS,",
options: ["Customers care department", "HR department", "Marketing department","All of these"],
correct: "All of these",
},

{id: "9",
question: "... details are provided by management to marketing department.",
options: ["Supplier's", "Customer's", "Employee's","None of the above"],
correct: "Supplier's",
},

];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};