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
    question: "The basic component/components of Decision Support System is/are",
    options: ["Database", "Model base", "DSS software system", "All of the above"],
    correct: "All of the above",
  },
  {
    id: "1",
    question: "In MIS design, the sources of information may be categorized as ... and ...",
    options: ["Internal, external", "Personal, organizational", "Useful, unuseful", "Constructive, destructive"],
    correct: "Internal, external",
  },

  {id: "2",
  question: "Which one of the following model is based on business management, accounting, and econometrics principles",
  options: ["Policymaking models", "Behavioral model", "Management science models", "None of these"],
  correct: "Management science models",
  },

  {id: "3",
  question: " An ... is a collection of procedures for converting data into knowledge and facts.",
  options: ["Information system", "Data system", "Storage system", "None of these"],
  correct: "Information system",
},

{id: "4",
question: " A system is called ... when the inputs, method, and outputs are all well-known",
options: ["Nondeterministic", "Deterministic", "Probabilistic", "None of these"],
correct: "Deterministic",
},

{id: "5",
question: "Which of the following steps is/are the implementation plans involved in MIS?",
options: ["Preparing organizational plans", "Planning of workflow", "Training of personnel", "All of these"],
correct: "All of these",
},

{id: "6",
question: " Which of the following is included in the Office automation systems?",
options: ["Word processing and spreadsheet", "Electronic mail", "Audio and Video conversation", "All of these"],
correct: "All of these",
},

{id: "7",
question: " In a ... network, clients and another server work together to process the application.",
options: ["Cloud computing", "Mobile computing", "Client-server computing", "All of these"],
correct: "Client-server computing",
},

{id: "8",
question: "  The ... is defined as a set of activities performed across the organization creating as the output of value to the customer.",
options: ["Business process", "Marketing process", "Production process", "None of these"],
correct: "Business process",
},

{id: "9",
question: "Which one of the following is not included in a Transaction Processing System:",
options: ["Input", "Process", "Output","Feedback"],
correct: "Feedback",
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