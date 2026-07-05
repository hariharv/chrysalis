"use client";

/**
 * The metamorphosis: pages burst from the opened book and shuffle across the
 * whole screen like a dealt deck, then a paper wash covers everything and
 * the writing canvas is simply there. Pure CSS keyframes; each card carries
 * its own flight path in custom properties.
 */

function rand(seed: number): number {
  const x = Math.sin(seed * 61.3 + 133.7) * 15731.743;
  return x - Math.floor(x);
}

const CARD_COUNT = 11;

export function ShuffleTransition() {
  return (
    <div className="fixed inset-0 z-[45] overflow-hidden" aria-hidden>
      {Array.from({ length: CARD_COUNT }, (_, i) => {
        const k = i * 9;
        // mid-flight scatter, then a wider landing, half sweep left, half right
        const side = i % 2 === 0 ? 1 : -1;
        const mx = side * (12 + rand(k) * 26);
        const my = -14 + rand(k + 1) * 30;
        const mr = side * (10 + rand(k + 2) * 26);
        const tx = side * (24 + rand(k + 3) * 42);
        const ty = -32 + rand(k + 4) * 72;
        const tr = -side * (8 + rand(k + 5) * 30);
        const delay = i * 0.055;
        return (
          <div
            key={i}
            className="shuffle-card h-[52vmin] w-[38vmin] rounded-[6px] bg-paper shadow-[0_18px_50px_rgba(10,42,66,0.45)]"
            style={{
              ["--mx" as string]: `${mx.toFixed(1)}vw`,
              ["--my" as string]: `${my.toFixed(1)}vh`,
              ["--mr" as string]: `${mr.toFixed(1)}deg`,
              ["--tx" as string]: `${tx.toFixed(1)}vw`,
              ["--ty" as string]: `${ty.toFixed(1)}vh`,
              ["--tr" as string]: `${tr.toFixed(1)}deg`,
              ["--ts" as string]: (1 + rand(k + 6) * 0.35).toFixed(2),
              ["--delay" as string]: `${delay.toFixed(3)}s`,
            }}
          >
            <div className="ruled absolute inset-[8%] [--line:1.4rem] opacity-70" />
          </div>
        );
      })}
      {/* the wash, one page grows until it is the whole world */}
      <div className="shuffle-wash" style={{ ["--delay" as string]: "0.82s" }} />
    </div>
  );
}
