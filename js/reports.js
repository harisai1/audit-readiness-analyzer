// ===== REPORTS.JS =====

// ---- Date ----
function setCurrentDate() {
    const el = document.getElementById('currentDate');
    if (el) {
        el.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }
}

// ---- Sample Reports Data ----
const sampleReports = [
    {
        id: 1,
        title: 'Q4 Finance Audit Readiness Report',
        dept: 'Finance',
        type: 'Readiness Report',
        date: '2024-12-15',
        score: 78,
        status: 'ready',
        pages: 12,
    },
    {
        id: 2,
        title: 'IT Security Compliance Summary',
        dept: 'IT',
        type: 'Compliance Summary',
        date: '2024-12-10',
        score: 92,
        status: 'ready',
        pages: 8,
    },
    {
        id: 3,
        title: 'HR Gap Analysis Report',
        dept: 'HR',
        type: 'Gap Analysis',
        date: '2024-12-08',
        score: 45,
        status: 'action-required',
        pages: 15,
    },
    {
        id: 4,
        title: 'Operations Risk Assessment',
        dept: 'Operations',
        type: 'Risk Assessment',
        date: '2024-12-01',
        score: 63,
        status: 'in-review',
        pages: 10,
    },
    {
        id: 5,
        title: 'Annual Audit Readiness Summary',
        dept: 'All Departments',
        type: 'Readiness Report',
        date: '2024-11-28',
        score: 70,
        status: 'ready',
        pages: 24,
    },
];

// ---- Status Config ----
const statusConfig = {
    'ready':           { label: 'Ready',           color: '#10b981', bg: '#dcfce7' },
    'action-required': { label: 'Action Required',  color: '#ef4444', bg: '#fee2e2' },
    'in-review':       { label: 'In Review',        color: '#f59e0b', bg: '#fef3c7' },
};

// ---- Render Reports ----
function renderReports(reports) {
    const container = document.getElementById('reportsList');
    if (!container) return;

    if (reports.length === 0) {
        container.innerHTML = '<p style="padding:20px;color:#94a3b8;text-align:center;">No reports found.</p>';
        return;
    }

    container.innerHTML = reports.map(r => {
        const st = statusConfig[r.status] || statusConfig.ready;
        const scoreColor = r.score >= 75 ? '#10b981' : r.score >= 50 ? '#f59e0b' : '#ef4444';
        return `
        <div class="report-item" style="background:white;border-radius:12px;padding:20px 25px;
             display:flex;align-items:center;justify-content:space-between;
             box-shadow:0 1px 3px rgba(0,0,0,0.08);border:1px solid #e2e8f0;
             margin-bottom:12px;transition:all 0.3s ease;"
             onmouseenter="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.12)';this.style.transform='translateY(-2px)'"
             onmouseleave="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.08)';this.style.transform='translateY(0)'">
            <div style="display:flex;align-items:center;gap:16px;flex:1;">
                <div style="width:48px;height:48px;background:linear-gradient(135deg,#4361ee,#3a56d4);
                            border-radius:10px;display:flex;align-items:center;justify-content:center;
                            color:white;font-size:20px;flex-shrink:0;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div style="flex:1;">
                    <h4 style="font-size:15px;font-weight:600;color:#1e293b;margin-bottom:3px;">${r.title}</h4>
                    <p style="font-size:13px;color:#64748b;margin-bottom:4px;">
                        ${r.dept} &bull; ${r.type} &bull; ${r.pages} pages &bull; ${formatDate(r.date)}
                    </p>
                    <span style="font-size:11px;font-weight:600;color:${st.color};background:${st.bg};
                                 padding:3px 10px;border-radius:20px;">${st.label}</span>
                </div>
                <div style="text-align:center;min-width:64px;">
                    <div style="font-size:24px;font-weight:700;color:${scoreColor};">${r.score}%</div>
                    <div style="font-size:11px;color:#94a3b8;">Score</div>
                </div>
            </div>
            <div style="display:flex;gap:10px;margin-left:20px;">
                <button onclick="previewReport(${r.id})"
                        style="padding:8px 16px;background:#f1f5f9;color:#475569;border:none;
                               border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;
                               display:flex;align-items:center;gap:6px;transition:all 0.2s ease;"
                        onmouseenter="this.style.background='#e2e8f0'"
                        onmouseleave="this.style.background='#f1f5f9'">
                    <i class="fas fa-eye"></i> Preview
                </button>
                <button onclick="downloadReport(${r.id})"
                        style="padding:8px 16px;background:linear-gradient(135deg,#4361ee,#3a56d4);
                               color:white;border:none;border-radius:8px;font-size:13px;
                               font-weight:500;cursor:pointer;display:flex;align-items:center;
                               gap:6px;transition:all 0.2s ease;"
                        onmouseenter="this.style.opacity='0.9'"
                        onmouseleave="this.style.opacity='1'">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        </div>`;
    }).join('');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ---- Generate Custom Report ----
function generateCustomReport() {
    const dept     = document.getElementById('reportDepartment')?.value || 'all';
    const type     = document.getElementById('reportType')?.value || 'readiness';
    const range    = document.getElementById('dateRange')?.value || 'current';

    const typeLabels = {
        readiness: 'Audit Readiness Report',
        gap: 'Gap Analysis Report',
        risk: 'Risk Assessment Report',
        compliance: 'Compliance Summary',
    };
    const deptLabels = {
        all: 'All Departments', finance: 'Finance',
        hr: 'HR', it: 'IT', operations: 'Operations'
    };

    const score = dept === 'hr' ? 45 : dept === 'it' ? 92 : dept === 'finance' ? 78 : dept === 'operations' ? 63 : 70;
    const newReport = {
        id: Date.now(),
        title: `${deptLabels[dept]} ${typeLabels[type]}`,
        dept: deptLabels[dept],
        type: typeLabels[type],
        date: new Date().toISOString().slice(0, 10),
        score,
        status: score >= 75 ? 'ready' : score >= 50 ? 'in-review' : 'action-required',
        pages: Math.floor(Math.random() * 12) + 6,
    };

    sampleReports.unshift(newReport);
    renderReports(sampleReports);
    showToast('📄 Report generated successfully!');
}

// ---- Preview ----
function previewReport(id) {
    const report = sampleReports.find(r => r.id === id);
    if (!report) return;

    const preview = document.getElementById('reportPreview');
    const content = document.getElementById('previewContent');
    if (!preview || !content) return;

    const scoreColor = report.score >= 75 ? '#10b981' : report.score >= 50 ? '#f59e0b' : '#ef4444';
    content.innerHTML = `
        <div style="max-width:700px;margin:0 auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;
                        padding-bottom:16px;border-bottom:2px solid #e2e8f0;">
                <div>
                    <h2 style="font-size:22px;font-weight:700;color:#1e293b;margin-bottom:4px;">${report.title}</h2>
                    <p style="font-size:14px;color:#64748b;">Generated on ${formatDate(report.date)}</p>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:36px;font-weight:800;color:${scoreColor};">${report.score}%</div>
                    <div style="font-size:12px;color:#94a3b8;">Readiness Score</div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
                <div style="background:#f8fafc;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;color:#4361ee;">
                        ${Math.round(report.score * 0.1)}</div>
                    <div style="font-size:12px;color:#64748b;">Critical Findings</div>
                </div>
                <div style="background:#f8fafc;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;color:#f59e0b;">
                        ${Math.round((100 - report.score) * 0.2)}</div>
                    <div style="font-size:12px;color:#64748b;">Items Pending</div>
                </div>
                <div style="background:#f8fafc;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:20px;font-weight:700;color:#10b981;">
                        ${Math.round(report.score * 0.15)}</div>
                    <div style="font-size:12px;color:#64748b;">Items Completed</div>
                </div>
            </div>
            <div style="background:#fff8ed;border-left:4px solid #f59e0b;padding:16px;border-radius:0 8px 8px 0;margin-bottom:20px;">
                <h4 style="font-weight:600;color:#92400e;margin-bottom:8px;">⚠ Key Findings</h4>
                <ul style="list-style:disc;padding-left:18px;color:#78350f;font-size:14px;line-height:1.8;">
                    <li>Documentation gaps identified in ${report.dept} processes</li>
                    <li>Access control review required for sensitive data</li>
                    <li>Training compliance records need updating</li>
                </ul>
            </div>
            <div style="background:#f0fdf4;border-left:4px solid #10b981;padding:16px;border-radius:0 8px 8px 0;">
                <h4 style="font-weight:600;color:#14532d;margin-bottom:8px;">✅ Recommendations</h4>
                <ul style="list-style:disc;padding-left:18px;color:#166534;font-size:14px;line-height:1.8;">
                    <li>Complete remaining ${Math.round(100 - report.score)}% checklist items within 2 weeks</li>
                    <li>Conduct cross-department review meeting</li>
                    <li>Update risk register with new findings</li>
                </ul>
            </div>
        </div>`;

    preview.style.display = 'flex';
}

function closePreview() {
    const preview = document.getElementById('reportPreview');
    if (preview) preview.style.display = 'none';
}

// ---- Download ----
function downloadReport(id) {
    const report = sampleReports.find(r => r.id === id);
    if (!report) return;
    const content = `AUDIT READINESS REPORT\n${'='.repeat(50)}\n\nTitle: ${report.title}\nDepartment: ${report.dept}\nType: ${report.type}\nDate: ${formatDate(report.date)}\nScore: ${report.score}%\n\n` +
        `KEY FINDINGS\n${'-'.repeat(30)}\n- Documentation gaps identified\n- Access control review required\n- Training compliance needs update\n\n` +
        `RECOMMENDATIONS\n${'-'.repeat(30)}\n- Complete remaining checklist items\n- Conduct cross-department review\n- Update risk register\n\n` +
        `Generated by Internal Audit Readiness Analyzer`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.title.replace(/\s+/g, '_') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Report downloaded!');
}

function exportAllReports() {
    let csv = 'Title,Department,Type,Date,Score,Status\n';
    sampleReports.forEach(r => {
        csv += `"${r.title}","${r.dept}","${r.type}","${formatDate(r.date)}","${r.score}%","${r.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_audit_reports_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📦 All reports exported!');
}

// ---- Toast ----
function showToast(msg) {
    let toast = document.getElementById('rptToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'rptToast';
        toast.style.cssText = 'position:fixed;bottom:30px;right:30px;background:#1e293b;color:white;padding:14px 22px;border-radius:10px;font-size:14px;z-index:9999;box-shadow:0 10px 25px rgba(0,0,0,0.2);';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// Close preview on backdrop click
document.addEventListener('DOMContentLoaded', function () {
    setCurrentDate();
    renderReports(sampleReports);

    const preview = document.getElementById('reportPreview');
    if (preview) {
        preview.addEventListener('click', function (e) {
            if (e.target === preview) closePreview();
        });
    }

    // Escape key closes preview
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closePreview();
    });
});
