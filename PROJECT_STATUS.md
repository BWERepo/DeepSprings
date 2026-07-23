# Deep Springs Discount Fabrics — Project Status

Last updated: 2026-07-23 (end of sixth session on this project, all same day). The
headline event across sessions 4–6 was **moving the live site off Hostinger entirely
and onto Cloudflare Workers** — the HTTPS issue that blocked Hostinger for over a week
is gone; the site is now reachable at `https://deepsprings.businesswebexpress.com` with
working TLS. Session 6 itself was just a routine version-bump checkpoint (`0.1.3` →
`0.1.4`), no code changes. Everything described below is committed and pushed as of
commit `bf26ff4` (check `git log` for anything newer if picking this up cold).

## What this is

A marketing site for Deep Springs Discount Fabrics, a real quilting/crafting fabric shop
in Dandridge, TN (786 Haynes Road). It's a from-scratch **Next.js 16.2.10 (App Router)**
site, statically exported (`output: "export"`) and deployed as plain HTML/CSS/JS to
**Cloudflare Workers (static assets)** — there is no Node.js server at runtime,
everything is pre-rendered at build time and served directly by Cloudflare's edge.

**Important:** `AGENTS.md` in this repo flags that this Next.js version has breaking
changes from what a model's training data would assume — check
`node_modules/next/dist/docs/` before assuming standard Next.js behavior if something
looks off.

The content and design were reverse-engineered from a reference site the user pointed
at: `https://deepsprings-revive.lovable.app/` (a Lovable-built prototype). All copy, the
Fraunces/Inter font pairing, and the warm cream/terracotta color palette were extracted
from that site's rendered DOM/CSS (see the `oklch(...)` values in
`src/app/globals.css` — those are the reference site's actual `:root` custom properties,
copied over, not invented).

## Repo & deploy

- **GitHub**: `https://github.com/BWERepo/DeepSprings` (public, org `BWERepo` — same org
  as the other sibling sites: BWE, ETCCCarShow, HDBS, ETCCSAM). Branch: `main`, no other
  branches — there is no staging/production split, no version-bump-on-build convention,
  and no test suite in this project (unlike CarShow/SAM/HDBS — don't assume those
  patterns apply here).
  - The repo already existed with two old commits ("first commit", "Add files via
    upload") containing only the untouched `create-next-app` scaffold — unrelated to
    this session's work. This session's local history was merged onto it with
    `git merge origin/main --allow-unrelated-histories -X ours` (favoring local content
    on any conflict) rather than a force-push, so that stale scaffold history is still
    reachable in the repo, just superseded.
- **Live site**: `https://deepsprings.businesswebexpress.com`, served by a Cloudflare
  Worker named `deepsprings` (see `wrangler.jsonc`), attached as a **custom domain**
  route. The `businesswebexpress.com` zone is already on Cloudflare nameservers
  (`arturo.ns.cloudflare.com` / `rayne.ns.cloudflare.com`), so no DNS/nameserver changes
  were needed — `wrangler deploy` handled the DNS record and TLS certificate
  automatically when the custom domain route was first attached, transparently
  replacing the old Hostinger-proxied DNS record for this subdomain.
- **Deploy**: `npm run deploy` (= `npm run build && wrangler deploy`). Requires
  `wrangler` to be authenticated (`npx wrangler whoami` / `npx wrangler login`) against
  the `Info@businesswebexpress.com` Cloudflare account — that login is a local machine
  credential (`C:\Users\Admin\AppData\Roaming\xdg.config\.wrangler\config\default.toml`),
  not something stored in this repo.
  - `wrangler.jsonc`: `assets.directory` points at `./out`, with
    `not_found_handling: "404-page"` (serves the real `404.html` Next generated) and
    `html_handling: "auto-trailing-slash"` (matches `next.config.ts`'s
    `trailingSlash: true` — `/about` 307-redirects to `/about/`, which 200s).
  - No bindings (KV/D1/R2/etc.) — this is a pure static-assets Worker, no Worker script.
- **Hostinger is fully removed from this project as of session 5** (per explicit user
  decision — first "replace Hostinger entirely" over "keep both in parallel" in session
  4, then an explicit follow-up request to delete the dead code entirely rather than
  keep it around deprecated). `deploy/ftp-deploy.sh`, `deploy/.ftp-credentials`, and
  `deploy/.ftp-credentials.example` were deleted outright (the now-empty `deploy/`
  directory is gone too) — there is no FTP fallback path anymore. If Hostinger hosting
  is ever needed again, it would need to be rebuilt from scratch (or recovered from git
  history prior to the session 5 deletion commit) — see session 1's write-up below for
  the FTP-host gotcha and other Hostinger-specific details, kept there as historical
  record only, not as a live procedure.
  - The corresponding "always deploy to Hostinger" standing preference in Claude's
    memory
    (`C:\Users\Admin\.claude\projects\Z--Backup-Websites-DeepSprings\memory\feedback_always_deploy.md`)
    was updated in session 4 to point at `npm run deploy` (Cloudflare) instead.
  - **HTTPS is no longer an open issue** — the Hostinger-side SSL/TLS handshake failure
    that blocked the site for over a week (sessions 1–3) is irrelevant now that
    Cloudflare terminates TLS.

## Tech stack

- Next.js 16.2.10 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4
  (`@theme inline` in `src/app/globals.css` — all colors/fonts as CSS custom properties,
  not a `tailwind.config.js`).
- Fonts: Fraunces (display/serif headings) + Inter (body), via `next/font/google`.
- `sharp` (already a transitive Next.js dependency) was used ad hoc from the command
  line this session to compress a 3MB customer-provided PNG down to a 336KB JPEG — not
  wired into any build step, just a one-off optimization.
- `wrangler` (devDependency, `^4.114.0`) — Cloudflare's CLI, used for `npm run deploy`.

## Session 6 (2026-07-23, sixth session, same day as sessions 4–5)

A bare `/BWEDeepSpringsCheckpoint` run — version bump and redeploy only, no code or
content changes.

1. Bumped `package.json`/`package-lock.json` version `0.1.3` → `0.1.4`.
2. Ran `npm run deploy` — succeeded, uploaded 30 changed/new assets, custom domain
   route confirmed still attached.
3. Committed (`bf26ff4`, "Checkpoint v0.1.4") and pushed to `main`.
4. Also fixed the `/BWEDeepSpringsCheckpoint` and `/BWEDeepSpringsEnd` skill files
   themselves (`C:\Users\Admin\.claude\skills\BWEDeepSpringsCheckpoint\SKILL.md`, and
   this skill) earlier in session 5 — their instructions still referenced the deleted
   Hostinger FTP script. If a future session sees a checkpoint/end skill giving
   FTP-flavored instructions again, that's a sign the skill files (or the tracked copy
   in `Z:\Backup\Websites\Claude`, a separate git repo — `BWERepo/ClaudeConfig`) have
   drifted out of sync again; re-sync via `robocopy /MIR` from
   `C:\Users\Admin\.claude\skills` as was done in session 3.
5. **Not part of this repo, but worth knowing if picking this project up cold**: a
   global sound-notification hook (two `[console]::Beep(...)` calls via PowerShell, on
   the `Notification` and `Stop` Claude Code events) was added to
   `C:\Users\Admin\.claude\settings.json` earlier the same day, at the user's request.
   It's a machine-wide preference, not scoped to this project, and has nothing to do
   with the site's code — mentioned here only for continuity in case its presence (or
   absence, if it doesn't survive a Claude Code update) is ever confusing.

## Session 5 (2026-07-23, fifth session, same day as session 4)

A `/BWEDeepSpringsCheckpoint` run, plus a follow-up explicit request to fully delete the
now-dead Hostinger code rather than leave it deprecated-but-present (session 4 had kept
it "for rollback reference"). No site content/design changes.

1. Bumped `package.json`/`package-lock.json` version `0.1.2` → `0.1.3`.
2. Ran `npm run deploy` (`next build` + `fix-static-images.mjs` + `wrangler deploy`) —
   succeeded, uploaded 31 changed/new assets, custom domain route confirmed still
   attached.
3. **Deleted `deploy/ftp-deploy.sh`, `deploy/.ftp-credentials`, and
   `deploy/.ftp-credentials.example` outright** (the `deploy/` directory no longer
   exists) — per an explicit mid-session request to eliminate all Hostinger
   references/code from the project, not just mark them deprecated. Also removed the
   now-dangling `deploy/.ftp-credentials` line from `.gitignore`.
   - **Explicitly scoped down**: the user was asked whether to also scrub Hostinger
     mentions from this doc's session 1–4 history, and chose to leave that historical
     narrative intact — only the operational code/config was deleted. So "Hostinger"
     still appears throughout sessions 1–4 below and in the "Repo & deploy" section
     above; that's intentional, not an oversight, and shouldn't be "cleaned up" further
     without asking again.

## Session 4 (2026-07-23, fourth session)

**Moved the live site from Hostinger to Cloudflare Workers**, at the user's explicit
request (they wanted Cloudflare specifically, at the same hostname). No changes to the
site's actual content/design this session — purely a hosting migration.

1. Confirmed `businesswebexpress.com` was already on Cloudflare nameservers (so no
   registrar/nameserver changes were needed) and that `wrangler` was already
   authenticated locally against the right account (`Info@businesswebexpress.com`).
2. Added `wrangler` as a devDependency and created `wrangler.jsonc` — a static-assets-only
   Worker (`assets.directory: "./out"`, no Worker script, no bindings) with a
   `custom_domain: true` route for `deepsprings.businesswebexpress.com`. Config values
   (`not_found_handling`, `html_handling`) were pulled from current Cloudflare docs via
   `WebFetch` rather than assumed, per the `wrangler` skill's retrieval-first guidance —
   worth re-checking docs again if these fields ever look wrong, since this is a fast-
   moving area of the platform.
3. **Ran `wrangler deploy` and it worked on the first attempt**, including attaching the
   custom domain — despite the docs warning that Cloudflare won't attach a custom domain
   to "a hostname with an existing CNAME DNS record." The existing record was the
   Hostinger-proxied one from sessions 1–3; `wrangler deploy` silently replaced it rather
   than erroring. If a future session sees a custom-domain-attach failure for a
   hostname with a pre-existing record, that's the known failure mode to investigate —
   it just happened not to bite this time.
4. **Verified thoroughly, not just "it loaded":** `curl` checks confirmed HTTPS actually
   works now (a real fix, not a workaround, for the session 1–3 SSL problem), that
   `/about` (no trailing slash) 307-redirects to `/about/` which 200s (matching
   `trailingSlash: true`), and that a nonexistent path correctly 404s. Also loaded the
   live site in the Browser pane and confirmed real rendered content with zero console
   errors — not just a status code check.
5. **Retired the Hostinger FTP pipeline** per the user's explicit choice ("replace
   entirely" over "keep both in parallel"): added a `npm run deploy` script
   (`next build/fix-static-images + wrangler deploy`), marked
   `deploy/ftp-deploy.sh`'s header as deprecated (kept for rollback reference, not
   deleted), and updated the "always deploy" standing preference in Claude's memory to
   point at Cloudflare instead of Hostinger.
6. Added `.wrangler/` and `.dev.vars*` to `.gitignore` (wrangler's local build
   cache/secrets — not relevant to this static-assets-only setup today, but standard
   hygiene if bindings/secrets are ever added later).

## Session 3 (2026-07-15, third session, same day as sessions 1–2)

No code or content changes to the site this session — purely tooling/process work
around how future sessions checkpoint and deploy this project.

1. **Created a `/BWEDeepSpringsCheckpoint` skill**
   (`C:\Users\Admin\.claude\skills\BWEDeepSpringsCheckpoint\SKILL.md`) — bundles version
   bump + `npm run build` + `bash deploy/ftp-deploy.sh` + commit + push into one command,
   matching the pattern of sibling projects' checkpoint skills but **without** a
   test-suite gate (this project has no automated tests, unlike CarShow/SAM/HDBS — don't
   add one to the skill without the user asking for actual test infrastructure first).
   This file lives outside this repo, in the global Claude Code skills directory.
2. **Discovered and fixed skill-list staleness**: the user's Claude Code client's
   slash-command picker was showing stale entries (e.g. `BWECheckpoint`, `BWETest`) that
   no longer exist anywhere on disk, and wasn't showing newly-created DeepSprings skills
   even after an app restart. Root cause turned out to be two-fold:
   - `Z:\Backup\Websites\Claude` is a separate git repo (`BWERepo/ClaudeConfig`) that's
     the version-controlled source of truth for all shared skills, but it had drifted
     significantly out of sync with the live `C:\Users\Admin\.claude\skills\` runtime
     folder (renames, deletions, and ~13 untracked new skills across multiple projects,
     none of which originated in this session). Fixed by mirroring
     `C:\Users\Admin\.claude\skills\` onto that repo's `.claude/skills/` via
     `robocopy /MIR`, then committing and pushing (commit `34a1a7e` in that other repo —
     not this one). This is a **one-time backlog sync**, not something that needs
     repeating routinely; future skill edits should be made in both places or synced
     promptly to avoid drifting again.
   - Even after that sync, the picker UI still didn't show the DeepSprings skills after
     a restart — turned out to need a **full app quit-and-reopen**, not just a window
     reload/restart, to actually re-scan the skills directory. Once that happened,
     `/BWEDeepSpringsCheckpoint` worked correctly (confirmed live, see next item).
3. **Confirmed session 2's checkpoint had already fully completed.** A background-task
   notification arrived mid-session reporting an interrupted/stopped shell command from
   the *previous* session with no completion record, which raised the question of
   whether the version-0.1.2 checkpoint (commit `fc40c8c`) had actually finished. Checked
   directly rather than assuming either way: `git status` was clean, `fc40c8c` and
   `9356d13` were both already on `origin/main`, and — most importantly — the live server
   was re-verified via FTP download-and-diff against the local `out/` build, confirming
   byte-for-byte that v0.1.2 really is what's deployed. **No further action was needed**;
   this was a verification step, not a fix.
4. HTTPS was not re-checked this session — assume it's still broken (see "Known
   follow-ups") until someone verifies otherwise in a browser.

## Session 2 (2026-07-15, second session, same day as session 1)

This was a bare version-bump-and-redeploy checkpoint — no code or content changes were
made to the site. Started from a clean working tree (session 1's work was already
committed and pushed).

1. Bumped `package.json`/`package-lock.json` version `0.1.1` → `0.1.2`.
2. Ran `npm run build` (succeeds cleanly, including the `fix-static-images.mjs`
   postbuild step from session 1) then `bash deploy/ftp-deploy.sh` — deploy succeeded,
   final FTP listing showed all expected files uploaded.
3. Committed (`fc40c8c`, "Bump version to 0.1.2 and redeploy") and pushed to `main`.
4. A `/doctor` health-check was also run this session against the global Claude Code
   setup (not this repo) — it proposed disabling an unused `ui-ux-pro-max` plugin,
   setting auto permission mode as default, and running `claude update`. The user
   interrupted before any of those were applied, so **none of those changes are live**;
   they're unrelated to this project and don't need to be resumed as part of this repo's
   work.
5. HTTPS was not re-checked this session — assume it's still broken (see "Known
   follow-ups") until someone verifies otherwise in a browser.

## Session 1 (2026-07-15, first session)

1. **Built the entire site from scratch** against the `deepsprings-revive.lovable.app`
   reference: `src/app/page.tsx` (Home), `src/app/about/page.tsx`, `src/app/sales/page.tsx`,
   `src/app/reviews/page.tsx`, shared `Header`/`Footer` components. All copy was
   extracted verbatim from the reference site's rendered text.
2. **Configured static export** (`next.config.ts`: `output: "export"`,
   `trailingSlash: true` so routes land as `about/index.html` not `about.html`,
   `images.unoptimized: true` since there's no server to run Next's image optimizer).
3. **Set up the FTP deploy pipeline** (`deploy/ftp-deploy.sh`, modeled on
   `../CarShow/App/deploy/ftp-deploy.sh`'s credential-file pattern) and worked through
   the FTP-host gotcha described above via trial and error with the user.
4. **Verified the deploy without working HTTPS**: since the site's SSL cert isn't live
   yet (see follow-ups), correctness was confirmed two other ways — downloading the
   actual uploaded files back from the server via FTP and diffing them byte-for-byte
   against the local `out/` build (exact match), and serving the same static output
   locally (`python -m http.server`) and loading it in a browser.
5. **Added a keyless Google Maps embed** (`src/components/GoogleMap.tsx`, plain
   `google.com/maps?output=embed` iframe, no API key/billing needed) on the Home and
   About pages, centered on 786 Haynes Road.
6. **Added a photo gallery with lightbox** (`src/components/Gallery.tsx`) in a new
   "Inside the Shop" section on the homepage — 7 photos, click-to-open lightbox with
   keyboard nav (←/→/Esc), click-outside-to-close, body-scroll lock while open. One of
   the 7 photos is a **real photo of the actual shop** the user provided
   (`Images/FrontDoor.png`, 3MB) — compressed via `sharp` to `public/images/shop-front-door.jpg`
   (336KB). The raw original lives in `Images/` at the repo root, which is
   **gitignored** (not committed) — only the optimized copy in `public/images/` is
   tracked. The other 6 gallery photos are stock-style images carried over from the
   Lovable reference site, not real photos of this specific shop.
7. **Motion/polish pass**: `src/components/Reveal.tsx` (IntersectionObserver-based
   scroll-reveal, applied across every major section on all 4 pages), a sticky header
   that shrinks and gains a blur/shadow on scroll (`src/components/Header.tsx`),
   hover-zoom on all photos, lift effects on buttons/cards.
8. **One signature detail, used sparingly** (per explicit user framing — not "uniform
   polish everywhere"): `src/components/QuoteMark.tsx`, an oversized translucent
   (15% opacity) Fraunces quotation mark, applied to exactly two places — the homepage's
   "Reviews" teaser pull-quote and the Reviews page's big featured testimonial. Not
   applied to the individual review-card grid.
9. **SEO/metadata pass**: `metadataBase` + Open Graph/Twitter defaults in
   `src/app/layout.tsx`; per-page `description`/`openGraph` metadata on About/Sales/
   Reviews; branded favicon/apple-icon/OG-image generated at build time via `next/og`
   (`src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, plus one
   `opengraph-image.tsx` per route for About/Sales/Reviews, sharing a template in
   `src/lib/og.tsx`); `sitemap.ts` and `robots.ts`.
   - **Real bug found and fixed**: Next's `icon.tsx`/`opengraph-image.tsx` file
     convention generates *extensionless* routes (`/icon`, `/opengraph-image`) referenced
     with a query-string hash. Next's own server sets the correct `Content-Type` header
     for these at request time, but a plain static host (this Hostinger/Apache setup)
     infers `Content-Type` from the file extension — an extensionless file serves as
     `application/octet-stream`, so browsers/link-preview crawlers wouldn't render it as
     an image at all. Fixed with a new post-build script,
     `scripts/fix-static-images.mjs`, wired into `npm run build`
     (`next build && node scripts/fix-static-images.mjs`) — it renames the generated
     files to add `.png` and rewrites the matching `href`/`content` attributes in every
     exported HTML file.
   - Also needed `export const dynamic = "force-static";` on every one of these
     generated-image files plus `sitemap.ts`/`robots.ts` — without it, `next build`
     fails outright under `output: "export"`.
10. **Footer**: added `v{package.json version} · {build date}` on one line and
    "Website by Business Web Express · businesswebexpress.com" (linked) on the next, per
    explicit request. The date is baked in at build time (`new Date()` at module scope
    in `src/components/Footer.tsx`), so it reflects whenever the site was last built,
    not a live clock.
11. **Git + deploy checkpoint**: bumped `package.json`/`package-lock.json` version
    `0.1.0` → `0.1.1`, initialized git locally (this directory had never been a git repo
    before this session), connected it to the pre-existing `BWERepo/DeepSprings` GitHub
    repo, merged non-destructively as described above, pushed, then ran
    `npm run build && bash deploy/ftp-deploy.sh` to deploy.
12. **Standing preference saved to global Claude memory** (not part of this repo): the
    user asked to always deploy after every change going forward, without waiting to be
    asked — saved at
    `C:\Users\Admin\.claude\projects\Z--Backup-Websites-DeepSprings\memory\feedback_always_deploy.md`.

## Known follow-ups

- ~~HTTPS broken on the live site~~ **Resolved in session 4** by moving hosting to
  Cloudflare Workers — TLS is now handled automatically by Cloudflare, no code change
  was needed. (Historical context, no longer actionable: this was a Hostinger-side TLS
  handshake failure, `internal_error` alert, unrelated to this project's code or the
  FTP deploy pipeline, which was verified correct independently at the time.)
- The homepage's "Contact us" and "Join the list" forms are **static HTML only** — no
  submission handler, no email service wired up. They render but don't actually send
  anything anywhere yet.
- Only 1 of the 7 gallery photos (the front door) is a real photo of this shop; the
  other 6 are carried over from the Lovable reference site and aren't guaranteed to
  depict the actual space.
- The leftover `default.php` on the Hostinger server root (pre-dating this project) was
  never cleaned up — now moot since the domain no longer points there, but the file
  itself was never deleted if anyone goes looking.
- No automated tests exist for this project.
- The Cloudflare deploy (`npm run deploy`) depends on a **local `wrangler` OAuth
  login** on this machine — it isn't portable to CI or another machine without running
  `npx wrangler login` there first. Not an issue for solo/manual deploys, but worth
  knowing if this project ever needs automated deploys.
