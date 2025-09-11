import { memo } from 'react';

type ButtonProps = {
  onClick: () => void;
};

const Button = ({ onClick }: ButtonProps) => {
  console.log('Button');

  return (
    <button
      onClick={onClick}
      className="ml-1 cursor-pointer text-xl 
                  px-1 border-1 rounded-sm border-transparent hover:border-[var(--foreground)] transition-border duration-300"
    >
      Submit
    </button>
  );
};

export default memo(Button);
