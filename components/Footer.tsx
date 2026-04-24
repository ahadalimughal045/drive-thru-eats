'use client';

import Link from 'next/link';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-16 pb-8 px-6 relative mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Side: Contact Info */}
          <div className="space-y-3">
            <p className="text-sm font-medium">
              <span className="font-bold">Location:</span> Rehmani Technologies Building, By pass Road Handwara - Kashmir
            </p>
            <p className="text-sm font-medium">
              <span className="font-bold">Email:</span> <a href="mailto:helpdesk@drive-thrueats.online" className="hover:text-brand-red transition-colors">helpdesk@drive-thrueats.online</a>
            </p>
            <p className="text-sm font-medium">
              <span className="font-bold">Phone#:</span> 01955295310 / 01955313018
            </p>
            <p className="text-sm font-medium">
              <span className="font-bold">WhatsApp#:</span> <a href="https://wa.me/917889683368" target="_blank" className="hover:text-green-400 transition-colors">+917889683368</a>
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm font-bold">Follow us:</span>
              <div className="flex items-center gap-3">
                <a href="https://web.facebook.com/profile.php?id=61566862304889&_rdc=1&_rdr#" target="_blank" className="hover:text-brand-red transition-all">
                  <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded hover:border-brand-red">
                    <Facebook size={18} />
                  </div>
                </a>
                <a href="https://www.instagram.com/drivethru.eats/?igsh=M21tc3R5eDIzcXU4" target="_blank" className="hover:text-brand-red transition-all">
                  <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded hover:border-brand-red">
                    <Instagram size={18} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-white/10 w-full mb-8" />

        {/* Bottom Section */}
        <div className="text-center space-y-2">
          <p className="text-[11px] text-white/60 font-medium">
            All rights Reserved © Drive Thru Eats, 2024
          </p>
          <p className="text-[11px] text-white/40">
            Powered by <span className="text-white/60 font-bold">AFKAR AL-MUSTAQBIL Technologies</span>
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/917889683368" 
        target="_blank" 
        className="fixed bottom-10 right-10 z-[100] group"
      >
        <div className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce">
          <MessageCircle size={32} fill="currentColor" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-brand-text px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            Chat with us!
          </span>
        </div>
      </a>
    </footer>
  );
}
