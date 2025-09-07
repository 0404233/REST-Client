'use client';

import TemplateNotSignedIn from '@/_components/template-not-signed-in/TemplateNotSignedIn';
import TemplateSignedIn from '@/_components/template-signed-in/TemplateSignedIn';
import { useState } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <section className="container flex flex-col items-center flex-grow justify-center">
      {isLogin && <TemplateSignedIn />}
      {!isLogin && <TemplateNotSignedIn />}
    </section>
  );
}
