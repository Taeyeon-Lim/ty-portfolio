import styles from './Loader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type LoaderProps = {
  width?: number;
  height?: number;
};

function Loader({ width, height }: LoaderProps) {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={cx('loader')}
    >
      <div className={cx('line')}></div>
      <div className={cx('shimmer')}></div>
    </div>
  );
}

export default Loader;
