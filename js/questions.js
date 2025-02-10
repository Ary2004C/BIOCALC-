let loadedQuestions = {}; // Stores questions for accurate matching

async function loadModule(module) {
  try {
    console.log(`📢 Fetching questions from ../questions/${module}.json...`);
    const response = await fetch(`../questions/${module}.json`);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log(`✅ Questions loaded successfully for ${module}:`, data);
    loadedQuestions[module] = data[module]; // Store loaded questions for reference
    return data[module];
  } catch (error) {
    console.error(`❌ Error loading ${module}.json:`, error);
    return [];
  }
}

async function filterQuestions(type, module) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  console.log(`📢 Fetching ${type} Questions for ${module}...`);
  const questions = await loadModule(module);
  if (questions.length === 0) {
    container.innerHTML = "<p>❌ Error loading questions. Please try again.</p>";
    return;
  }

  const filteredQuestions = questions.filter(q => q.type === type);
  if (filteredQuestions.length === 0) {
    container.innerHTML = `<p>No ${type} questions available.</p>`;
    return;
  }

  filteredQuestions.forEach((q, index) => {
    q.id = `q-${index}-${Date.now()}`; // Unique question identifier
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.style.display = "block"; // Ensures each question is stacked

    questionDiv.innerHTML = `
      <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
      ${q.image ? `<img src="${q.image}" alt="Question Image" style="max-width:100%; height:auto;">` : ""}
      <div class="options-container">
        ${q.options ? q.options.map(opt => `
          <label>
            <input type="radio" name="${q.id}" value="${opt}"> ${opt}
          </label>
        `).join("") : ""}
      </div>
      ${q.type === "short-answer" || q.type === "long-answer" ? `
        <textarea id="answer-${q.id}" rows="3" cols="50"></textarea>
      ` : ""}
      <button onclick="checkAnswer('${q.id}', '${module}')">Submit</button>
      <p id="feedback-${q.id}" class="feedback"></p>
    `;
    container.appendChild(questionDiv);
  });
}

async function checkAnswer(questionId, module) {
  const question = Object.values(loadedQuestions[module]).find(q => q.id === questionId);
  
  if (!question) {
    console.error(`❌ Error: No matching question found for ID ${questionId}`);
    return;
  }

  let selectedAnswer = "";

  if (question.type === "multiple-choice") {
    selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`)?.value;
  } else if (question.type === "short-answer" || question.type === "long-answer") {
    selectedAnswer = document.getElementById(`answer-${questionId}`).value.trim();
  }

  const feedback = document.getElementById(`feedback-${questionId}`);

  let feedbackHTML = "";

  if (question.type === "multiple-choice") {
    const correctAnswer = question.answer || "No correct answer available";
    const explanation = question.explanation || "No explanation available.";
    
    feedbackHTML = selectedAnswer === correctAnswer
      ? `✅ Correct! ${explanation}`
      : `❌ Incorrect. The correct answer is: <strong>${correctAnswer}</strong>. ${explanation}`;
  } else {
    const modelAnswer = question.answer || "No model answer available.";
    const criteriaList = question.criteria ? question.criteria.map(c => `<li>${c}</li>`).join("") : "<li>No criteria available.</li>";

    feedbackHTML = `
      ✅ Model Answer: <strong>${modelAnswer}</strong> <br>
      📌 Marking Criteria:
      <ul>${criteriaList}</ul>
    `;
  }

  if (question.answerImage) {
    feedbackHTML += `
      <br><img src="${question.answerImage}" alt="Answer Image" 
      onerror="this.style.display='none'" 
      style="max-width:100%; height:auto; display:block; margin-top:10px;">
    `;
  }

  feedback.innerHTML = feedbackHTML;
}

// Mini Test - Selects 10 MCQs, 2 Short Answers, and 1 Long Answer
async function generateMiniTest(module) {
  const container = document.getElementById("questions-container");
  container.innerHTML = ""; 

  console.log(`📢 Generating Mini Test for ${module}...`);
  const questions = await loadModule(module);
  if (questions.length === 0) {
    container.innerHTML = "<p>❌ Error loading questions. Please try again.</p>";
    return;
  }

  // Categorize questions
  const mcqQuestions = questions.filter(q => q.type === "multiple-choice");
  const shortAnswerQuestions = questions.filter(q => q.type === "short-answer");
  const longAnswerQuestions = questions.filter(q => q.type === "long-answer");

  // Randomly select questions
  const selectedMCQs = mcqQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
  const selectedShortAnswers = shortAnswerQuestions.sort(() => 0.5 - Math.random()).slice(0, 2);
  const selectedLongAnswer = longAnswerQuestions.sort(() => 0.5 - Math.random()).slice(0, 1);

  // Combine selected questions
  const miniTestQuestions = [...selectedMCQs, ...selectedShortAnswers, ...selectedLongAnswer];

  // Display selected questions
  miniTestQuestions.forEach((q, index) => {
    q.id = `q-${index}-${Date.now()}`;
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.style.display = "block"; // Ensures questions stack vertically

    questionDiv.innerHTML = `
      <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
      ${q.image ? `<img src="${q.image}" alt="Question Image" style="max-width:100%; height:auto;">` : ""}
      <div class="options-container">
        ${q.options ? q.options.map(opt => `
          <label>
            <input type="radio" name="${q.id}" value="${opt}"> ${opt}
          </label>
        `).join("") : ""}
      </div>
      ${q.type === "short-answer" || q.type === "long-answer" ? `
        <textarea id="answer-${q.id}" rows="3" cols="50"></textarea>
      ` : ""}
      <button onclick="checkAnswer('${q.id}', '${module}')">Submit</button>
      <p id="feedback-${q.id}" class="feedback"></p>
    `;
    container.appendChild(questionDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.getElementById("question-buttons");
  if (buttonContainer) {
    buttonContainer.innerHTML = `
      <button onclick="filterQuestions('multiple-choice', moduleName)">Multiple Choice</button>
      <button onclick="filterQuestions('short-answer', moduleName)">Short Answer</button>
      <button onclick="filterQuestions('long-answer', moduleName)">Long Answer</button>
      <button onclick="generateMiniTest(moduleName)">Mini Test</button>
    `;
  } else {
    console.error("❌ question-buttons container not found in DOM");
  }
});
