import { describe, expect, it } from "vitest";
import {
  escapeHtml,
  isOpenable,
  keepsakeHtml,
  loadLetters,
  makeLetter,
  markOpened,
  opensAtLabel,
  saveLetter,
  waitLabel,
  yearsFromNow,
  type KVStorage,
} from "./letters";

function fakeStorage(): KVStorage {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
  };
}

const NOW = new Date("2026-07-04T21:00:00Z");

describe("time words", () => {
  it("names far futures by month and year", () => {
    expect(opensAtLabel(yearsFromNow(25, NOW).toISOString(), NOW)).toBe("July 2051");
  });

  it("names near futures with the day", () => {
    expect(opensAtLabel(yearsFromNow(1, NOW).toISOString(), NOW)).toMatch(/July \d+, 2027/);
  });

  it("speaks the wait in the largest honest unit", () => {
    expect(waitLabel(yearsFromNow(25, NOW).toISOString(), NOW)).toBe("opens in 25 years");
    expect(waitLabel(yearsFromNow(1, NOW).toISOString(), NOW)).toBe("opens in 1 year");
    expect(waitLabel(new Date(NOW.getTime() + 90 * 86400e3).toISOString(), NOW)).toBe(
      "opens in 3 months",
    );
    expect(waitLabel(new Date(NOW.getTime() + 6 * 86400e3).toISOString(), NOW)).toBe(
      "opens in 6 days",
    );
    expect(waitLabel(new Date(NOW.getTime() - 1000).toISOString(), NOW)).toBe("ready to open");
  });

  it("knows when a letter's day has come", () => {
    expect(isOpenable({ opensAt: new Date(NOW.getTime() - 1).toISOString() }, NOW)).toBe(true);
    expect(isOpenable({ opensAt: new Date(NOW.getTime() + 1).toISOString() }, NOW)).toBe(false);
  });
});

describe("the vault", () => {
  it("saves and loads letters, newest first", () => {
    const storage = fakeStorage();
    const a = makeLetter({ to: "me", body: "first", opensAt: yearsFromNow(1, NOW) }, NOW);
    const b = makeLetter({ to: "me", body: "second", opensAt: yearsFromNow(2, NOW) }, NOW);
    saveLetter(a, storage);
    saveLetter(b, storage);
    const loaded = loadLetters(storage);
    expect(loaded.map((l) => l.body)).toEqual(["second", "first"]);
  });

  it("marks a letter opened exactly once", () => {
    const storage = fakeStorage();
    const a = makeLetter({ to: "me", body: "hello", opensAt: yearsFromNow(1, NOW) }, NOW);
    saveLetter(a, storage);
    const first = markOpened(a.id, storage, NOW)[0]!;
    expect(first.openedAt).toBe(NOW.toISOString());
    const later = new Date(NOW.getTime() + 86400e3);
    const second = markOpened(a.id, storage, later)[0]!;
    expect(second.openedAt).toBe(NOW.toISOString());
  });

  it("survives corrupted storage", () => {
    const storage = fakeStorage();
    storage.setItem("chrysalis:letters:v1", "not json {");
    expect(loadLetters(storage)).toEqual([]);
  });

  it("gives every letter a recipient even when left blank", () => {
    const l = makeLetter({ to: "   ", body: "x", opensAt: yearsFromNow(1, NOW) }, NOW);
    expect(l.to).toBe("whoever finds this");
  });
});

describe("the keepsake", () => {
  it("escapes whatever the letter contains", () => {
    expect(escapeHtml(`<script>alert("hi")</script>`)).not.toContain("<script>");
    const l = makeLetter(
      { to: `<img src=x onerror=1>`, body: `</blockquote><script>1</script>`, opensAt: yearsFromNow(1, NOW) },
      NOW,
    );
    const html = keepsakeHtml(l);
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain("<script>1</script>");
  });

  it("carries the words and the promise in one file", () => {
    const l = makeLetter({ to: "my future self", body: "remember the lake", opensAt: yearsFromNow(10, NOW) }, NOW);
    const html = keepsakeHtml(l);
    expect(html).toContain("remember the lake");
    expect(html).toContain("my future self");
    expect(html).toContain(String(new Date(l.opensAt).getTime()));
    expect(html).toContain("needs no website");
  });
});
