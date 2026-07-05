import type { Metadata } from "next";
import { LettersClient } from "./LettersClient";

export const metadata: Metadata = {
  title: "Your letters",
  description:
    "Your vault: the letters you've sealed, each one counting down to its day, plus a few letters from the past.",
};

export default function LettersPage() {
  return <LettersClient />;
}
