import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Washington Strategic Consulting - Federal Funding Search',
  description: 'Access millions of federal funding opportunities using our advanced natural language search platform.',
  keywords: 'federal funding, grants, government contracts, WSC, Washington Strategic Consulting',
  authors: [{ name: 'Washington Strategic Consulting' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-wsc-light min-h-screen font-inter">
        {children}
      </body>
    </html>
  );
} 