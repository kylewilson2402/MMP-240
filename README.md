# The Hall of Fame

A premium editorial React app celebrating six legendary athletes — Michael
Jordan, Ayrton Senna, Serena Williams, Muhammad Ali, Usain Bolt, and Lionel
Messi — styled like a high-end print sports magazine.

## Stack

- **React 19 + TypeScript**, scaffolded with Vite
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config in `src/index.css` using `@theme`)
- **Framer Motion** for the tilt spring physics, shared `layoutId` card → profile
  morph, and background cross-fades
- **lucide-react** for iconography
- **Playfair Display** (serif display) + **Inter** (sans body), loaded via
  `@fontsource`

## Structure

```
src/
  components/
    Masthead.tsx        editorial header
    AthleteCard.tsx      tilting card, opens the profile on click/Enter
    AthleteProfile.tsx   full-screen morphed profile (AnimatePresence)
    BackgroundField.tsx  fixed ambient background, cross-fades per accent
  hooks/
    useTilt.ts           pointer → normalized coords → capped 3D rotation
    useAmbientAccent.tsx  context sharing the hovered athlete's accent colors
  data/
    athletes.ts           typed athlete records (bio, stat, accent, icon)
```

## Notable decisions

- **Portraits are duotone gradient + icon placeholders**, not photographs.
  This sidesteps hotlinking to an external image host (unreliable in a
  sandboxed dev environment, and it avoids licensing real athletes' likenesses)
  while still fitting the "coffee-table book" aesthetic — duotone treatment is
  a real editorial-design convention. Swap the gradient div in `AthleteCard`
  / `AthleteProfile` for an `<img>` if you'd rather use licensed photography.
- **`useTilt`** is a from-scratch hook (no tilt library): it normalizes
  pointer position within the card to a `-0.5…0.5` range on both axes, maps
  that to a capped rotation via Framer Motion's `useTransform`, and springs
  everything through `useSpring` so the card eases back to flat on pointer
  leave instead of snapping. It also drives the glare layer's position and
  respects `prefers-reduced-motion` by skipping pointer-driven updates
  entirely.
- **Shared layout morph**: `AthleteCard` and `AthleteProfile` use matching
  `layoutId`s on the portrait and name elements. When a card is selected, the
  grid renders an inert placeholder in its place (releasing the `layoutId`s)
  so Framer Motion can perform a single continuous FLIP animation into the
  full-screen profile, rather than two elements fighting over the same id.
- **Ambient background** lives in a `React.Context` (`useAmbientAccent`) so
  any card can update it without prop-drilling; `BackgroundField` renders it
  as a fixed, `-z-10` layer and cross-fades between accent tints using
  `AnimatePresence` keyed by color pair — opacity-only, so it stays cheap.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` type-checks and produces a
production build; `npm run lint` runs Oxlint.

## Accessibility

- Cards are focusable (`tabIndex`, `role="button"`) and open with `Enter`/`Space`.
- The profile is a `role="dialog"` with `aria-modal`, closes on `Esc`, click
  outside, or the `X` button, and moves focus to the close button on open.
- All animation math respects `prefers-reduced-motion` (tilt hook skips
  pointer updates; global CSS collapses transition/animation durations).
