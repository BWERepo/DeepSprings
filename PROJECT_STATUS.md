# Deep Springs Discount Fabrics — Project Status

Last updated: 2026-07-15 (end of third session on this project, same day as the first
two). This session added a `/BWEDeepSpringsCheckpoint` skill for future sessions and
confirmed session 2's checkpoint had actually completed despite an interrupted
background-task notification — no code or content changes to the site itself.
Everything described below is committed and pushed as of this doc's own commit (check
`git log` for anything newer if picking this up cold). The live site is currently **not
reachable over HTTPS** due to a Hostinger-side SSL provisioning issue — see "Known
follow-ups" below; this is not a bug in the code or deploy.

## What this is

A marketing site for Deep Springs Discount Fabrics, a real quilting/crafting fabric shop
in Dandridge, TN (786 Haynes Road). It's a from-scratch **Next.js 16.2.10 (App Router)**
site, statically exported (`output: "export"`) and deployed as plain HTML/CSS/JS to
Hostinger shared hosting over FTP — there is no Node.js server at runtime, everything is
pre-rendered at build time.

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
- **Live site**: `https://deepsprings.businesswebexpress.com` (a subdomain under the
  `businesswebexpress.com` Hostinger account, but on its **own separate FTP
  account/hosting slot** — see the SSL gotcha below).
- **Deploy**: `npm run build` (runs `next build` then
  `node scripts/fix-static-images.mjs`, see gotcha below) produces `out/`, then
  `bash deploy/ftp-deploy.sh` uploads `out/`'s contents over FTPS via `curl`.
  - Credentials live in `deploy/.ftp-credentials` (gitignored — copy
    `deploy/.ftp-credentials.example` and fill in the real password to reproduce).
  - **Gotcha discovered this session**: `FTP_HOST` must be the server's actual IP
    (from hPanel → Hosting → Overview) — NOT the domain name. The domain
    `businesswebexpress.com`'s DNS points at whichever Hostinger account owns *that*
    domain, not necessarily the server actually hosting this FTP account, so
    `ftp://businesswebexpress.com` or `ftp://ftp.businesswebexpress.com` both
    fail/misconnect. The FTP account's home directory is already scoped to this site's
    `public_html/deepsprings.businesswebexpress.com` folder, so uploads land at the site
    root with no extra path needed. The actual host/username/password are in
    `deploy/.ftp-credentials` (gitignored, not in this doc since it's committed to a
    public repo).
  - A leftover `default.php` placeholder file (pre-dating this project) still sits on
    the server root. It's harmless (Apache serves `index.html` first) but was never
    deleted — the user was asked and declined to have it auto-removed via an
    unrequested destructive action; it's still there.

## Tech stack

- Next.js 16.2.10 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4
  (`@theme inline` in `src/app/globals.css` — all colors/fonts as CSS custom properties,
  not a `tailwind.config.js`).
- Fonts: Fraunces (display/serif headings) + Inter (body), via `next/font/google`.
- `sharp` (already a transitive Next.js dependency) was used ad hoc from the command
  line this session to compress a 3MB customer-provided PNG down to a 336KB JPEG — not
  wired into any build step, just a one-off optimization.

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

- **HTTPS is currently broken on the live site** — this is Hostinger-side, not a code or
  deploy issue. `curl`/`openssl s_client` against
  `deepsprings.businesswebexpress.com:443` shows the TLS handshake itself failing with a
  server-side `internal_error` alert (not a trust/cert-validity problem — the handshake
  never completes), even though hPanel reportedly shows SSL as installed for the
  subdomain, and even plain `http://` gets force-redirected to the broken `https://` by
  Hostinger's edge/CDN layer, so there's no way to view the live site in a browser right
  now. Needs the user to re-issue/reinstall the cert in hPanel or open a Hostinger
  support ticket. The deploy itself is verified correct independently (see item 4 above)
  — once SSL is fixed, the site should just work with no further changes needed.
- The homepage's "Contact us" and "Join the list" forms are **static HTML only** — no
  submission handler, no email service wired up. They render but don't actually send
  anything anywhere yet.
- Only 1 of the 7 gallery photos (the front door) is a real photo of this shop; the
  other 6 are carried over from the Lovable reference site and aren't guaranteed to
  depict the actual space.
- The leftover `default.php` on the server root (pre-dating this project) was never
  cleaned up — see the deploy section above.
- No automated tests exist for this project.
