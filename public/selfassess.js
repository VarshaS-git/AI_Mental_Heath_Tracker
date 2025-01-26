// Quiz Data
const quizData = {
  ADHD: [
    { question: "How often do you feel restless or fidgety?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you struggle to stay focused on tasks?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you often interrupt others during conversations?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
  ],
  Anxiety: [
    { question: "How often do you feel nervous or anxious?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you find it difficult to relax even in a calm environment?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "How often do you experience sudden fear or panic?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
  ],
  Bipolarism: [
    { question: "Do you experience extreme mood swings?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "How often do you feel highly energetic or euphoric?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you feel low energy or depressed for long periods?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
  ],
  Depression: [
    { question: "How often do you feel hopeless or worthless?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you experience difficulty sleeping or oversleeping?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you feel little interest in doing things you once enjoyed?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
  ],
  OCD: [
    { question: "Do you have repetitive, unwanted thoughts?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "How often do you feel the need to repeat certain actions?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
    { question: "Do you spend significant time performing rituals?", options: ["Never", "Rarely", "Sometimes", "Often"], scores: [0, 1, 2, 3] },
  ],
};

// Variables
let currentTest = null;
let currentQuestionIndex = 0;
let userResponses = [];

// DOM Elements
const quizSection = document.getElementById("quiz-section");
const quizTitle = document.getElementById("quiz-title");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

// Start Test
function startTest(test) {
  currentTest = test;
  currentQuestionIndex = 0;
  userResponses = new Array(quizData[currentTest].length).fill(null);
  document.querySelector(".quiz-selector").style.display = "none";
  quizSection.style.display = "block";
  quizTitle.textContent = `Test for ${test}`;
  loadQuestion();
}

// Load Question
function loadQuestion() {
  const questionData = quizData[currentTest][currentQuestionIndex];
  questionText.textContent = questionData.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Generate options dynamically
  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;

    // Attach the click event
    button.onclick = () => selectOption(index);

    // Highlight previously selected option
    if (userResponses[currentQuestionIndex] === index) {
      button.classList.add("selected");
    }

    // Add button to the container
    optionsContainer.appendChild(button);
  });
}

// Select Option
function selectOption(index) {
  // Save the user's response
  userResponses[currentQuestionIndex] = index;

  // Update the UI to highlight the selected option
  const allOptions = optionsContainer.querySelectorAll("button");
  allOptions.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

// Navigation
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function nextQuestion() {
  if (currentQuestionIndex < quizData[currentTest].length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

// Show Results
function showResults() {
  let score = 0;

  // Calculate score
  userResponses.forEach((response, index) => {
    score += quizData[currentTest][index].scores[response];
  });

  // Determine feedback
  let feedback = "";
  if (score <= 3) {
    feedback = "Mild symptoms. Consider lifestyle adjustments.";
  } else if (score <= 6) {
    feedback = "Moderate symptoms. You may benefit from professional help.";
  } else {
    feedback = "Severe symptoms. Seek immediate professional assistance.";
  }

  // Display feedback
  alert(`Your score: ${score}\nFeedback: ${feedback}`);
}
