/* mock-script.js - Logic for the Mock Test Portal */
let EXAM_NAME = "CSA Mock Test";
let QUESTIONS = [];
let pathKeys = [];

// Parse URL for specific path e.g., ?path=CSA|Theory|PHP|Basic%20PHP
const urlParams = new URLSearchParams(window.location.search);
const pathStr = urlParams.get('path');

if (pathStr && typeof MOCK_DATABASE !== 'undefined') {
    pathKeys = pathStr.split('|').map(decodeURIComponent);
    
    // Resolve path in MOCK_DATABASE
    let currentObj = MOCK_DATABASE;
    for (let key of pathKeys) {
        if (currentObj[key]) currentObj = currentObj[key];
        else if (currentObj.subjects && currentObj.subjects[key]) currentObj = currentObj.subjects[key];
        else break;
    }
    
    if (Array.isArray(currentObj)) {
        QUESTIONS = currentObj;
        EXAM_NAME = `${pathKeys[pathKeys.length-1]} Mock Test (${QUESTIONS.length} Qs)`;
    }
}

// Fallback just in case
if (QUESTIONS.length === 0) {
    QUESTIONS = [{
        qId: "fallback", questionText: "No questions found for this topic.", options: ["OK", "Retry"], correctOptionIndex: 0
    }];
}

let shuffled = [], currentIndex = 0, answers = {}, started = false;
let totalTimeSeconds = 30 * 60, timerInterval; // 30 mins for mock test

const startBtn = document.getElementById('startBtn');
const usernameInput = document.getElementById('username');
const mobileInput = document.getElementById('mobile');
const startScreen = document.getElementById('start-screen');
const examArea = document.getElementById('exam-area');
const summaryArea = document.getElementById('summary-area');
const qIndexEl = document.getElementById('qIndex');
const qTotalEl = document.getElementById('qTotal');
const qText = document.getElementById('qText');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const studentInfoEl = document.getElementById('studentInfo');
const questionNavEl = document.getElementById('questionNav');
const profileDetails = document.getElementById('profileDetails');

// Elements that might not exist or need hiding
const qTextHindi = document.getElementById('qTextHindi');
if(qTextHindi) qTextHindi.style.display = 'none';
const qSource = document.getElementById('qSource');
if(qSource) qSource.style.display = 'none';
const qImageWrapper = document.getElementById('qImageWrapper');
if(qImageWrapper) qImageWrapper.style.display = 'none';
const timeBanner = document.getElementById('timeBanner');

qTotalEl.innerText = QUESTIONS.length;

// ===== Disable Right Click for Mock =====
document.addEventListener("contextmenu", event => event.preventDefault());

// ===== Fullscreen Logic (Optional for Mock) =====
function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

// ===== Shuffle Questions =====
function shuffleArray(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

// ===== Render Question =====
function renderQuestion(index) {
  const q = shuffled[index];
  qIndexEl.innerText = index + 1;
  qText.innerText = q.questionText;
  
  optionsEl.innerHTML = '';
  // Randomizing options for mock test as well
  let opts = q.options.map((opt, i) => ({text: opt, originalIndex: i}));
  opts = shuffleArray(opts);
  
  opts.forEach((optObj, i) => {
    const id = `opt_${q.qId}_${i}`;
    const label = document.createElement('label');
    label.htmlFor = id;
    const radio = document.createElement('input');
    radio.type = 'radio'; radio.name = 'option'; radio.id = id; radio.value = optObj.originalIndex;
    
    if (answers[q.qId] === optObj.originalIndex) radio.checked = true;
    
    radio.addEventListener('change', () => { answers[q.qId] = optObj.originalIndex; renderQuestionNav(); });
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + optObj.text));
    optionsEl.appendChild(label);
  });
  
  prevBtn.disabled = (index === 0);
  nextBtn.disabled = (index === shuffled.length - 1);
  renderQuestionNav();
}

function renderQuestionNav() {
  questionNavEl.innerHTML = '';
  for (let i = 0; i < shuffled.length; i++) {
    const btn = document.createElement('button');
    btn.innerText = i + 1;
    btn.className = (answers[shuffled[i].qId] !== undefined) ? 'answered' : 'unanswered';
    btn.addEventListener('click', () => { currentIndex = i; renderQuestion(currentIndex); });
    questionNavEl.appendChild(btn);
  }
}

function startTimer() {
  let t = totalTimeSeconds;
  timerInterval = setInterval(() => {
    t--; if (t <= 0) { clearInterval(timerInterval); submitExam(); }
    const mm = String(Math.floor(t / 60)).padStart(2, '0');
    const ss = String(t % 60).padStart(2, '0');
    document.getElementById('timer').innerText = mm + ':' + ss;
  }, 1000);
}

// Ensure the start banner shows the mock mode right away
if(timeBanner) {
    timeBanner.innerText = "🚀 Welcome to the CSA Mock Test. No login time restrictions.";
    timeBanner.style.background = "rgba(34, 197, 94, 0.1)";
    timeBanner.style.color = "var(--success)";
    timeBanner.style.borderColor = "rgba(34, 197, 94, 0.2)";
}

startBtn.addEventListener('click', async () => {
  const name = usernameInput.value.trim() || "Guest Practice";
  const mobile = mobileInput.value.trim() || "0000000000";
  
  // Try to go fullscreen for realistic feel
  openFullscreen();
  
  started = true;
  shuffled = shuffleArray(QUESTIONS); currentIndex = 0; answers = {};
  
  if (studentInfoEl) studentInfoEl.innerHTML = `<div><strong>${name}</strong></div>`;
  // Use dynamically calculated path for Trade info
  const tradeInfo = pathKeys.length > 0 ? pathKeys.join(" > ") : "CSA (Practice)";
  if (profileDetails) profileDetails.innerHTML = `<div><strong>Name:</strong> ${name}</div><div><strong>Module:</strong> ${tradeInfo}</div>`;
  
  startScreen.style.display = 'none';
  examArea.style.display = '';
  
  if(timeBanner) timeBanner.style.display = 'none';
  
  renderQuestion(currentIndex);
  startTimer();
});

prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderQuestion(currentIndex); } });
nextBtn.addEventListener('click', () => { if (currentIndex < shuffled.length - 1) { currentIndex++; renderQuestion(currentIndex); } });

const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
    submitBtn.addEventListener('click', () => { if (!confirm('Submit Mock Test?')) return; submitExam(); });
}

function submitExam() {
  if (!started) return; started = false; clearInterval(timerInterval);
  const submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
  submitModal.show();
  
  let score = 0;
  for (let q of shuffled) {
     if (answers[q.qId] === q.correctOptionIndex) score++;
  }

  // --- SAVE ANALYTICS TO LOCALSTORAGE ---
  try {
      const storedUser = JSON.parse(localStorage.getItem('exam_user') || '{"mobile":"guest"}');
      const userMobile = storedUser.mobile;
      const pStr = urlParams.get('path'); 
      if (pStr) {
          const statsKey = `mock_stats_${userMobile}_${pStr}`;
          
          let stats = { attempts: 0, bestScore: 0, rank: "Untested" };
          const rawStats = localStorage.getItem(statsKey);
          if (rawStats) {
              try { stats = JSON.parse(rawStats); } catch(e){}
          }
          
          stats.attempts += 1;
          if(score > stats.bestScore || stats.attempts === 1) {
              stats.bestScore = score;
          }
          
          // Calculate Mastery Rank based on best percentage
          const percentage = (stats.bestScore / QUESTIONS.length) * 100;
          if (percentage >= 90) stats.rank = "Expert 🏆";
          else if (percentage >= 70) stats.rank = "Proficient 🌟";
          else stats.rank = "Beginner 📚";
          
          localStorage.setItem(statsKey, JSON.stringify(stats));
      }
  } catch(e) { console.error("Could not save tracking stats:", e); }
  
  document.getElementById('submitModalContent').innerHTML = `<div class="text-success"><h5>✅ Mock Test submitted!</h5><p class="small">Generating your practice summary...</p></div>`;
  setTimeout(() => { submitModal.hide(); showSummary(score); }, 1500);
}

function showSummary(score) {
  document.getElementById('exam-area').style.display = 'none';
  document.getElementById('summary-area').style.display = '';
  const name = usernameInput.value.trim() || "Guest Practice";
  let correct = score, wrong = shuffled.length - score;
  
  document.getElementById('summaryStats').innerHTML = `
    <div class="mb-2">
      <strong>Candidate:</strong> ${name} &nbsp; | &nbsp; 
      <strong>Test:</strong> ${EXAM_NAME}
    </div>
    <div>✅ Correct: ${correct} &nbsp;&nbsp; ❌ Wrong: ${wrong} &nbsp;&nbsp; 🏁 Score: ${score}/${shuffled.length}</div>
    <div style="margin-top: 10px; font-size: 1.1rem; font-weight: bold; color: var(--accent);">
       Performance: ${score >= 15 ? "Outstanding 🏆" : (score >= 10 ? "Good Job 👍" : "Needs Practice 📚")}
    </div>`;
    
  const list = document.getElementById('summaryList');
  list.innerHTML = '';
  
  shuffled.forEach((q, i) => {
    const div = document.createElement('div');
    div.style.padding = "15px";
    div.style.border = "1px solid var(--border)";
    div.style.marginBottom = "15px";
    div.style.borderRadius = "12px";
    div.style.background = "var(--surface-light)";
    
    const userAnsIndex = answers[q.qId];
    const userAnsText = userAnsIndex !== undefined ? q.options[userAnsIndex] : 'Not Answered';
    const isCorrect = userAnsIndex === q.correctOptionIndex;
    const correctAnsText = q.options[q.correctOptionIndex];
    
    div.innerHTML = `
        <div style="margin-bottom: 10px; font-weight: 600; font-size: 1.1rem;"><strong>Q${i + 1}.</strong> ${q.questionText} <span class="badge" style="background:var(--bg); padding:3px 8px; border-radius:10px; font-size:0.75rem; border: 1px solid var(--border);">${q.topic}</span></div>
        <div style="margin-bottom: 5px;">Your Answer: <span class="${isCorrect ? 'text-success' : 'text-danger'}">${userAnsText}</span></div>
        ${!isCorrect ? `<div>Correct Answer: <strong class="text-success">${correctAnsText}</strong></div>` : ''}
    `;
    list.appendChild(div);
  });
}
