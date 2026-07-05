"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Book, type BookStage } from "./Book";
import { Constellation } from "./Constellation";
import { LetterCanvas, type DraftLetter } from "./LetterCanvas";
import { SealingScene } from "./SealingScene";
import { ShuffleTransition } from "./ShuffleTransition";
import {
  keepsakeHtml,
  loadLetters,
  makeLetter,
  opensAtLabel,
  saveLetter,
  type Letter,
} from "@/lib/letters";

/**
 * One evening, six scenes: the sky and its book · the opening · the shuffle
 * of pages across the screen · the page · the sealing · the sky, one light
 * heavier.
 */

type Scene = "sky" | "opening" | "shuffle" | "write" | "sealing" | "sealed";

const OPEN_MS = 720; // cover swing head start
const SHUFFLE_MS = 1500; // pages crossing the screen
const WASH_OUT_MS = 600; // paper wash dissolving into the canvas

export function HomeExperience() {
  const [scene, setScene] = useState<Scene>("sky");
  const [bookStage, setBookStage] = useState<BookStage>("closed");
  const [washOut, setWashOut] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [justSealed, setJustSealed] = useState<Letter | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setLetters(loadLetters());
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const openBook = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScene("write");
      return;
    }
    setScene("opening");
    setBookStage("opening");
    timers.current.push(
      setTimeout(() => setScene("shuffle"), OPEN_MS),
      setTimeout(() => {
        setScene("write");
        setWashOut(true);
      }, OPEN_MS + SHUFFLE_MS),
      setTimeout(() => setWashOut(false), OPEN_MS + SHUFFLE_MS + WASH_OUT_MS),
    );
  }, []);

  const handleSeal = useCallback((draft: DraftLetter) => {
    const letter = makeLetter({ to: draft.to, body: draft.body, opensAt: draft.opensAt });
    setLetters(saveLetter(letter));
    setJustSealed(letter);
    setScene("sealing");
  }, []);

  const handleSealed = useCallback(() => {
    setScene("sealed");
    setBookStage("closed");
  }, []);

  const keepCopy = useCallback((letter: Letter) => {
    const blob = new Blob([keepsakeHtml(letter)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `letter-for-${letter.to.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const showShuffle = scene === "shuffle" || (scene === "write" && washOut);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {(scene === "sealed" || scene === "sky") && (
        <Constellation letters={letters} highlightId={justSealed?.id ?? null} />
      )}

      {/* Scene: the sky and its book */}
      {(scene === "sky" || scene === "opening" || scene === "shuffle") && (
        <section className="relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center px-5 pb-16 pt-24 text-center">
          <h1
            className={`sky-text font-display text-4xl leading-tight text-moonlight transition-opacity duration-700 sm:text-6xl ${
              scene === "sky" ? "opacity-100" : "opacity-0"
            }`}
          >
            Write to someone
            <br />
            who doesn&rsquo;t exist yet.
          </h1>
          <p
            className={`sky-text mt-5 max-w-xl font-letter text-lg italic leading-relaxed text-lilac transition-opacity duration-500 sm:text-xl ${
              scene === "sky" ? "opacity-100" : "opacity-0"
            }`}
          >
            Your future self. A child not yet here. A stranger in 2126.{" "}
            <br className="hidden sm:block" />
            One letter, sealed tonight, waiting for its day.
          </p>

          <div className="mt-12 sm:mt-14">
            <Book stage={bookStage} />
          </div>

          <button
            onClick={openBook}
            disabled={scene !== "sky"}
            className={`mt-12 cursor-pointer rounded-full border border-firefly bg-firefly/15 px-8 py-3.5 font-display text-lg text-white shadow-[0_4px_30px_rgba(14,58,92,0.35)] backdrop-blur-[2px] transition-all duration-300 [text-shadow:0_1px_8px_rgba(14,58,92,0.5)] hover:bg-firefly hover:text-dusk-deep hover:[text-shadow:none] ${
              scene === "sky" ? "opacity-100" : "opacity-0"
            }`}
          >
            Open the book
          </button>
          {letters.length > 0 && scene === "sky" ? (
            <p className="sky-text mt-6 font-letter text-sm italic text-lilac">
              {letters.length === 1
                ? "one letter of yours is already waiting in this sky"
                : `${letters.length} letters of yours are already waiting in this sky`}
            </p>
          ) : null}
        </section>
      )}

      {/* Scene: pages shuffling across the whole screen */}
      {showShuffle ? (
        <div
          className={washOut ? "opacity-0 transition-opacity duration-500" : undefined}
        >
          <ShuffleTransition />
        </div>
      ) : null}

      {/* Scene: the page */}
      {scene === "write" && (
        <LetterCanvas
          onSeal={handleSeal}
          onClose={() => {
            setScene("sky");
            setBookStage("closed");
          }}
        />
      )}

      {/* Scene: the sealing */}
      {scene === "sealing" && justSealed ? (
        <SealingScene to={justSealed.to} onDone={handleSealed} />
      ) : null}

      {/* Scene: the sky, one light heavier */}
      {scene === "sealed" && justSealed ? (
        <section className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="rise-in sky-text font-display text-sm uppercase tracking-[0.25em] text-firefly">
            sealed
          </p>
          <h2
            className="rise-in sky-text mt-4 font-display text-3xl leading-snug text-moonlight sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            It waits for {opensAtLabel(justSealed.opensAt)}.
          </h2>
          <p
            className="rise-in sky-text mt-5 max-w-md font-letter text-lg italic leading-relaxed text-lilac"
            style={{ animationDelay: "240ms" }}
          >
            Your letter is a small gold light in this sky now — for {justSealed.to}. It goes in
            as <em>now</em>. It comes out as <em>someday</em>.
          </p>
          <div
            className="rise-in mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "380ms" }}
          >
            <button
              onClick={() => keepCopy(justSealed)}
              className="cursor-pointer rounded-full bg-firefly px-6 py-3 font-display text-base text-dusk-deep shadow-[0_6px_24px_rgba(14,58,92,0.35)] transition-all hover:shadow-[0_6px_36px_rgba(245,192,68,0.5)]"
            >
              Keep a copy
            </button>
            <Link
              href="/letters"
              className="rounded-full border border-white/60 bg-dusk-deep/30 px-6 py-3 font-display text-base text-white backdrop-blur-[2px] transition-colors hover:bg-dusk-deep/60"
            >
              Visit your vault
            </Link>
            <button
              onClick={() => setScene("write")}
              className="cursor-pointer rounded-full border border-white/60 bg-dusk-deep/30 px-6 py-3 font-display text-base text-white backdrop-blur-[2px] transition-colors hover:bg-dusk-deep/60"
            >
              Write another
            </button>
          </div>
          <p
            className="rise-in sky-text mt-8 max-w-sm font-letter text-xs leading-relaxed text-lilac"
            style={{ animationDelay: "500ms" }}
          >
            The copy is a single file that needs no website and no company to survive — a
            keepsake that keeps the promise for you.
          </p>
        </section>
      ) : null}
    </div>
  );
}
