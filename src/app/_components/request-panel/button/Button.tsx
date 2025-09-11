import { memo } from 'react';

type ButtonProps = {
  handleOpenPanel: (sectionName: string) => void;
  sectionName: string;
};

const Button = ({ handleOpenPanel, sectionName }: ButtonProps) => {
  console.log('Button');
  return (
    <button
      onClick={() => handleOpenPanel(sectionName)}
      className="cursor-pointer text-xl text-center text-[var(--text-color)] font-bold
      hover:text-[var(--text-color)] border-transparent border-1 
      focus:border-b-[var(--text-color)] transition capitalize"
    >
      {sectionName}
    </button>
  );
};

export default memo(Button);
