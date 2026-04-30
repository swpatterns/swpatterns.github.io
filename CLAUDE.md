# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Hugo static site (swpatterns.com) cataloging software design patterns, anti-patterns, and per-language code samples. It is content-heavy: most "work" here is editing Markdown under `content/`, not code.

## Build / serve

- Local dev: `hugo server -D` (the `-D` shows drafts)
- Production build: `hugo --minify` (output goes to `public/`)
- Hugo version: GitHub Actions uses `latest` extended; `netlify.toml` pins `HUGO_VERSION = 0.152.2`. Use a recent extended Hugo locally.
- The `themes/hugo-clarity` submodule must be initialized for clones: `git submodule update --init --recursive`.

There are no tests, no linter, and no JS/CSS build step in this repo — it is pure Hugo.

## Deployment

`.github/workflows/gh-pages.yml` builds on push to `master` and publishes `public/` to the `gh-pages` branch. There is also a `netlify.toml`. Pushing to `master` is effectively a release.

## Content model — read this before editing content

Three content sections plus three taxonomies, wired in `config.toml`:

- `content/pattern/<name>.md` — one file per pattern. Frontmatter drives rendering: `pattern_types` (list, taxonomy), `wikipedia`, `diagramtype` + `diagram` (renders a yuml.me image), and `code: true` (enables the per-language samples block at the bottom of the page).
- `content/codesample/<pattern>_<language>.md` — one file per (pattern, language) pair. Frontmatter must set `pattern_usage: ["<Pattern Title>"]` and `language: ["<Language>"]` so the pattern page can list it. Body is the prose + a fenced code block; optionally a `gist` list embeds GitHub gists via `gist-embed`.
- `content/language/<lang>/_index.md` — taxonomy term page with metadata (`name`, `website`, `icon`, `tools`).
- `content/pattern_types/<type>/_index.md` — taxonomy term page (e.g. `gof`, `creational`, `ai`) with `title`, `description`.
- `content/pattern_usage/<pattern>/_index.md` — taxonomy term page that ties code samples to a pattern. The slug must match the pattern's title when lowercased/urlized; `layouts/partials/all-taxonomies.html` joins them on `lower .Page.Title`.

Taxonomy names declared in `config.toml`: `pattern_types`, `language`, `pattern_usage`. `mainSections = ["pattern", "language"]`.

`content/patterns/` (plural) exists with two files but is **not** wired into the site — don't add new patterns there; use `content/pattern/`.

### Adding content

Use the archetypes (already configured):

- New pattern: `hugo new pattern/<pattern-name>.md`
- New code sample: `hugo new codesample/<pattern>_<language>.md` — then set `pattern_usage` and `language` in frontmatter and add a `gist` entry if applicable. `singleton_java` is the reference example.

When introducing a new `pattern_types` value, also create `content/pattern_types/<value>/_index.md` so the taxonomy term has a landing page. Same goes for new languages (`content/language/<lang>/_index.md`).

## Layouts

`layouts/` overrides the active theme (`hugo-clarity-new`, set in `config.toml`). `themes/hugo-clarity` is a git submodule kept around but not the active theme — edit `layouts/` for site-specific changes, not the submodule.

Notable overrides:

- `layouts/pattern/single.html` — pattern page; renders yuml.me diagram if `diagram` is set, and includes `partials/all-taxonomies.html` to list code samples when `code: true`.
- `layouts/codesample/single.html` — code sample page; renders pattern + language tag links and embeds gists.
- `layouts/taxonomy/{language,pattern_types}.html` — taxonomy term listing pages.
- `layouts/partials/all-taxonomies.html` — the join logic between a pattern page and its code samples (matches `lower .Page.Title` against taxonomy keys).

## Hokus CMS

`hokus.toml` configures the [Hokus CMS](https://github.com/hokus-cms) GUI for non-developer editing. Keep it in sync if collection schemas (`content/posts/`) change — though note the live site uses `content/pattern/` etc., not `content/posts/`.

---

## Design Context

This section is the brand direction for any visual/UI work in this repo. The full source — including specific OKLCH values, font fallbacks, and rationale — lives in `.impeccable.md` at the repo root. Read that file before doing substantial design work; this is the short version.

### Users

The reader is a **working software engineer in lookup mode**: arrived from search with a specific pattern in mind, wants the definition + a code sample in their language, and leaves. Students and practitioners are secondary — every design call is judged against the lookup case first. The site is content, not an app.

### Brand personality

**Archival, disciplined, Italian-editorial.** Voice of a printed reference catalog — pages typeset with the care of a book, not the chrome of a SaaS dashboard. The "Made with ❤️ in Bologna" footer line is real heritage; the design earns it through Bodoni-school typography and grid discipline, not flags or emojis.

### Aesthetic direction

Reference: **Italian editorial / Bauhaus archival** — Domus, Casabella, Lars Müller monographs, Olivetti/Vignelli catalog design. Pattern entries are typeset like museum/library catalog cards: numbered (`Nº 042`), classified, deliberately set.

**Hard anti-references** (do not drift toward any of these):

- Refactoring.guru / illustrated tutorial sites — no mascots, no color-coded category pills.
- Generic Hugo / dev-blog template — no centered hero with stock sans, no identical card grids.
- AI-startup landing page — no dark + cyan/purple + glassmorphism + gradient text + glowing borders.
- Corporate enterprise docs — no IBM/SAP navy-and-gray chrome.

**Theme**: follow `prefers-color-scheme` with manual override toggle. Light = warm off-white book paper. Dark = deep ink (not pure black). Both designed to the same standard — no "built for light, inverted for dark."

**Color**: drop the stock `#0077b8` navy. New palette is warm-tinted neutrals + a single rare **Italian editorial vermillion** accent (`oklch(54% 0.20 25)`). Accent appears on catalog numbers, active language tab marks, link underlines on hover — never as a card stripe or default button fill. See `.impeccable.md` for full OKLCH tokens.

**Typography**: every reflex font (Inter, Plex, Space Grotesk, Fraunces, etc.) is banned. The pairing is:

- **Bodoni Moda** (variable, Google Fonts) — display, pattern titles, catalog numerals (`Nº`). Italian heritage by design.
- **Spectral** (Production Type, Google Fonts) — body and `h2`–`h4`. Transitional serif with editorial italics.
- **Cutive Mono** — code, metadata labels, small-cap section markers. Mid-20th-century typewriter face that evokes the typed card-catalog labels the rest of the system is modeled on. (Substituted from the originally-spec'd Departure Mono because Cutive ships reliably via Google Fonts and is a stronger fit for the archival brief.) JetBrains/Plex Mono are explicitly off-limits.

If a font proves impractical, substitute with something **not** in the reflex-reject list — never fall back to Inter or its cousins.

**Layout**: asymmetric grid, left-aligned body, generous outer margins, distinct content-vs-metadata columns. Pattern pages read as numbered catalog entries: number top-left in Bodoni small caps, classification (`Creational · GoF`) in Departure Mono small caps, title in Bodoni display, body in Spectral. The **language switcher must be the most prominent interactive element** on a pattern page — that's why most readers came. Homepage pattern index is a typographic contents page, not a card grid.

### Design principles (apply to every visual decision)

1. **Catalog, not blog.** Metadata is composed into the design; pattern types behave like a classification system, not tags.
2. **Lookup over discovery.** Title, classification, and language switcher visible above the fold on a 13" laptop. Related-pattern links live below.
3. **Italian editorial restraint.** Type and grid carry the brand. One rare accent. No decorative shapes, no glassmorphism, no card-grid filler.
4. **Code samples are the product.** Syntax highlighting hits WCAG AA on **both** themes (verify, don't assume). Copy buttons keyboard-reachable. `<pre><code>` semantic with language declared.
5. **Dual-mode parity.** Light and dark are co-equal — accent contrast, syntax contrast, and rule-line visibility tuned independently. Test both before shipping.

### Constraints

- Hugo only — no JS framework, no extra build pipeline. Style work lands in `themes/hugo-clarity-new/assets/sass/` or `layouts/` overrides.
- WCAG **AA** baseline; AA syntax-highlight contrast on both themes; respect `prefers-reduced-motion`.
- Variable web fonts with `font-display: swap`. No icon fonts.
- Keep the "Made with ❤️ in Bologna" footer — it's part of the brand.

When in doubt, open `.impeccable.md` for the full rationale, OKLCH tokens, and font fallback rules.
