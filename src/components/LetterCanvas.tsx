"use client";

import { useEffect, useRef, useState } from "react";
import { opensAtLabel, yearsFromNow } from "@/lib/letters";

/**
 * The open page. Three gentle decisions: who it's for, the words, and when
 * it opens. Nothing else.
 */

const TO_CHIPS = [
  "my future self",
  "a child not yet here",
  "someone I love",
  "a stranger in 2126",
];

const WHEN_CHIPS = [
  { label: "in 1 year", years: 1 },
  { label: "in 10 years", years: 10 },
  { label: "in 25 years", years: 25 },
  { label: "in 100 years", years: 100 },
] as const;

export interface DraftLetter {
  to: string;
  body: string;
  opensAt: Date;
}

interface LetterCanvasProps {
  onSeal: (draft: DraftLetter) => void;
  onClose: () => void;
}

export function LetterCanvas({ onSeal, onClose }: LetterCanvasProps) {
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [years, setYears] = useState<number>(25);
  const [customDate, setCustomDate] = useState<string>("");
  const [nudge, setNudge] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bodyRef.current?.focus();
  }, []);

  const opensAt = customDate ? new Date(`${customDate}T09:00:00`) : yearsFromNow(years);
  const customValid = !customDate || opensAt.getTime() > Date.now();
  const ready = body.trim().length >= 3 && customValid;

  const seal = () => {
    if (!ready) {
      setNudge(true);
      bodyRef.current?.focus();
      return;
    }
    onSeal({ to: to.trim() || "whoever finds this", body, opensAt });
  };

  const grow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 208)}px`;
  };

  return (
    <div className="fade-in fixed inset-0 z-50 overflow-y-auto bg-dusk-deep/70 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-3xl items-start justify-center px-4 py-8 sm:items-center">
        <div
          className="paper-sheet relative w-full rounded-md px-6 py-8 sm:px-12 sm:py-12"
          style={{ colorScheme: "light" }}
        >
          <button
            onClick={onClose}
            aria-label="Close the book without sealing"
            className="absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-shade hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <p className="font-display text-sm italic text-ink-soft">A letter, begun tonight</p>

          {/* To */}
          <div className="mt-6">
            <label htmlFor="letter-to" className="font-display text-lg text-ink">
              To —
            </label>
            <input
              id="letter-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="anyone the future holds"
              className="mt-1 w-full border-b border-rule bg-transparent pb-1.5 font-letter text-xl italic text-ink placeholder:text-ink-soft/50 focus:border-firefly focus:outline-none"
            />
            <div className="mt-2.5 flex flex-wrap gap-2">
              {TO_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setTo(chip)}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 font-letter text-sm transition-colors ${
                    to === chip
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink-soft hover:border-ink-soft hover:text-ink"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="mt-8">
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setNudge(false);
                grow(e.target);
              }}
              placeholder="Tell them what tonight is like. What you hope. What you'd want them to know about being you, here, now…"
              aria-label="Your letter"
              className="ruled min-h-52 w-full resize-none overflow-hidden bg-transparent font-letter text-lg leading-8 text-ink [--line:2rem] placeholder:italic placeholder:text-ink-soft/45 focus:outline-none"
            />
            {nudge ? (
              <p className="mt-1 font-letter text-sm italic text-wax">
                even three words will matter.
              </p>
            ) : null}
          </div>

          {/* When */}
          <div className="mt-8">
            <p className="font-display text-lg text-ink">It opens —</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {WHEN_CHIPS.map((chip) => (
                <button
                  key={chip.years}
                  onClick={() => {
                    setYears(chip.years);
                    setCustomDate("");
                  }}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 font-letter text-sm transition-colors ${
                    !customDate && years === chip.years
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink-soft hover:border-ink-soft hover:text-ink"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
              <label className="flex cursor-pointer items-center gap-2 rounded-full border border-rule px-3 py-1.5 font-letter text-sm text-ink-soft transition-colors hover:border-ink-soft hover:text-ink">
                on a day
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  aria-label="Pick the exact day the letter opens"
                  className="cursor-pointer bg-transparent font-letter text-ink focus:outline-none"
                />
              </label>
            </div>
            <p className="mt-2 font-letter text-sm italic text-ink-soft">
              {customValid ? (
                <>that&rsquo;s {opensAtLabel(opensAt.toISOString())}</>
              ) : (
                <span className="text-wax">that day has already happened — pick a day still to come</span>
              )}
            </p>
          </div>

          {/* Seal */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-60 font-letter text-xs leading-relaxed text-ink-soft">
              Letters stay on this device. After sealing you can keep a copy anywhere.
            </p>
            <button
              onClick={seal}
              className={`cursor-pointer rounded-full px-7 py-3 font-display text-base transition-all ${
                ready
                  ? "bg-ink text-paper shadow-[0_10px_30px_rgba(46,36,64,0.35)] hover:bg-dusk-soft hover:shadow-[0_12px_36px_rgba(46,36,64,0.45)]"
                  : "bg-paper-shade text-ink-soft"
              }`}
            >
              Seal the letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
