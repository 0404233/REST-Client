'use client';

import { redirect } from 'i18n/navigation';
import { RequestHistory } from '@/_types/request';
import { useLocale } from 'next-intl';

interface HistoryRequestsProps {
  requests: RequestHistory[];
}

export default function HistoryRequests({ requests }: HistoryRequestsProps) {
  const locale = useLocale();

  const restoreRequest = (request: RequestHistory) => {
    if (request.requestDetails) {
      localStorage.setItem('restoreRequest', JSON.stringify(request.requestDetails));
      redirect({ href: '/rest', locale });
    }
  };

  const formatDuration = (ms: number) => `${ms}ms`;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:text-gray-500 transition-colors"
            onClick={() => restoreRequest(request)}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    request.method === 'GET'
                      ? 'bg-green-100 text-green-800'
                      : request.method === 'POST'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.method === 'PUT'
                          ? 'bg-blue-100 text-blue-800'
                          : request.method === 'DELETE'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {request.method}
                </span>
                <span className="ml-2 text-sm font-medium max-w-xs">{request.endpoint}</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  request.statusCode >= 200 && request.statusCode < 300
                    ? 'bg-green-100 text-green-800'
                    : request.statusCode >= 400 && request.statusCode < 500
                      ? 'bg-yellow-100 text-yellow-800'
                      : request.statusCode >= 500
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                }`}
              >
                {request.statusCode}
              </span>
            </div>

            <div className="mt-2 text-xs">
              <span>{new Date(request.timestamp).toLocaleString()}</span>
              <span className="mx-2">•</span>
              <span>{formatDuration(request.duration)}</span>
              <span className="mx-2">•</span>
              <span>{formatSize(request.responseSize)}</span>
            </div>

            {request.error && (
              <div className="mt-2 text-xs text-red-500">Error: {request.error}</div>
            )}

            {request.requestDetails && (
              <div className="mt-2 text-xs text-blue-500">Click to restore this request</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-500">
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-md shadow-sm">
            <h3 className="text-sm font-medium">Total Requests</h3>
            <p className="text-xl font-bold">{requests.length}</p>
          </div>
          <div className="p-3 bg-white rounded-md shadow-sm">
            <h3 className="text-sm font-medium">Success Rate</h3>
            <p className="text-xl font-bold">
              {Math.round(
                (requests.filter((request) => request.statusCode >= 200 && request.statusCode < 300)
                  .length /
                  requests.length) *
                  100
              )}
              %
            </p>
          </div>
          <div className="p-3 bg-white rounded-md shadow-sm">
            <h3 className="text-sm font-medium">Avg Response Time</h3>
            <p className="text-xl font-bold">
              {Math.round(
                requests.reduce((sum, request) => sum + request.duration, 0) / requests.length
              )}
              ms
            </p>
          </div>
          <div className="p-3 bg-white rounded-md shadow-sm">
            <h3 className="text-sm font-medium">Avg Response Size</h3>
            <p className="text-xl font-bold">
              {formatSize(
                Math.round(
                  requests.reduce((sum, request) => sum + request.responseSize, 0) / requests.length
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
