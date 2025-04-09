import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Auth Frontend</h1>
      <div className="flex gap-4">
        <Link href="/login" className="bg-blue-500 px-4 py-2 rounded text-white">Login</Link>
        <Link href="/register" className="bg-green-500 px-4 py-2 rounded text-white">Register</Link>
      </div>
    </main>
  );
}
