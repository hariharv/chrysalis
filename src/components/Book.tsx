"use client";

/**
 * The hero object: an old book of knowledge, worn leather, gold tooling,
 * brass corners, raised spine bands, floating in the bright sky. The stage
 * prop swings the cover; the shuffle transition takes it from there.
 */

export type BookStage = "closed" | "opening";

interface BookProps {
  stage: BookStage;
}

function CornerCap({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const place = {
    tl: "left-0 top-0",
    tr: "right-0 top-0 rotate-90",
    bl: "left-0 bottom-0 -rotate-90",
    br: "right-0 bottom-0 rotate-180",
  }[pos];
  return (
    <svg
      viewBox="0 0 34 34"
      className={`absolute h-8 w-8 ${place}`}
      aria-hidden
    >
      <path d="M0 0 H30 L20 10 H10 V20 L0 30 Z" fill="#C89B4C" opacity="0.9" />
      <path d="M0 0 H30 L26 4 H4 V26 L0 30 Z" fill="#E8C377" opacity="0.9" />
      <circle cx="8" cy="8" r="1.6" fill="#7A5A24" />
    </svg>
  );
}

export function Book({ stage }: BookProps) {
  return (
    <div>
      <div className="book-scene">
        <div
          className="book h-80 w-56 sm:h-96 sm:w-68"
          data-stage={stage !== "closed" ? stage : undefined}
        >
          {/* page block, the centuries of pages */}
          <div className="absolute inset-0 rounded-r-md rounded-l-sm bg-paper-shade shadow-[inset_-3px_0_8px_rgba(46,36,64,0.2)]">
            <div
              className="absolute inset-y-1 right-0 w-2.5 rounded-r-md"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #F4EDDC 0 2px, #DCCFAF 2px 3px, #E9DFC8 3px 4px)",
              }}
            />
            <div
              className="absolute inset-x-2 bottom-0 h-2 rounded-b"
              style={{
                background:
                  "repeating-linear-gradient(to right, #F4EDDC 0 3px, #DCCFAF 3px 4px)",
              }}
            />
            <div className="ruled absolute inset-3 rounded-sm bg-paper px-4 py-5 [--line:1.6rem]">
              <p className="font-display text-sm italic text-ink-soft">Begin here.</p>
            </div>
          </div>

          {/* front cover, old leather */}
          <div className="book-cover">
            {/* outside */}
            <div
              className="absolute inset-0 rounded-r-md rounded-l-sm"
              style={{
                background:
                  "radial-gradient(ellipse 120% 90% at 30% 20%, rgba(255,214,140,0.14), transparent 55%)," +
                  "radial-gradient(ellipse 90% 70% at 75% 85%, rgba(24,12,4,0.4), transparent 60%)," +
                  "radial-gradient(ellipse 50% 40% at 60% 30%, rgba(122,82,48,0.5), transparent 70%)," +
                  "linear-gradient(140deg, #7A5230 0%, #61401F 42%, #4A2F15 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(244,222,180,0.25), inset -14px 0 26px rgba(20,10,2,0.45), inset 4px 4px 18px rgba(0,0,0,0.25), 0 3px 8px rgba(6,26,42,0.5)",
                border: "1px solid rgba(46,26,8,0.8)",
                backfaceVisibility: "hidden",
              }}
            >
              {/* gold tooled double frame */}
              <div className="absolute inset-3 rounded-sm border border-[#C89B4C]/70" />
              <div className="absolute inset-[18px] rounded-sm border border-[#C89B4C]/35" />
              {/* brass corners */}
              <CornerCap pos="tl" />
              <CornerCap pos="tr" />
              <CornerCap pos="bl" />
              <CornerCap pos="br" />
              {/* clasp */}
              <div
                className="absolute -right-1 top-1/2 h-10 w-3 -translate-y-1/2 rounded-sm"
                style={{
                  background: "linear-gradient(90deg, #E8C377, #A87D33)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              />
              {/* emblem + title */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div
                    className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full"
                    style={{
                      border: "2px solid rgba(200,155,76,0.9)",
                      boxShadow:
                        "inset 0 0 12px rgba(200,155,76,0.3), 0 0 14px rgba(232,195,119,0.25)",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 20 20" aria-hidden>
                      <circle cx="10" cy="10" r="6.5" fill="none" stroke="#E8C377" strokeWidth="1.3" />
                      <circle cx="10" cy="10" r="2.2" fill="#E8C377" />
                      <path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" stroke="#C89B4C" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p
                    className="font-display text-[26px] tracking-[0.14em]"
                    style={{
                      color: "#E8C377",
                      textShadow: "0 1px 0 rgba(60,34,8,0.9), 0 0 14px rgba(232,195,119,0.3)",
                    }}
                  >
                    CHRYSALIS
                  </p>
                  <p className="mt-1.5 font-letter text-[11px] italic tracking-[0.22em] text-[#D9B575]/85">
                    LETTERS ACROSS TIME
                  </p>
                  <div className="mx-auto mt-3 h-px w-16 bg-[#C89B4C]/60" />
                  <p className="mt-2 font-letter text-[9px] tracking-[0.2em] text-[#C89B4C]/70">
                    EX LIBRIS · THE NOT-YET
                  </p>
                </div>
              </div>
              {/* spine with raised bands */}
              <div className="absolute inset-y-0 left-0 w-4 rounded-l-sm bg-gradient-to-r from-black/45 to-transparent" />
              {[18, 42, 66, 88].map((y) => (
                <div
                  key={y}
                  className="absolute left-0 h-1.5 w-4 rounded-r-full"
                  style={{
                    top: `${y}%`,
                    background: "linear-gradient(180deg, rgba(140,96,52,0.9), rgba(52,32,12,0.9))",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  }}
                />
              ))}
            </div>
            {/* inside of the cover */}
            <div
              className="absolute inset-0 rounded-l-md rounded-r-sm"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                background:
                  "radial-gradient(ellipse at 30% 30%, #F2EAD6, #E5D9BE 70%)",
              }}
            >
              <div className="absolute inset-3 rounded-sm border border-[#C8B992]/60" />
              <p className="absolute bottom-5 left-0 right-0 text-center font-letter text-[11px] italic text-ink-soft/70">
                whoever opens this, begins
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ground shadow */}
      <div
        className="book-shadow mx-auto mt-6 h-5 w-44 rounded-[50%] bg-[#0A2E4C]/50 blur-md sm:w-56"
        aria-hidden
      />
    </div>
  );
}
