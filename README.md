# My Porfolio

## Description
This is my portfolio website. It is a Next.js app, deployed on Vercel.

### Technologies
- Made with
  - Next.js,
  - Bootstrap and custom CSS,
  - React & TypeScript, React-Hook-Form.
  - reCAPTCHA
- Testing with Jest and React Testing Library.
- Database/API - Ruby on Rails API that controls Portfolio, Blog (WIP) and other data.

_Previous database config below - ran out of Vercel credits allowance:_
- Storage Vercel Postgres DB, with Prisma ORM.
- Experimented with [`serverless functions`](https://vercel.com/docs/functions/serverless-functions) e.g. simple unique visitors counter

### Hosting
Deployed on Vercel at https://www.agslambley.dev

Uses [`vercel analytics`](https://vercel.com/docs/analytics) for web analytics

### CI/CD
Uses github actions for CI:
- `pre-prod branch CI` - runs tests and builds the app and stops if there are any errors
- `main branch CI` - runs tests, builds the app.

To be added: auto-merge main into pre-prod after successful `main branch CI` checks

CD is handled by Vercel - see `vercel.json` and `.vercelignore` for config details. Also uses "Ignore Build Step" to skip building the app on Vercel for all branches accept `pre-prod` and `main`:

```bash
if
  [ "$VERCEL_GIT_COMMIT_REF" = "main" ] || [ "$VERCEL_GIT_COMMIT_REF" = "pre-prod" ];
then
  exit 1;
else
  exit 0;
fi
```
### Environments
- Preview - dynamic link generated via Vercel for each commit
- Production - https://www.agslambley.dev

### Playwright feature tests

`e2e` folder contains test files for [playwright](https://playwright.dev/) feature tests

The folder structure:
- `e2e/specs/`: feature test files
- `e2e/pages/`: files for Page Objects (POM) pattern
- `e2e/fixtures/`: test data and mocks
- `e2e/helpers/`: reusuable functions
