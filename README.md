# mauresto

A restaurant website with a real "Book a Table" feature.

- `frontend/` — React 19 + Vite SPA
- `backend/` — Spring Boot (Java 21) REST API + PostgreSQL, booking persistence for the table reservation feature

## Running locally

The Vite dev server proxies `/api/*` requests to the backend (see `frontend/vite.config.js`).

```bash
docker compose up -d                          # start Postgres
cd backend && ./mvnw spring-boot:run           # start the backend (http://localhost:8080)
cd frontend && npm install && npm run dev      # start the frontend (http://localhost:5173)
```

See `frontend/README.md` for frontend-specific notes (ESLint, Vite plugins) and `.claude/CLAUDE.md` for the full command reference.
