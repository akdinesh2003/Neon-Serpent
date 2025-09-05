import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-background text-foreground p-4">
      <header className="w-full max-w-4xl text-center mb-8">
        <Skeleton className="h-16 w-96 mx-auto" />
        <Skeleton className="h-6 w-80 mx-auto mt-4" />
      </header>
      <main className="w-full flex justify-center">
        <Skeleton className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
      </main>
      <footer className="w-full max-w-4xl text-center mt-8">
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </footer>
    </div>
  );
}
