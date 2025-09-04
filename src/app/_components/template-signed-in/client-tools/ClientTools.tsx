import { Link } from 'i18n/navigation';

const ClientTools = () => {
  return (
    <div className="flex gap-4">
      <Link
        href="/rest-client"
        className="hover:texttransition-text duration-200 hover:text-[#f02eaa]"
      >
        REST Client
      </Link>
      <Link href="/history" className="hover:texttransition-text duration-200 hover:text-[#f02eaa]">
        History
      </Link>
      <Link
        href="/variables"
        className="hover:texttransition-text duration-200 hover:text-[#f02eaa]"
      >
        Variables
      </Link>
    </div>
  );
};

export default ClientTools;
