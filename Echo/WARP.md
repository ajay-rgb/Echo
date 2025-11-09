# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Frontend SPA built with Vite + React + React Router. Styling via Tailwind CSS (v4 plugin for Vite).
- No backend code is present in this repository. The frontend talks to an external API defined by VITE_API_URL.
- State: UI theme via ThemeContext; authenticated user via UserContext. Some view state persisted in localStorage (e.g., myTimeStamps, token).

Common commands
- Install deps: npm ci (preferred) or npm install
- Start dev server: npm run dev
- Build production bundle: npm run build
- Lint: npm run lint
- Preview built bundle: npm run preview
- Tests: No test runner/script configured in package.json

Environment and runtime
- Vite is used; env vars must be prefixed with VITE_ to be exposed to the client.
- .env example (present):
  - VITE_API_URL=https://echo-ajay-rgb.onrender.com
- Authentication: JWT token is stored in localStorage as token. Requests include Authorization: Bearer <token>.

API expectations (external service)
The UI calls the following endpoints against VITE_API_URL:
- POST /api/login → returns { token, user }
- POST /api/register → returns { user }
- GET /api/profile → returns current user
- POST /api/sessions → body { duration, task }
- GET /api/sessions → list of session objects
- GET /api/sessions/heatmap → [{ date: YYYY-MM-DD, count: ms }]
- Notes feature:
  - GET /api/notes → list notes
  - POST /api/notes → body { text }
  - DELETE /api/notes/:id

High-level architecture
- Entry: src/main.jsx mounts <App />.
- Routing: src/App.jsx defines routes under a shared Layout (/, /about, /dashboard, /community, /login). ProtectedRoute exists but is not currently wrapping any route.
- Layout shell: src/Layout.jsx composes Sidebar (left), Header (top), RightSidebar (right). The main outlet provides page content and receives timestamp helpers via Outlet context. RightSidebar is hidden on /login, /community, /about, /dashboard.
- Contexts:
  - ThemeContext (src/context/ThemeContext.jsx): light/dark toggle.
  - UserContext (src/context/userContext.jsx): fetches user on load via VITE_API_URL/api/profile if localStorage token exists; exposes { user, setUser }.
- Home page composition (src/pages/Home.jsx):
  - Timer (src/components/Timer.jsx): stopwatch using useTimer; can POST saved sessions to /api/sessions; requires logged-in user and Authorization header.
  - Progress (src/components/Progress.jsx): wraps Heatmap (src/components/Heatmap.jsx) showing per-day hours from /api/sessions/heatmap.
  - Graph (src/components/Graph.jsx): renders ProductivityChart from session aggregation.
- Notes (src/components/Notes.jsx): CRUD against /api/notes with Authorization header; clears state on logout.
- Charts: src/components/ProductivityChart.jsx uses recharts; groups session minutes by task.
- Styling: Tailwind classes in CSS/JSX; global styles in src/index.css. Tailwind integrated via @tailwindcss/vite plugin; no separate tailwind.config present (v4 style).
- Persistence:
  - localStorage keys: token (auth), myTimeStamps (array of formatted time strings from Layout helpers).

Conventions and tips specific to this repo
- All API calls must read the base URL from import.meta.env.VITE_API_URL. Avoid hardcoding service URLs in components; Notes.jsx currently uses a hardcoded URL — consider refactoring to VITE_API_URL for consistency.
- When adding routes that require auth, wrap with <ProtectedRoute> (src/components/ProtectedRoutes.jsx) to redirect unauthenticated users to /login.
- Keep Authorization headers consistent: 'Authorization': `Bearer ${token}`.

How to run a single test
- Not applicable — there is no test framework configured. If tests are added later (e.g., Vitest), document the exact single-test invocation here.

Repository layout (select highlights)
- package.json: scripts (dev, build, lint, preview). No test script.
- vite.config.js: plugins react(), @tailwindcss/vite.
- src/: React application code as described above.
- public/: static assets used by Sidebar and layout icons.
