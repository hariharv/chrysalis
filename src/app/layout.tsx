import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import Link from "next/link";
import { SpaceBackground } from "@/components/SpaceBackground";
import "./globals.css";

const fraunces = Fraunces({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Chrysalis: write to someone who doesn't exist yet",
    template: "%s · Chrysalis",
  },
  description:
    "A quiet place to write one letter to the future. To your future self, a kid who isn't here yet, a stranger in 2126. Seal it, and let it wait.",
  openGraph: {
    title: "Chrysalis: write to someone who doesn't exist yet",
    description: "Open the book. Write the letter. Seal it, and let it wait.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh antialiased">
        <SpaceBackground />
        <header className="absolute inset-x-0 top-0 z-40">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
            <Link href="/" className="group flex items-center gap-2.5" aria-label="Chrysalis home">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <circle cx="10" cy="10" r="5.5" fill="none" stroke="var(--color-firefly)" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="2" fill="var(--color-firefly)" />
              </svg>
              <span className="sky-text font-display text-lg tracking-wide text-white group-hover:text-firefly">
                Chrysalis
              </span>
            </Link>
            <nav className="flex items-center gap-5 sm:gap-7" aria-label="Primary">
              <Link
                href="/letters"
                className="sky-text font-letter text-sm tracking-wide text-white/85 transition-colors hover:text-white"
              >
                Your letters
              </Link>
              <Link
                href="/why"
                className="sky-text font-letter text-sm tracking-wide text-white/85 transition-colors hover:text-white"
              >
                Why
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
