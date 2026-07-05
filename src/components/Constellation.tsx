import type { Letter } from "@/lib/letters";
import { opensAtLabel } from "@/lib/letters";

/**
 * The waiting sky. Ambient stars are other people's someday-letters (in
 * spirit); the bright gold ones are yours. Deterministic layout — the sky
 * shouldn't rearrange itself between visits.
 */

function rand(seed: number): number {
  const x = Math.sin(seed * 91.7 + 47.3) * 24634.6345;
  return x - Math.floor(x);
}

interface ConstellationProps {
  letters: Letter[];
  highlightId?: string | null;
}

export function Constellation({ letters, highlightId }: ConstellationProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden={letters.length === 0}>
      {/* ambient sky */}
      {Array.from({ length: 46 }, (_, i) => {
        const size = (1 + rand(i * 3 + 2) * 1.6).toFixed(2);
        return (
          <span
            key={`a${i}`}
            className="star bg-moonlight/70"
            style={{
              left: `${(2 + rand(i * 3) * 96).toFixed(2)}%`,
              top: `${(3 + rand(i * 3 + 1) * 72).toFixed(2)}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: (0.14 + rand(i + 40) * 0.35).toFixed(3),
            }}
          />
        );
      })}
      {/* your letters */}
      {letters.map((letter, i) => {
        const highlighted = letter.id === highlightId;
        return (
          <span
            key={letter.id}
            className="star pointer-events-auto"
            title={`for ${letter.to} · sealed until ${opensAtLabel(letter.opensAt)}`}
            style={{
              left: `${(14 + rand(i * 7 + 3) * 72).toFixed(2)}%`,
              top: `${(8 + rand(i * 7 + 4) * 46).toFixed(2)}%`,
              width: highlighted ? "7px" : "5px",
              height: highlighted ? "7px" : "5px",
              background: "var(--color-firefly)",
              boxShadow: highlighted
                ? "0 0 18px 5px rgba(242,184,75,0.7)"
                : "0 0 10px 2px rgba(242,184,75,0.45)",
            }}
          />
        );
      })}
    </div>
  );
}
