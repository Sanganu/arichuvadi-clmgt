
## Website: Arichuvadi

### Organization:
A Tamil Volunteer organization, which conducts classes and teach Tamil for next generation Tamil origin Kids. Exams are conducted in collaboration with Anna University, Chennai. The Papers are graded and certificate are awarded be Anna university.

#### Founder and Board of Directors: 
  - *Anou Manavalan*, Director, Charles Schwab
  -  *Yamini Ramesh*, Medical Coder at University of Colorado
  -  *Helen Samuel* , Special needs teacher, Cherry creek Schools
  -  *Chitra Saravanan*
 
##### Web Master :  
- *Sangeetha Kaliaperumal*


# Arichuvadi — class management

Web app used by Arichuvadi, a volunteer-run Tamil language school affiliated with Anna University in Chennai. Manages students, instructors, cohorts, and class records for the school's teaching program.

This is the actual code running in production. {{N volunteer board members}} use it weekly, and {{~N students}} log in to see their batch and assignments.

**Live demo:** {{https://arichuvadi-clmgt-1.onrender.com}}
**Demo board login:** `demo@arichuvadi.org` / `Demo@2026`

> The free render App Service tier sleeps after 20 minutes of inactivity, so the first request after a long pause can take 30–60 seconds. After that it's snappy.
> This is 

---

## What it does

- Three roles — **board member**, **instructor**, **student** — each with their own login and dashboard.
- Board creates and manages **cohorts** (a class of students under one instructor for one term). Each cohort tracks its course, exam type, exam date, enrolled students, and class records.
- Class records — what was taught, what was assigned for homework, on what date — are added by the instructor and visible to students in the cohort.
- A teacher field that can point at either a dedicated `Instructor` account or a board member who's also teaching that term. Mongoose `refPath` polymorphism keeps the schema honest.
- Search across students, cohorts, and board members from one box.

It is not a learning-management system. There's no in-app messaging, no file uploads, no grading. It's a roster + scheduling + announcement board.

---

## Why this exists

Most class-management software is built for paid programs and charges per-seat. Arichuvadi is volunteer-run and free for students. Spreadsheets weren't keeping up — board members were re-typing instructor names, cohorts were getting double-assigned, and end-of-term reports were taking days. This app replaced about six Google Sheets and one shared mailbox.

The codebase reflects that history. It started as a quick MVP, has had several rounds of patches by different volunteer contributors, and is now stable but dated. The current `production-stable` branch is `v1.0.0` — a working, deployed system. A `develop-modern` branch is in progress to modernize the stack (see roadmap).

---

## Stack

**Frontend**
React 16, Redux (classic, no toolkit), React Router 5, React-Bootstrap, axios. Routes are lazy-loaded and code-split per role.

**Backend**
Node.js 20, Express 5, Mongoose 8. Sessions are HttpOnly cookies backed by `connect-mongo` (the session store lives in the same MongoDB instance as the app data). Passwords hashed with bcrypt. Helmet, rate-limited on auth routes, CORS allowlist by env var.

**Database**
MongoDB Atlas (M0 free tier in production, local Mongo for development).

**Hosting**
Render`.

A few choices worth explaining:

- **Session cookies, not JWT.** Logging a user out should mean *gone* — destroying a session row in Mongo achieves that. Revoking a JWT requires extra infrastructure (a blocklist) that wasn't worth the complexity for this scale.
- **`refPath` polymorphism** on the `teacher` field instead of two separate fields or denormalized name strings. Trade-off: queries that fetch a batch have to specify a `populate('teacher')` step, but the model stays correct when a board member fills in for an absent instructor (which happens about once a term).
- **No JWT, no Redis, no microservices.** This is a single-process Express app talking to one Mongo cluster. Adding moving parts to a small volunteer-run system means more on-call surface area, which volunteers don't have. The current architecture handles two orders of magnitude more traffic than the school will ever see.

---

## Project layout

```
.
├── client/                React SPA (CRA)
│   ├── src/
│   │   ├── API/           Axios wrappers, one per resource
│   │   ├── components/    Shared UI (Buttons, Masterkey, ProtectedRoute)
│   │   ├── pages/         Route-level screens grouped by role/domain
│   │   ├── reduxAction/   Action creators
│   │   ├── reduxReducers/ Reducers
│   │   ├── App.js         Router + auth bootstrap
│   │   ├── index.js       Entry, Redux store, localStorage hydration
│   │   └── store.js       (not currently used — see Known issues)
│   └── package.json
├── server/
│   ├── config/            DB connection, env loader
│   ├── middleware/        requireAuth, requireRole
│   ├── models/            Mongoose schemas
│   ├── routes/            One file per domain (batch, board, student, index)
│   ├── seeds/             One-shot seeding script
│   └── server.js          Express setup, error handler
└── README.md
```

Routes are mounted in `server/server.js` and share `middleware/auth.js`. The frontend reaches them through the proxy rule in `client/staticwebapp.config.json` when deployed; in development, CRA's proxy handles it.

---

## Running it locally

You need Node 20+, Yarn 1.x, and either local Mongo or an Atlas connection string.

```bash
git clone https://github.com/Sanganu/arichuvadi-clmgt.git
cd arichuvadi-clmgt
```

Create `server/.env`:

```
MONGODB_URI=mongodb://127.0.0.1:27017/arichuvadi
APP_SECRET={{any random 32+ char string — openssl rand -hex 32}}
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
```

Then in two terminals:

```bash
# terminal 1
cd server
npm install
npm start

# terminal 2
cd client
yarn install
yarn start
```

Visit `http://localhost:3000`. The CRA dev server proxies `/api/*` to port 5000.

### Bootstrapping the first board account

Because `POST /api/board/new` is open while the collection is empty (and locked the moment one board member exists), seed the first admin with curl:

```bash
curl -X POST http://localhost:5000/api/board/new \
     -H "Content-Type: application/json" \
     -d '{
       "fname": "Demo",
       "lname": "Admin",
       "loginemail": "demo@arichuvadi.org",
       "password": "Demo@2026",
       "designation": "Board Member",
       "description": "Local development admin",
       "phone": "+11234567890"
     }'
```

After that, the endpoint requires an existing board member's session, so you can't accidentally expose an open admin-registration endpoint in production.

### Smoke test

```bash
./scripts/smoke-test.sh    # Need to be added
```

Or by hand:

```bash
curl -s http://localhost:5000/api/board/me
# expected: {"error":"Not logged in"}
```

---



---


## Testing

There are no automated tests yet — see the roadmap. For now, manual smoke testing covers the main flows. The list lives in [`docs/manual-smoke.md`](./docs/manual-smoke.md) {{or inline it here if you prefer}}:

- Board login → cohort list loads
- Create cohort → appears in list
- Open cohort → change instructor → heading updates → reload page → still updated
- Delete cohort → returns to list, cohort gone
- Student login with a seeded student → sees their batch + classes
- Logout → /api/board/me returns 401

If any of these break, **don't deploy**.

---

## Known issues

I'm keeping this section honest. It's where the codebase shows its age.

- **React 16 + class components everywhere.** This is the original 2019 style. Working but dated. Migration to React 18 + hooks is the v2 work.
- **Two sources of truth for auth state.** Both `localStorage` (via the Redux subscription in `index.js`) and the server-side session contribute to "am I logged in?". They mostly agree. If they ever disagree on refresh, the `/me` probe wins after about 100ms. This is fine in practice but isn't pretty.
- **Some commented-out blocks remain in the code.** They were left intentionally for context during the cleanup pass — anything still commented is a candidate for removal or a fix-it note for v2.
- **No automated tests.** Manual smoke list above is the safety net. v2 will introduce Vitest + Playwright.
- **Global `<button>` CSS in `Buttons.css`** still leaks onto react-bootstrap buttons in a few places. The fix is mostly cosmetic — replace the element selector with `.app-btn`. It's noted as a v2 task.
- **F1 cold starts.** First request after 20 minutes of inactivity takes 30–60 seconds. Not fixable without paying for B1.
- **`Iconbar` is not role-aware.** All roles see the same icon menu, which means students see "Student Management" labeled the same way the board does. Currently the `ProtectedRoute` role guard catches the mismatch and redirects, but the menu itself should branch on role.

---

## Roadmap

Tracked in [Issues](../../issues). The big things, in priority order:

1. **Move to React 18 + hooks + TypeScript.** Class components are 40-60% more boilerplate than the equivalent hooks. TS catches the typo-class bugs that the current codebase has caught me on twice.
2. **RTK Query (or TanStack Query) for server state.** Component state mirroring server state is responsible for a class of stale-UI bugs in v1. Declarative cache + tag-based invalidation eliminates the entire pattern.
3. **Vitest + Playwright.** Coverage target 80% on domain logic, full coverage on critical user journeys (login, cohort CRUD, instructor reassignment).
4. **CI/CD with environment promotion.** Currently auto-deploys on push. v2 will introduce a staging slot with manual promotion to prod.
5. **Application Insights** for backend tracing + error tracking.
6. **Multi-school support.** Currently single-tenant. Adding a `tenantId` to the schemas would let the app serve other volunteer schools — a few have asked.

v2 is in progress on `develop-modern`. v1 (this branch) is frozen at tag `v1.0.0` and continues to receive critical fixes only.

---

## Contributing

If you're a volunteer at Arichuvadi or another school and want to help:

- Pick an issue tagged `good-first-issue` if it's your first time. They're usually one-file changes with clear acceptance criteria.
- Run the smoke test before pushing. There's no CI gate yet; the smoke list is your friend.
- For anything touching auth or sessions, ping {{your-name}} before pushing — those are the riskiest paths in the codebase.
- PRs get reviewed within a week.

---

## License

MIT. See [`LICENSE`](./LICENSE).

---

## Credit

- Built and maintained by Sangeetha Kp. Original MVP work and ongoing requirements by Board members - Yamini, Anou, Chithra, Helen.
- Tamil curriculum and pedagogy by the Arichuvadi teaching faculty.


--- uptimerobot.com
