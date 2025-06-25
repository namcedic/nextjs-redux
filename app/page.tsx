"use client";
import { StoreProvider } from "@/components/StoreProvider";
import { Counter } from "@/components/Counter";
import Test from '@/components/Test'
import ProductPage from '@/components/Products'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      {/*<StoreProvider>*/}
        {/*<Counter />*/}
      {/*</StoreProvider>*/}
      {/*<Test />*/}
        <ProductPage />
    </main>
  );
}
