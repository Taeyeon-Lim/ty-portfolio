// Catch-all error handling UI

'use client';

import PageError from '@Components/PageError';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang='ko'>
      <body>
        <PageError
          title='500 | Server Error'
          description={{
            kor: '웹 어플리케이션에 오류가 발생했습니다',
            eng: 'Internal Server Error',
          }}
          activeButton={{
            redirectHome: true,
            reset,
          }}
        />
      </body>
    </html>
  );
}
