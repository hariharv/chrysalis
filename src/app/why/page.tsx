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
            why I made this · July 2026
          </p>
          <h1 className="mt-3 font-display text-3xl leading-snug text-ink sm:text-4xl">
            Why write to someone who doesn&rsquo;t exist yet?
          </h1>

          <P>
            We&rsquo;re the most documented generation ever, and somehow the least addressed. We
            save everything: forty thousand photos, years of messages, backups of our backups.
            But almost none of it was actually <em>meant</em> for anyone. It&rsquo;s a record,
            not a letter. When your granddaughter is thirty-one and scared the same way you were
            once scared, all the cloud has for her is your brunch photos.
          </P>
          <P>
            The stuff that&rsquo;s actually worth saying across a lifetime almost never gets
            written down. What you hoped for someone. What an ordinary Tuesday felt like. What
            you&rsquo;d want a stranger in 2126 to know about you. There&rsquo;s just never been
            a good <em>place</em> to write it. Diaries look backward. Social media looks
            sideways. Nothing looks forward.
          </P>
          <P>
            The people who wrote it anyway left behind some of the most treasured things
            families own. A grandmother&rsquo;s letter read out loud at a wedding, thirty years
            after she was gone. A dad&rsquo;s note sealed on New Year&rsquo;s Eve. Ask anyone who
            has one of these. They&rsquo;re not just keepsakes. They&rsquo;re the closest thing
            we&rsquo;ve got to time travel.
          </P>
          <P>
            Chrysalis is a place to do exactly that, and honestly nothing more. You open a book.
            You write one letter, to your future self, to a kid who isn&rsquo;t here yet, to
            whoever finds it. You pick the day it opens. You seal it, and it turns into a little
            light in the sky, waiting.
          </P>
          <P>
            Two things matter to me here. First, your letters are yours. They stay on your
            device, not on some server, because there is no server. Second, your letters should
            outlast me. Every one you seal can be saved as a single file that doesn&rsquo;t need
            this website, an account, or any company to keep working. It&rsquo;s about as durable
            as paper, in the one digital format that&rsquo;s still readable thirty years later.
            The lock on it is a promise, not a prison. It just asks you to wait for the date, the
            way a sealed envelope always did.
          </P>
          <P>
            The big idea isn&rsquo;t the app. It&rsquo;s the habit. A world that writes to its own
            future is a world that believes it has one, that treats the people of 2126 like
            neighbors instead of strangers. Picture it as normal: a letter sealed at every birth,
            every wedding, every goodbye. A generation from now, the internet full of things
            people actually meant.
          </P>
          <P>
            The book&rsquo;s open. Someone out there is going to be really glad you wrote.
          </P>
          <p className="mt-8 font-letter text-lg italic leading-8 text-ink">
            Chrysalis
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
