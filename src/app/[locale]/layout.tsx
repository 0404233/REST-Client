import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/_components/layout/header/Header';
import Footer from '@/_components/layout/footer/Footer';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'REST Client',
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex flex-col items-center flex-grow p-4">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
