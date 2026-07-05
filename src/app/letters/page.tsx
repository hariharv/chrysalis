import type { Metadata } from "next";
import { LettersClient } from "./LettersClient";

export const metadata: Metadata = {
  title: "Your letters",
  description:
    "The vault: your sealed letters, each keeping its date — and a few letters from the past.",
};

export default function LettersPage() {
  return <LettersClient />;
}
