// Theme Toggle with LocalStorage
const themeBtn = document.getElementById('theme-btn');
const icon = themeBtn.querySelector('i');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
icon.className = savedTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';

themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    if (current === 'light') {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'bi bi-sun-fill';
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        icon.className = 'bi bi-moon-fill';
        localStorage.setItem('theme', 'light');
    }
});

// Dashboard Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxMLESIaz7R718eowxYFCdaN_hoE55ZIo5RXDYzaYAZoMnikEYZHVjgRda7w0ol6L--/exec";

const tradeTitle = document.getElementById('tradeTitle');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMsg = document.getElementById('errorMsg');
const examListView = document.getElementById('examListView');
const examDetailView = document.getElementById('examDetailView');
const examCardsContainer = document.getElementById('examCardsContainer');
const resultsGrid = document.getElementById('resultsGrid');
const tradeBreadcrumb = document.getElementById('tradeBreadcrumb');
const tradeBreadcrumb2 = document.getElementById('tradeBreadcrumb2');
const currentExamName = document.getElementById('currentExamName');
const examDetailTitle = document.getElementById('examDetailTitle');
const totalStudents = document.getElementById('totalStudents');
const avgScore = document.getElementById('avgScore');
const highScore = document.getElementById('highScore');
const backToExams = document.getElementById('backToExams');

// Get Trade from URL
const urlParams = new URLSearchParams(window.location.search);
const trade = urlParams.get('trade');

let allResults = [];

if (!trade) {
    showError("No trade specified.");
} else {
    tradeTitle.innerText = `${trade} Dashboard`;
    tradeBreadcrumb.innerText = trade;
    tradeBreadcrumb2.innerText = trade;
    fetchResults(trade);
}

// Back to exams list
backToExams.addEventListener('click', () => {
    showExamList();
});

async function fetchResults(tradeName) {
    try {
        const url = `${SCRIPT_URL}?action=getResults&trade=${encodeURIComponent(tradeName)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success' && Array.isArray(data.data)) {
            allResults = data.data;
            processAndShowExams(data.data);
        } else {
            showError(data.message || "No data found for this trade.");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        showError("Failed to connect to the server. Please try again later.");
    }
}

function processAndShowExams(data) {
    loadingDiv.style.display = 'none';

    if (data.length === 0) {
        showError("No student results available yet.");
        return;
    }

    // Group results by exam name
    const examGroups = {};

    data.forEach(row => {
        const examName = row.ExamName || row.exam || 'Unknown Exam';

        if (!examGroups[examName]) {
            examGroups[examName] = [];
        }

        examGroups[examName].push(row);
    });

    // Display exam cards
    showExamList(examGroups);
}

function showExamList(examGroups = null) {
    // Hide detail view, show list view
    examDetailView.style.display = 'none';
    examListView.style.display = 'block';

    if (!examGroups) {
        // Re-process from allResults
        examGroups = {};
        allResults.forEach(row => {
            const examName = row.ExamName || row.exam || 'Unknown Exam';
            if (!examGroups[examName]) {
                examGroups[examName] = [];
            }
            examGroups[examName].push(row);
        });
    }

    // Vibrant color palette for exam cards
    const colorPalette = [
        { color1: '#4285F4', color2: '#34A853' }, // Blue to Green
        { color1: '#EA4335', color2: '#FBBC05' }, // Red to Yellow
        { color1: '#9747FF', color2: '#4285F4' }, // Purple to Blue
        { color1: '#FF6B6B', color2: '#FFA07A' }, // Coral to Light Salmon
        { color1: '#00D9FF', color2: '#0099FF' }, // Cyan to Blue
        { color1: '#FF1744', color2: '#FF9100' }, // Deep Pink to Orange
        { color1: '#00E676', color2: '#00BFA5' }, // Green to Teal
        { color1: '#FFD600', color2: '#FF6D00' }, // Yellow to Deep Orange
        { color1: '#651FFF', color2: '#D500F9' }, // Deep Purple to Magenta
        { color1: '#00B8D4', color2: '#0091EA' }, // Cyan to Light Blue
        { color1: '#FF5722', color2: '#FF9800' }, // Deep Orange to Orange
        { color1: '#8BC34A', color2: '#CDDC39' }  // Light Green to Lime
    ];

    examCardsContainer.innerHTML = '';

    Object.keys(examGroups).forEach((examName, index) => {
        const students = examGroups[examName];
        const studentCount = students.length;

        // Calculate average score and highest score
        let totalScore = 0;
        let highestScore = 0;
        students.forEach(s => {
            const marks = parseInt(s.Marks || s.marks || 0);
            totalScore += marks;
            if (marks > highestScore) highestScore = marks;
        });
        const avgScore = studentCount > 0 ? Math.round(totalScore / studentCount) : 0;

        // Assign color from palette (cycle through if more exams than colors)
        const colors = colorPalette[index % colorPalette.length];

        const card = document.createElement('div');
        card.className = 'exam-card';
        card.style.setProperty('--card-color-1', colors.color1);
        card.style.setProperty('--card-color-2', colors.color2);
        card.onclick = () => showExamDetail(examName, students);

        card.innerHTML = `
            <div class="exam-icon-circle">
                <i class="bi bi-file-earmark-text"></i>
            </div>
            <div class="exam-info">
                <h3>${examName}</h3>
                <div class="exam-meta">
                    <div class="exam-meta-item">
                        <i class="bi bi-people-fill"></i>
                        <span>${studentCount} Students</span>
                    </div>
                    <div class="exam-meta-item">
                        <i class="bi bi-graph-up-arrow"></i>
                        <span>Avg: ${avgScore}</span>
                    </div>
                </div>
                <div class="highest-score">
                    <i class="bi bi-trophy-fill"></i> Highest: ${highestScore}
                </div>
            </div>
        `;

        examCardsContainer.appendChild(card);
    });
}

function showExamDetail(examName, students) {
    // Hide list view, show detail view
    examListView.style.display = 'none';
    examDetailView.style.display = 'block';

    currentExamName.innerText = examName;
    examDetailTitle.innerText = examName;

    // Calculate statistics
    const studentCount = students.length;
    let totalScore = 0;
    let maxScore = 0;

    students.forEach(s => {
        const marks = parseInt(s.Marks || s.marks || 0);
        totalScore += marks;
        if (marks > maxScore) maxScore = marks;
    });

    const average = studentCount > 0 ? Math.round(totalScore / studentCount) : 0;

    totalStudents.innerText = studentCount;
    avgScore.innerText = average;
    highScore.innerText = maxScore;

    // Sort students by marks descending
    const sortedStudents = [...students].sort((a, b) => {
        const marksA = parseInt(a.Marks || a.marks || 0) || 0;
        const marksB = parseInt(b.Marks || b.marks || 0) || 0;
        return marksB - marksA;
    });

    // Clear old data
    resultsGrid.innerHTML = '';
    
    sortedStudents.forEach((row, index) => {
        const rank = index + 1;
        const name = row.Name || row.name || 'Unknown Student';
        const marks = row.Marks || row.marks || '0';
        const time = row.TimeStemp || row.timestamp || '-';
        
        let rankClass = '';
        let rankDisplay = `#${rank}`;

        if (rank === 1) { rankClass = 'card-rank-1'; rankDisplay = '<i class="bi bi-trophy-fill"></i>'; }
        else if (rank === 2) { rankClass = 'card-rank-2'; }
        else if (rank === 3) { rankClass = 'card-rank-3'; }

        // Determine score class
        let scoreClass = 'score-mid';
        const scoreVal = parseInt(marks);
        if (!isNaN(scoreVal)) {
            if (scoreVal >= 40) scoreClass = 'score-high';
            else if (scoreVal < 20) scoreClass = 'score-low';
        }

        const card = document.createElement('div');
        card.className = `student-card ${rankClass}`;
        card.innerHTML = `
            <div class="rank-badge">${rankDisplay}</div>
            <div class="student-name" style="padding-right: 40px;">
                <i class="bi bi-person-circle"></i>
                ${name}
            </div>
            <div class="score-display">
                <div>
                    <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 4px;">Score</div>
                    <span class="score-badge-large ${scoreClass}">${marks}</span>
                </div>
            </div>
            <div class="card-meta">
                <i class="bi bi-clock"></i>
                ${formatDate(time)}
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

function showError(msg) {
    loadingDiv.style.display = 'none';
    examListView.style.display = 'none';
    examDetailView.style.display = 'none';
    errorDiv.style.display = 'block';
    errorMsg.innerText = msg;
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleString();
    } catch (e) {
        return dateString;
    }
}
