import { RequestHeader, ResponseBody } from 'app/[locale]/rest/page';
import RequestBody from '../request-body/RequestBody';
import ResponseTable from '../response/ResponseTable';
import { memo, useCallback, useState } from 'react';
import Button from './button/Button';
import HeadersTable from '../headers-table/HeadersTable';

type RequestPanelProps = {
  handleChangeHeaders: (headers: RequestHeader[]) => void;
  responseBody?: ResponseBody;
};

const RequestPanel = ({ handleChangeHeaders, responseBody }: RequestPanelProps) => {
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
      <section>
        {openCurrentSection.headers && <HeadersTable handleChangeHeaders={handleChangeHeaders} />}

        {openCurrentSection.body && <RequestBody />}

        {openCurrentSection.response && <ResponseTable responseBody={responseBody} />}
      </section>
    </>
  );
};

export default memo(RequestPanel);
