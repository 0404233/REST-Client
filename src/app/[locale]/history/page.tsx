'use client';

import EmptyHistoryRequests from '@/_components/history-requests/empty-history-requests/EmptyHistoryRequests';
import HistoryRequests from '@/_components/history-requests/HistoryRequests';
import { useTranslations } from 'next-intl';

const History = () => {
  const t = useTranslations();
  const emptyRequest = false;

  return (
    <div className="flex flex-col gap-4 border-1 rounded-xl p-4">
      <h1 className="text-2xl border-b-1 text-center">{t('historyRequests')}</h1>
      {emptyRequest ? <HistoryRequests /> : <EmptyHistoryRequests />}
    </div>
  );
};

export default History;

/* 
Сделать полностью
*/
