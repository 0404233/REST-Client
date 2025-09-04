type StatusProps = {
  status?: number;
  ok?: boolean;
};

const Status = ({ status, ok }: StatusProps) => {
  if (!status) return null;

  return (
    <div>
      <p>Status: {status}</p>
      <p>
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
