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
      className="text-sm cursor-pointer transition-text duration-200 hover:text-[var(--color-hover)]"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkTemplate;
