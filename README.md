# My Porfolio

## Description

### Technologies
- Made with
  - Next.js,
  - Bootstrap,
  - React.
- Testing with Jest and React Testing Library.
- Storage Vercel Postgres DB, with Prisma ORM. (note to self - need env file with DB connection string for local dev)
  - DB schema is in `prisma/schema.prisma`
  - DB migrations are in `prisma/migrations`
### Hosting
Deployed on Vercel at https://www.agslambley.dev

### CI/CD
Uses github actions for CI:
- pre-prod branch CI - runs tests and builds the app and stops if there are any errors
- main branch CI - runs tests, builds the app.

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
