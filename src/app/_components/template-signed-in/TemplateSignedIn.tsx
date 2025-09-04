import ClientTools from './client-tools/ClientTools';

const TemplateSignedIn = () => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl">Welcome Back, Username!</h1>
      <ClientTools />
    </div>
  );
};

export default TemplateSignedIn;
