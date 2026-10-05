# Architecture

The GitHub Pages build is a React application with a repository-specific URL base. The UI calls the Supabase `factory-api` Edge Function, which handles all operational reads, writes and attachments. No Sites or ChatGPT identity is used by this deployment.

## Request flow

1. Browser submits a department demo ID/password to the login endpoint.
2. Backend validates the account and creates a 256-bit random session token.
3. Only its SHA-256 hash and department are stored in `factory_sessions`; the raw token goes to the browser and is retained in local storage for that device.
4. Every operational request validates that token hash and eight-hour expiry.
5. The backend sets the workflow role from the session before executing the shared engine; incoming commands cannot select a different role.
6. The shared JSON workspace is persisted with an atomic version-matched update. A simultaneous stale update returns 409.
7. Attachments are saved in a private bucket and read only through a validated backend session. Failed concurrent uploads remove the newly stored object.

## Data model and access

`factory_workspace` contains one shared demonstration plant, version and timestamp. `factory_sessions` contains session hashes, constrained departments and indexed expiry dates. Both have RLS enabled and all browser-role grants revoked. There are intentionally no browser-facing policies. Only the server's service role can access them.

The Edge Function gets its server credential from Supabase's runtime environment. The browser uses only the publishable key. CORS permits the owner's GitHub Pages origin and localhost development. CORS is not the access-control boundary; validated sessions and role checks are.

## Workflow behavior

The engine validates required fields, role permissions, units, expiration, quantities, batch QC prerequisites, nonconformance holds, stock posting and rework genealogy. Approval and stock effects are saved together in the workspace. Approved posted stock/order records are locked; appropriate records support correction copies preserving earlier history.

All nine published demo accounts share one factory workspace. Shared credentials are intended for synthetic demonstrations, not confidential factory information. The account roster/password are source-controlled for the owner's stated demo purpose. No self-registration or user-editable authorization metadata is used.

## Hosting and updates

GitHub serves prebuilt `docs/index.html` and its assets from the `main` branch `/docs` folder. Supabase runs `factory-api`; the owner must deploy its generated single-file source through the dashboard. Frontend edits require rebuilding and committing the output. Backend edits require regenerating and redeploying the function.

The legacy Sites server files are retained for reference and are not part of the static frontend dependency graph. Portfolio repositories and hosting settings are outside this project.
