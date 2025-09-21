import { memo } from 'react';
import { useTranslations } from 'next-intl';

type ButtonProps = {
  onClick: () => void;
};

const Button = ({ onClick }: ButtonProps) => {
  const t = useTranslations('common');

  return (
    <button
      onClick={onClick}
      className="ml-1 cursor-pointer text-xl 
                  px-1 border-1 rounded-sm border-transparent hover:border-[var(--foreground)] transition-border duration-300"
    >
      {t('submit')}
    </button>
  );
};

export default memo(Button);
