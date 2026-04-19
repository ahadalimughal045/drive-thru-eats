import type { Metadata } from 'next';
import { CartProvider } from '@/components/CartContext';
import { ReservationProvider } from '@/components/ReservationContext';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Drive Thru Eats - Burger Arena',
  description: 'Order delicious food online from Drive Thru Eats - Burger Arena.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-bg text-brand-text antialiased">
        <ReservationProvider>
          <CartProvider>
            <PublicLayoutWrapper>
              {children}
            </PublicLayoutWrapper>
          </CartProvider>
        </ReservationProvider>
      </body>
    </html>
  );
}
