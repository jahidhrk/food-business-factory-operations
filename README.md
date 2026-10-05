# Food Business — Factory Operations Demo

A separate full-stack showcase with a public source repository and private live workspace of paperless food-manufacturing workflows. This project is independent of the owner's portfolio.

## What is implemented

- Private platform sign-in followed by nine username/password demo department accounts: Administrator, Receiving, Warehouse, Planning, Production, QC, Laboratory, Dispatch and Management.
- 18 digital form types mapped to pages 2–19 of `CCF_000653.pdf`, plus Production Order and Material Issue forms.
- Draft entry, repeated samples/observations, submission, review, return, rejection, approval, locked posted transactions, correction copies for non-stock forms and record history.
- Server-side permission checks for the selected demo profile.
- Lot inventory with receipt, issue, FG receipt and dispatch movements.
- Production batch inputs, rework links, release prerequisites, holds and customer-level traceability.
- PDF/JPG/PNG attachments in R2, downloadable CSV registers and printable records/traces.
- Master data for materials, products, suppliers, customers, equipment, locations and recipe references.
- Persistent owner-specific D1 workspace, optimistic concurrency checks and an activity trail.
- Responsive layout for desktop, tablet and mobile.

All preloaded values are **synthetic demonstration data**. The paper's handwritten historical values and signatures have not been treated as verified digital records. The source PDF is not included in this repository.

## Try the live demo

Open [the live demo](https://food-business-workflow-demo.jahid-has.chatgpt.site). Complete the private hosting sign-in, then use **admin.demo** / **Demo123!** and follow **Demo guide**.

1. Review and approve `DEMO-RECEIVING`; a 120 kg material lot appears in inventory.
2. Open the Planning draft and approve a new production batch.
3. Issue released materials from Warehouse against the batch.
4. Fill and approve its production, QC and laboratory forms.
5. Approve the packing transfer, receive finished goods, and dispatch to a demo customer.
6. Trace `FG-DEMO-001` to inspect the preloaded complete example.
7. Sign out and log in with another demo account to exercise each department's allowed actions.

## Authentication boundary

This is an owner-private **showcase**. Hosted authentication is provided by Sites. The signed-in owner can log in with the published department demo IDs and shared demo password. These showcase accounts simulate role permissions and are not production employee identities or signed electronic approvals. The API obtains the signed-in identity from the platform and isolates each owner's data by its stable user ID. Missing identity is rejected. For a real factory, replace demo profile selection with administered employee membership and validated approval separation.

## Development

Clone this repository:

```sh
git clone https://github.com/jahidhrk/food-business-factory-operations.git
cd food-business-factory-operations
```


Requirements: Node.js 22.13 or newer and Git. The checked-in pnpm lockfile is authoritative.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
```

For a normal laptop, the starter selects its portable execution profile. Run `pnpm dev` for local development. See `docs/SETUP.md` for D1 migrations and preview details. The hosted implementation targets a Cloudflare Worker with D1 (`DB`) and R2 (`BUCKET`). It is not a GitHub Pages static application.

## Project structure

| Path | Purpose |
| --- | --- |
| `lib/catalog.ts` | Source-mapped form definitions, field types and department assignments |
| `lib/engine.ts` | Workflow validation, state transitions, inventory and traceability |
| `app/workspace.tsx` | Application screens and form editor |
| `app/api/operations/route.ts` | Authenticated persistent workspace API |
| `app/api/attachments/route.ts` | Authenticated R2 file handling |
| `db/schema.ts`, `drizzle/` | D1 schema and migrations |
| `tests/` | Permission, stock, traceability and API persistence checks |
| `docs/` | Form coverage, setup, architecture and rollout notes |

## Operating limits

- Business records are stored as one versioned JSON workspace per owner for the demo. This deliberately simple storage model is not a high-volume factory database design. Production needs normalized records, indexed ledgers, operational backups and tested disaster recovery.
- Inventory units are explicit. Material issues must use the source lot's unit; no automatic conversions are assumed.
- Recorded QC pass/fail decisions control release. Numerical HACCP thresholds, test methods, sampling frequency, CCP corrections and exception policies must be reviewed and configured by the factory team. The app does not certify food safety or compliance.
- The configured release checklist is for the demonstration sausage process. Other product routings and recipe versions require configuration.
- Notes from source retention periods are displayed. No automatic deletion is scheduled.
- ERP integrations, sensor collection, physical label printing, offline synchronization and independent staff credential management are outside this demo implementation.
- CSV exports protect spreadsheet formula-leading text. Attachments are scoped to the signed-in owner's workspace.

## Verification

Run `pnpm test` and `pnpm typecheck`. The deployment build must pass before publication. Browser layout verification depends on supported preview tooling; see the handoff for verification status.

## Department demo login

After the private hosting sign-in, log in with a department user ID. All demo accounts use **Demo123!**.

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

Credentials are validated by the server to select the department role. Sign out before trying another account. Shared demo credentials are deliberately visible; they are not production employee credentials. Records remain scoped to the hosting identity.
