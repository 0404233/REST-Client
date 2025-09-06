import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/acai.css';

type BodyProps = {
  result?: Record<string, any>[];
  error?: string;
};

const Body = ({ result, error }: BodyProps) => {
  console.log('Body');
  if (error) {
    return <div className="text-xl text-gray-500 p-2">No data available</div>;
  }

  return (
    <>
      {result && result.length !== 0 && (
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-3">Response Body:</h3>
          <div className="json-container">
            <JSONPretty data={result} className="text-sm overflow-auto max-h-96" />
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
