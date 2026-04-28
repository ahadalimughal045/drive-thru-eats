'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        if (res.ok) router.replace('/admin');
      } catch {
        // Ignore network errors here; user stays on login page.
      }
    };
    verifySession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success && data.user) {
        router.replace('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-md w-full relative z-10">
        {/* Card */}
        <div className="glass rounded-[2.5rem] shadow-premium overflow-hidden border-white">
          {/* Header */}
          <div className="bg-brand-red p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-8 -mb-8 blur-xl" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tighter">Admin Portal</h1>
              <p className="text-red-100 text-xs mt-1 font-bold uppercase tracking-[0.3em]">
                Secure Access Only
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-4 py-3 rounded-xl text-center uppercase tracking-wider">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] ml-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-brand-border rounded-2xl focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none font-bold text-sm transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] ml-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-brand-border rounded-2xl focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red outline-none font-bold text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-5 rounded-2xl transition-all shadow-premium active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="animate-pulse">AUTHENTICATING...</span>
              ) : (
                <>
                  ACCESS DASHBOARD <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-10 pb-8 text-center">
            <a
              href="/"
              className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] hover:text-brand-red transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>

        <p className="text-center text-[10px] text-brand-muted font-bold uppercase tracking-[0.3em] mt-6">
          Drive Thru Eats — Admin Authentication
        </p>
      </div>
    </div>
  );
}

