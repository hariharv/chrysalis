import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why",
  description:
    "Why Chrysalis exists: we archive everything and address nothing. The case for writing to people who don't exist yet.",
};

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 font-letter text-lg leading-8 text-ink">{children}</p>;
}

export default function WhyPage() {
  return (
    <div className="relative min-h-dvh">
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 pt-28">
        <article className="paper-sheet rounded-md px-6 py-10 sm:px-12 sm:py-14">
          <p className="font-display text-sm italic text-ink-soft">
            a letter about the letters · July 2026
          </p>
          <h1 className="mt-3 font-display text-3xl leading-snug text-ink sm:text-4xl">
            Why write to someone who doesn&rsquo;t exist yet?
          </h1>

          <P>
            Dear reader —
          </P>
          <P>
            We are the most documented generation in history, and the least addressed. We keep
            everything: forty thousand photos, a decade of messages, backups of backups. Yet
            almost none of it was <em>meant</em> for anyone. It is evidence, not correspondence.
            When your granddaughter is thirty-one and terrified the way you were terrified,
            the cloud will offer her your brunch photos.
          </P>
          <P>
            The things worth saying across decades — what you hoped for someone, what an
            ordinary Tuesday felt like, what you would want a stranger in 2126 to know —
            almost never get written, because there has never been a natural <em>place</em> to
            write them. Diaries face backward. Social media faces sideways. Nothing faces
            forward.
          </P>
          <P>
            People who did it anyway gave us the most valuable documents families own: a
            grandmother&rsquo;s letter read at a wedding thirty years after her death, a
            father&rsquo;s note sealed on a millennium eve. Ask anyone who has one. They are not
            nostalgia. They are the closest thing we have to time travel — intention,
            delivered.
          </P>
          <P>
            Chrysalis is a place for exactly that, and deliberately nothing more. You open a
            book. You write one letter — to your future self, to a child not yet here, to
            whoever finds it. You choose the day it opens. You seal it, and it becomes a small
            gold light in a sky of letters, waiting.
          </P>
          <P>
            Two promises hold the whole thing up. <em>Your letters are private</em>: they live
            on your device, not on our servers — there are no servers. And{" "}
            <em>your letters must outlive us</em>: every sealed letter can be kept as a single
            self-contained file that needs no website, no account, and no company to survive —
            paper&rsquo;s durability, in the only format the digital world has kept readable
            for thirty years. The seal on it is a promise, not a prison; it asks you to keep
            the date the way sealed envelopes always have.
          </P>
          <P>
            The moonshot is not the software. It is the habit. A civilization that writes to
            its future is one that believes it has one — that treats the people of 2126 as
            neighbors instead of abstractions. Imagine it ordinary: a letter sealed at every
            birth, every wedding, every ending. A generation from now, the attics of the
            internet full of intention instead of exhaust.
          </P>
          <P>
            The book is open. Someone is going to be so glad you wrote.
          </P>
          <p className="mt-8 font-letter text-lg italic leading-8 text-ink">
            — Chrysalis
          </p>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-full border border-firefly/70 bg-firefly/10 px-7 py-3 font-display text-firefly transition-colors hover:bg-firefly hover:text-dusk-deep"
          >
            Write yours tonight
          </Link>
        </div>
      </div>
    </div>
  );
}
