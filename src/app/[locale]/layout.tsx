import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/_components/layout/header/Header';
import Footer from '@/_components/layout/footer/Footer';

export const metadata: Metadata = {
  title: 'REST Client',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="container flex flex-col min-h-screen mx-auto">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex flex-col items-center flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
