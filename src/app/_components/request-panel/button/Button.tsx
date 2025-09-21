import { memo } from 'react';
import { useTranslations } from 'next-intl';

type ButtonProps = {
  handleOpenPanel: (sectionName: string) => void;
  sectionName: string;
};

const Button = ({ handleOpenPanel, sectionName }: ButtonProps) => {
  const t = useTranslations('rest');
  return (
    <button
      onClick={() => handleOpenPanel(sectionName)}
      className="cursor-pointer text-xl text-center text-gray-50 font-bold
      hover:text-gray-400 border-transparent border-1 
      focus:border-b-gray-50 transition capitalize"
    >
      {t(sectionName)}
    </button>
  );
};

export default memo(Button);
