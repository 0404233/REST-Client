import AuthLinks from '../auth-links/AuthLinks';

const TemplateNotSignedIn = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl">Welcome!</h1>
      <AuthLinks />
    </div>
  );
};

export default TemplateNotSignedIn;
