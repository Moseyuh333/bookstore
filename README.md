This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Heroku (no Docker)

This app is ready for Heroku with Borealis Isolated Postgres.

1. Create app and add Postgres:
	- heroku create
	- heroku addons:create borealis:standard-0

2. Get `DATABASE_URL` (it usually includes `sslmode=require` already). If not, set it like:
	- heroku config:set DATABASE_URL="<connection-string>?sslmode=require"

3. Push code and run migrations (release phase handles deploy):
	- git push heroku HEAD:main
	- heroku run npx prisma migrate deploy

The Procfile starts the app with `npm run start:heroku`. Build step runs `prisma generate` and `next build`.
