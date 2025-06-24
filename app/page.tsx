"use client";
import { StoreProvider } from "@/components/StoreProvider";
import { Counter } from "@/components/Counter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoreProvider>
        <Counter />
      </StoreProvider>
    </main>
  );
}
