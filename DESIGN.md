# Chrysalis, Design Notes

**Write to someone who doesn't exist yet.** The site lives between two worlds and the movement
between them is the product: a **bright day-lit sky** (drifting stars, slow nebulae, a far
planet, where sealed letters wait as gold lights) and the **paper** (a warm page where you
write). The old book is the door between them; opening it sends its pages shuffling across the
whole screen like a dealt deck, and one of them becomes yours.

## Palette

| Token | Hex | Role |
|---|---|---|
| sky (backdrop) | `#3E96C8 → #175E92` | The bright space, painted as layered gradients |
| `dusk-deep` | `#0E3A5C` | Deep-sea navy, overlays, text on gold |
| `dusk` | `#12507E` | Cards and panels |
| `dusk-soft` | `#2C77A8` | Borders, hovers |
| `lilac` | `#D9EFFC` | Secondary text (over panels or with sky-text shadow) |
| `moonlight` | `#FFFFFF` | Primary text on the sky |
| `paper` / `paper-shade` / `rule` | `#F7F1E5` / `#EAE0CC` / `#D8CCB4` | The writing world |
| `ink` / `ink-soft` | `#2E2440` / `#6B5E86` | Text on paper |
| `firefly` | `#F5C044` | Gold, actions that matter, seals mid-flight, your letters in the sky |
| `wax` | `#B4443C` | The seal only |

Loose text on the sky always carries the `sky-text` shadow; body copy otherwise sits on panels
or paper for contrast.

## Typography

**Fraunces** (display) + **Newsreader** (letters & body). Two fonts, no sans.

## Signature moments

1. **The book**, an aged leather tome: worn hide, gold-tooled double frame, brass corner caps,
   raised spine bands, a clasp. It breathes in the sky until opened.
2. **The shuffle**, on opening, eleven pages burst from the book and cross the entire screen
   like cards being shuffled, then a paper wash grows to cover everything and dissolves into
   the writing canvas. The transition is the metamorphosis.
3. **The seal**, the letter folds, wax stamps, and the sealed letter shrinks to a gold light
   that climbs into the sky.

## Motion rules

Slow and few: 400–1500 ms, soft ease-out curves, transforms and opacity only. The sky drifts
perpetually but gently (60–90 s cycles). Everything collapses to crossfades under
`prefers-reduced-motion`.

## Quality floor

44 px touch targets · cursor-pointer + visible feedback on everything interactive ·
focus-visible gold ring · 16 px+ body text on mobile · SVG-only icons · responsive 375/768/1440.
