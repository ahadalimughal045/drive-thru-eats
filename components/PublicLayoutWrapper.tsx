'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import StatusHeader from './StatusHeader';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // If we are in the admin, waiter, or staff portals, DO NOT render the public Navbar/Footer/StatusHeader.
  if (pathname.startsWith('/admin') || pathname.startsWith('/waiter') || pathname.startsWith('/staff')) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  // Otherwise, it's the public restaurant theme.
  return (
    <>
      <Navbar />
      <StatusHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
