## Bookstore (Next.js + Prisma + Postgres)

A t-order–inspired ordering experience with subdomain routing, authentication, and a simple admin. Built with Next.js App Router, Prisma, and Borealis Isolated Postgres on Heroku (no Docker).

### Highlights
- Modern landing page (sticky header, hero with image overlay, features, product grid)
- Subdomains: admin., order., auth. → rewrite to respective app sections
- Auth scaffolding: register, login, logout, forgot/reset password (JWT cookies)
- Prisma models: Category, Book, User, PasswordResetToken, Order, OrderItem
- Loading skeletons and empty states for a polished UX

---

## Quick start (local)
1) Install and generate Prisma client
```bash
npm install
npx prisma generate
```
2) Configure database
Create `.env` with:
```bash
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"
JWT_SECRET="replace-with-strong-secret"
```
3) Sync schema and seed demo data
```bash
npx prisma db push
npm run prisma:seed
```
4) Run
```bash
npm run dev
```
Open http://localhost:3000

---

## Environment variables
- DATABASE_URL: Postgres connection string (Borealis recommended `?sslmode=require`)
- JWT_SECRET: secret for JWT signing
- BASE_DOMAIN (optional): e.g. `example.com` for subdomain parsing in middleware
- ADMIN_SUBDOMAIN (optional, default: `admin`)
- ORDER_SUBDOMAIN (optional, default: `order`)
- AUTH_SUBDOMAIN (optional, default: `auth`)

---

## Subdomain routing
Handled by `middleware.ts` via host header. Examples:
- `admin.example.com/*` → `/admin/*`
- `order.example.com/*` → `/order/*`
- `auth.example.com/*` → `/auth/*`
Static assets and `/api` routes bypass rewrites.

---

## Authentication
API routes (JSON):
- POST `/api/auth/register` → { email, password, name? }
- POST `/api/auth/login` → { email, password } (sets HttpOnly JWT cookie)
- POST `/api/auth/logout` → clears cookie
- POST `/api/auth/forgot-password` → { email } (returns token in dev)
- POST `/api/auth/reset-password` → { token, password }

Client pages:
- `/auth/register`, `/auth/login`, `/auth/forgot`, `/auth/reset`

Helpers in `src/lib/auth.ts`:
- signToken, verifyToken, attachSessionCookie, clearSessionOnResponse, getSessionFromRequest

---

## Data model (Prisma)
- Category ↔ Book (one-to-many)
- User, PasswordResetToken
- Order, OrderItem
Note: `Book` maps to existing table `books`, `coverUrl` maps to column `image`. `categoryId` is optional for lenient schema sync on existing DBs.

---

## Seeding
Run demo seed (JS for Heroku compatibility):
```bash
npm run prisma:seed
```
Seeds category "Kinh tế" and a couple of sample books with cover images.

---

## Deploy on Heroku (no Docker)
This app is ready for Borealis Isolated Postgres.

1) Create app and add Postgres
```bash
heroku create
heroku addons:create borealis:standard-0
```
2) Configure env vars
```bash
heroku config:set DATABASE_URL="<connection-string>?sslmode=require"
heroku config:set JWT_SECRET="<strong-secret>"
# optional for subdomains
heroku config:set BASE_DOMAIN="yourdomain.com"
```
3) Deploy
```bash
git push heroku HEAD:main
```
4) Schema sync (release runs `prisma db push`, but you can re-run)
```bash
heroku run npx prisma db push
```
5) Seed (optional)
```bash
heroku run npm run prisma:seed
```

Procfile:
- `web: npm run start:heroku`
- `release: npx prisma db push`

---

## Team tasks (suggested split for 5 people)
1) Subdomains & Routing (Lead)
	- Own `middleware.ts`, env docs, and URL rewrite tests
	- Acceptance: `admin/order/auth` subdomains route correctly; `/api` unaffected

2) Auth Backend
	- Own `User`, `PasswordResetToken`, API routes, JWT cookie setup
	- Acceptance: can register/login/logout; reset flow validates/invalidates tokens

3) Orders Backend
	- Own `Order`, `OrderItem` models, `/api/orders` (create/list) and totals
	- Acceptance: submit order from items; associate with user when logged in

4) Auth Frontend
	- Own `/auth/*` pages, forms, client validation, toasts, redirect on success
	- Acceptance: smooth UX on mobile + desktop; error states handled

5) Admin & Ordering UI
	- Own `/admin` dashboard (CRUD for categories/books), `/order` flow (menu, cart, submit)
	- Acceptance: CRUD functional via APIs; order submission end-to-end

---

## Notes
- For production migrations, create a baseline migration and switch release script to `prisma migrate deploy`.
- Email sending for password reset is left as a TODO; token is returned in dev response for testing.
