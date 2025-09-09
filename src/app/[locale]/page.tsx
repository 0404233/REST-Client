'use client';

import TemplateNotSignedIn from '@/_components/template-not-signed-in/TemplateNotSignedIn';
import TemplateSignedIn from '@/_components/template-signed-in/TemplateSignedIn';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="container flex flex-col items-center flex-grow justify-center">
      {user && <TemplateSignedIn />}
      {!user && <TemplateNotSignedIn />}
    </section>
  );
}
