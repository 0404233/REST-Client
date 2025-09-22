import Button from './button/Button';
import Input from './input/Input';
import Title from './title/Title';

type AuthFormProps = {
  isSignIn: boolean;
};

const AuthForm = ({ isSignIn }: AuthFormProps) => {
  return (
    <>
      <Title isSignIn={isSignIn} />

      <form className="flex flex-col justify-center gap-4">
        <Input type="email" />
        <Input type="password" />
        <Button />
      </form>
    </>
  );
};

export default AuthForm;
