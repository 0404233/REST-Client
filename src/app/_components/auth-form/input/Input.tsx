type InputProps = {
  type: string;
};

const Input = ({ type }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={type} className="cursor-pointer capitalize">
        {type}
      </label>
      <input
        type={type}
        id={type}
        autoComplete="off"
        className="px-2 py-1 border-1 rounded-sm"
        placeholder={`Enter ${type}`}
      />
    </div>
  );
};

export default Input;
