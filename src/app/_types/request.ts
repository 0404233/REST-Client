export type RequestHeader = {
  id: string;
  key: string;
  value: string;
};

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Result = Record<string, unknown>;

export type ResponseBody = {
  status?: number;
  ok?: boolean;
  result?: Result[];
  error?: string;
};

export type RequestHistory = {
  id: string;
  duration: number;
  statusCode: number;
  method: string;
  requestSize: number;
  responseSize: number;
  endpoint: string;
  timestamp: string;
  error?: string;
  requestDetails?: RequestDetails;
};

export type RequestDetails = {
  url: string;
  method: RequestMethod;
  headers: Record<string, string>;
  body?: string;
};
