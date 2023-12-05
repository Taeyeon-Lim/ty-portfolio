import styles from '../Portfolio.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function WelcomeText({ reverse }: { reverse: boolean }) {
  return (
    <div className={cx('text-position')}>
      <div className={cx('char', { reverse }, 'portfolio')}>
        <span>P O R</span>
        &nbsp;
        <span>T P O L I O</span>
      </div>
      <div className={cx('char', { reverse }, 'a')}>A</div>
      <div className={cx('char', { reverse }, 'eon')}>E O N</div>
      <div className={cx('char', { reverse }, 'y')}>Y</div>
      <div className={cx('char', { reverse }, 'e')}>E</div>
      <div className={cx('char', { reverse }, 'o')}>O</div>
      <div className={cx('char', { reverse }, 'n')}>N</div>
    </div>
  );
}

export default WelcomeText;
