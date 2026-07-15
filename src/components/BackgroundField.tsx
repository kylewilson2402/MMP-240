import { AnimatePresence, motion } from "framer-motion";
import { useAmbientAccent } from "../hooks/useAmbientAccent";

/**
 * Fixed, full-viewport ambient background. Sits behind all content and
 * cross-fades (opacity only, so it's cheap) between the neutral base tone
 * and a soft radial tint built from the currently hovered athlete's accent
 * colors. Each accent gets its own layer keyed by color pair so
 * AnimatePresence can overlap the fade-out of the old tint with the
 * fade-in of the new one instead of ever showing a hard cut.
 */
export function BackgroundField() {
  const { accent } = useAmbientAccent();
  const key = accent ? `${accent.from}-${accent.to}` : "base";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base">
      <AnimatePresence>
        <motion.div
          key={key}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{
            background: accent
              ? `radial-gradient(120% 90% at 50% -10%, ${accent.from}33 0%, ${accent.to}22 35%, transparent 70%)`
              : "radial-gradient(120% 90% at 50% -10%, #1a1720 0%, transparent 65%)",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
