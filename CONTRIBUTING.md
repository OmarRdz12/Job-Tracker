
# Contributing to Job Application Tracker

First off, thank you for considering contributing to the Job Application Tracker! Your help is appreciated. This project is open to improvements and new features that can make it even better for users managing their job search.

Please take a moment to review these guidelines to make the contribution process easy and effective for everyone involved.

## 💬 How to Contribute

We welcome contributions in various forms:

*   **🐛 Reporting Bugs:** If you find a bug, please open an issue in the project's issue tracker (if one is set up, otherwise communicate through the agreed channel).
    *   Describe the bug clearly, including steps to reproduce it.
    *   Mention your browser and operating system.
    *   Include screenshots or GIFs if they help illustrate the problem.
*   **💡 Suggesting Enhancements:** If you have an idea for a new feature or an improvement to an existing one, feel free to open an issue to discuss it.
    *   Provide a clear and detailed explanation of the feature.
    *   Explain why this enhancement would be useful.
*   **📝 Code Contributions:** If you'd like to contribute code, please follow the steps below.

## 💻 Code Contribution Workflow

1.  **Fork the Repository (if applicable):**
    If the project is hosted on a platform like GitHub, fork the repository to your own account.

2.  **Clone your fork (or the main repository if working directly):**
    ```bash
    git clone https://your-fork-url/Job-Tracker.git
    cd Job-Tracker
    ```

3.  **Create a New Branch:**
    Create a descriptive branch name for your feature or bugfix.
    ```bash
    git checkout -b feature/your-awesome-feature
    # or
    git checkout -b bugfix/fix-that-annoying-bug
    ```

4.  **Make Your Changes:**
    *   Write clean, readable, and well-commented code.
    *   Follow the existing code style and patterns.
    *   Ensure your changes are TypeScript-compliant.
    *   Update or add type definitions in `types.ts` if necessary.
    *   If adding new UI components, try to make them reusable and place them in the appropriate `components/ui/` or feature-specific directory.

5.  **Test Your Changes:**
    *   Thoroughly test your changes locally by opening `index.html` in your browser.
    *   Ensure existing functionality is not broken.
    *   Test across different screen sizes if your changes affect responsiveness.

6.  **Commit Your Changes:**
    Write clear and concise commit messages. A good commit message summarizes the changes and why they were made.
    ```bash
    git add .
    git commit -m "feat: Add dark mode toggle"
    # or
    git commit -m "fix: Correctly parse CSV files with quoted commas"
    ```
    *(Consider using [Conventional Commits](https://www.conventionalcommits.org/) for commit message formatting.)*

7.  **Push to Your Branch:**
    ```bash
    git push origin feature/your-awesome-feature
    ```

8.  **Open a Pull Request (PR):**
    *   If using a platform like GitHub, navigate to the original repository and open a Pull Request from your forked branch to the main branch of the original repository.
    *   Provide a clear title and description for your PR.
    *   Reference any related issues (e.g., "Closes #123").
    *   Be prepared to discuss your changes and make adjustments based on feedback.

## ⚙️ Development Environment

As mentioned in the `README.md`, this project runs directly from `index.html` using ES Modules.

*   **No Build Step:** You don't need to run a separate build command. Simply save your `.ts` or `.tsx` files, and refresh the `index.html` page in your browser to see the changes.
*   **Dependencies:** Dependencies like React and React Router are loaded via CDN using import maps in `index.html`. There's no `package.json` or `node_modules` in the current setup.

## 🎨 Coding Style and Conventions

*   **TypeScript:** Use TypeScript for all JavaScript code. Adhere to strong typing.
*   **React:** Utilize functional components and React Hooks.
*   **Tailwind CSS:** Follow Tailwind CSS utility-first principles for styling.
*   **Readability:** Prioritize clean, readable, and well-organized code.
*   **Accessibility (A11y):** Keep accessibility in mind. Use ARIA attributes where appropriate and ensure keyboard navigability.

## 📜 Code of Conduct

While this project doesn't have a formal Code of Conduct file yet, please be respectful and considerate in all interactions. We aim to foster a positive and collaborative environment.

## ❓ Questions?

If you have any questions about contributing, feel free to open an issue or reach out through the project's primary communication channel.

Thank you for your interest in improving the Job Application Tracker!
