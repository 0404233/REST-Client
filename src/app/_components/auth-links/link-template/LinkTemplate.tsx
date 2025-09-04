import { Link } from 'i18n/navigation';
import { ReactNode } from 'react';

type LinkTemplateProps = {
  children: ReactNode;
  href: string;
};

const LinkTemplate = ({ children, href }: LinkTemplateProps) => {
  return (
    <Link
      href={href}
      className="text-sm cursor-pointer transition-text duration-200 hover:text-[var(--color-hover)]"
    >
      {children}
    </Link>
  );
};

export default LinkTemplate;
