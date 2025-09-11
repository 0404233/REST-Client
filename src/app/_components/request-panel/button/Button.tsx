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
      className="cursor-pointer text-xl text-center text-gray-50 font-bold
      hover:text-gray-400 border-transparent border-1 
      focus:border-b-gray-50 transition capitalize"
    >
      {sectionName}
    </button>
  );
};

export default memo(Button);
