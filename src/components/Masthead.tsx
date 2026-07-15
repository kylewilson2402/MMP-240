export function Masthead() {
  return (
    <header className="mx-auto max-w-6xl px-6 pb-14 pt-16 text-center md:pt-24">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.4em] text-ink-dim">
        Volume I &mdash; The Immortals Issue
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight text-ink md:text-7xl">
        The Hall of Fame
      </h1>
      <div className="mx-auto mt-6 h-px w-24 bg-white/20" />
      <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-ink-dim md:text-base">
        Six careers that redefined what a body could do under pressure.
        A field guide to greatness, one profile at a time.
      </p>
    </header>
  );
}
