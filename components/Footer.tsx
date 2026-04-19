'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, Phone, MessageCircle, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer id="footer" className="bg-white border-t border-brand-border mt-auto">
      {/* Feedback CTA - Shown ONLY on Home page */}
      {pathname === '/' && (
        <div className="relative group overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: 'url(https://drive-thrueats.online/assets/img/gallery/cta-two-bg.png)' }}
          />
          <div className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm" />

          <div className="relative z-10 py-20 lg:py-32 text-center max-w-4xl mx-auto px-4">
            <h3 className="text-white font-bold text-4xl md:text-6xl mb-8 leading-tight tracking-tighter">
              Love the taste? <br />
              <span className="text-brand-red">Share your experience!</span>
            </h3>
            <Link
              href="/feedback"
              className="btn-primary inline-flex items-center gap-3"
            >
              GIVE US FEEDBACK <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32 grid md:grid-cols-4 gap-16">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 space-y-8">
          <div className="flex items-center gap-3">
            <img
              src="https://drive-thrueats.online/logo.png"
              alt="Drive Thru Eats Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-brand-muted text-base font-medium leading-relaxed">
            Crafting legendary flavors and delivering them straight to your door. The ultimate drive-thru experience.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.link/mnta3l"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={22} fill="currentColor" />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="col-span-1 space-y-8">
          <h4 className="text-brand-text font-bold text-sm uppercase tracking-[0.2em]">Locate Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-red shrink-0 border border-brand-border">
                <MapPin size={18} />
              </div>
              <span className="text-sm text-brand-muted font-bold leading-relaxed">
                By Pass Road Handwara, <br />
                Kashmir - Valley
              </span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-red shrink-0 border border-brand-border">
                <Mail size={18} />
              </div>
              <a href="mailto:helpdesk@drive-thrueats.online" className="text-sm font-bold text-brand-text hover:text-brand-red transition-colors">
                helpdesk@drive-thrueats.online
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="col-span-1 space-y-8">
          <h4 className="text-brand-text font-bold text-sm uppercase tracking-[0.2em]">Contact</h4>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-red shrink-0 border border-brand-border">
                <Phone size={18} />
              </div>
              <a href="tel:01955295310" className="text-sm font-bold text-brand-text hover:text-brand-red transition-colors">
                01955-295310
              </a>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-red shrink-0 border border-brand-border">
                <MessageCircle size={18} />
              </div>
              <a href="tel:+917889683368" className="text-sm font-bold text-brand-text hover:text-brand-red transition-colors">
                +91 7889-683368
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 space-y-8">
          <h4 className="text-brand-text font-bold text-sm uppercase tracking-[0.2em]">Experience</h4>
          <ul className="grid grid-cols-1 gap-4">
            {[
              { label: 'Menu Category', href: '/' },
              { label: 'Track Order', href: '/cart' },
              { label: 'Book Table', href: '/dining' },
              { label: 'Feedback', href: '/feedback' }
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-bold text-brand-muted hover:text-brand-red transition-all flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-brand-red transition-all group-hover:w-4" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border bg-brand-bg py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-text font-bold text-xs uppercase tracking-widest">
            © 2024 Drive Thru Eats. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-brand-muted uppercase tracking-widest">
            Made with <Heart size={10} className="text-brand-red fill-current" /> by Rehman Technologies
          </div>
        </div>
      </div>
    </footer>
  );
}
