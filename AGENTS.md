# Repository Guidelines

## Project Structure & Module Organization

This is a Vite-powered React portfolio. Application entry points are `src/main.jsx` and `src/App.jsx`. Keep reusable UI in `src/components/`, page-level sections in `src/pages/`, and static imports (images and 3D `.glb` models) in `src/assets/`. Files served directly by Vite belong in `public/`. The `api/` directory is reserved for Vercel serverless functions; `api/sendEmail.js` is currently a placeholder. Generated output goes to `dist/` and must not be edited manually.

## Build, Test, and Development Commands

- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built bundle locally for a production check.
- `npm run lint` runs ESLint across the repository.

Run `npm run lint` and `npm run build` before handing off a UI or component change. No automated test runner is configured yet.

## Coding Style & Naming Conventions

Use ES modules and React function components. Follow the surrounding file's formatting; most source uses two-space indentation, double quotes in JSX imports, and semicolons. Name React components and component files in PascalCase (`Hero.jsx`, `CardNav.jsx`); use camelCase for functions, hooks, props, and ordinary variables. Keep a component's related stylesheet beside it when one is needed (for example, `CardNav.jsx` and `CardNav.css`). Prefer Tailwind utility classes for layout and responsive styling; reserve `src/index.css` for global styles.

ESLint checks JavaScript and JSX with React Hooks and React Refresh rules. Address all reported errors rather than suppressing them unless there is a clear project-wide reason.

## Testing Guidelines

There are currently no test files or coverage requirements. For behavior changes, validate responsive layouts in the browser and exercise animations, navigation links, and imported 3D assets. If adding a test setup, place tests next to their source or under `src/`, use descriptive names such as `Hero.test.jsx`, and document the new command here.

## Commit & Pull Request Guidelines

Recent commits are short, lowercase, and feature-focused, such as `about responsive design` and `bg color adjustments`. Continue that style with specific messages, e.g. `add projects gallery`. Keep commits scoped to one concern. Pull requests should explain the user-visible change, link any relevant issue, include screenshots or a short recording for visual changes, and confirm `npm run lint` and `npm run build` pass.

## Assets & Deployment

Keep large media optimized before adding it. Vite is configured to include `.glb` files as assets. Do not commit secrets; use deployment environment variables for credentials required by serverless API routes.
