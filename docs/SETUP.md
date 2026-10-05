# Setup and deployment

## Isolated project

Use a new repository named `food-business-factory-operations`. Do not copy any files into the portfolio repository or reuse the portfolio's deployment configuration.

## Local development

1. Install Node 22.13+ and enable Corepack.
2. Run `pnpm install --frozen-lockfile`.
3. Run `pnpm build` to create the local Worker configuration.
4. Apply the initial D1 migration:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_left_justice.sql
```

5. Run `pnpm dev`. Use the loopback URL printed by the development server.
6. In portable local development, the starter simulates sign-in through `/signin-with-chatgpt?return_to=/`. This local mock is not included in hosted builds.

Do not reapply migrations already applied. For schema changes, update `db/schema.ts`, run `pnpm db:generate`, inspect the appended migration and apply it. Never modify migration history after hosted application.

## Hosted version

`.openai/hosting.json` identifies the existing private Sites project and declares DB and BUCKET. Sites provisions its hosted D1 database and R2 bucket. The build retains the starter's Sites/Vinext integration. Source synchronization and deployment must use the Sites workflow.

GitHub stores a source mirror. Uploading this source to GitHub does not itself provision a database, create a website or grant public access. This source repository is public at the owner's request; the live Sites workspace remains private. This application cannot be hosted with GitHub Pages because its API requires a server and durable storage.

## Tests

```sh
pnpm test
pnpm typecheck
pnpm build
```

The workflow tests use transpiled pure application logic. API tests use SQLite and a local in-memory attachment store to exercise actual route handlers without a network service. Test code does not contact the hosted user's workspace.
