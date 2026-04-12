'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ChefHat, Users, ShoppingBag, LogOut, ArrowLeft, LayoutGrid } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Tables', href: '/admin/tables', icon: <LayoutGrid size={20} /> },
    { name: 'Kitchen', href: '/admin/kitchen', icon: <ChefHat size={20} /> },
    { name: 'Staff', href: '/admin/staff', icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#212529] text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ChefHat className="text-brand-red" /> Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">Drive Thru Eats</p>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                pathname === link.href ? 'bg-brand-red text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl font-bold transition-all">
            <ArrowLeft size={20} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#212529] text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-black flex items-center gap-2">
            <ChefHat className="text-brand-red" /> Admin Panel
          </h2>
          <Link href="/">
            <ArrowLeft className="text-gray-400" />
          </Link>
        </header>

        {/* Mobile Nav Scroll */}
        <div className="md:hidden bg-[#1a1d20] overflow-x-auto scrollbar-hide border-b border-gray-800">
          <div className="flex px-4 py-3 gap-2 w-max">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  pathname === link.href ? 'bg-brand-red text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
