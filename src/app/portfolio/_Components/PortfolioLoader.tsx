'use client';

import styles from '../Portfolio.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Image from 'next/image';

import { useProgress } from '@react-three/drei';

function PortfolioLoader() {
  const { active, progress } = useProgress();

  return (
    <div className={cx('portfolio-loader')}>
      <Image
        src={'/portfolio/loading.png'}
        alt={'portfolio-loader.png'}
        sizes='100vw'
        fill
        priority
        style={{
          filter: `
                blur(${active ? (3.5 - Math.atan(progress)).toFixed(3) : 0}px)
                grayscale(${active ? Math.floor(100 - progress) : 0}%)
            `,
        }}
      />

      <div className={cx('progress')}>{progress.toFixed(0)}%</div>
    </div>
  );
}

export default PortfolioLoader;
