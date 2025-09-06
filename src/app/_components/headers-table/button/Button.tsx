type ButtonProps = {
  handleChangeOpenTable: () => void;
};

const Button = ({ handleChangeOpenTable }: ButtonProps) => {
  console.log('Button');
  return (
    <button
      onClick={() => handleChangeOpenTable()}
      className="w-full cursor-pointer text-xl text-start text-orange-300 
      hover:text-orange-200 border-transparent border-1 
      hover:border-b-amber-200 transition"
    >
      Headers
    </button>
  );
};

export default Button;
