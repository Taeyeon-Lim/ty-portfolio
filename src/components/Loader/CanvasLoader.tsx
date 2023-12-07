'use client';

import styles from './Loader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useId } from 'react';
import Image from 'next/image';
import { useProgress } from '@react-three/drei';

/**
 * @param imageSrc  정적 이미지 경로 권장
 */
function CanvasLoader({ imageSrc }: { imageSrc: string }) {
  const uniqueAlt = useId();
  const { active, progress } = useProgress();

  return (
    <div className={cx('canvas-loader')}>
      <Image
        src={imageSrc}
        alt={
          /http|https/.test(imageSrc)
            ? `external-image-${uniqueAlt}`
            : imageSrc.slice(1).replaceAll('/', '-')
        }
        sizes='100vw'
        fill
        priority
        style={{
          filter: `
                blur(${
                  progress > 1 ? (3.5 - Math.atan(progress)).toFixed(3) : 0
                }px)
                grayscale(${progress > 1 ? Math.floor(100 - progress) : 0}%)
            `,
        }}
      />

      <div className={cx('progress')}>
        {active ? '..' : ''}
        {progress.toFixed(0)}%
      </div>
    </div>
  );
}

export default CanvasLoader;
