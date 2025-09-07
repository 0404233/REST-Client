type StatusProps = {
  status?: number;
  ok?: boolean;
};

const Status = ({ status, ok }: StatusProps) => {
  console.log('Status');

  if (!status) return null;

  return (
    <div>
      {ok ? (
        <>
          <p className="text-lg">Status: OK </p>
          <p className="text-lg">
            Code: <span className="text-green-500"> {status}</span>
          </p>
        </>
      ) : (
        <>
          <p className="text-lg">Status: FAIL </p>
          <p className="text-lg">
            Code: <span className="text-red-400"> {status}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Status;
