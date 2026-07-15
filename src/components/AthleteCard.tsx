import { motion } from "framer-motion";
import type { Athlete } from "../data/athletes";
import { useTilt } from "../hooks/useTilt";
import { useAmbientAccent } from "../hooks/useAmbientAccent";

interface AthleteCardProps {
  athlete: Athlete;
  isSelected: boolean;
  onOpen: (athlete: Athlete) => void;
}

export function AthleteCard({ athlete, isSelected, onOpen }: AthleteCardProps) {
  const { ref, rotateX, rotateY, scale, glarePosition, glareOpacity, handlers } =
    useTilt<HTMLDivElement>();
  const { setAccent } = useAmbientAccent();
  const Icon = athlete.icon;

  function handleEnter(e: React.PointerEvent<HTMLDivElement>) {
    handlers.onPointerEnter(e);
    setAccent(athlete.accent);
  }

  function handleLeave() {
    handlers.onPointerLeave();
    setAccent(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(athlete);
    }
  }

  // While the profile for this athlete is open, this slot goes quiet: it
  // releases the shared layoutIds (image + name) to the profile and holds
  // just enough visual weight to keep the grid from reflowing.
  if (isSelected) {
    return (
      <div
        aria-hidden="true"
        className="rounded-2xl border border-white/5 bg-base-raised/40"
        style={{ aspectRatio: "3 / 4" }}
      />
    );
  }

  return (
    <motion.article
      layout
      className="group relative"
      style={{ perspective: 1200 }}
      onFocus={() => setAccent(athlete.accent)}
      onBlur={() => setAccent(null)}
    >
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`Open profile for ${athlete.name}, ${athlete.sport}`}
        onClick={() => onOpen(athlete)}
        onKeyDown={handleKeyDown}
        onPointerMove={handlers.onPointerMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-base-raised shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] outline-none focus-visible:ring-2 focus-visible:ring-ink/60"
      >
        {/* Portrait: duotone gradient + icon watermark stands in for a photograph */}
        <motion.div
          layoutId={`athlete-image-${athlete.id}`}
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            aspectRatio: "3 / 4",
            background: `linear-gradient(160deg, ${athlete.accent.from} 0%, ${athlete.accent.to} 100%)`,
          }}
        >
          <Icon
            className="h-2/5 w-2/5 text-black/20"
            strokeWidth={1}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-black/10" />

          {/* Specular glare: a soft highlight spot whose position tracks the
              pointer via the tilt hook's motion value, no re-renders needed */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: glareOpacity,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.6), transparent 45%)",
              backgroundSize: "70% 70%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: glarePosition,
            }}
          />
        </motion.div>

        <div className="relative flex flex-col gap-3 p-5">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-dim">
            {athlete.sport} <span className="mx-1.5 opacity-40">&middot;</span> {athlete.era}
          </p>
          <motion.h2
            layoutId={`athlete-name-${athlete.id}`}
            className="font-serif text-2xl leading-tight text-ink"
          >
            {athlete.name}
          </motion.h2>
          <p className="font-sans text-sm italic leading-snug text-ink-dim">
            &ldquo;{athlete.tagline}&rdquo;
          </p>
          <div className="mt-1 flex items-baseline gap-2 border-t border-white/10 pt-3">
            <span className="font-serif text-xl text-ink">{athlete.signatureStat.value}</span>
            <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-ink-dim">
              {athlete.signatureStat.label}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
