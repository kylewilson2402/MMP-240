import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Athlete } from "../data/athletes";

interface AthleteProfileProps {
  athlete: Athlete;
  onClose: () => void;
}

export function AthleteProfile({ athlete, onClose }: AthleteProfileProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const Icon = athlete.icon;

  useEffect(() => {
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Click-outside-to-close backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`athlete-name-${athlete.id}`}
        className="relative grid max-h-[90vh] w-full max-w-5xl grid-cols-1 overflow-y-auto rounded-3xl border border-white/10 bg-base-raised shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[minmax(0,0.85fr)_1fr] md:overflow-hidden"
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-ink backdrop-blur transition hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-ink/60"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Portrait panel — morphs continuously from the card via layoutId */}
        <motion.div
          layoutId={`athlete-image-${athlete.id}`}
          className="relative flex items-center justify-center"
          style={{
            aspectRatio: "3 / 4",
            background: `linear-gradient(160deg, ${athlete.accent.from} 0%, ${athlete.accent.to} 100%)`,
          }}
        >
          <Icon className="h-1/3 w-1/3 text-black/20" strokeWidth={1} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-raised via-transparent to-black/10 md:bg-gradient-to-r" />
        </motion.div>

        <div className="flex flex-col gap-6 p-8 md:p-12">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-ink-dim">
              {athlete.sport} <span className="mx-2 opacity-40">&middot;</span> {athlete.era}
            </p>
            <motion.h1
              layoutId={`athlete-name-${athlete.id}`}
              id={`athlete-name-${athlete.id}`}
              className="mt-2 font-serif text-4xl leading-[1.05] text-ink md:text-5xl"
            >
              {athlete.name}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="border-l-2 border-white/20 pl-5 font-serif text-2xl italic leading-snug text-ink md:text-3xl"
          >
            &ldquo;{athlete.tagline}&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="flex items-baseline gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 w-fit"
          >
            <span className="font-serif text-3xl text-ink">{athlete.signatureStat.value}</span>
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-ink-dim">
              {athlete.signatureStat.label}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            className="flex flex-col gap-4 font-sans text-[15px] leading-relaxed text-ink-dim"
          >
            {athlete.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
