import { NeonSerpentGame } from '@/components/neon-serpent-game';
import { SnakeIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-background text-foreground p-4 overflow-hidden antialiased">
      <header className="w-full max-w-4xl text-center mb-4 md:mb-8">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter flex items-center justify-center gap-4 text-primary animate-pulse drop-shadow-[0_0_15px_hsl(var(--primary))]">
          <SnakeIcon className="w-10 h-10 md:w-14 md:h-14" />
          Neon Serpent
        </h1>
        <p className="text-muted-foreground mt-3 text-md md:text-lg tracking-wide">A modern twist on a classic arcade game.</p>
      </header>
      <main className="w-full flex justify-center px-4">
        <NeonSerpentGame />
      </main>
      <footer className="w-full max-w-4xl text-center mt-4 md:mt-8 text-sm text-muted-foreground">
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <span className="hidden md:inline">Use <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">ARROW KEYS</kbd> to move.</span>
          <span className="hidden md:inline">Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">P</kbd> to pause.</span>
          <span className="hidden md:inline">Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">SPACE</kbd> to start.</span>
        </div>
        <p className="md:hidden">Use on-screen controls to move.</p>
      </footer>
    </div>
  );
}
