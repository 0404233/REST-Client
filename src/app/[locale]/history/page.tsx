'use client';

import EmptyHistoryRequests from '@/_components/history-requests/empty-history-requests/EmptyHistoryRequests';
import HistoryRequests from '@/_components/history-requests/HistoryRequests';
import { RequestHistory } from '@/_types/request';
import { useAuth } from '@/context/AuthContext';
import Loading from 'app/loading';
import { redirect } from 'i18n/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
const History = () => {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const [requests, setRequests] = useState<RequestHistory[]>([]);

  useEffect(() => {
    if (!user) {
      redirect({ href: '/', locale });
    }
  }, [user, locale]);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) return;

      try {
        setIsLoading(true);
        const token = await user.getIdToken();

        const response = await fetch('/api/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 border-1 rounded-xl p-4">
      {requests.length > 0 ? <HistoryRequests requests={requests} /> : <EmptyHistoryRequests />}
    </div>
  );
};

export default History;
