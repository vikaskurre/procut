import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Montserrat } from 'next/font/google';
import WhatsAppButton from '../components/WhatsAppButton';
import InstagramButton from '../components/InstagramButton';
import Header from '../components/Header'; // Import Header
import Footer from '../components/Footer'; // Import Footer
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'PROCUT - Premium Video Editing Studio',
  description: 'High-end video editing services for brands, startups, and creative studios. Cinematic editing with modern aesthetics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${inter.variable} ${montserrat.variable} font-poppins bg-black text-white scroll-smooth`}>
        <Header /> {/* Render the Header component */}
        {children}
        <WhatsAppButton />
        <Footer /> {/* Render the Footer component */}

        {/* Google Analytics - Placeholder */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
