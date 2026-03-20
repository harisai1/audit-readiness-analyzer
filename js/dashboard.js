// ===== DASHBOARD.JS =====

// ---- Date Display ----
function setCurrentDate() {
    const el = document.getElementById('currentDate');
    if (el) {
        el.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
}

// ---- Department Data ----
const deptData = {
    finance:    { score: 78, status: 'medium', items: 24, completed: 19 },
    hr:         { score: 45, status: 'high',   items: 18, completed: 8  },
    it:         { score: 92, status: 'low',    items: 30, completed: 28 },
    operations: { score: 63, status: 'medium', items: 22, completed: 14 },
};

// ---- Overall Score ----
function calcOverallScore() {
    const scores = Object.values(deptData).map(d => d.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function updateScoreDisplay() {
    const scoreEl = document.getElementById('overallScore');
    const score = calcOverallScore();
    if (scoreEl) {
        let count = 0;
        const interval = setInterval(() => {
            count += 2;
            scoreEl.textContent = count + '%';
            if (count >= score) {
                scoreEl.textContent = score + '%';
                clearInterval(interval);
            }
        }, 20);
    }
}

// ---- Stat Cards Animation ----
function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        let count = 0;
        const step = Math.max(1, Math.round(target / 50));
        const interval = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = count + (el.dataset.suffix || '');
            if (count >= target) clearInterval(interval);
        }, 30);
    });
}

// ---- Radar / Compliance Chart ----
function initComplianceChart() {
    const ctx = document.getElementById('complianceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Finance', 'HR', 'IT', 'Operations', 'Legal', 'Procurement'],
            datasets: [{
                label: 'Readiness Score',
                data: [78, 45, 92, 63, 70, 55],
                backgroundColor: 'rgba(67,97,238,0.15)',
                borderColor: '#4361ee',
                borderWidth: 2,
                pointBackgroundColor: '#4361ee',
                pointRadius: 5,
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20, font: { size: 11 } },
                    grid: { color: 'rgba(0,0,0,0.07)' },
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// ---- Trend Line Chart ----
function initTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Overall Score',
                data: [52, 58, 61, 65, 70, 72, 70],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67,97,238,0.08)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: '#4361ee',
                pointRadius: 4,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    min: 40, max: 100,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { font: { size: 11 } }
                },
                x: { grid: { display: false }, ticks: { font: { size: 11 } } }
            }
        }
    });
}

// ---- Notification Dropdown ----
function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (!dropdown) return;
    const isOpen = dropdown.style.display === 'block';
    dropdown.style.display = isOpen ? 'none' : 'block';
}

function clearAllNotifications() {
    const list = document.getElementById('notifList');
    if (list) {
        list.innerHTML = '<p style="text-align:center;padding:20px;color:#94a3b8;">No new notifications</p>';
    }
    const badge = document.querySelector('.notification-badge');
    if (badge) badge.style.display = 'none';
}

// Close dropdown on outside click
document.addEventListener('click', function (e) {
    const container = document.querySelector('.notification-container');
    const dropdown  = document.getElementById('notificationDropdown');
    if (dropdown && container && !container.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// ---- PDF Upload / Analysis ----
function handleFileUpload(input) {
    const file = input.files[0];
    if (!file) return;
    const status = document.getElementById('uploadStatus');
    if (status) {
        status.textContent = `✅ "${file.name}" uploaded successfully (${(file.size/1024).toFixed(1)} KB). Analysis in progress…`;
        status.style.display = 'block';
    }
    setTimeout(() => {
        if (status) status.textContent = `✅ Analysis complete for "${file.name}". Report ready.`;
    }, 2000);
}

function triggerFileUpload() {
    const inp = document.getElementById('pdfUpload');
    if (inp) inp.click();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
    setCurrentDate();
    updateScoreDisplay();
    animateCounters();
    initComplianceChart();
    initTrendChart();
});
