# Chrysalis

**Write to someone who doesn't exist yet.**

A quiet place to write one letter to the future — your future self, a child not yet here, a
stranger in 2126. An old book floats in a bright, star-drifted sky; open it and its pages
shuffle across the screen until one becomes yours. Write, choose the day it opens, and seal
it. Your letter becomes a small gold light in the sky, waiting.

> A letter is a chrysalis: it goes in as *now* and comes out as *someday*.

## Pages

- **The sky (`/`)** — the book, the shuffle, the letter, the seal.
- **Your letters (`/letters`)** — the vault: every letter with its countdown; letters whose
  day has come glow and open. Plus three letters from the past (1936 · 1972 · 1999).
- **Why (`/why`)** — the case for writing forward, written as a letter. The full essay ships
  as [PAPER.md](PAPER.md).

## The two promises

1. **Private by design** — letters live on your device. No servers, no accounts, no analytics.
2. **Letters outlive letterboxes** — every sealed letter downloads as a single self-contained
   HTML file that opens itself on its date, with no website or company required. The seal is a
   promise, not a prison — the way envelopes always worked.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # letter store, time words, keepsake — 10 tests
npm run build   # static export
```

No environment variables, no database, no keys.

## How it's made

Next.js 15 (static export) · Tailwind v4 · Fraunces & Newsreader · every animation is CSS
transforms and opacity, and everything respects `prefers-reduced-motion`. The only logic —
the letter store, time words, and the keepsake generator — lives in
[`src/lib/letters.ts`](src/lib/letters.ts) with its tests beside it.
