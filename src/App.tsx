import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { athletes, type Athlete } from "./data/athletes";
import { AmbientAccentProvider } from "./hooks/useAmbientAccent";
import { BackgroundField } from "./components/BackgroundField";
import { Masthead } from "./components/Masthead";
import { AthleteCard } from "./components/AthleteCard";
import { AthleteProfile } from "./components/AthleteProfile";

function App() {
  const [selected, setSelected] = useState<Athlete | null>(null);

  return (
    <AmbientAccentProvider>
      <BackgroundField />
      <div className="relative min-h-screen">
        <Masthead />
        <main className="mx-auto max-w-6xl px-6 pb-24">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {athletes.map((athlete) => (
              <li key={athlete.id}>
                <AthleteCard
                  athlete={athlete}
                  isSelected={selected?.id === athlete.id}
                  onOpen={setSelected}
                />
              </li>
            ))}
          </ul>
        </main>
        <footer className="mx-auto max-w-6xl px-6 pb-12 text-center font-sans text-xs uppercase tracking-[0.3em] text-ink-dim/60">
          The Hall of Fame &mdash; An Editorial Tribute
        </footer>
      </div>

      <AnimatePresence>
        {selected && (
          <AthleteProfile athlete={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </AmbientAccentProvider>
  );
}

export default App;
