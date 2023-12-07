'use client';

import PageError from '@Components/PageError';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <PageError
      title='Client | Page Load Error'
      description={{
        kor: '홈 페이지에 오류가 발생했습니다',
        eng: 'Home Page Error',
      }}
      activeButton={{
        redirectHome: true,
        reset,
      }}
    />
  );
}
