'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { ArrowLeft, User, Lock, Mail, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-bg -skew-x-12 translate-x-1/4 hidden lg:block" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="w-full max-w-xl relative">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-brand-muted hover:text-brand-red transition-all font-bold text-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all">
              <ArrowLeft size={18} />
            </div>
            Back to Menu
          </Link>
          <img src="https://drive-thrueats.online/logo.png" alt="Logo" className="h-10 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" />
        </div>

        <div className="glass p-8 md:p-12 rounded-4xl border-white shadow-premium animate-slide-up">
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-black text-brand-text mb-2 tracking-tighter">Welcome <span className="text-brand-red">Back.</span></h1>
            <p className="text-brand-muted font-medium">Please enter your details to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-fade-in uppercase tracking-wider">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Email Address</label>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-2">
                <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">Password</label>
                <Link href="#" className="text-[10px] font-black text-brand-red uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
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

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-5 shadow-premium mt-4 disabled:opacity-70"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Sign In <ChevronRight size={20} /></>}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-brand-border text-center">
            <p className="text-sm font-bold text-brand-muted">
              New here?{' '}
              <Link href="/register" className="text-brand-red hover:underline ml-1">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
