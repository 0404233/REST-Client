import { RequestHeader, ResponseBody } from 'app/[locale]/rest/page';
import RequestBody from '../request-body/RequestBody';
import ResponseTable from '../response/ResponseTable';
import { memo, useCallback, useState } from 'react';
import Button from './button/Button';
import HeadersTable from '../headers-table/HeadersTable';
import { useTranslations } from 'next-intl';

type RequestPanelProps = {
  handleChangeHeaders: (headers: RequestHeader[]) => void;
  responseBody?: ResponseBody;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

const RequestPanel = ({ handleChangeHeaders, responseBody, setBody }: RequestPanelProps) => {
  const t = useTranslations('rest');
  console.log('RequestPanel');

  const [openCurrentSection, setOpenCurrentSection] = useState({
    headers: false,
    body: false,
    response: false,
  });

  const handleOpenPanel = useCallback((section: string) => {
    setOpenCurrentSection(() => ({
      headers: false,
      body: false,
      response: false,
      [section]: true,
    }));
  }, []);

  return (
    <>
      <section className="flex justify-around">
        <Button handleOpenPanel={handleOpenPanel} sectionName={'headers'} />
        <Button handleOpenPanel={handleOpenPanel} sectionName={'body'} />
        <Button handleOpenPanel={handleOpenPanel} sectionName={'response'} />
      </section>

      {openCurrentSection.headers && (
        <section>
          <HeadersTable handleChangeHeaders={handleChangeHeaders} />
        </section>
      )}

      {openCurrentSection.body && (
        <section>
          <RequestBody setBody={setBody} />
        </section>
      )}

      {openCurrentSection.response && (
        <section>
          <ResponseTable responseBody={responseBody} />
        </section>
      )}
    </>
  );
};

export default memo(RequestPanel);
