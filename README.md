# Food Business — Factory Operations

A paperless food manufacturing **demo** with department usernames/passwords, shared online records, inventory, quality approvals and batch traceability. This repository is separate from the owner's portfolio.

## Finish hosting

The application is prepared for **GitHub Pages + Supabase Free**. No ChatGPT account or sign-in is needed by app users.

**Follow [the setup guide](docs/SUPABASE_SETUP.md):** run the SQL setup in Supabase, deploy the single-file `factory-api` Edge Function, then enable GitHub Pages on `main` → `/docs`.

The production frontend is already included in `docs`. The expected website is `https://jahidhrk.github.io/food-business-factory-operations/`; publication must be enabled in the repository's Pages settings first.

## Demo accounts

Password for every department: **`Demo123!`**.

| Department | User ID |
| --- | --- |
| Administrator | `admin.demo` |
| Receiving | `receiving.demo` |
| Warehouse | `warehouse.demo` |
| Planning | `planning.demo` |
| Production | `production.demo` |
| Quality Control | `qc.demo` |
| Laboratory | `laboratory.demo` |
| Dispatch | `dispatch.demo` |
| Management | `management.demo` |

These are deliberately public showcase credentials. All departments share one factory workspace. Server-issued sessions last eight hours and are revoked on sign-out. Roles are derived on the server from the logged-in account; management is read-only.

## What is included

- 18 source-mapped paper form types plus Production Order and Material Issue, with 502 form field definitions.
- Receiving, warehouse, planning, production, quality, laboratory, finished-goods and dispatch workflows.
- Drafts, repeated rows, submission, approval, return, rejection, correction copies and record history.
- Stock receipts, issues, finished-goods receipt and customer dispatch with quantity and expiry checks.
- Production batch inputs, rework genealogy, QC holds and release prerequisites.
- PDF/JPG/PNG attachments, CSV exports, printing, master data and an audit trail.
- Supabase database persistence and version checks that prevent concurrent saves overwriting one another.
- Responsive interface and login directly from the website.

Historical handwritten values and signatures have not been imported as verified records. All sample values are synthetic. The original source PDF is not in this public repository. Retention notes are documented without automatic deletion.

## Local development

Node.js 22.13+ and Corepack are required. Use the committed pnpm lockfile.

```sh
git clone https://github.com/jahidhrk/food-business-factory-operations.git
cd food-business-factory-operations
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The configured Supabase backend must be deployed for online operations. Its publishable URL/key are in `web/config.ts`; server credentials never enter the frontend. Local development is allowed on localhost/127.0.0.1 port 5173.

```sh
pnpm test
pnpm typecheck
pnpm build
pnpm build:backend
```

`pnpm build` outputs `pages-dist`. To update branch-hosted Pages, copy that output to `docs`, preserve the Markdown guides, and commit. `pnpm build:backend` regenerates the single-file dashboard deployment from the source engine and handler.

## Source map

| File | Purpose |
| --- | --- |
| `app/workspace.tsx` | Department UI, forms and reports |
| `web/main.tsx` | Static React entry |
| `web/client.ts` | Supabase function transport and session handling |
| `web/config.ts` | Public project configuration |
| `lib/catalog.ts` | Form definitions and department assignments |
| `lib/engine.ts` | Server workflow and inventory validation |
| `supabase/setup.sql` | Database tables, grants and private attachment bucket |
| `supabase/handler.ts` | Server session, workflow and attachment endpoints |
| `supabase/functions/factory-api/index.ts` | Generated single-file function to deploy |
| `docs/FORM_COVERAGE.md` | Complete source-to-field mapping |
| `docs/SUPABASE_SETUP.md` | Dashboard setup and verification instructions |

The older Sites/Vinext server routes remain as an implementation reference; they are not used by the GitHub Pages build. `dev:sites`, `build:sites` and `start:sites` are legacy development commands.

## Verification and limits

37 automated tests cover workflows, role validation, session expiry/revocation, shared saves, optimistic concurrency and attachments. The frontend build and TypeScript checks pass locally. Live database and browser verification still require the owner to finish the dashboard deployment steps.

This is a showcase, not a validated factory production system. Shared published passwords and role-based demo actors are not independent employee identities or legally signed approvals. Free hosting quotas apply; Supabase may pause inactive free projects.
