import { Outfit } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Clinical Assessment | Blueprint',
  description: 'A comprehensive clinical assessment tool for mental health screening'
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = '#3B82F6';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}