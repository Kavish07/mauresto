# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server with HMR
npm run build     # production build (output: dist/)
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

# Agent Directives
Please refer to the following specific agents and capabilities when working on tasks:
- Subagents: `@agents/planner.md`
No test runner is configured yet.

## Architecture

This is a standard **Vite + React 19** SPA (ES modules, JSX).

- Entry: `index.html` → `src/main.jsx` renders `<App />` into `#root`
- `src/App.jsx` is the single top-level component; all new features start here
- Global styles in `src/index.css`; component-scoped styles in `src/App.css`
- Static assets served from `public/` (SVG icon sprite at `public/icons.svg`)
- Bundled assets (images, logos) imported directly into JSX from `src/assets/`

ESLint enforces `react-hooks` and `react-refresh` rules; `dist/` is excluded.
