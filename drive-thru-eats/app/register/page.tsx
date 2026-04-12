'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { ArrowLeft, User, Lock, Mail } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    register({ name, email });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-brand-bg py-12 flex flex-col items-center">
      <div className="w-full max-w-md px-4 mt-6">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/login" className="text-brand-muted hover:text-brand-text transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-brand-text" style={{ fontFamily: 'Georgia, serif' }}>Create Account</h1>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">{error}</div>}
            
            <div>
              <label className="text-brand-text font-semibold text-sm block mb-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-brand-text font-semibold text-sm block mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-brand-text font-semibold text-sm block mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-brand-text font-semibold text-sm block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-3 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red text-sm transition-colors"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all mt-2">
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-brand-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-orange font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
