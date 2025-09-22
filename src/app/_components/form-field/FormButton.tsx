type Props = {
  isValid: boolean;
  label: string;
};

export default function FormButton({ isValid, label }: Props) {
  return (
    <button
      disabled={!isValid}
      className="px-2 py-1.5 border-2 text-white 
               border-gray-600 rounded-md cursor-pointer 
               bg-blue-500 disabled:opacity-75 
               disabled:bg-gray-500
               disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
