import { Link } from 'i18n/navigation';
import { ReactNode } from 'react';

type LinkTemplateProps = {
  children: ReactNode;
  href: string;
  onClick?: () => void;
};

const LinkTemplate = ({ children, href, onClick }: LinkTemplateProps) => {
  return (
    <Link
      href={href}
      className="text-sm font-bold cursor-pointer
               text-[var(--foreground)] border-1 border-transparent
               hover:border-b-[var(--foreground)] transition-border duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkTemplate;
