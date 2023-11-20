import styles from './PageError.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Link from 'next/link';

function PageError({
  title,
  description,
  activeButton,
}: {
  title: string;
  description: {
    kor: string;
    eng: string;
  };
  activeButton?: {
    reset?: () => void;
    redirectHome?: boolean;
    redirect?: string;
  };
}) {
  return (
    <main className={cx('page-error')}>
      <h2>{title}</h2>

      <br />

      <p>{description.kor}</p>
      <p>{description.eng}</p>

      <br />

      {typeof activeButton?.reset === 'function' && (
        <button onClick={activeButton.reset} className={cx('button', 'reset')}>
          재시도
        </button>
      )}

      {activeButton?.redirectHome && (
        <Link href='/' className={cx('button', 'go-home')} replace>
          Go Home
        </Link>
      )}

      {activeButton?.redirect && (
        <Link
          href={activeButton.redirect}
          className={cx('button', 'back')}
          replace
        >
          돌아가기
        </Link>
      )}
    </main>
  );
}

export default PageError;
