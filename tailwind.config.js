/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color, #4f46e5)',
        secondary: 'var(--secondary-color, #10b981)',
        accent: 'var(--accent-color, #ec4899)',
        neutral: 'var(--neutral-color, #6b7280)',
        'base-100': 'var(--base-100-color, #ffffff)',
        'base-200': 'var(--base-200-color, #f3f4f6)',
        'base-300': 'var(--base-300-color, #e5e7eb)',
      },
    },
  },
  plugins: [],
};
