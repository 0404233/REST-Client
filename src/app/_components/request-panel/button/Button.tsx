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
      className="cursor-pointer text-xl text-center text-orange-400 
      hover:text-orange-300 border-transparent border-1 
      focus:border-b-amber-200 transition capitalize"
    >
      {sectionName}
    </button>
  );
};

export default memo(Button);
