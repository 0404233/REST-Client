import Header from '@/_components/layout/header/Header';
import Footer from '@/_components/layout/footer/Footer';

export default async function RootLayout({
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center flex-grow">{children}</main>
      <Footer />
    </>
  );
}
