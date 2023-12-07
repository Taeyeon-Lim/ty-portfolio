import PageError from '@Components/PageError';

export default function NotFound() {
  return (
    <PageError
      title='404 | Not Found Page'
      description={{
        kor: '존재 하지 않는 페이지입니다',
        eng: 'Could not find requested resource',
      }}
      activeButton={{
        redirectHome: true,
      }}
    />
  );
}
