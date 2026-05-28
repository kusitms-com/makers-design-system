---
"@kusitms.com/ui": minor
"@kusitms.com/tokens": minor
---

Replace pre-built `styles.css` with `source.css` for consumer-side Tailwind processing

**Breaking changes:**

`@kusitms.com/ui`:
- `styles.css` export removed, replaced with `source.css`
- Update your CSS import: `@import "@kusitms.com/ui/source.css"` (requires Tailwind v4 in consumer app)

`@kusitms.com/tokens`:
- `responsive.css` export removed (breakpoints are Tailwind v4 defaults, no longer needed)
