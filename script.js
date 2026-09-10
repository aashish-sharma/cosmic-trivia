/* =========================
   QUIZ DATA
========================= */

const questions = [
  {
    question: "What is the largest known volcano in the Solar System?",
    options: [
      "Mauna Kea, Earth",
      "Olympus Mons, Mars",
      "Mount Everest, Earth",
      "Maat Mons, Venus"
    ],
    answer: 1,
    explanation: "Olympus Mons on Mars stands roughly 22 km high, making it the largest known volcano in the Solar System."
  },

  {
    question: "Which planet has the shortest day?",
    options: [
      "Earth",
      "Mars",
      "Jupiter",
      "Mercury"
    ],
    answer: 2,
    explanation: "Jupiter completes one rotation in roughly 10 hours, making it the planet with the shortest day."
  },

  {
    question: "What is the name of our galaxy?",
    options: [
      "Andromeda Galaxy",
      "Whirlpool Galaxy",
      "Milky Way",
      "Sombrero Galaxy"
    ],
    answer: 2,
    explanation: "Earth and our Solar System are located inside the Milky Way galaxy."
  },

  {
    question: "Which mission first landed humans on the Moon?",
    options: [
      "Apollo 8",
      "Apollo 11",
      "Apollo 13",
      "Gemini 4"
    ],
    answer: 1,
    explanation: "Apollo 11 successfully landed Neil Armstrong and Buzz Aldrin on the Moon in July 1969."
  },

  {
    question: "What is the closest star to Earth after the Sun?",
    options: [
      "Sirius",
      "Betelgeuse",
      "Proxima Centauri",
      "Polaris"
    ],
    answer: 2,
    explanation: "Proxima Centauri, about 4.24 light-years away, is the closest known star to the Sun."
  },

  {
    question: "Which planet is famous for its prominent ring system?",
    options: [
      "Venus",
      "Saturn",
      "Mars",
      "Neptune"
    ],
    answer: 1,
    explanation: "Saturn has the most prominent and easily visible ring system in the Solar System."
  },

  {
    question: "What is a light-year used to measure?",
    options: [
      "Time",
      "Brightness",
      "Distance",
      "Temperature"
    ],
    answer: 2,
    explanation: "A light-year is a unit of distance — approximately 9.46 trillion kilometres."
  },

  {
    question: "Which planet is known as the Red Planet?",
    options: [
      "Mars",
      "Venus",
      "Jupiter",
      "Uranus"
    ],
    answer: 0,
    explanation: "Mars appears reddish because iron minerals in its soil have oxidized, creating iron oxide (rust)."
  },

  {
    question: "What is the name of the first artificial satellite launched into space?",
    options: [
      "Explorer 1",
      "Sputnik 1",
      "Apollo 1",
      "Vostok 1"
    ],
    answer: 1,
    explanation: "Sputnik 1 was launched by the Soviet Union on October 4, 1957."
  },

  {
    question: "What type of object is the Sun?",
    options: [
      "Planet",
      "Comet",
      "Star",
      "Asteroid"
    ],
    answer: 2,
    explanation: "The Sun is a G-type main-sequence star powered by hydrogen fusion at its core."
  }
];


/* =========================
   STATE
========================= */

let userAnswers = new Array(questions.length).fill(null);
let quizSubmitted = false;
let timeLeft = 600;
let timerInterval = null;


/* =========================
   DOM REFERENCES
========================= */

const quizContainer = document.getElementById("quiz");
const questionNav = document.getElementById("question-nav");
const answeredCountEl = document.getElementById("answered-count");
const progressBar = document.getElementById("progress");
const timerDisplay = document.getElementById("timer");
const submitButton = document.getElementById("submit-btn");
const submitSection = document.getElementById("submit-section");
const resultSection = document.getElementById("result");


/* =========================
   BUILD QUIZ
========================= */

function createQuiz() {

  quizContainer.innerHTML = "";
  questionNav.innerHTML = "";

  questions.forEach((questionData, index) => {
    buildQuestionCard(questionData, index);
    buildNavigatorButton(index);
  });

  updateProgress();
  updateNavigator();
}


/* =========================
   BUILD QUESTION CARD
========================= */

function buildQuestionCard(questionData, index) {

  const card = document.createElement("article");
  card.className = "question-card";
  card.id = `question-${index}`;

  // Question number label
  const numberLabel = document.createElement("div");
  numberLabel.className = "question-number";
  numberLabel.textContent = `QUESTION ${index + 1}`;

  // Question text
  const questionText = document.createElement("h2");
  questionText.className = "question-text";
  questionText.textContent = questionData.question;

  // Options container
  const optionsContainer = document.createElement("div");
  optionsContainer.className = "options";
  optionsContainer.setAttribute("role", "radiogroup");
  optionsContainer.setAttribute("aria-label", `Question ${index + 1} options`);

  questionData.options.forEach((optionText, optionIndex) => {

    const label = document.createElement("label");
    label.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = optionIndex;

    const circle = document.createElement("span");
    circle.className = "option-circle";

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = optionText;

    label.appendChild(radio);
    label.appendChild(circle);
    label.appendChild(text);

    radio.addEventListener("change", () => {
      selectAnswer(index, optionIndex, card);
    });

    optionsContainer.appendChild(label);
  });

  // Clear answer button
  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "clear-answer";
  clearBtn.textContent = "Clear selection";
  clearBtn.style.display = "none";

  clearBtn.addEventListener("click", () => {
    clearAnswer(index, card, clearBtn);
  });

  card.appendChild(numberLabel);
  card.appendChild(questionText);
  card.appendChild(optionsContainer);
  card.appendChild(clearBtn);

  quizContainer.appendChild(card);
}


/* =========================
   SELECT / CLEAR ANSWER
========================= */

function selectAnswer(questionIndex, optionIndex, card) {

  userAnswers[questionIndex] = optionIndex;

  // Update visual selected state on options
  const options = card.querySelectorAll(".option");
  options.forEach((option, idx) => {
    option.classList.toggle("selected", idx === optionIndex);
  });

  // Show the clear button
  const clearBtn = card.querySelector(".clear-answer");
  if (clearBtn) clearBtn.style.display = "inline-block";

  updateProgress();
  updateNavigator();
}


function clearAnswer(questionIndex, card, clearBtn) {

  userAnswers[questionIndex] = null;

  // Uncheck radio and remove selected class
  const options = card.querySelectorAll(".option");
  options.forEach(option => {
    option.classList.remove("selected");
    const radio = option.querySelector("input");
    if (radio) radio.checked = false;
  });

  clearBtn.style.display = "none";

  updateProgress();
  updateNavigator();
}


/* =========================
   NAVIGATOR BUTTONS
========================= */

function buildNavigatorButton(index) {

  const button = document.createElement("button");
  button.type = "button";
  button.className = "nav-btn";
  button.textContent = index + 1;
  button.setAttribute("aria-label", `Go to question ${index + 1}`);

  button.addEventListener("click", () => {
    document.getElementById(`question-${index}`).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  questionNav.appendChild(button);
}


/* =========================
   UPDATE PROGRESS
========================= */

function updateProgress() {

  const answered = userAnswers.filter(a => a !== null).length;

  answeredCountEl.textContent = `${answered} of ${questions.length} answered`;

  const percentage = (answered / questions.length) * 100;
  progressBar.style.width = `${percentage}%`;
}


/* =========================
   UPDATE NAVIGATOR
========================= */

function updateNavigator() {

  const buttons = questionNav.querySelectorAll(".nav-btn");

  buttons.forEach((button, index) => {
    button.classList.toggle("answered", userAnswers[index] !== null);
  });
}


/* =========================
   TIMER
========================= */

function startTimer() {

  // Clear any existing interval to prevent duplicates on restart
  if (timerInterval) clearInterval(timerInterval);

  updateTimerDisplay();

  timerInterval = setInterval(() => {

    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      submitQuiz(true);
    }

  }, 1000);
}


function updateTimerDisplay() {

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Visual warning when under 60 seconds
  timerDisplay.style.color = timeLeft <= 60 ? "#e06a6a" : "";
}


/* =========================
   SUBMIT QUIZ
========================= */

submitButton.addEventListener("click", () => submitQuiz(false));


function submitQuiz(isAutoSubmit) {

  if (quizSubmitted) return;

  const unanswered = userAnswers.filter(a => a === null).length;

  // If not auto-submitted and there are unanswered questions, confirm
  if (!isAutoSubmit && unanswered > 0) {
    const shouldContinue = confirm(
      `You still have ${unanswered} unanswered question(s). Submit anyway?`
    );
    if (!shouldContinue) return;
  }

  quizSubmitted = true;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  revealAnswers();
  showResult();

  submitSection.classList.add("hidden");
}


/* =========================
   REVEAL ANSWERS
========================= */

function revealAnswers() {

  const navButtons = questionNav.querySelectorAll(".nav-btn");

  questions.forEach((questionData, questionIndex) => {

    const card = document.getElementById(`question-${questionIndex}`);
    card.classList.add("card-reviewed");

    const userPick = userAnswers[questionIndex];
    const isCorrect = userPick === questionData.answer;

    // Color the navigator button based on correctness
    if (navButtons[questionIndex]) {
      navButtons[questionIndex].classList.remove("answered");
      if (userPick !== null) {
        navButtons[questionIndex].classList.add(isCorrect ? "nav-correct" : "nav-incorrect");
      }
    }

    const options = card.querySelectorAll(".option");

    options.forEach((option, optionIndex) => {

      const radio = option.querySelector("input");
      if (radio) radio.disabled = true;

      option.classList.add("reviewed");
      option.classList.remove("selected");

      // Mark the correct answer green
      if (optionIndex === questionData.answer) {
        option.classList.add("correct");

        const correctTag = document.createElement("span");
        correctTag.className = "correct-label";
        correctTag.textContent = "Correct";
        option.appendChild(correctTag);
      }

      // Mark user's wrong pick red
      if (userPick === optionIndex && optionIndex !== questionData.answer) {
        option.classList.add("incorrect");
      }
    });

    // Hide clear button
    const clearBtn = card.querySelector(".clear-answer");
    if (clearBtn) clearBtn.style.display = "none";

    // Add explanation
    const explanationDiv = document.createElement("div");
    explanationDiv.className = "explanation";
    explanationDiv.innerHTML = `<strong>Explanation:</strong> ${questionData.explanation}`;
    card.appendChild(explanationDiv);
  });
}


/* =========================
   SHOW RESULT
========================= */

function showResult() {

  // Calculate score
  let score = 0;
  questions.forEach((questionData, index) => {
    if (userAnswers[index] === questionData.answer) score++;
  });

  const percentage = Math.round((score / questions.length) * 100);

  // Determine mission rank and message
  let rankTitle, rankMessage, rankClass;

  if (percentage >= 90) {
    rankTitle = "DEEP SPACE EXPLORER";
    rankMessage = "Outstanding. You clearly know your way around the cosmos.";
    rankClass = "rank-explorer";
  } else if (percentage >= 75) {
    rankTitle = "ORBIT READY";
    rankMessage = "Excellent work. Your cosmic knowledge is impressive.";
    rankClass = "rank-orbit";
  } else if (percentage >= 50) {
    rankTitle = "MISSION TRAINEE";
    rankMessage = "Good start. A little more exploration and you'll go further.";
    rankClass = "rank-trainee";
  } else {
    rankTitle = "SPACE CADET";
    rankMessage = "The universe still has many secrets for you to discover.";
    rankClass = "rank-cadet";
  }

  resultSection.innerHTML = `
    <div class="result-label">MISSION COMPLETE</div>

    <div class="score">${score}/${questions.length}</div>

    <div class="result-percentage">${percentage}%</div>

    <p class="result-message">${rankMessage}</p>

    <div class="mission-status ${rankClass}">${rankTitle}</div>

    <br>

    <button class="restart-btn" id="restart-btn">↻ Explore Again</button>
  `;

  // Attach restart handler (avoids inline onclick)
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);

  resultSection.classList.remove("hidden");

  resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
}


/* =========================
   RESTART
========================= */

function restartQuiz() {

  userAnswers = new Array(questions.length).fill(null);
  quizSubmitted = false;
  timeLeft = 600;

  resultSection.classList.add("hidden");
  submitSection.classList.remove("hidden");

  createQuiz();
  startTimer();

  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* =========================
   INITIALISE
========================= */

createQuiz();
startTimer();