'use client';
import { useState } from 'react';
import { Package, MapPin } from 'lucide-react';

export default function Hero() {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');

  return (
    <section className="relative overflow-hidden bg-brand-surface min-h-[85vh] flex flex-col justify-center border-b border-brand-border">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #e63946 0%, transparent 40%), radial-gradient(circle at 75% 75%, #f4a261 0%, transparent 40%)',
        }} />
        <div style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.03) 30px, rgba(0,0,0,0.03) 31px)`,
          position: 'absolute', inset: 0,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Promo Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-brand-red text-sm font-bold">Daily Offer on all online orders</span>
            </div>

            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-brand-text leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Are you
                <span className="block text-brand-red mt-2">Starving?</span>
              </h1>
              <p className="text-brand-muted text-lg font-medium">
                Use coupon code{' '}
                <span className="bg-brand-orange text-brand-text font-bold px-2 py-0.5 rounded-md text-base shadow-sm">Discount10</span>
                {' '}while ordering at checkout.
              </p>
            </div>

            {/* Wait, search input removed from Hero since it'll be in MenuSection */}
            <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 space-y-5 shadow-xl shadow-brand-border/40">
              <div className="flex rounded-xl overflow-hidden border border-brand-border bg-brand-bg p-1 gap-1">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all rounded-lg ${
                    orderType === 'pickup' ? 'bg-brand-red text-white shadow-md' : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'
                  }`}
                >
                  <Package size={16} /> Pickup
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all rounded-lg ${
                    orderType === 'delivery' ? 'bg-brand-red text-white shadow-md' : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'
                  }`}
                >
                  <MapPin size={16} /> Delivery
                </button>
              </div>

              {orderType === 'delivery' && (
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Enter your delivery address..."
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl pl-11 pr-4 py-3.5 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red transition-all text-sm font-medium"
                  />
                </div>
              )}

              <a href="#menu" onClick={(e) => {
                e.preventDefault();
                const menu = document.getElementById('menu');
                if(menu) menu.scrollIntoView({ behavior: 'smooth' });
              }} className="w-full block text-center bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-red/30">
                Browse Menu 🍔
              </a>
            </div>

            {/* Download APK */}
            <a
              href="https://drive-thrueats.online/dte-app.apk"
              className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-red border border-brand-orange hover:border-brand-red rounded-full px-5 py-2.5 text-sm font-bold transition-all bg-brand-orange/5"
            >
              📱 Download Our App (APK)
            </a>
          </div>

          {/* Right - Hero Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-red/10 rounded-full blur-3xl scale-110" />
              <img
                src="https://drive-thrueats.online/combo-img.png"
                alt="Drive Thru Eats Combo"
                className="relative w-full max-w-lg object-contain drop-shadow-2xl animate-fade-in hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#fdf6f0"/>
        </svg>
      </div>
    </section>
  );
}
