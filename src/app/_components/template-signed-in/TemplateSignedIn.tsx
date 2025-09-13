import { User } from 'firebase/auth';
import ClientTools from './client-tools/ClientTools';

type TemplateNotSignedInProps = {
  user: User | null;
};

const TemplateSignedIn = ({ user }: TemplateNotSignedInProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl italic">Welcome Back, {user ? user.email : 'User'}!</h1>
      <ClientTools />
    </div>
  );
};

export default TemplateSignedIn;
