type ButtonProps = {
  onClick: () => void;
};

const Button = ({ onClick }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      className="ml-1 cursor-pointer text-xl 
                  px-1 transition-all duration-200 
                  hover:text-[#f02eaa]"
    >
      Submit
    </button>
  );
};

export default Button;
