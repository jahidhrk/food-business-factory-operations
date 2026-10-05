# Finish the free GitHub Pages + Supabase deployment

This guide is for the separate `jahidhrk/food-business-factory-operations` repository. Do not change the portfolio repository.

## 1. Create the database and attachment bucket

1. Open Supabase project `vubscbfssrxryvshqamp`.
2. Open **SQL Editor → New query**.
3. Open `supabase/setup.sql` in this GitHub repository, click **Raw**, and copy the entire file.
4. Paste into SQL Editor and click **Run**.
5. Confirm both `factory_workspace` and `factory_sessions` show `rowsecurity = true` in the result.

The SQL does not delete existing records. The two tables block browser access; the backend alone can update them. A private `factory-attachments` bucket allows PDF/JPG/PNG files up to 8 MB. Sample operational records initialize on the first successful department login.

## 2. Deploy the backend function

1. In Supabase, open **Edge Functions**.
2. Choose **Deploy a new function → Via Editor** (or the dashboard editor option).
3. Name the function exactly **`factory-api`**.
4. Open `supabase/functions/factory-api/index.ts` in this repository and click **Raw**.
5. Copy the **entire file**. Replace the editor's example `index.ts` with it.
6. Click **Deploy function**.
7. Open that function's settings. Set **Verify JWT / Enforce JWT verification** to **OFF** and save.

This function uses its own opaque department sessions, not Supabase Auth JWTs. The function validates a server-stored session before operational reads, writes and attachment downloads. Turning off the gateway JWT check is necessary for these demo sessions; it does not make the database tables public.

No secret API key belongs in GitHub or the browser. Supabase supplies the backend's server credentials through the function environment. The browser configuration contains only your publishable key.

## 3. Enable this repository's GitHub Pages

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Choose branch **`main`**, folder **`/docs`**.
4. Click **Save** and wait for GitHub's deployment to complete.
5. Open the website link shown by GitHub Pages.

The expected project URL is `https://jahidhrk.github.io/food-business-factory-operations/`. It is not live until GitHub Pages confirms publication. The `docs` folder already includes the production build, so you do not need to install packages or run commands.

Do not change your account's existing portfolio Pages settings or add a custom domain to this project.

## 4. Verify the working application

1. Open the GitHub Pages app. There should be no ChatGPT sign-in.
2. Sign in with **admin.demo / Demo123!**.
3. In Master data, edit a sample description and save.
4. Sign out; sign in as **qc.demo / Demo123!**. Confirm the saved description is still visible.
5. Confirm **management.demo** can view records but cannot edit master data.
6. Upload a small PDF to a draft as an authorized department; download it again.

All nine IDs and the demo password appear on the login page. All users share the same demo factory. Use synthetic showcase information only: the demo password is intentionally published.

## If something does not work

- **Failed to fetch:** check the function is named `factory-api` and is deployed.
- **Invalid JWT / 401 before login:** turn off the function's gateway JWT verification as explained above.
- **Database or storage is not ready:** run the complete `supabase/setup.sql` in the correct project; inspect Edge Function logs.
- **Backend configuration is incomplete:** check Supabase's default function environment variables exist. Do not copy server keys into the frontend.
- **404 GitHub website:** verify Pages uses `main` and `/docs`; check the Pages deployment status.
- **Another department saved first:** refresh and retry. This prevents overwriting someone else's work.
- **Supabase project paused:** restore it from the Supabase dashboard, then retry.

Send the exact error text or a screenshot if a step fails. Do not include secret keys or passwords in diagnostic screenshots.

## Updating the app later

Source changes need a new frontend build before they appear online. Run `pnpm build`, then copy the contents of `pages-dist` into `docs` and commit them. Preserve Markdown documentation. Backend source changes require `pnpm build:backend` followed by redeploying the generated `index.ts`.

