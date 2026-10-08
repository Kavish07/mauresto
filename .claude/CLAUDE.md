# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

This repo is split into two sibling projects:

- `frontend/` — Vite + React 19 SPA
- `backend/` — Spring Boot (Java 21) + Maven, REST API over PostgreSQL

## Commands

```bash
cd frontend
npm run dev       # start dev server with HMR
npm run build     # production build (output: frontend/dist/)
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

No test runner is configured yet for the frontend.

## Backend & Database

Postgres runs via Docker Compose; the Spring Boot backend runs via its Maven Wrapper for fast iteration.

```bash
docker compose up -d                  # start Postgres (http://localhost:5432), from repo root
cd backend && ./mvnw spring-boot:run   # start backend (http://localhost:8080)
cd frontend && npm run dev             # start frontend (proxies /api/* to the backend, see frontend/vite.config.js)
docker compose down                    # stop Postgres (add -v to also wipe the data volume)
```

Flyway migrations live in `backend/src/main/resources/db/migration`. Schema changes are new `V{n}__description.sql` files — never edit a migration that's already been applied.

Backend tests: `cd backend && ./mvnw test`.

# Agent Directives
Please refer to the following specific agents and capabilities when working on tasks:
- Subagents: `@agents/planner.md`

## Frontend Architecture

Standard **Vite + React 19** SPA (ES modules, JSX), rooted at `frontend/`.

- Entry: `frontend/index.html` → `frontend/src/main.jsx` renders `<App />` into `#root`
- `frontend/src/App.jsx` is the single top-level component; all new features start here
- Global styles in `frontend/src/index.css`; component-scoped styles in `frontend/src/App.css`
- Static assets served from `frontend/public/` (SVG icon sprite at `frontend/public/icons.svg`)
- Bundled assets (images, logos) imported directly into JSX from `frontend/src/assets/`
- `frontend/src/api/` holds frontend API client modules (e.g. `bookingApi.js`) — thin `fetch` wrappers, no generic HTTP client abstraction

ESLint enforces `react-hooks` and `react-refresh` rules; `frontend/dist/` is excluded.

## Backend Architecture

`backend/` is a Spring Boot + Maven project (Java 21) backing the "Book a Table" feature — REST API over a PostgreSQL database, schema managed with Flyway migrations under `backend/src/main/resources/db/migration`. Feature-grouped packages under `com.mauresto.backend` (`table/`, `booking/`), with cross-cutting `config/` and `exception/`.
