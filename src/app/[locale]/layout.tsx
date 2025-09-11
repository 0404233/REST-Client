import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/_components/layout/header/Header';
import Footer from '@/_components/layout/footer/Footer';
import AuthProvider from '@/context/AuthContext';

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
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex flex-col items-center flex-grow p-4">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
