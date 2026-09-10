# Repository Guidelines

## Project Structure & Module Organization

This repository contains a static landing page concept for Órbita, a creative studio. Page content lives in `dist/index.html`, with responsive styles in `dist/styles.css`. These are authored sources, so keep `dist/` tracked. `server.mjs` provides a local preview, and `.openai/hosting.json` identifies the hosted Site. No tests or framework are installed.

## Build, Test, and Development Commands

Run `node server.mjs` to preview the page at `http://127.0.0.1:3000`. Run `node --check server.mjs` to check server syntax. No dependency installation or build is required. There are no npm scripts, lint tools, or test commands. Update `README.md` and this guide if adding a toolchain.

## Coding Style & Naming Conventions

Until tooling establishes different rules, use two-space indentation for HTML, CSS, JavaScript, and JSON. Prefer descriptive names and small, focused components. Use kebab-case for static filenames and CSS classes; use PascalCase for component names if the chosen framework supports components. Prefer semantic HTML, accessible form labels, and responsive layouts. Add formatting and linting configuration with the initial application setup rather than assuming tools are already installed.

## Testing Guidelines

No testing framework or coverage threshold is established. For each page change, check mobile and desktop layouts, keyboard navigation, links, forms, and browser console errors. Add automated tests for meaningful interactive behavior when a test runner is introduced, using names such as `contact-form.test.ts` where supported. Document how to run them.

## Commit & Pull Request Guidelines

There are no commits yet, so no existing commit-message convention can be inferred. Use short, imperative messages, for example `Add responsive hero section`. Keep commits focused. Pull requests should describe the change, list verification performed, link relevant issues, and include screenshots for visual changes. Note any setup requirements or known limitations.

## Security & Configuration

Do not commit credentials, private keys, or populated local environment files. Document required configuration with placeholder values. Treat all configuration bundled into browser code as public.
