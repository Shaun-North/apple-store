import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apple Orchard Market',
  description: 'Fresh apples with demo checkout.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
