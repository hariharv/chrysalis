"use client";

import { useEffect, useState } from "react";

/**
 * The ritual: the letter folds, the wax takes the stamp, and what was a page
 * becomes a small gold light that leaves for the constellation. Timed CSS
 * animations, chained gently; reduced-motion users get a quiet crossfade.
 */

interface SealingSceneProps {
  to: string;
  onDone: () => void;
}

const WAX_MS = 1550; // fold (850ms) + wax stamp
const FLY_MS = 2900; // + flight to the constellation

export function SealingScene({ to, onDone }: SealingSceneProps) {
  const [phase, setPhase] = useState<"fold" | "fly">("fold");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    const flyT = setTimeout(() => setPhase("fly"), WAX_MS + 250);
    const doneT = setTimeout(onDone, FLY_MS);
    return () => {
      clearTimeout(flyT);
      clearTimeout(doneT);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-dusk-deep/85 backdrop-blur-sm">
      <div className={phase === "fly" ? "seal-fly" : undefined}>
        <div className="seal-fold relative w-72 rounded-sm bg-paper px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.5)] sm:w-80">
          <p className="font-display text-sm italic text-ink-soft">for {to}</p>
          <div className="ruled mt-3 h-24 [--line:1.5rem]" aria-hidden />
          {/* the wax seal */}
          <div
            className="seal-wax absolute -bottom-6 left-1/2 -ml-7 grid h-14 w-14 place-items-center rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #D26A5F, #B4443C 58%, #8E2F28 100%)",
              boxShadow: "0 6px 18px rgba(142,47,40,0.5), inset 0 2px 4px rgba(255,255,255,0.25)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <circle cx="10" cy="10" r="6" fill="none" stroke="#F7F1E5" strokeWidth="1.3" />
              <circle cx="10" cy="10" r="2" fill="#F7F1E5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="sr-only" role="status">
        Sealing your letter
      </p>
    </div>
  );
}
