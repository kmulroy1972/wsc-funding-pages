import './styles.css';
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning className="bg-wsc-light min-h-screen font-inter">
        {children}
      </body>
    </html>
  );
} 