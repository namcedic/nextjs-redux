'use client';

import { useAuth } from 'src/context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-2xl font-bold">Hello, {user?.email}</h1>
      <button onClick={logout} className="mt-4 bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
