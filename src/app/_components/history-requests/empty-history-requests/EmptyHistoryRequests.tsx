import { Link } from 'i18n/navigation';

const EmptyHistoryRequests = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>{"You haven't executed any requests. It's empty here. Try: "}</h1>
      <Link
        href="/rest-client"
        className="flex flex-col gap-4 transition-text duration-200 hover:text-[#f02eaa]"
      >
        REST Client
      </Link>
    </div>
  );
};

export default EmptyHistoryRequests;
