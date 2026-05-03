
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbythRbpKV9zXJ-DGpuj66ppA6FKuHKz99pgnL9gdERnXodiCqHT_39gJ5LzpOP7D1DG/exec";
const EXAM_NAME = "Networking Practice Exam (4 Qs)";
const QUESTIONS = [
  {
    "id": 1,
    "q_en": "Find the correct number pair for the word MORT using the given matrices.",
    "q_hi": "दिए गए मैट्रिक्स की सहायता से शब्द MORT के लिए सही संख्या युग्म ज्ञात कीजिए।",
    // "image": "1.png",
    "options": ["66,21,32,77", "75,44,02,65", "57,13,03,88", "68,31,41,96"],
    "answer": "75,44,02,65",
    "summary_en": "Each letter of MORT is located in the matrices and converted into row-column pairs.",
    "summary_hi": "MORT के प्रत्येक अक्षर को मैट्रिक्स में ढूंढकर पंक्ति-स्तंभ संख्या में बदला जाता है।"
  },
  {
    "id": 2,
    "q_en": "Find the correct number pair for the word FASE using the given matrices.",
    "q_hi": "दिए गए मैट्रिक्स की सहायता से शब्द FASE के लिए सही संख्या युग्म ज्ञात कीजिए।",
    // "image": "1.png",
    "options": ["67,33,95,43", "56,21,59,11", "86,42,77,22", "99,00,87,31"],
    "answer": "99,00,87,31",
    "summary_en": "Each alphabet of FASE is encoded using its position in the matrices.",
    "summary_hi": "FASE के प्रत्येक अक्षर को मैट्रिक्स में उसकी स्थिति के अनुसार कोड किया जाता है।"
  },
  {
    "id": 3,
    "q_en": "Find the correct number pair for the word FASE using the given matrices.",
    "q_hi": "दिए गए मैट्रिक्स की सहायता से शब्द FASE के लिए सही संख्या युग्म ज्ञात कीजिए।",
    "options": ["67,33,95,43", "56,21,59,11", "86,42,77,22", "99,00,87,31"],
    "answer": "99,00,87,31",
    "summary_en": "Each alphabet of FASE is encoded using its position in the matrices.",
    "summary_hi": "FASE के प्रत्येक अक्षर को मैट्रिक्स में उसकी स्थिति के अनुसार कोड किया जाता है।"
  }
];

/* ---------- SCHEDULED LOGIN TIME (edit as needed) ----------
     TARGET_TIME should be in 24-hour "HH:MM" format (e.g. "12:50").
     Behavior:
         - Before TARGET_TIME: start screen will be hidden and a banner
             displays the scheduled time and current system time.
         - When system time >= TARGET_TIME: the start screen is enabled
             and a one-time alert notifies the user to login.
------------------------------------------------------------ */
const TARGET_TIME = "05:00"; // change this to desired time (24-hour HH:MM)
let timeTriggered = false; // ensure the login alert fires once

let shuffled = [], currentIndex = 0, answers = {}, started = false;
let totalTimeSeconds = 40 * 60, timerInterval;

const startBtn = document.getElementById('startBtn');
const usernameInput = document.getElementById('username');
const mobileInput = document.getElementById('mobile');
const startScreen = document.getElementById('start-screen');
const examArea = document.getElementById('exam-area');
const summaryArea = document.getElementById('summary-area');
const qIndexEl = document.getElementById('qIndex');
const qTotalEl = document.getElementById('qTotal');
const qText = document.getElementById('qText');
const qTextHindi = document.getElementById('qTextHindi');
const qImage = document.getElementById("qImage");
const qSource = document.getElementById('qSource');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const studentInfoEl = document.getElementById('studentInfo');
const questionNavEl = document.getElementById('questionNav');
const profileIcon = document.getElementById('profileIcon');
const profileDetails = document.getElementById('profileDetails');

qTotalEl.innerText = QUESTIONS.length;

// ===== Disable Right Click =====
document.addEventListener("contextmenu", event => event.preventDefault());

// ===== Fullscreen Protection =====
let fullscreenExitCount = 0;
let fullscreenEnabled = false;

function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  fullscreenEnabled = true;
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && fullscreenEnabled && started) {
    fullscreenExitCount++;
    if (fullscreenExitCount === 1) {
      alert("⚠️ Warning: Do not exit fullscreen during the exam!\nNext time, your exam will be auto-submitted.");
      openFullscreen();
    } else if (fullscreenExitCount >= 2) {
      alert("🚫 You exited fullscreen again. Your exam is being auto-submitted.");
      submitExam(true);
    }
  }
});

// ===== Shuffle Questions =====
function shuffleArray(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

// ===== Render Question =====
function renderQuestion(index) {
  const q = shuffled[index];
  qIndexEl.innerText = index + 1;
  qText.innerText = q.q_en;
  qTextHindi.innerText = q.q_hi || "";
  qSource.innerText = q.source || "";

  //images handle 
  if (q.image) {
    qImage.src = "images/" + q.image;
    qImageWrapper.style.display = "block";
  } else {
    qImageWrapper.style.display = "none";
  }
  optionsEl.innerHTML = '';
  shuffleArray(q.options).forEach((opt, i) => {
    const id = `opt_${q.id}_${i}`;
    const label = document.createElement('label');
    label.htmlFor = id;
    const radio = document.createElement('input');
    radio.type = 'radio'; radio.name = 'option'; radio.id = id; radio.value = opt;
    if (answers[q.id] === opt) radio.checked = true;
    radio.addEventListener('change', () => { answers[q.id] = opt; renderQuestionNav(); });
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + opt));
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
    btn.className = answers[shuffled[i].id] ? 'answered' : 'unanswered';
    btn.addEventListener('click', () => { currentIndex = i; renderQuestion(currentIndex); });
    questionNavEl.appendChild(btn);
  }
}

function startTimer() {
  let t = totalTimeSeconds;
  timerInterval = setInterval(() => {
    t--; if (t <= 0) { clearInterval(timerInterval); submitExam(true); }
    const mm = String(Math.floor(t / 60)).padStart(2, '0');
    const ss = String(t % 60).padStart(2, '0');
    document.getElementById('timer').innerText = mm + ':' + ss;
  }, 1000);
}

function showDanger(msg) { alert(msg); }

// ===== Time-checking logic =====
(function initTimeChecker() {
  const banner = document.getElementById('timeBanner');
  const startScreenEl = document.getElementById('start-screen');
  const startBtnEl = document.getElementById('startBtn');

  function formatTime(d) {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return { hhmm: `${hh}:${mm}`, hhmmss: `${hh}:${mm}:${ss}` };
  }

  function check() {
    const now = new Date();
    const t = formatTime(now);
    const currentHHMM = t.hhmm;

    // If the exam was already submitted earlier, show the stored summary and block re-attempt
    const submittedRaw = localStorage.getItem('exam_submitted');
    if (submittedRaw) {
      try {
        const sub = JSON.parse(submittedRaw);
        usernameInput.value = sub.name || '';
        mobileInput.value = sub.mobile || '';
        banner.innerText = `✅ You already submitted this exam on ${sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'earlier'}. Score: ${sub.score || 0}/${(sub.shuffledOrder && sub.shuffledOrder.length) || QUESTIONS.length}`;
        startScreenEl.style.display = 'none';
        startBtnEl.disabled = true;
        // Prepare data to show summary
        try {
          // Rebuild shuffled order from stored ids if present
          if (sub.shuffledOrder && Array.isArray(sub.shuffledOrder)) {
            shuffled = sub.shuffledOrder.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
          } else {
            shuffled = QUESTIONS.slice();
          }
          answers = sub.answers || {};
          // Show stored summary once
          document.getElementById('exam-area').style.display = 'none';
          document.getElementById('summary-area').style.display = '';
          showSummary(sub.score || 0);
        } catch (e) { console.error('Failed to show stored summary', e); }
      } catch (e) {
        banner.innerText = ` Submission found. Current time ${t.hhmmss}.`;
      }
      return;
    }

    // If a user is already stored (logged in), show logged-in state and do not block
    const stored = localStorage.getItem('exam_user');
    if (stored) {
      try {
        const obj = JSON.parse(stored);
        banner.innerText = ` Logged in as ${obj.name || '-'} — exam ready. Current time ${t.hhmmss}.`;
      } catch (e) { banner.innerText = ` Logged in — exam ready. Current time ${t.hhmmss}.`; }
      startScreenEl.style.display = 'none';
      startBtnEl.disabled = true;
      return;
    }

    // Before scheduled time: hide/disable start
    if (currentHHMM < TARGET_TIME) {
      banner.innerText = `🔒 Login opens at ${TARGET_TIME}. Current time ${t.hhmmss}. Please wait...`;
      startScreenEl.style.display = 'none';
      startBtnEl.disabled = true;
    } else {
      // At or after scheduled time: enable login
      banner.innerText = ` Login is open (scheduled ${TARGET_TIME}). Current time ${t.hhmmss}. Please login.`;
      startScreenEl.style.display = '';
      startBtnEl.disabled = false;

      // Fire a one-time alert to notify the user (only once per page load)
      if (!timeTriggered) {
        timeTriggered = true;
        try { setTimeout(() => alert(`Exam scheduled at ${TARGET_TIME} — please login now.`), 100); } catch (e) { /* ignore */ }
      }
    }
  }

  // Run immediately then every 1s
  check();
  setInterval(check, 1000);
})();

startBtn.addEventListener('click', async () => {
  // Prevent re-attempt if submission already exists
  if (localStorage.getItem('exam_submitted')) { alert('You have already submitted this exam.'); return; }

  const name = usernameInput.value.trim();
  const mobile = mobileInput.value.trim();
  if (!name || !mobile) { showDanger("Enter Name & Mobile"); return; }

  openFullscreen(); // Force fullscreen on exam start

  const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
  loadingModal.show();
  try {
    const res = await fetch(`${SCRIPT_URL}?action=validate&name=${encodeURIComponent(name)}&mobile=${encodeURIComponent(mobile)}`);
    const data = await res.json(); loadingModal.hide();
    if (!data.valid) { showDanger("❌ You are not authorized!"); return; }
    // Persist user so they bypass login screen on reload
    try { localStorage.setItem('exam_user', JSON.stringify({ name, mobile, student: data.student || {} })); } catch (e) { /* ignore storage errors */ }
    started = true;
    shuffled = shuffleArray(QUESTIONS); currentIndex = 0; answers = {};
    const s = data.student || {};
    studentInfoEl.innerHTML = `<div><strong>${s.NAME || name}</strong></div>`;
    profileDetails.innerHTML = Object.keys(s).map(k => `<div><strong>${k}:</strong> ${s[k] || '-'}</div>`).join('');
    startScreen.style.display = 'none';
    examArea.style.display = '';
    renderQuestion(currentIndex);
    startTimer();
  } catch (err) { loadingModal.hide(); console.error(err); showDanger("⚠️ Error connecting to server."); }
});

prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderQuestion(currentIndex); } });
nextBtn.addEventListener('click', () => { if (currentIndex < shuffled.length - 1) { currentIndex++; renderQuestion(currentIndex); } });
profileIcon.addEventListener('click', () => { new bootstrap.Modal(document.getElementById('profileModal')).show(); });
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => { if (!confirm('Final submission — continue?')) return; submitExam(false); });

// If a user is persisted in localStorage, restore session and start the exam
function restoreSessionIfPresent() {
  // If previously submitted, show stored summary instead of login
  const submittedRaw = localStorage.getItem('exam_submitted');
  if (submittedRaw) {
    try {
      const sub = JSON.parse(submittedRaw);
      usernameInput.value = sub.name || '';
      mobileInput.value = sub.mobile || '';
      // Rebuild shuffled if stored
      if (sub.shuffledOrder && Array.isArray(sub.shuffledOrder)) {
        shuffled = sub.shuffledOrder.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
      } else {
        shuffled = QUESTIONS.slice();
      }
      answers = sub.answers || {};
      // Show summary immediately
      document.getElementById('exam-area').style.display = 'none';
      document.getElementById('summary-area').style.display = '';
      showSummary(sub.score || 0);
      return;
    } catch (e) { console.error('Failed to restore stored submission', e); }
  }

  const stored = localStorage.getItem('exam_user');
  if (!stored) return;
  try {
    const obj = JSON.parse(stored);
    const name = obj.name || '';
    const mobile = obj.mobile || '';
    const s = obj.student || {};
    usernameInput.value = name;
    mobileInput.value = mobile;
    studentInfoEl.innerHTML = `<div><strong>${s.NAME || name}</strong></div>`;
    profileDetails.innerHTML = Object.keys(s).map(k => `<div><strong>${k}:</strong> ${s[k] || '-'}</div>`).join('');
    // Start the exam directly
    try { openFullscreen(); } catch (e) { /* ignore */ }
    started = true;
    shuffled = shuffleArray(QUESTIONS); currentIndex = 0; answers = {};
    startScreen.style.display = 'none';
    examArea.style.display = '';
    renderQuestion(currentIndex);
    startTimer();
  } catch (e) { console.error('Failed to restore session', e); }
}

// Attempt restoring session once the page has set up handlers
restoreSessionIfPresent();

function submitExam(auto = false) {
  if (!started) return; started = false; clearInterval(timerInterval);
  const submitModal = new bootstrap.Modal(document.getElementById('submitModal'));
  submitModal.show();
  const name = usernameInput.value.trim();
  const mobile = mobileInput.value.trim();
  let score = 0;
  for (let q of shuffled) if (answers[q.id] === q.answer) score++;
  const payload = { name, mobile, marks: score, exam: EXAM_NAME, answers: answers };
  fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json())
    .then(() => {
      // Persist submission so user cannot re-attempt
      try {
        const submission = {
          name,
          mobile,
          score,
          answers,
          shuffledOrder: shuffled.map(q => q.id),
          submittedAt: new Date().toISOString()
        };
        localStorage.setItem('exam_submitted', JSON.stringify(submission));
        // Clear stored login (optional)
        try { localStorage.removeItem('exam_user'); } catch (e) { /* ignore */ }
      } catch (e) { console.error('Failed to persist submission', e); }
      document.getElementById('submitModalContent').innerHTML = `<div class="text-success"><h5>✅ Exam submitted!</h5><p class="small">Generating your summary...</p></div>`;
      setTimeout(() => { submitModal.hide(); showSummary(score); }, 1500);
    })
    .catch(() => { document.getElementById('submitModalContent').innerHTML = `<div class="text-warning"><h5>⚠️ Submission failed. Check internet.</h5></div>`; });
}

function showSummary(score) {
  document.getElementById('exam-area').style.display = 'none';
  document.getElementById('summary-area').style.display = '';
  const name = usernameInput.value.trim();
  const mobile = mobileInput.value.trim();
  let correct = score, wrong = shuffled.length - score;
  document.getElementById('summaryStats').innerHTML = `
    <div class="mb-2">
      <strong>Candidate:</strong> ${name} &nbsp; | &nbsp; 
      <strong>Mobile:</strong> ${mobile}
    </div>
    <div>✅ Correct: ${correct} &nbsp;&nbsp; ❌ Wrong: ${wrong} &nbsp;&nbsp; 🏁 Score: ${score}/${shuffled.length}</div>`;
  const list = document.getElementById('summaryList');
  list.innerHTML = '';
  shuffled.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'summary-item';
    const userAns = answers[q.id] || 'Not Answered';
    div.innerHTML = `
        <div><strong>Q${i + 1}.</strong> ${q.q_en}</div>
        <div class="small text-muted mb-1">${q.q_hi}</div>
        <div>Your Answer: <span class="${userAns === q.answer ? 'text-success' : 'text-danger'}">${userAns}</span></div>
        <div>Correct Answer: <strong class="text-success">${q.answer}</strong></div>
        <div class="small text-muted mt-1">${q.summary_en}<br>${q.summary_hi}</div>`;
    list.appendChild(div);
  });
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const opt = {
      margin: 0.5,
      filename: `${name.replace(/\s+/g, '_')}_Networking_Exam.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(document.getElementById('summary-area')).set(opt).save();
  });
}






/* ===============================
COMMON AUTO SUBMIT FUNCTION
================================ */
function forceSubmit(reason) {
  alert("⚠️ Rule Violation Detected!\nReason: " + reason + "\nYour exam is being submitted.");

  // Prevent multiple submissions
  if (window.examSubmitted) return;
  window.examSubmitted = true;

  // Call your actual submit function
  submitExam();
}

/* ===============================
   DISABLE RIGHT CLICK
================================ */
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  forceSubmit("Right click detected");
});

/* ===============================
   BLOCK SHORTCUT KEYS
================================ */
document.addEventListener("keydown", function (e) {

  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    forceSubmit("F12 pressed");
  }

  // Ctrl + Shift + I / J / C
  if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
    e.preventDefault();
    forceSubmit("Developer tools shortcut");
  }

  // Ctrl + U
  if (e.ctrlKey && e.key.toUpperCase() === "U") {
    e.preventDefault();
    forceSubmit("View source shortcut");
  }
});

/* ===============================
   DEVTOOLS DETECTION
================================ */
let devtoolsOpen = false;

setInterval(() => {
  const start = performance.now();
  debugger;
  const end = performance.now();

  if (end - start > 100 && !devtoolsOpen) {
    devtoolsOpen = true;
    forceSubmit("Developer tools opened");
  }
}, 1000);

/* ===============================
   FORCE FULLSCREEN
================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
});

/* ===============================
   FULLSCREEN EXIT DETECTION
================================ */
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    forceSubmit("Fullscreen exited");
  }
});