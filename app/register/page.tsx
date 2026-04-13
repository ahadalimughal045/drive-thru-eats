'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { ArrowLeft, User, Lock, Mail, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
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

    setLoading(true);
    const result = await register({ name, email, password });
    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Registration failed');
      if (result.detail) {
        console.error('Registration Detail:', result.detail);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-brand-bg skew-x-12 -translate-x-1/4 hidden lg:block" />
      <div className="absolute top-40 right-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl animate-pulse" />

      <div className="w-full max-w-xl relative">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/login" className="group flex items-center gap-2 text-brand-muted hover:text-brand-red transition-all font-bold text-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
            Back to Login
          </Link>
          <img src="https://drive-thrueats.online/logo.png" alt="Logo" className="h-10 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" />
        </div>

        <div className="glass p-8 md:p-12 rounded-4xl border-white shadow-premium animate-slide-up">
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-black text-brand-text mb-2 tracking-tighter">Join the <span className="text-brand-red">Club.</span></h1>
            <p className="text-brand-muted font-medium">Create an account and start ordering legendary flavors.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-fade-in uppercase tracking-wider">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Confirm</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-5 shadow-premium mt-4">
              Create Account <ChevronRight size={20} />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-brand-border text-center">
            <p className="text-sm font-bold text-brand-muted">
              Already a member?{' '}
              <Link href="/login" className="text-brand-red hover:underline ml-1">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
