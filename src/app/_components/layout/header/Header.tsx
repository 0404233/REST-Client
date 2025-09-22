'use client';

import { useEffect, useState } from 'react';
import NavBar from './navbar/NavBar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 px-4 ${isScrolled && 'bg-gray-950 transition duration-200'}`}>
      <NavBar />
    </header>
  );
};

export default Header;
