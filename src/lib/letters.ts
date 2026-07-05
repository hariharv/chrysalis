/**
 * The vault's little brain: letters, their waiting, and their keepsakes.
 * Letters are private by default, they live on this device and nowhere else.
 */

export interface Letter {
  id: string;
  /** Who it's for, free text, e.g. "my future self", "a child not yet here". */
  to: string;
  body: string;
  sealedAt: string; // ISO
  opensAt: string; // ISO
  openedAt?: string; // ISO, set the first time it is read
}

export const STORAGE_KEY = "chrysalis:letters:v1";

/** Minimal storage shape so the store is testable off-browser. */
export interface KVStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function defaultStorage(): KVStorage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {
    // private mode can throw on access
  }
  return null;
}

export function makeLetter(input: { to: string; body: string; opensAt: Date }, now = new Date()): Letter {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${now.getTime()}-${Math.random().toString(36).slice(2, 10)}`;
  return {
    id,
    to: input.to.trim().slice(0, 120) || "whoever finds this",
    body: input.body.trim().slice(0, 8000),
    sealedAt: now.toISOString(),
    opensAt: input.opensAt.toISOString(),
  };
}

export function loadLetters(storage: KVStorage | null = defaultStorage()): Letter[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is Letter =>
        typeof l === "object" && l !== null && "id" in l && "body" in l && "opensAt" in l,
    );
  } catch {
    return [];
  }
}

export function saveLetter(letter: Letter, storage: KVStorage | null = defaultStorage()): Letter[] {
  const all = [letter, ...loadLetters(storage)];
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // storage full or blocked, the caller still holds the letter for download
  }
  return all;
}

export function markOpened(
  id: string,
  storage: KVStorage | null = defaultStorage(),
  now = new Date(),
): Letter[] {
  const all = loadLetters(storage).map((l) =>
    l.id === id && !l.openedAt ? { ...l, openedAt: now.toISOString() } : l,
  );
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // non-fatal
  }
  return all;
}

/* ------------------------------- time words ------------------------------- */

export function yearsFromNow(years: number, now = new Date()): Date {
  const d = new Date(now);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function isOpenable(letter: Pick<Letter, "opensAt">, now = new Date()): boolean {
  return new Date(letter.opensAt).getTime() <= now.getTime();
}

/** "June 2051" for far dates, "June 12, 2027" when within two years. */
export function opensAtLabel(opensAtIso: string, now = new Date()): string {
  const d = new Date(opensAtIso);
  const twoYears = 2 * 365.25 * 24 * 3600 * 1000;
  if (d.getTime() - now.getTime() < twoYears) {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

/** "ready to open" | "opens in 25 years" | "opens in 11 months" | "opens in 6 days" */
export function waitLabel(opensAtIso: string, now = new Date()): string {
  const ms = new Date(opensAtIso).getTime() - now.getTime();
  if (ms <= 0) return "ready to open";
  const days = ms / (24 * 3600 * 1000);
  if (days >= 365) {
    const years = Math.round(days / 365.25);
    return `opens in ${years} ${years === 1 ? "year" : "years"}`;
  }
  if (days >= 30) {
    const months = Math.round(days / 30.44);
    return `opens in ${months} ${months === 1 ? "month" : "months"}`;
  }
  const d = Math.max(1, Math.ceil(days));
  return `opens in ${d} ${d === 1 ? "day" : "days"}`;
}

/* -------------------------------- keepsake -------------------------------- */

export function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * A self-contained HTML file the writer can keep anywhere, a drive, a USB
 * stick, a printed page. It shows the seal and refuses (politely, in plain
 * JavaScript anyone can read) to show the letter before its day.
 */
export function keepsakeHtml(letter: Letter): string {
  const opens = escapeHtml(opensAtLabel(letter.opensAt));
  const sealedYear = new Date(letter.sealedAt).getFullYear();
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A sealed letter · opens ${opens}</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#191527;
    font-family:Georgia,'Times New Roman',serif;color:#EFEAF7;padding:24px;box-sizing:border-box}
  .card{max-width:560px;background:#F7F1E5;color:#2E2440;border-radius:6px;padding:48px 40px;
    box-shadow:0 30px 80px rgba(0,0,0,.5)}
  .seal{width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#D26A5F,#B4443C 60%,#8E2F28);
    margin:0 auto 24px;display:grid;place-items:center;color:#F7F1E5;font-size:28px;font-style:italic}
  h1{font-size:22px;font-weight:normal;text-align:center;margin:0 0 6px}
  p{line-height:1.7;font-size:17px}
  .meta{text-align:center;color:#6B5E86;font-size:14px;margin-bottom:28px}
  .hidden{display:none}
  .note{font-size:13px;color:#6B5E86;border-top:1px solid #D8CCB4;padding-top:16px;margin-top:28px}
  blockquote{margin:0;white-space:pre-wrap}
</style>
<body>
  <div class="card">
    <div class="seal">C</div>
    <h1>For ${escapeHtml(letter.to)}</h1>
    <p class="meta">sealed in ${sealedYear} · opens ${opens}</p>
    <p id="waiting">This letter isn't ready yet. Keep this file somewhere safe, and come back
    when its day arrives.</p>
    <blockquote id="letter" class="hidden">${escapeHtml(letter.body)}</blockquote>
    <p class="note">This file is the whole letter. It doesn't need a website, an account, or any
    company to keep working. The little lock below is just a promise. The words are right here
    inside the file, waiting for you to keep it.</p>
  </div>
  <script>
    if (Date.now() >= ${new Date(letter.opensAt).getTime()}) {
      document.getElementById("waiting").classList.add("hidden");
      document.getElementById("letter").classList.remove("hidden");
    }
  </script>
</body>
</html>`;
}

/* --------------------------- letters from the past -------------------------- */

export interface PastLetter {
  id: string;
  era: string;
  from: string;
  to: string;
  body: string;
}

export const PAST_LETTERS: PastLetter[] = [
  {
    id: "1972-margaret",
    era: "1972",
    from: "Margaret, 61, a schoolteacher",
    to: "her granddaughter, on her someday-wedding day",
    body: "My darling girl, you are four years old today and you fell asleep holding my thumb.\n\nBy the time you read this I will be a photograph to you, and that is all right. I wanted you to have one thing from me that wasn't secondhand: I have loved my ordinary life. The kettle, the chalk dust, your grandfather humming off-key. If your day is ordinary too, don't let anyone tell you it is small.\n\nWear something blue. It was my mother's trick and it never failed.\n\nLove, Nana",
  },
  {
    id: "1999-david",
    era: "New Year's Eve, 1999",
    from: "David, 34, holding a video camera",
    to: "his son, at 34",
    body: "Kid,\n\nEveryone tonight is joking the computers will end the world at midnight. Your mother is asleep on the couch. You are eight days old.\n\nI don't know what 34 looks like for you. I know what it looks like for me: terrified, mostly, and happier than I have ever been. If those two things still travel together in your time, then nothing important has changed and you're doing fine.\n\nThe world didn't end, by the way. It mostly doesn't.\n\nLove, Dad",
  },
  {
    id: "1936-crypt",
    era: "1936",
    from: "A stranger, sealing a time capsule",
    to: "whoever finds this",
    body: "To the one who opens this:\n\nWe argued for an hour about what to put inside: coins, seeds, a radio. In the end I asked to add one sentence, and they allowed it, so here is mine.\n\nWe knew the machines would reach you. We hoped the kindness would too.\n\nEverything else in this box is just proof we existed. This sentence is proof we thought of you.",
  },
];
