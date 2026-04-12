'use client';
import Link from 'next/link';
import { ShoppingCart, Phone, Menu, X, LogOut, UtensilsCrossed } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useState } from 'react';
import { categories } from '@/data/menu';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-surface border-b border-brand-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="https://drive-thrueats.online/logo.png" alt="Drive Thru Eats Logo" className="h-[46px] w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/dining" className="flex items-center gap-2 text-brand-muted hover:text-brand-orange transition-colors text-sm font-bold">
              🍽️ Book Table
            </Link>
            <a href="tel:+919682387952" className="flex items-center gap-2 text-brand-orange hover:text-brand-red transition-colors text-sm font-bold">
              <Phone size={16} />
              Call Now
            </a>
            
            <Link href="/cart" className="relative flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all text-sm font-bold shadow-md shadow-brand-red/20">
              <ShoppingCart size={18} />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-soft border-2 border-brand-surface">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="w-px h-6 bg-brand-border" />

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-brand-text">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-brand-muted hover:text-brand-red transition-colors rounded-full hover:bg-brand-bg"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-bold text-brand-text hover:text-brand-red transition-colors">
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/cart" className="relative text-brand-text pr-2">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-0 bg-brand-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-brand-surface">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-brand-text">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-brand-surface border-t border-brand-border max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="px-4 py-4">
              {/* Auth Mobile */}
              <div className="mb-4 pb-4 border-b border-brand-border flex items-center justify-between">
                {user ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-brand-text font-bold">
                      <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm">{user.name.charAt(0).toUpperCase()}</div>
                      {user.name}
                    </div>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="text-brand-red text-sm font-bold border border-brand-red px-3 py-1 rounded-full">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link onClick={() => setMobileOpen(false)} href="/login" className="w-full text-center bg-brand-bg border border-brand-border text-brand-text py-2 rounded-xl font-bold">
                    Login / Register
                  </Link>
                )}
              </div>

              <Link onClick={() => setMobileOpen(false)} href="/dining" className="flex items-center gap-2 text-brand-text mb-4 text-sm font-bold bg-brand-bg p-3 rounded-xl border border-brand-border">
                🍽️ Book a Dining Table
              </Link>

              <p className="text-brand-muted text-xs font-bold uppercase mb-3 tracking-widest pl-1">Menu Categories</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categories.map(cat => (
                  <a
                    key={cat.id}
                    href={`/#${cat.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-brand-text text-sm py-2 px-3 rounded-xl hover:bg-brand-bg border border-transparent hover:border-brand-border transition-all flex items-center gap-2 bg-brand-bg/50"
                  >
                    <span>{cat.icon}</span> <span className="font-medium">{cat.name}</span>
                  </a>
                ))}
              </div>
              
              <a href="tel:+919682387952" className="flex items-center justify-center gap-2 bg-brand-orange/20 text-brand-orange py-3 rounded-xl text-sm font-bold">
                <Phone size={16} /> Call Now for Orders
              </a>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}
