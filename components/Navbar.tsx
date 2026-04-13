'use client';
import Link from 'next/link';
import { ShoppingCart, Phone, Menu, X, LogOut, Heart, User } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useState, useEffect } from 'react';
import { categories } from '@/data/menu';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`glass rounded-2xl transition-all duration-300 border-white/40 shadow-premium ${
            scrolled ? 'bg-white/90 px-4' : 'bg-white/70 px-6'
          } flex items-center justify-between h-16 lg:h-20`}>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="https://drive-thrueats.online/logo.png" 
                alt="Logo" 
                className="h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/dining" className="text-sm font-bold text-brand-text hover:text-brand-red transition-all flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-base">🍽️</span>
                Book Table
              </Link>
              
              <a href="tel:+919682387952" className="flex items-center gap-2 text-brand-text hover:text-brand-red transition-colors text-sm font-bold">
                <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-red">
                  <Phone size={14} fill="currentColor" />
                </div>
                Support
              </a>

              <div className="h-8 w-px bg-brand-border mx-2" />

              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 pr-4 border-r border-brand-border">
                      <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center font-bold shadow-soft">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-brand-muted">Welcome</span>
                        <span className="text-sm font-black text-brand-text leading-tight">{user.name}</span>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2.5 text-brand-muted hover:text-brand-red transition-all rounded-xl hover:bg-brand-red/5"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 text-sm font-bold text-brand-text hover:text-brand-red transition-all">
                    <User size={18} />
                    Login
                  </Link>
                )}

                <Link href="/cart" className="relative group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-text text-white flex items-center justify-center group-hover:bg-brand-red transition-all shadow-premium group-hover:scale-110">
                    <ShoppingCart size={22} />
                  </div>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-accent text-brand-text text-[10px] font-black rounded-full h-6 px-2 flex items-center justify-center border-2 border-white shadow-soft animate-bounce-soft">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-4">
              <Link href="/cart" className="relative w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-text">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[8px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setMobileOpen(!mobileOpen)} 
                className="w-10 h-10 rounded-xl bg-brand-text text-white flex items-center justify-center shadow-soft"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 animate-slide-up">
            <div className="glass rounded-3xl overflow-hidden shadow-premium border-white/50">
              <div className="p-6 space-y-6">
                {user ? (
                  <div className="flex items-center justify-between p-4 bg-brand-bg rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-black text-brand-text">{user.name}</span>
                    </div>
                    <button onClick={logout} className="text-xs font-bold text-brand-red uppercase tracking-widest">Logout</button>
                  </div>
                ) : (
                  <Link 
                    onClick={() => setMobileOpen(false)} 
                    href="/login" 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-brand-text text-white rounded-2xl font-bold shadow-premium"
                  >
                    <User size={18} /> Login / Register
                  </Link>
                )}

                <div className="grid grid-cols-1 gap-2">
                  <Link href="/dining" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-4 hover:bg-brand-bg rounded-2xl transition-colors group">
                    <span className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center group-hover:scale-110 transition-transform">🍽️</span>
                    <span className="font-bold text-brand-text">Book Dining Table</span>
                  </Link>
                  <a href="tel:+919682387952" className="flex items-center gap-3 p-4 hover:bg-brand-bg rounded-2xl transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone size={18} />
                    </div>
                    <span className="font-bold text-brand-text">Call for Support</span>
                  </a>
                </div>

                <div className="space-y-4 pt-4 border-t border-brand-border">
                  <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] pl-2">Quick Menu</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.slice(0, 4).map(cat => (
                      <a
                        key={cat.id}
                        href={`/#${cat.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex flex-col items-center gap-2 p-4 bg-brand-bg rounded-2xl hover:bg-white hover:shadow-soft transition-all"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-bold text-brand-text">{cat.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer removed as nav is now cleaner without fixed bar background */}
    </>
  );
}
