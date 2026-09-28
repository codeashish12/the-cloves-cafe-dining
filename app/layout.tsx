import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Cloves Cafe & Dining | Premium Cafe & Restaurant in PDDU Nagar',
  description: 'Discover The Cloves Cafe & Dining in PDDU Nagar, Mughalsarai — North Indian favourites, café classics and mocktails in a stylish dining atmosphere.',
  openGraph: {
    title: 'The Cloves Cafe & Dining',
    description: 'Good food. Great moments. A premium cafe and dining experience in PDDU Nagar.',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'The Cloves Cafe & Dining', description: 'Good food. Great moments in PDDU Nagar.' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#251a16', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
