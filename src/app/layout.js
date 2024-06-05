import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';
import Navbar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce',
  description: 'Generated for the sarmaya internship',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers className="bg-white">
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}