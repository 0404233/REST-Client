'use client';

import { useAuth } from '@/context/AuthContext';
import TemplateNotSignedIn from '@/_components/template-not-signed-in/TemplateNotSignedIn';
import TemplateSignedIn from '@/_components/template-signed-in/TemplateSignedIn';

import Loading from './loading';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <section className="container flex flex-col items-center flex-grow justify-center">
      {user && <TemplateSignedIn user={user} />}
      {!user && <TemplateNotSignedIn />}
    </section>
  );
}
