# YourBrand — bridal jewelry site

A static site that wraps the three Gemstarco (Gem Star) configurator iframes in
your own branding. No build step, no backend. Hosted free on Cloudflare Pages.

## Pages

| File | URL | Contents |
|------|-----|----------|
| `index.html` | `/` | Homepage — hero, three feature tiles, value row, closing CTA |
| `custom-design.html` | `/custom-design.html` | **Star Infinity** configurator (`account_id=14790`) |
| `lab-grown-diamonds.html` | `/lab-grown-diamonds.html` | **Star Lab** collection (lab-grown diamonds) |
| `natural-diamonds.html` | `/natural-diamonds.html` | **Star Lux** collection (natural / mined diamonds) |
| `about.html` | `/about.html` | Story + visit / contact details |
| `404.html` | shown for unknown URLs | Branded not-found page |
| `styles.css` | — | All styling. Rebrand via the `:root` variables at the top. |
| `nav.js` | — | Mobile menu toggle + footer year. |
| `_headers` | — | Security headers, applied automatically by Cloudflare Pages. |

The iframe `src` URLs are already filled in from the embed codes provided
(retailer `79A57062-BF3D-86E5-C87AA451F911CF8C`). The `retailer` / `account_id`
values in those URLs are what credit your account — do not remove them.

## Status of the content

Already filled in: brand name (**Sovra**), address (580 Fifth Avenue, Suite
1221, New York, NY 10036), phone `(646) 773-4637`, email `Vskjewels@gmail.com`,
`about.html` copy, and the three iframe URLs.

Still worth doing before launch:

1. **Logo** — `assets/sovra-logo.jpg` is the supplied Sovra Jewels image, used in the header and as the site icon.
2. **About copy** — `about.html` has real wording now, but review the "Our
   approach" section so it matches how you actually work (grading reports,
   warranty, resizing, returns).
3. **Colours / fonts** — the `:root` block in `styles.css` (`--gold` is set to
   Sovra's antique gold `#b8935a`; `--serif`, `--sans`, `--ivory`, `--ink`).
4. **Menu labels** — currently "Custom Design / Lab-Grown Diamonds / Natural
   Diamonds". To use the vendor brand names instead, change the link text in the
   `<nav class="site-nav">` block on every page (and the `.eyebrow` on each
   configurator page).

## Deploy to Cloudflare Pages (Git route)

1. Create a new **GitHub** repo and push this folder to it:
   ```
   cd starinfinity-site
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, and pick the repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. **Save and Deploy**. You get a `*.pages.dev` URL immediately.
5. **Custom domains** tab → add your domain. Easiest if the domain's
   nameservers are already on Cloudflare (free DNS + SSL). Follow the prompts.
6. From now on, every `git push` to `main` redeploys automatically. Pushes to
   other branches get their own preview URL.

## Local preview

```
cd starinfinity-site
python -m http.server 8080
```
Then open <http://localhost:8080>.

## If a configurator panel shows up blank

That means the embedded site (starinfinity-gcp-cdn.netlify.app or
www.gemstarco.com) is refusing to be framed on your domain via
`X-Frame-Options` / CSP `frame-ancestors`. It can only be fixed on their side —
ask your Gemstarco contact (or Oliver@cleverspider.com) to allow-list your
domain. It is unrelated to anything in this repo.

## Notes on the iframe height

The vendor embed codes specify fixed pixel heights (1800px for Star Infinity,
1600px for the others) with no auto-resize handshake, so on small screens a
scrollbar can appear inside the panel. Those heights live in `styles.css` as
`.frame--tall` and `.frame--std` — adjust if the vendor changes their guidance.
