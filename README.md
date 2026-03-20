# Internal Audit Readiness Analyzer 🛡️

A complete, static web application for managing internal audit readiness across departments — ready to deploy on GitHub Pages.

## 🚀 Live Demo

After deploying, access via: `https://<your-username>.github.io/<repo-name>/`

**Demo Login:**
- Email: `audit.officer@company.com`
- Password: `admin123`

---

## 📁 Project Structure

```
├── index.html              # Login page
├── dashboard.html          # Main dashboard with charts
├── audit-checklist.html    # Interactive assessment checklist
├── risk-analysis.html      # Risk distribution charts
├── reports.html            # Report generation & download
├── notifications.html      # Notifications center
├── settings.html           # User & system settings
├── css/
│   └── style.css           # All styles
└── js/
    ├── dashboard.js        # Dashboard charts & logic
    ├── audit.js            # Checklist & assessment logic
    └── reports.js          # Report generation & export
```

---

## ✨ Features

- **Login Page** — Demo auth with forgot password modal
- **Dashboard** — KPI cards, radar compliance chart, trend line, department readiness scores, PDF upload
- **Audit Checklist** — Yes/Partial/No radio assessments, live score ring, category collapsing, save/reset, CSV export
- **Risk Analysis** — Stacked bar chart of risk by department, high-risk item list
- **Reports** — Generate custom reports, preview modal, download as text, export all as CSV
- **Notifications** — Full notifications list with unread indicators
- **Settings** — Profile, password, notification preferences tabs

---

## 🌐 Deploy to GitHub Pages

### Option 1 — GitHub Web UI (easiest)

1. Create a new repository on GitHub (public)
2. Upload all files maintaining the folder structure (`css/`, `js/`)
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save** — your site will be live in ~60 seconds

### Option 2 — Git CLI

```bash
git init
git add .
git commit -m "Initial commit: Audit Readiness Analyzer"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Then enable GitHub Pages in repo Settings → Pages.

---

## 🛠 Tech Stack

- **HTML5 / CSS3** — No build tools required
- **Vanilla JavaScript** — Zero dependencies
- **Chart.js** (CDN) — Dashboard and risk charts
- **Font Awesome 6** (CDN) — Icons
- **Google Fonts — Poppins** (CDN)

---

## 📝 Notes

- All data is stored in `localStorage` — no backend required
- Checklist progress persists across browser sessions
- Fully static — works with any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages)
