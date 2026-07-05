/**
 * The bright sky, a day-lit nebula with drifting star fields and a far
 * planet. Fixed behind everything; two star layers wander in opposite
 * directions so the sky is always gently in motion. Deterministic positions,
 * pure CSS animation.
 */

function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function StarLayer({ seed, count, className }: { seed: number; count: number; className: string }) {
  return (
    <div className={`absolute inset-[-12%] ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const k = seed + i * 5;
        const size = (0.8 + rand(k + 2) * 2.4).toFixed(2);
        const bright = rand(k + 5) > 0.72;
        return (
          <span
            key={i}
            className="star bg-white"
            style={{
              left: `${(rand(k) * 100).toFixed(2)}%`,
              top: `${(rand(k + 1) * 100).toFixed(2)}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: (0.35 + rand(k + 3) * 0.6).toFixed(2),
              boxShadow: bright ? "0 0 8px 2px rgba(255,255,255,0.8)" : "0 0 3px rgba(255,255,255,0.5)",
              animation: `star-twinkle ${(2.4 + rand(k + 4) * 4).toFixed(1)}s ease-in-out ${(-rand(k + 6) * 5).toFixed(1)}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* the bright sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 30% 20%, #57AEDD 0%, transparent 55%)," +
            "radial-gradient(ellipse 80% 60% at 75% 70%, #2F86BC 0%, transparent 60%)," +
            "linear-gradient(180deg, #3E96C8 0%, #2A7CB2 48%, #175E92 100%)",
        }}
      />
      {/* nebula clouds, breathing slowly */}
      <div className="nebula" style={{ left: "8%", top: "10%", width: "46vw", height: "34vh", animationDelay: "0s" }} />
      <div className="nebula" style={{ left: "48%", top: "38%", width: "40vw", height: "30vh", animationDelay: "-9s" }} />
      <div className="nebula" style={{ left: "22%", top: "62%", width: "44vw", height: "28vh", animationDelay: "-17s" }} />
      {/* a far planet */}
      <div
        className="planet"
        style={{
          right: "7%",
          top: "24%",
          width: "min(15vw, 130px)",
          height: "min(15vw, 130px)",
        }}
      />
      {/* drifting star fields */}
      <StarLayer seed={11} count={44} className="stars-drift-a" />
      <StarLayer seed={77} count={30} className="stars-drift-b" />
      {/* soft vignette so text keeps its footing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 55%, transparent 55%, rgba(12,52,84,0.35) 100%)",
        }}
      />
    </div>
  );
}
