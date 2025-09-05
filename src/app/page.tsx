import { NeonSerpentGame } from '@/components/neon-serpent-game';
import { SnakeIcon } from '@/components/icons';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-background text-foreground p-4 overflow-hidden">
      <header className="w-full max-w-4xl text-center mb-4 md:mb-8">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter flex items-center justify-center gap-4 text-primary animate-pulse">
          <SnakeIcon className="w-10 h-10 md:w-12 md:h-12" />
          Neon Serpent
        </h1>
        <p className="text-muted-foreground mt-2 text-md md:text-lg">A modern twist on a classic arcade game.</p>
      </header>
      <main className="w-full flex justify-center">
        <Card className="border-primary/50 shadow-[0_0_30px_-5px_hsl(var(--primary))]">
          <NeonSerpentGame />
        </Card>
      </main>
      <footer className="w-full max-w-4xl text-center mt-4 md:mt-8 text-sm text-muted-foreground">
        <p className="hidden md:block">Use arrow keys to move. Press 'P' to pause. Press 'Space' to start.</p>
        <p className="md:hidden">Use on-screen controls to move.</p>
      </footer>
    </div>
  );
}
