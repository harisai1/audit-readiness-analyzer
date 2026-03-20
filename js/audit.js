// ===== AUDIT.JS =====

// ---- Data ----
const checklistData = {
    finance: [
        { id: 'f1', text: 'Financial statements reconciled and signed off', category: 'Accounting' },
        { id: 'f2', text: 'Bank reconciliations completed for all accounts', category: 'Accounting' },
        { id: 'f3', text: 'Accounts payable aging report prepared', category: 'AP/AR' },
        { id: 'f4', text: 'Accounts receivable aging report prepared', category: 'AP/AR' },
        { id: 'f5', text: 'Fixed asset register updated and verified', category: 'Assets' },
        { id: 'f6', text: 'Payroll records reviewed and approved', category: 'Payroll' },
        { id: 'f7', text: 'Tax filings and payments up to date', category: 'Tax' },
        { id: 'f8', text: 'Budget vs actuals variance analysis completed', category: 'Budget' },
    ],
    hr: [
        { id: 'h1', text: 'Employee contracts updated and signed', category: 'Documentation' },
        { id: 'h2', text: 'Performance reviews completed for all staff', category: 'Performance' },
        { id: 'h3', text: 'Leave balances reconciled', category: 'Leave' },
        { id: 'h4', text: 'Training records up to date', category: 'Training' },
        { id: 'h5', text: 'Background checks completed for new hires', category: 'Compliance' },
        { id: 'h6', text: 'Org chart reflects current structure', category: 'Documentation' },
    ],
    it: [
        { id: 'i1', text: 'System access reviews completed', category: 'Access Control' },
        { id: 'i2', text: 'Security patches applied and documented', category: 'Security' },
        { id: 'i3', text: 'Disaster recovery plan tested', category: 'DR/BCP' },
        { id: 'i4', text: 'Data backup procedures verified', category: 'Backup' },
        { id: 'i5', text: 'Change management log reviewed', category: 'Change Mgmt' },
        { id: 'i6', text: 'IT asset inventory updated', category: 'Assets' },
        { id: 'i7', text: 'User access provisioning/deprovisioning documented', category: 'Access Control' },
        { id: 'i8', text: 'Incident response log reviewed', category: 'Security' },
        { id: 'i9', text: 'Network vulnerability scan completed', category: 'Security' },
        { id: 'i10', text: 'Software licenses audited', category: 'Compliance' },
    ],
    operations: [
        { id: 'o1', text: 'Standard operating procedures documented', category: 'Documentation' },
        { id: 'o2', text: 'Supplier contracts reviewed', category: 'Procurement' },
        { id: 'o3', text: 'Quality control records maintained', category: 'Quality' },
        { id: 'o4', text: 'Health & safety compliance verified', category: 'Compliance' },
        { id: 'o5', text: 'Inventory counts reconciled', category: 'Inventory' },
        { id: 'o6', text: 'KPI dashboards updated', category: 'Performance' },
    ]
};

// ---- State ----
let checkedItems = JSON.parse(localStorage.getItem('auditChecklist') || '{}');
let currentDept = 'all';

// ---- Render ----
function renderChecklist(dept) {
    const container = document.getElementById('checklistContainer');
    if (!container) return;

    let items = [];
    if (dept === 'all') {
        Object.entries(checklistData).forEach(([d, list]) =>
            list.forEach(item => items.push({ ...item, dept: d }))
        );
    } else {
        items = (checklistData[dept] || []).map(item => ({ ...item, dept }));
    }

    if (items.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;padding:20px;">No items found.</p>';
        return;
    }

    const grouped = {};
    items.forEach(item => {
        const key = dept === 'all' ? item.dept : item.category;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(item);
    });

    container.innerHTML = Object.entries(grouped).map(([group, gItems]) => `
        <div class="checklist-group" style="margin-bottom:25px;">
            <h4 style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;
                        color:#64748b;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #e2e8f0;">
                ${group.charAt(0).toUpperCase() + group.slice(1)}
            </h4>
            ${gItems.map(item => renderItem(item)).join('')}
        </div>
    `).join('');

    updateProgress();
}

function renderItem(item) {
    const checked = !!checkedItems[item.id];
    return `
        <div class="checklist-item ${checked ? 'completed' : ''}" id="item-${item.id}"
             style="display:flex;align-items:center;gap:12px;padding:14px 18px;margin-bottom:8px;
                    background:${checked ? '#f0fdf4' : '#fff'};border-radius:10px;
                    border:1px solid ${checked ? '#bbf7d0' : '#e2e8f0'};
                    cursor:pointer;transition:all 0.2s ease;"
             onclick="toggleItem('${item.id}')">
            <div style="width:22px;height:22px;border-radius:6px;border:2px solid ${checked ? '#10b981' : '#cbd5e1'};
                        background:${checked ? '#10b981' : 'transparent'};display:flex;align-items:center;
                        justify-content:center;flex-shrink:0;transition:all 0.2s ease;">
                ${checked ? '<i class="fas fa-check" style="color:white;font-size:11px;"></i>' : ''}
            </div>
            <span style="font-size:14px;color:${checked ? '#16a34a' : '#334155'};
                         text-decoration:${checked ? 'line-through' : 'none'};flex:1;">
                ${item.text}
            </span>
            <span style="font-size:11px;background:${checked ? '#dcfce7' : '#f1f5f9'};
                         color:${checked ? '#16a34a' : '#64748b'};padding:3px 8px;border-radius:20px;">
                ${item.category}
            </span>
        </div>`;
}

function toggleItem(id) {
    checkedItems[id] = !checkedItems[id];
    localStorage.setItem('auditChecklist', JSON.stringify(checkedItems));
    renderChecklist(currentDept);
    showToast(checkedItems[id] ? '✅ Item marked complete' : '↩ Item marked incomplete');
}

// ---- Progress ----
function updateProgress() {
    const allItems = Object.values(checklistData).flat();
    const total = allItems.length;
    const done = allItems.filter(i => checkedItems[i.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const bar = document.getElementById('progressBar');
    const label = document.getElementById('progressLabel');
    const scoreEl = document.getElementById('checklistScore');

    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = `${done} / ${total} items completed`;
    if (scoreEl) scoreEl.textContent = pct + '%';
}

// ---- Filter ----
function filterDept(dept) {
    currentDept = dept;
    document.querySelectorAll('.dept-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.dept === dept);
    });
    renderChecklist(dept);
}

// ---- Save / Reset ----
function saveChecklist() {
    localStorage.setItem('auditChecklist', JSON.stringify(checkedItems));
    showToast('💾 Checklist saved successfully!');
}

function resetChecklist() {
    if (!confirm('Reset all checklist items? This cannot be undone.')) return;
    checkedItems = {};
    localStorage.removeItem('auditChecklist');
    renderChecklist(currentDept);
    showToast('🔄 Checklist reset');
}

// ---- Export ----
function exportChecklist() {
    const allItems = Object.values(checklistData).flat();
    let csv = 'Department,Item,Category,Status\n';
    Object.entries(checklistData).forEach(([dept, items]) => {
        items.forEach(item => {
            csv += `"${dept}","${item.text}","${item.category}","${checkedItems[item.id] ? 'Completed' : 'Pending'}"\n`;
        });
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_checklist_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Checklist exported as CSV');
}

// ---- Toast ----
function showToast(msg) {
    let toast = document.getElementById('auditToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'auditToast';
        toast.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#1e293b;color:white;padding:14px 22px;border-radius:10px;font-size:14px;z-index:9999;transition:all 0.3s ease;box-shadow:0 10px 25px rgba(0,0,0,0.2);';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
    }, 2500);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
    // Load dept from URL param if present
    const params = new URLSearchParams(window.location.search);
    const dept = params.get('dept') || 'all';
    currentDept = dept;

    // Set active tab
    document.querySelectorAll('.dept-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.dept === dept);
        tab.addEventListener('click', () => filterDept(tab.dataset.dept));
    });

    renderChecklist(currentDept);
});

// ===== CHECKLIST PAGE (audit-checklist.html) FUNCTIONS =====

// SVG ring progress
function setRingProgress(percent) {
    const circle = document.querySelector('.progress-ring-circle');
    if (!circle) return;
    const r = 42;
    const circumference = 2 * Math.PI * r;
    circle.style.strokeDasharray = circumference;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.transition = 'stroke-dashoffset 0.5s ease';
}

// Update score from radio buttons
function updateScore() {
    const radios = document.querySelectorAll('.checklist-item input[type="radio"]');
    const names = new Set();
    radios.forEach(r => names.add(r.name));

    let answered = 0, yesCount = 0, partialCount = 0;
    names.forEach(name => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            answered++;
            if (selected.value === 'yes') yesCount++;
            else if (selected.value === 'partial') partialCount++;
        }
    });

    const total = names.size;
    const score = total > 0 ? Math.round(((yesCount + partialCount * 0.5) / total) * 100) : 0;
    const completionPct = total > 0 ? Math.round((answered / total) * 100) : 0;

    // Update score display
    const scoreEl = document.getElementById('liveScoreValue');
    if (scoreEl) scoreEl.textContent = score + '%';
    setRingProgress(score);

    // Update ring color
    const circle = document.querySelector('.progress-ring-circle');
    if (circle) {
        circle.style.stroke = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    }

    // Risk indicator
    const ri = document.getElementById('riskIndicator');
    if (ri) {
        if (answered === 0) { ri.textContent = 'Not Assessed'; ri.style.background = '#f1f5f9'; ri.style.color = '#94a3b8'; }
        else if (score >= 75) { ri.textContent = '✅ Low Risk'; ri.style.background = '#dcfce7'; ri.style.color = '#16a34a'; }
        else if (score >= 50) { ri.textContent = '⚠ Medium Risk'; ri.style.background = '#fef3c7'; ri.style.color = '#d97706'; }
        else { ri.textContent = '🔴 High Risk'; ri.style.background = '#fee2e2'; ri.style.color = '#dc2626'; }
    }

    // Update category progress counters
    updateCategoryProgress();
}

function updateCategoryProgress() {
    const categories = ['finance', 'hr', 'it'];
    const itemCounts = { finance: 3, hr: 2, it: 2 };
    categories.forEach(cat => {
        const el = document.getElementById('progress-' + cat);
        if (!el) return;
        const container = document.getElementById('items-' + cat);
        if (!container) return;
        const answered = container.querySelectorAll('input[type="radio"]:checked').length;
        const names = new Set(Array.from(container.querySelectorAll('input[type="radio"]')).map(r => r.name));
        const answeredQuestions = new Set(Array.from(container.querySelectorAll('input[type="radio"]:checked')).map(r => r.name));
        el.textContent = `${answeredQuestions.size}/${names.size} completed`;
    });
}

// Toggle category collapse
function toggleCategory(cat) {
    const items = document.getElementById('items-' + cat);
    if (!items) return;
    items.classList.toggle('show');
    const header = document.getElementById('category-' + cat)?.querySelector('.fa-chevron-down');
    if (header) header.style.transform = items.classList.contains('show') ? 'rotate(0deg)' : 'rotate(-90deg)';
}

// Save
function saveProgress() {
    const data = {};
    document.querySelectorAll('.checklist-item input[type="radio"]:checked').forEach(r => {
        data[r.name] = r.value;
    });
    document.querySelectorAll('.comment-input').forEach((inp, i) => {
        if (inp.value) data['comment_' + i] = inp.value;
    });
    localStorage.setItem('auditProgress', JSON.stringify(data));
    showAuditToast('💾 Progress saved!');
}

// Load saved progress
function loadProgress() {
    const data = JSON.parse(localStorage.getItem('auditProgress') || '{}');
    Object.entries(data).forEach(([name, value]) => {
        if (name.startsWith('comment_')) {
            const index = parseInt(name.replace('comment_', ''));
            const inputs = document.querySelectorAll('.comment-input');
            if (inputs[index]) inputs[index].value = value;
        } else {
            const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (radio) radio.checked = true;
        }
    });
    updateScore();
}

// Reset
function resetAssessment() {
    if (!confirm('Reset all responses? This cannot be undone.')) return;
    document.querySelectorAll('.checklist-item input[type="radio"]').forEach(r => r.checked = false);
    document.querySelectorAll('.comment-input').forEach(i => i.value = '');
    localStorage.removeItem('auditProgress');
    updateScore();
    showAuditToast('🔄 Assessment reset');
}

// Generate report → redirect to reports page
function generateReport() {
    saveProgress();
    showAuditToast('📄 Generating report…');
    setTimeout(() => { window.location.href = 'reports.html'; }, 1000);
}

// Upload document button
function uploadDocument(btn) {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.pdf,.doc,.docx,.png,.jpg';
    inp.onchange = () => {
        if (inp.files[0]) {
            btn.style.background = '#dcfce7';
            btn.style.color = '#16a34a';
            btn.innerHTML = '<i class="fas fa-check"></i>';
            showAuditToast(`📎 "${inp.files[0].name}" attached`);
        }
    };
    inp.click();
}

function showAuditToast(msg) {
    let t = document.getElementById('auditPageToast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'auditPageToast';
        t.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#1e293b;color:white;padding:14px 22px;border-radius:10px;font-size:14px;z-index:9999;box-shadow:0 10px 25px rgba(0,0,0,0.2);transition:opacity 0.3s;';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}

// Set current date and load progress on checklist page
document.addEventListener('DOMContentLoaded', function () {
    const dateEl = document.getElementById('currentDate');
    if (dateEl && !dateEl.textContent) {
        dateEl.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    // Init SVG ring
    const circle = document.querySelector('.progress-ring-circle');
    if (circle) {
        const r = 42;
        const circ = 2 * Math.PI * r;
        circle.style.strokeDasharray = circ;
        circle.style.strokeDashoffset = circ;
        circle.style.transform = 'rotate(-90deg)';
        circle.style.transformOrigin = '50% 50%';
    }

    loadProgress();
});
