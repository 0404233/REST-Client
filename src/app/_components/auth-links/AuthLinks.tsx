'use client';

import { useState } from 'react';
import LinkTemplate from './link-template/LinkTemplate';

const AuthLinks = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className="flex gap-4 items-center">
      {!isLogin && (
        <>
          <LinkTemplate href={'/account'}>Sign in</LinkTemplate>
          <LinkTemplate href={'/account'}>Sign up</LinkTemplate>
        </>
      )}

      {isLogin && (
        <>
          <LinkTemplate href={'/account'}>Sign Out</LinkTemplate>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
