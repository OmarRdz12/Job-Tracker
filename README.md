# Job Application Tracker

A responsive web application designed to help you efficiently manage and track your job applications, company information, and professional references. Never lose track of an opportunity again!

If recruiters need a candidate management system to track potential candidates ...

We, the job seekers, also need a management system to track recruiters.

![Job Application Tracker Dashboard (Illustrative)](https://picsum.photos/seed/jobtrackerapp/800/400)
*(Replace with an actual screenshot of your application's dashboard)*

## View the deployed version [here](https://job-tracker-zeta-seven.vercel.app)

## ✨ Features

*   **Company Management:** Add, edit, and delete company profiles, including website URLs, job post links, technologies used, and recruiter contact details.
*   **Application Tracking:** Log new job applications, update their status (Applied, Interviewing, Offer, etc.), record salary expectations, and add notes for each stage.
*   **Reference Management:** Keep a list of professional references, their contact information, relationship, associated company, and any relevant notes.
*   **Dashboard Overview:** Get a quick glance at the total number of companies, applications, and references you're tracking.
*   **Data Persistence:** Your data is saved locally in your browser's local storage, so you don't lose it.
*   **Import/Export:**
    *   **Export:** Download your companies, applications, or references (or all data) as CSV files.
    *   **Import:** Upload data from CSV files to quickly populate or update your tracker. Sample CSV templates are provided.
*   **Responsive Design:** Access and manage your job search on desktop, tablet, or mobile.
*   **User-Friendly Interface:** Clean and intuitive UI built with Tailwind CSS for a pleasant user experience.

## 🛠️ Tech Stack

*   **Frontend:**
    *   React (v19)
    *   TypeScript
    *   React Router (for navigation)
    *   Tailwind CSS (compiled locally)
*   **Data Storage:** Browser Local Storage
*   **Build/Development:**
    *   ES Modules directly in the browser (via import maps in `index.html` for React)
    *   Node.js and npm (or yarn/pnpm) for Tailwind CSS compilation.

## 🚀 Getting Started

### Prerequisites

*   Node.js and npm (or yarn/pnpm) installed on your system. You can download Node.js from [nodejs.org](https://nodejs.org/).

### Running the Application

1.  **Install dependencies:**
    This project uses Tailwind CSS, which needs to be installed.
    ```bash
    npm install
    ```

2.  **Build Tailwind CSS:**
    Compile the Tailwind CSS styles. This will generate a `public/output.css` file.
    ```bash
    npm run build:css
    ```
    For development, you might prefer to use the watch script which automatically rebuilds the CSS when you make changes to your HTML or TSX files:
    ```bash
    npm run watch:css
    ```
    Keep this running in a separate terminal window while you develop.

3.  **Open `index.html` in your browser:**
    *   Navigate to the project folder in your file explorer.
    *   Double-click the `index.html` file, or right-click and choose "Open with" your preferred web browser.
    *   Alternatively, you can use a simple HTTP server like `live-server` (install with `npm install -g live-server` then run `live-server` in the project root).

That's it! The application should now be running in your browser with locally compiled Tailwind CSS.

**Important for Deployment (e.g., Vercel):**
Make sure to run `npm run build:css` before deploying, and commit the generated `public/output.css` file to your repository. Vercel will then serve this compiled CSS file.

## 📁 Project Structure

```
job-application-tracker/
├── public/
│   └── output.css          # Compiled Tailwind CSS (generated)
├── components/             # React components
├── hooks/
├── styles/                 
│   └── tailwind.css        # Input Tailwind CSS directives
├── App.tsx
├── constants.ts
├── index.html              # Main HTML file, entry point
├── index.tsx               # React root rendering
├── metadata.json
├── package.json            # NPM package definition and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── types.ts
```

## 💾 Data Management

*   **Local Storage:** All data (companies, applications, references) is stored in your browser's local storage.
*   **CSV Import/Export:**
    *   You can export your data into CSV files for backup.
    *   You can import data from CSV files. Sample CSV files can be downloaded from the "Import/Export" modal.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

---

Happy Job Hunting! 🎯
