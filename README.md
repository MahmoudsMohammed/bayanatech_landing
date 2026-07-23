# Bayanatech Enterprise Website

Modern bilingual (Arabic / English) marketing website for Bayanatech — HTML, CSS, JavaScript, and Bootstrap 5.

## Brand colors (from official logo)

| Token | Hex | Use |
|-------|-----|-----|
| Primary blue | `#0A6DCA` | CTAs, links, accents, Arabic wordmark |
| Neutral gray | `#C0C0C0` | Secondary UI, pixel accents |
| Near black | `#0A0A0A` | Dark sections, footer |
| White | `#FFFFFF` | Light surfaces, English wordmark on dark |

Logo files in `assets/img/`:

- `logo.png` — official logo (dark background)
- `logo-transparent.png` — header / light backgrounds
- `logo-mark.svg` — favicon / icon mark

## Quick start

Open `index.html` in a browser, or serve the folder locally:

```bash
npx --yes serve .
```

Default locale redirects to `/ar/`.

## Structure

```
index.html          → locale redirect
ar/                 → Arabic (RTL) pages
en/                 → English (LTR) pages
assets/css/         → design tokens + main styles
assets/js/          → interactions, i18n, product catalog
assets/img/         → logo and media
scripts/generate-pages.js  → regenerates inner pages (optional)
```

## Pages

Home, Solutions, Products, Product Detail, Industries, About, Case Studies, Resources, Contact, Consultation — each in `ar/` and `en/`.

## Notes

- Wire forms to Formspree (or similar) via `data-endpoint` on forms.
- Re-run `node scripts/generate-pages.js` after editing the generator to refresh inner pages. Homepages are hand-authored.
