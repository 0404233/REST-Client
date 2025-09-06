type StatusProps = {
  status?: number;
  ok?: boolean;
};

const Status = ({ status, ok }: StatusProps) => {
  console.log('Status');

  if (!status) return null;

  return (
    <div>
      <p className="text-lg">Status: {status}</p>
      <p className="text-lg">
        Code:
        {ok ? (
          <span className="text-green-500"> OK</span>
        ) : (
          <span className="text-red-400"> FAIL</span>
        )}
      </p>
    </div>
  );
};

export default Status;
