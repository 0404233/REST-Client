type TitleProps = {
  isSignIn: boolean;
};

const Title = ({ isSignIn }: TitleProps) => {
  return (
    <>
      {<h1 className="text-2xl">{isSignIn ? 'Sign in to REST client' : 'Create your account'}</h1>}
    </>
  );
};

export default Title;
