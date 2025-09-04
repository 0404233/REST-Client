type ButtonProps = {
  handleChangeOpenTable: () => void;
};

const Button = ({ handleChangeOpenTable }: ButtonProps) => {
  return (
    <button
      onClick={() => handleChangeOpenTable()}
      className="w-full cursor-pointer text-xl text-start text-orange-300"
    >
      Headers
    </button>
  );
};

export default Button;
