import { Link } from 'i18n/navigation';

const ClientTools = () => {
  return (
    <div className="flex gap-4">
      <Link
        href="/rest"
        className="border-1 border-transparent duration-300 hover:border-b-[var(--border-b)]"
      >
        REST Client
      </Link>
      <Link
        href="/history"
        className="border-1 border-transparent duration-300 hover:border-b-[var(--border-b)]"
      >
        History
      </Link>
      <Link
        href="/variables"
        className="border-1 border-transparent duration-300 hover:border-b-[var(--border-b)]"
      >
        Variables
      </Link>
    </div>
  );
};

export default ClientTools;
