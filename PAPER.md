# CHRYSALIS

## Write to someone who doesn't exist yet

**Moonshot Paper · July 2026 · built for Moonshot, a 0→1 hackathon**

> A letter is a chrysalis: it goes in as *now* and comes out as *someday*.

---

### The problem humanity has misunderstood

We believe we are preserving our lives. We are only recording them.

The most documented generation in history, forty thousand photos per person, a decade of
messages, backups of backups, is also the least *addressed*. Almost nothing we keep was meant
for anyone. It is evidence, not correspondence. When your granddaughter is thirty-one and
terrified the way you were terrified at thirty-one, the cloud will offer her your brunch
photos. The one thing she will want, what you would have *said* to her, was never written,
because there has never been a natural place to write it.

Every existing medium faces the wrong direction. Diaries face backward: they record what
happened. Social media faces sideways: it performs for the present. Archives preserve
*records*; nothing preserves *intention*. The misunderstanding, precisely: **we solved storage
and never solved address.** Humanity's memory has petabytes of what-we-did and almost nothing
of what-we-hoped, addressed to the people who will need it.

### Why existing solutions are insufficient

**FutureMe** and its cousins send email to your future self, a form, a server, and a promise
that a company's SMTP will outlive your decades. No ritual, no keepsake, and the address book
ends at "me." **Time capsules** are institutional and rare, a cornerstone ceremony, not a
habit. **Legacy-letter services** are estate paperwork wearing a bow tie: they activate on
death, which is exactly backward, the letter is a gift of a living moment, not a will.
And all of them share one fatal dependency: *their* infrastructure must survive *your*
timespan. A letter to 2126 entrusted to a startup's database is a letter to 2029.

What none of them built is the thing that made physical letters-across-time work for
centuries: a **ritual** (the sealing, the felt moment of commitment), an **object** (the
envelope that exists independent of any institution), and an **address** that can be a person
who doesn't exist yet.

### The first-principles insight

Strip the practice to its invariants and three design laws fall out:

1. **The ritual is the product.** People don't fail to write to the future for lack of a text
   box, every app is a text box. They fail because nothing marks the act as different from a
   note-to-self. Sealing wax worked for five hundred years because commitment needs ceremony.
   Software has treated ceremony as decoration; here it is the mechanism.
2. **The letter must outlive the letterbox.** Any delivery promise longer than a company's
   lifespan is fiction unless the artifact is self-contained. So the sealed letter is a single
   HTML file, the only digital format that has stayed readable for thirty years, that opens
   itself on its day, with no website, no account, no server. The gentle lock inside is a
   promise, not a prison, exactly like the paper envelope it descends from: what held sealed
   letters shut for centuries was never the wax. It was the reader keeping the promise.
3. **Privacy is structural, not policy.** Letters this intimate cannot live on someone else's
   computer. Chrysalis has no backend at all: letters live on the writer's device and in the
   keepsakes they choose to keep. There is nothing to breach and no one to trust.

### The system

One evening, five scenes. A book rests in a dusk full of fireflies, each light a letter,
waiting. Open it, and the cover swings back in three dimensions; the camera falls into the
page, and the page becomes your page. Three decisions, who it's for, the words, the day it
opens. Sealing folds the letter, stamps the wax, and releases it upward as one more light in
the sky. The vault lists your letters with their countdowns; when a letter's day arrives it
glows and opens with the same paper it was written on. Three letters from the past (1936,
1972, 1999) keep the room warm and set the register.

Under the ceremony, deliberately little: a letter store (on-device, corruption-tolerant), time
words ("opens in 25 years", the largest honest unit), and the keepsake generator, all of it
covered by a test suite, because a promise-keeping machine should keep its promises verifiably.
No accounts, no network calls, no analytics. The entire artifact is a static site.

### Long-term implications

**The habit, normalized.** A civilization that writes to its future is one that believes it
has one. Imagine the practice ordinary: a letter sealed at every birth, every wedding, every
diagnosis, every ending. Within a generation, the attics of the internet fill with intention
instead of exhaust, a corpus of addressed hope that no historian, therapist, or grandchild
has ever had.

**Time-shifted relationships.** Grandparents who will never meet their grandchildren already
raise them in every culture, through stories told secondhand. Letters make it firsthand.
The address "a child not yet here" is the beginning of a new genre of human relationship:
deliberate, asymmetric, and real.

**Institutional evolution.** The keepsake file solves the decades; the centuries want more.
The natural successors are civic: letter-vaults in libraries the way safe-deposit boxes live
in banks; a letter sealed with every birth certificate. The prototype's job is to make the
ritual so obviously right that institutions grow around it, infrastructure follows habit,
never the reverse.

### The future this attempts to create

One where the people of 2126 are neighbors instead of abstractions, where some meaningful
fraction of humanity has, at least once, sat down at dusk and told the future the truth about
an ordinary Tuesday. The best way to predict the future is to invent it; the warmest way is to
write to it.

---

### Colophon

Built overnight for Moonshot. Next.js 15, TypeScript, Tailwind v4; no backend, no accounts,
no analytics; the letter store and keepsake generator are covered by a 10-test suite. The
ritual owes its bones to five hundred years of sealing wax, and its sky to every firefly
anyone ever chased.
