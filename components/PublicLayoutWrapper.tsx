'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // If we are anywhere in the admin panel, DO NOT render the Navbar, Footer, or WhatsApp icon.
  if (pathname.startsWith('/admin')) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  // Otherwise, it's the public restaurant theme.
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <a href="https://wa.link/mnta3l" target="_blank" rel="noopener noreferrer">
        <img src="https://drive-thrueats.online/walogo.png" alt="WhatsApp" className="fixed bottom-8 right-8 w-14 h-14 z-[999] hover:scale-110 transition-transform" />
      </a>
    </>
  );
}
