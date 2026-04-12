'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-auto">
      {/* Feedback CTA - Hidden on /feedback page */}
      {pathname !== '/feedback' && (
        <div 
          className="relative py-16 text-center bg-cover bg-center"
          style={{ backgroundImage: 'url(https://drive-thrueats.online/assets/img/gallery/cta-two-bg.png)' }}
        >
          <div className="relative z-10">
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-6">Are you satisfied<br/>with our services?</h3>
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 transition-all hover:scale-105 mt-2"
            >
              GIVE US YOUR FEEDBACK {'>'}
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <img src="https://drive-thrueats.online/logo.png" alt="Drive Thru Eats Logo" className="h-16 w-auto object-contain" />
          </div>
          <p className="text-brand-muted text-sm font-medium leading-relaxed">Your favorite food, delivered fast. Order online and enjoy fresh meals from Burger Arena.</p>

          {/* WhatsApp */}
          <a
            href="https://wa.link/mnta3l"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-brand-text font-black text-base uppercase mb-5 tracking-wide">Contact Us</h4>
          <ul className="space-y-4 text-sm text-brand-muted font-medium">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-red mt-0.5 shrink-0" />
              <span>Rehmani Technologies Building, By pass Road Handwara - Kashmir</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-red" />
              <a href="mailto:helpdesk@drive-thrueats.online" className="hover:text-brand-red transition-colors">
                helpdesk@drive-thrueats.online
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-red" />
              <a href="tel:01955295310" className="hover:text-brand-red transition-colors">01955295310 / 01955313018</a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="text-brand-red" />
              <a href="tel:+917889683368" className="hover:text-brand-red transition-colors">+917889683368</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-brand-text font-black text-base uppercase mb-5 tracking-wide">Quick Links</h4>
          <ul className="space-y-3 text-sm text-brand-muted font-medium">
            <li><Link href="/" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span> Home</Link></li>
            <li><Link href="/cart" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span> My Cart</Link></li>
            <li><Link href="/feedback" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span> Feedback</Link></li>
            <li><Link href="/dining" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span> Book a Table</Link></li>
            <li><a href="https://drive-thrueats.online/dte-app.apk" className="hover:text-brand-red transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-border"></span> Download APK</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border py-6 text-center bg-brand-bg">
        <p className="text-brand-text font-bold text-sm">All rights Reserved © Drive Thru Eats, 2024</p>
        <p className="mt-1 text-brand-muted text-xs">Powered by AFKAR AL-MUSTAQBIL Technologies</p>
      </div>
    </footer>
  );
}
