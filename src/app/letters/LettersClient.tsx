"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PAST_LETTERS,
  isOpenable,
  keepsakeHtml,
  loadLetters,
  markOpened,
  opensAtLabel,
  waitLabel,
  type Letter,
  type PastLetter,
} from "@/lib/letters";

/**
 * The vault: your letters, each with its countdown, and a few letters from
 * the past, so the room is never empty and the register is never in doubt.
 */

type Reading =
  | { kind: "yours"; letter: Letter }
  | { kind: "past"; letter: PastLetter }
  | null;

function sealedYear(iso: string): number {
  return new Date(iso).getFullYear();
}

export function LettersClient() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [reading, setReading] = useState<Reading>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setLetters(loadLetters());
    setNow(new Date());
  }, []);

  const openYours = (letter: Letter) => {
    setLetters(markOpened(letter.id));
    setReading({ kind: "yours", letter });
  };

  const keepCopy = (letter: Letter) => {
    const blob = new Blob([keepsakeHtml(letter)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `letter-for-${letter.to.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ------------------------------ reading view ------------------------------ */
  if (reading) {
    const isPast = reading.kind === "past";
    const body = reading.letter.body;
    const heading = isPast
      ? (reading.letter as PastLetter).to
      : (reading.letter as Letter).to;
    const meta = isPast
      ? `${(reading.letter as PastLetter).from} · ${(reading.letter as PastLetter).era}`
      : `sealed in ${sealedYear((reading.letter as Letter).sealedAt)} · opened ${
          now ? now.getFullYear() : ""
        }`;

    return (
      <div className="relative min-h-dvh">
        <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 pt-28">
          <div className="paper-sheet fade-in rounded-md px-6 py-10 sm:px-12 sm:py-14">
            <p className="font-display text-sm italic text-ink-soft">for {heading}</p>
            <p className="mt-1 font-letter text-xs text-ink-soft/80">{meta}</p>
            <div className="mt-8 whitespace-pre-wrap font-letter text-lg leading-8 text-ink">
              {body}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setReading(null)}
              className="cursor-pointer rounded-full border border-dusk-soft px-5 py-2.5 font-display text-sm text-lilac transition-colors hover:border-lilac hover:text-moonlight"
            >
              ← Back to the vault
            </button>
            {!isPast ? (
              <button
                onClick={() => keepCopy(reading.letter as Letter)}
                className="cursor-pointer rounded-full border border-firefly/60 px-5 py-2.5 font-display text-sm text-firefly transition-colors hover:bg-firefly hover:text-dusk-deep"
              >
                Keep a copy
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------- vault ---------------------------------- */
  return (
    <div className="relative min-h-dvh">
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
        <h1 className="sky-text font-display text-4xl text-moonlight sm:text-5xl">Your letters</h1>
        <p className="sky-text mt-3 max-w-xl font-letter text-lg italic leading-relaxed text-lilac">
          Every letter you&rsquo;ve sealed lives right here on your device, counting down. When
          one&rsquo;s day finally comes, it lights up.
        </p>

        {letters.length === 0 ? (
          <div className="mt-10 rounded-md border border-dusk-soft/60 bg-dusk/60 px-6 py-12 text-center">
            <p className="font-display text-xl text-lilac">No letters yet.</p>
            <p className="mt-2 font-letter italic text-lilac/80">The book is waiting for you.</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full border border-firefly/70 bg-firefly/10 px-6 py-3 font-display text-firefly transition-colors hover:bg-firefly hover:text-dusk-deep"
            >
              Open the book
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {letters.map((letter) => {
              const ready = now ? isOpenable(letter, now) : false;
              return (
                <li
                  key={letter.id}
                  className={`rounded-md border px-5 py-4 transition-colors ${
                    ready
                      ? "border-firefly/60 bg-dusk shadow-[0_0_28px_rgba(242,184,75,0.12)]"
                      : "border-dusk-soft/60 bg-dusk/60"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg text-moonlight">
                        for {letter.to}
                      </p>
                      <p className="mt-0.5 font-letter text-sm text-lilac/80">
                        sealed {sealedYear(letter.sealedAt)} · opens{" "}
                        {opensAtLabel(letter.opensAt)}
                        {letter.openedAt ? " · already opened" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`rounded-full px-3 py-1.5 font-letter text-xs ${
                          ready
                            ? "bg-firefly text-dusk-deep"
                            : "border border-dusk-soft text-lilac"
                        }`}
                      >
                        {now ? waitLabel(letter.opensAt, now) : "…"}
                      </span>
                      {ready ? (
                        <button
                          onClick={() => openYours(letter)}
                          className="cursor-pointer rounded-full border border-firefly/70 px-4 py-1.5 font-display text-sm text-firefly transition-colors hover:bg-firefly hover:text-dusk-deep"
                        >
                          Open it
                        </button>
                      ) : (
                        <button
                          onClick={() => keepCopy(letter)}
                          className="cursor-pointer rounded-full border border-dusk-soft px-4 py-1.5 font-display text-sm text-lilac transition-colors hover:border-lilac hover:text-moonlight"
                          title="Download the sealed keepsake file"
                        >
                          Keep a copy
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* letters from the past */}
        <h2 className="sky-text mt-16 font-display text-2xl text-moonlight">Letters from the past</h2>
        <p className="sky-text mt-2 max-w-xl font-letter italic leading-relaxed text-lilac/90">
          People have always written to the future. On paper that had to survive attics, wars,
          and being forgotten. Here are three that made it.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {PAST_LETTERS.map((letter) => (
            <li key={letter.id}>
              <button
                onClick={() => setReading({ kind: "past", letter })}
                className="h-full w-full cursor-pointer rounded-md border border-dusk-soft/60 bg-dusk/60 px-5 py-5 text-left transition-all hover:border-lilac/50 hover:bg-dusk"
              >
                <p className="font-display text-sm text-firefly/90">{letter.era}</p>
                <p className="mt-1.5 font-display text-lg leading-snug text-moonlight">
                  to {letter.to}
                </p>
                <p className="mt-2 font-letter text-sm italic text-lilac/80">{letter.from}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
