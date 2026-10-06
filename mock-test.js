let currentQuestionIndex = 0;
let score = 0;
let questionsData = [];
let userAnswers = [];
let currentTopic = 'mock_group_1';
let jsonFile = 'mock_group_1.json';
let topicTitle = 'Indexes, Reports & International Affairs Mock';

const mockTitles = {
  'mock_group_1': 'Indexes, Reports & International Affairs',
  'mock_group_2_3': 'Economy, Banking, Science & Tech',
  'mock_group_4': 'Awards, Honours & Sports',
  'mock_group_5': 'Polity, Governance & Environment',
  'mock_group_6': 'Books, Authors & Miscellaneous',
  'mock_folk_dances_1': 'Folk Dances - Part 1',
  'mock_folk_dances_2': 'Folk Dances - Part 2',
  'mock_festivals_1': 'Festivals - Part 1',
  'mock_festivals_2': 'Festivals - Part 2',
  'mock_books_authors_1': 'Books & Authors - Part 1',
  'mock_books_authors_2': 'Books & Authors - Part 2',
  'mock_sports_1': 'Sports - Part 1',
  'mock_sports_2': 'Sports - Part 2',
  'mock_economy_new': 'Economy One Shot',
  'mock_polity_new': 'Polity & Governance',
  'mock_science': 'Science & Technology',
  'mock_folk_dances_new': 'Folk Dances',
  'mock_ssc_cgl_1': 'SSC CGL Expected Paper 1',
  'mock_ssc_cgl_2': 'SSC CGL Expected Paper 2',
  'mock_ssc_cgl_3': 'SSC CGL Expected Paper 3',
  'mock_ssc_cgl_4': 'SSC CGL Expected Paper 4',
  'mock_ssc_cgl_5': 'SSC CGL Expected Paper 5',
  'mock_ssc_cgl_6': 'SSC CGL Expected Paper 6',
};

document.addEventListener('DOMContentLoaded', () => {
  setMockLanguageActiveState();

  // 1. Premium Access Check
  const isSubscribed = localStorage.getItem("AspireCrack_subscribed") === "true";
  if (!isSubscribed) {
    alert("Please unlock the Full Combo Pass (₹299) to access interactive Mock Tests.");
    returnToCurrentAffairs();
    return;
  }
  
  // Hide overlay
  const overlay = document.getElementById("premiumOverlay");
  if (overlay) overlay.classList.add("hidden");
  
  // Parse URL for topic & batch
  const urlParams = new URLSearchParams(window.location.search);
  const topic = urlParams.get('topic');
  const batch = urlParams.get('batch');
  
  if (topic && mockTitles[topic]) {
    currentTopic = topic;
    jsonFile = `${topic}.json`;
    topicTitle = `${mockTitles[topic]} Mock`;
  } else {
    currentTopic = 'mock_group_1';
    jsonFile = 'mock_group_1.json';
    topicTitle = 'Indexes, Reports & International Affairs Mock';
  }

  // Handle Sep 14 batch notice
  if (batch) {
    const notice = document.getElementById('batchNotice');
    if (notice) {
      notice.style.display = 'inline-block';
      notice.innerText = `🚀 ${decodeURIComponent(batch)} (Commences Sep 14) • Pre-Batch Practice`;
    }
  }
  
  // Update UI title
  document.getElementById('mockPageTitle').innerText = topicTitle;
  document.title = `${topicTitle} - AspireCrack`;
  
  loadQuizData();
});

async function loadQuizData() {
  try {
    const res = await fetch(jsonFile);
    if (!res.ok) throw new Error("Failed to load JSON");
    questionsData = await res.json();
    userAnswers = new Array(questionsData.length).fill(null);
    
    document.getElementById('totalQuestionsCount').innerText = questionsData.length;
    document.getElementById('loadingState').style.display = 'none';
    
    // Start Quiz
    if(questionsData.length > 0) {
      document.getElementById('questionCard').classList.add('active');
      renderQuestion();
    } else {
      document.getElementById('loadingState').innerHTML = '<p style="color:#ef4444;">No questions found for this topic.</p>';
      document.getElementById('loadingState').style.display = 'block';
    }
    
  } catch (err) {
    document.getElementById('loadingState').innerHTML = '<p style="color:#ef4444;">Error loading mock test. Please try refreshing.</p>';
    console.error(err);
  }
}

function renderQuestion() {
  if (!questionsData || currentQuestionIndex >= questionsData.length) return;
  const q = questionsData[currentQuestionIndex];
  
  // Update Header Progress
  document.getElementById('questionCounter').innerText = `Question ${currentQuestionIndex + 1} of ${questionsData.length}`;
  document.getElementById('scoreCounter').innerText = `Score: ${score}`;
  document.getElementById('progressFill').style.width = `${((currentQuestionIndex + 1) / questionsData.length) * 100}%`;
  
  // Reset UI
  document.getElementById('questionText').innerText = q.question;
  const optionsGrid = document.getElementById('optionsGrid');
  optionsGrid.innerHTML = '';
  
  document.getElementById('explanationBox').classList.remove('visible');
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.classList.remove('visible');
  
  if (currentQuestionIndex === questionsData.length - 1) {
    nextBtn.innerText = "Finish Test 🏁";
  } else {
    nextBtn.innerText = "Next Question ➔";
  }
  
  const existingAnswer = userAnswers[currentQuestionIndex];

  Object.entries(q.options).forEach(([key, text]) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<strong>${key}</strong> <span>${text}</span>`;
    
    btn.onclick = () => handleAnswer(key, btn, q.correct, q.explanation);
    btn.dataset.key = key;
    
    if (existingAnswer) {
      btn.classList.add('disabled');
      if (key === q.correct) btn.classList.add('correct');
      if (key === existingAnswer.selectedKey && !existingAnswer.isCorrect) btn.classList.add('incorrect');
      if (key !== existingAnswer.selectedKey && key !== q.correct) btn.classList.add('dimmed');
    }
    
    optionsGrid.appendChild(btn);
  });

  if (existingAnswer) {
    document.getElementById('explanationText').innerText = q.explanation || 'No explanation provided.';
    document.getElementById('explanationBox').classList.add('visible');
    nextBtn.classList.add('visible');
  }
}

function handleAnswer(selectedKey, selectedBtn, correctKey, explanation) {
  const allBtns = document.querySelectorAll('.option-btn');
  const isCorrect = (selectedKey === correctKey);
  
  // Record answer
  userAnswers[currentQuestionIndex] = {
    questionIndex: currentQuestionIndex,
    selectedKey,
    correctKey,
    isCorrect,
    isAnswered: true
  };

  // Disable all option buttons
  allBtns.forEach(b => {
    b.classList.add('disabled');
    if (b.dataset.key !== selectedKey && b.dataset.key !== correctKey) {
      b.classList.add('dimmed');
    }
  });
  
  // Check correctness
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
    document.getElementById('scoreCounter').innerText = `Score: ${score}`;
  } else {
    selectedBtn.classList.add('incorrect');
    allBtns.forEach(b => {
      if (b.dataset.key === correctKey) b.classList.add('correct');
    });
  }
  
  // Show Explanation
  document.getElementById('explanationText').innerText = explanation || 'Detailed reference provided.';
  document.getElementById('explanationBox').classList.add('visible');
  
  // Show Next Button
  document.getElementById('nextBtn').classList.add('visible');
}

function nextQuestion() {
  // If moving forward without selecting an answer, mark as skipped
  if (!userAnswers[currentQuestionIndex]) {
    userAnswers[currentQuestionIndex] = {
      questionIndex: currentQuestionIndex,
      selectedKey: null,
      correctKey: questionsData[currentQuestionIndex]?.correct,
      isCorrect: false,
      isAnswered: false
    };
  }

  currentQuestionIndex++;
  
  if (currentQuestionIndex < questionsData.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const qCard = document.getElementById('questionCard');
  const rCard = document.getElementById('resultCard');
  
  if (qCard) qCard.classList.remove('active');
  if (rCard) rCard.classList.add('active');
  
  const total = questionsData.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;
  
  userAnswers.forEach((ans, idx) => {
    if (ans && ans.isAnswered) {
      if (ans.isCorrect) correctCount++;
      else incorrectCount++;
    } else {
      skippedCount++;
    }
  });

  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  
  // Update result display numbers
  document.getElementById('finalScoreDisplay').innerText = `${correctCount}/${total}`;
  document.getElementById('finalPercentDisplay').innerText = `${percentage}% Accuracy`;
  
  document.getElementById('statCorrect').innerText = correctCount;
  document.getElementById('statIncorrect').innerText = incorrectCount;
  document.getElementById('statSkipped').innerText = skippedCount;
  document.getElementById('statTotal').innerText = total;
  
  let msg = "Keep practicing! Regular revision will sharpen your speed.";
  if (percentage >= 90) msg = "🌟 Outstanding Performance! You have exceptional mastery over this subject!";
  else if (percentage >= 70) msg = "🏆 Great job! Solid understanding of current trends and factual data.";
  else if (percentage >= 50) msg = "📚 Good effort! Review the incorrect questions below to lock in the key facts.";
  
  document.getElementById('finalMessage').innerText = msg;
  
  // Render Answer Review Section
  renderAnswerReview();
}

function renderAnswerReview() {
  const reviewContainer = document.getElementById('reviewQuestionsList');
  if (!reviewContainer) return;
  reviewContainer.innerHTML = '';
  
  questionsData.forEach((q, idx) => {
    const ans = userAnswers[idx];
    const item = document.createElement('div');
    item.className = 'review-item';
    
    let statusBadge = `<span class="badge-skipped">⏩ Skipped</span>`;
    if (ans && ans.isAnswered) {
      if (ans.isCorrect) {
        statusBadge = `<span class="badge-correct">✓ Correct (+1)</span>`;
      } else {
        statusBadge = `<span class="badge-wrong">✗ Incorrect</span>`;
      }
    }
    
    let optionsHtml = '';
    Object.entries(q.options).forEach(([k, text]) => {
      let extraClass = '';
      let marker = '';
      if (k === q.correct) {
        extraClass = 'correct-ans';
        marker = ' (Correct Answer)';
      } else if (ans && ans.selectedKey === k && !ans.isCorrect) {
        extraClass = 'user-wrong';
        marker = ' (Your Answer)';
      }
      optionsHtml += `<div class="review-ans-row ${extraClass}"><strong>${k}.</strong> ${text}${marker}</div>`;
    });
    
    item.innerHTML = `
      <div class="review-item-header">
        <span style="color: var(--primary);">Question ${idx + 1}</span>
        ${statusBadge}
      </div>
      <div class="review-q-text">${q.question}</div>
      <div class="review-ans-grid">
        ${optionsHtml}
      </div>
      <div class="explanation-box visible" style="margin-top: 12px; margin-bottom: 0;">
        <div class="explanation-title">💡 Explanation</div>
        <div class="explanation-text">${q.explanation || 'Official key explanation verified.'}</div>
      </div>
    `;
    reviewContainer.appendChild(item);
  });
}

function retakeCurrentTest() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(questionsData.length).fill(null);
  
  document.getElementById('resultCard').classList.remove('active');
  document.getElementById('questionCard').classList.add('active');
  renderQuestion();
}

function openMockTopicModal() {
  const modal = document.getElementById('mockTopicModal');
  if (modal) modal.style.display = 'flex';
}

function closeMockTopicModal() {
  const modal = document.getElementById('mockTopicModal');
  if (modal) modal.style.display = 'none';
}

function switchMockTopic(topic) {
  closeMockTopicModal();
  window.location.href = `mock-test.html?topic=${topic}`;
}

/* -----------------------------------------------
   MULTILINGUAL & BACK NAVIGATION FLOW
   ----------------------------------------------- */
function returnToCurrentAffairs() {
  window.location.href = "index.html";
}

function changeMockLanguage(lang) {
  const domain = window.location.hostname;
  if(lang === 'en') {
      document.cookie = `googtrans=/en/en; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/en; path=/`;
  } else {
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/${lang}; path=/`;
  }
  window.location.reload();
}

function setMockLanguageActiveState() {
  const match = document.cookie.match(/(^|;)\s*googtrans=([^;]+)/);
  let lang = 'en';
  if (match) {
    const val = decodeURIComponent(match[2]);
    const parts = val.split('/');
    if (parts.length > 2 && parts[2]) lang = parts[2];
  }
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-lang-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');
}





