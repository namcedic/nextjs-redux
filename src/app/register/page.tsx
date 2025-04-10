'use client';

import { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import { isValidEmail } from 'src/utils/validators';
import type { AppError } from 'src/types/Error';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }
    
    try {
      await register(email, password);
    } catch (err: unknown) {
      const typedError = err as AppError;
      setError(typedError.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} noValidate className="bg-white text-black p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 w-full rounded">Register</button>
      </form>
    </div>
  );
}
