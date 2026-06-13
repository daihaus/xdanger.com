---
applyTo: "src/**"
---

# Frontend / component review (Copilot)

Astro + Tailwind + React site with a strict design system. Full criteria: `/REVIEW.md` §A and
`AGENTS.md` (keep in sync).

## Blocking

- **No hardcoded colors.** Use role-based tokens only: `--color-accent`, `--color-accent-2`,
  `--color-link`, categorical `--color-cat-1…6`, sequential `--color-seq-{accent,steel,neutral}-1…6`,
  `--color-positive`/`--color-negative`, and surface/ink/line tokens. No raw hex/oklch/rgb in components.
  Exception: the token *definitions* in `src/styles/global.css` (and theme config) — literal `oklch`
  there is expected, don't flag it.
- **Theme contract.** Dark mode via `data-theme="dark"` on `<html>`, never a `.dark` class. SVG recolors
  via `currentColor` + `var(--color-*)`. Canvas reads theme via
  `getComputedStyle(document.documentElement).getPropertyValue('--color-…')`, using only tokens that are
  literal `oklch` in both themes, and reacts to a `MutationObserver` on `data-theme`.
- **Motion + a11y.** Everything animated honors `prefers-reduced-motion` (SVG/Canvas via
  `@media (prefers-reduced-motion: no-preference)`; React via `motion-safe:`/`motion-reduce:`). Visuals
  have `role="img"` + `aria-label` / `<title>`/`<desc>` (or labeled controls with `useId()`); decorative
  visuals `aria-hidden`. Wrap visuals in `not-prose`.

## Meaningful (P2)

- **Component layers — pick the lightest:** SVG (animated, zero JS) > Canvas + JS (many points /
  continuous curves) > React (state linkage, chart libs, deep trees). `.astro` viz import from
  `@/components/viz/` with no client directive; React islands default to `client:visible` (`client:load`
  only if above-the-fold and immediately interactive); chart libs installed on demand.
- **Tokens beyond color:** standard Tailwind scale utilities (`gap-3`, `py-5`, `rounded-md`,
  `transition-colors`) are house style and fine; flag only arbitrary one-off values (`gap-[13px]`, inline
  `margin: 13px`) or raw values in custom CSS that bypass `--space-*`/`--radius-*`/`--dur-*`/`--ease-*`.
- **Canvas lifecycle:** scale for `devicePixelRatio`; clean up rAF/observers in `disconnectedCallback`.
- **URLs & schema:** don't hardcode `.html` or era-specific paths — use `src/utils/url.ts` helpers;
  frontmatter per `src/content.config.ts` (`title` ≤ 60, `publishDate` ISO-8601 + offset).
- **Tooling:** pnpm only; don't commit `dist/`/`.astro/`/`.vercel/`; don't edit linter/formatter configs
  without approval; no `bun`/`biomejs`/`deno`; no `cleanUrls`.
