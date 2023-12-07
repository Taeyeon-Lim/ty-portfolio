'use client';

import PageError from '@Components/PageError';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (error.message === `Not Allow Path: '/Portfolio/:InvalidPath'`) {
    return (
      <PageError
        title='Client | Page Load Error'
        description={{
          kor: '선택된 특정 포트폴리오 페이지에 오류가 발생했습니다',
          eng: 'Selected Portfolio Page Error',
        }}
        activeButton={{
          reset,
          redirect: '/portfolio',
        }}
      />
    );
  }

  return (
    <PageError
      title='Client | Page Load Error'
      description={{
        kor: '포트폴리오 페이지에 오류가 발생했습니다',
        eng: 'Portfolio Page Error',
      }}
      activeButton={{
        redirectHome: true,
        reset,
      }}
    />
  );
}
