'use client';

import EmptyHistoryRequests from '@/_components/history-requests/empty-history-requests/EmptyHistoryRequests';
import HistoryRequests from '@/_components/history-requests/HistoryRequests';
const History = () => {
  const emptyRequest = false;

  return (
    <div className="flex flex-col gap-4 border-1 rounded-xl p-4">
      <h1 className="text-2xl border-b-1 text-center">History Requests</h1>
      {emptyRequest ? <HistoryRequests /> : <EmptyHistoryRequests />}
    </div>
  );
};

export default History;

/* 
Сделать полностью
*/
