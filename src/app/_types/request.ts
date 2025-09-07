export type RequestHeader = {
  id: string;
  key: string;
  value: string;
};

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
