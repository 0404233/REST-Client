import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AuthProvider from '@/context/AuthContext';

export default async function RootLayout({
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <AuthProvider>
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
    </AuthProvider>
  );
}
