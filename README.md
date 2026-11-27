# Tami Portfolio — Design 1 CC

"Ember" design: near-black panels, off-white type and signal orange, with a touch of icy blue. Dark is the
default; light is warm paper. The "Tami" name is set in Dancing Script; section titles are bold sans with one
cursive accent word. Colour tokens are named by role: page, ink, accent, spark, band, surface.
Vite + React + TypeScript + Tailwind CSS v4 + framer-motion / motion.

## Run it

Double-click **Start Website.bat**, or in a terminal:

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production files in dist/
```

## Edit content

- Most text, contacts, services, projects, steps and FAQs: `src/data/site.ts`
- Hero text, the project "books" and the typed note: `src/components/hero-content.tsx`
- Images: `public/images/`

## Change the colours

- Light palette: the `@theme` block at the top of `src/index.css`
- Dark palette: the `:root[data-theme="dark"]` block just below it (and the hero's dark tokens there)
- Hero light palette: the five `--color-ea-*` values in `src/components/tami-hero.tsx` (search `--color-ea-page`)

## Light / dark mode

A sun/moon switch sits in the hero's nav and the floating nav. A first visit follows the device setting;
after that the visitor's choice is remembered (`localStorage` key `tami-theme`). Logic: `src/lib/theme.tsx`.

## Credits

- The hero is adapted from "Portfolio Hero" by clevision on 21st.dev (elias-author-hero).
- The Work section's stacking cards are adapted from "Scroll Stacking Cards" by kedhareswer on 21st.dev (tilt-stack-scroll).
