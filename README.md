# Saiteja Goshika - Professional Portfolio Website

A clean, modern, fully responsive, and recruiter-friendly personal portfolio website. Built using vanilla HTML5, CSS3 (with dynamic dark/light mode and glassmorphism styling), and interactive Vanilla JavaScript.

## 🚀 Features

-   **🎨 Glassmorphic & Modern Styling:** Sleek aesthetics with a dark/light mode toggle. Uses custom CSS variables and premium typography (Poppins + JetBrains Mono).
-   **⚡ Performance & Responsiveness:** Built using a mobile-first philosophy to look stunning on phones, tablets, and wide-screen monitors.
-   **⌨️ Typwriter Animation:** Dynamic hero typing animation displaying core roles.
-   **📂 Project Filter Cards:** Interactive buttons to filter projects between "AI & ML" and "Web Development" dynamically.
-   **📈 LeetCode & Hackathon Counters:** Scroll-triggered counting statistics highlighting key achievements.
-   **📊 Live GitHub Contribution Chart:** Dynamically integrated visual representation of coding pushes.
-   **📬 Functional Contact Form:** Integrated with Formspree for reliable asynchronous form submissions.
-   **📄 Resume Download:** Fast-loading resume file downloads.

---

## 📁 Project Folder Structure

```text
/ (Workspace Root)
├── index.html          # Main HTML structure with semantic sections
├── style.css           # Main style sheets, gradients, glassmorphism UI variables
├── script.js          # Interactive features, scroll tracking, and count-up logic
├── README.md           # Getting started, deployment, and configuration instructions
└── assets/             # Project static resources
    ├── profile.jpg     # Replace with your professional headshot
    └── resume.pdf      # Replace with your actual resume PDF
```

---

## ⚙️ How to Configure Formspree Email Integration

To activate the contact form and receive visitor emails directly to your inbox:

1.  **Register:** Go to [Formspree](https://formspree.io) and create a free account.
2.  **Create Form:** Click on **New Form**, name it (e.g., `Portfolio Form`), select your target email, and create it.
3.  **Get ID:** Formspree will provide a unique integration endpoint URL. It will look like this:
    `https://formspree.io/f/xyzaabbcc`
    *(where `xyzaabbcc` is your Formspree form ID)*.
4.  **Update HTML:** Open `index.html`, navigate to the `<form>` element inside the `<section id="contact">` (around line 590), and replace the action value:
    ```diff
    - <form id="contact-form" action="https://formspree.io/f/placeholder-id" method="POST">
    + <form id="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
    ```
5.  **Test:** Open your site locally, type a test message in the form, and hit send. You should receive the email in your inbox and see a confirmation state on the UI.

---

## 📦 How to Deploy on GitHub Pages

GitHub Pages is a free, fast web host for static sites. Follow these simple steps:

### Option A: Using the GitHub Web Interface (Easiest)

1.  **Create Repo:** Create a new repository on GitHub. Name it something like `portfolio` or `SaitejaGoshika.github.io`. Make sure it is set to **Public**.
2.  **Upload Files:** Drag and drop the following files/folders from your desktop into the GitHub upload screen:
    -   `index.html`
    -   `style.css`
    -   `script.js`
    -   `README.md`
    -   `assets/` (containing your actual `profile.jpg` and `resume.pdf`)
3.  **Commit:** Commit your changes to the `main` branch.
4.  **Activate Pages:**
    -   In your repository, click on the **Settings** tab.
    -   On the left sidebar under the **Code and automation** section, click on **Pages**.
    -   Under **Build and deployment**, set the source to **Deploy from a branch**.
    -   Select the branch as **`main`** and the folder as **`/ (root)`**.
    -   Click **Save**.
5.  **Live Link:** After a minute or two, refresh the page. You will see a banner saying *"Your site is live at: https://[username].github.io/[repo-name]/"*.

### Option B: Using Git CLI (Advanced)

If you have Git installed locally, run these commands in your project directory:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initialize professional portfolio website"

# Create a main branch
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/SaitejaGoshika/YOUR_REPO_NAME.git

# Push code to GitHub
git push -u origin main
```

Once pushed, follow **Step 4** (Activate Pages) in the web interface instructions.

---

## 🛠️ Personalization Guide

-   **Profile Photo:** Replace `assets/profile.jpg` with a professional picture of yourself. (Make sure it is named exactly `profile.jpg`).
-   **Resume File:** Place your updated resume PDF in the `assets/` folder and name it `resume.pdf`.
-   **GitHub Contribution Colors:** The contribution chart utilizes `@SaitejaGoshika` username. If you want to change its accent colors, you can replace the color hex value `4f46e5` inside the URL source in `index.html` (e.g., `https://ghchart.rshah.org/ACCENT_HEX/SaitejaGoshika`).
