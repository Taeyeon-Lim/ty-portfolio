'use client';

import styles from './Navigator.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useHover } from '@use-gesture/react';
import { a, useSpring, useSprings } from '@react-spring/web';
import { usePathname } from 'next/navigation';

const NAVI_LINKS = [
  {
    name: '이메일',
    path: 'mailto:wingofyeon@naver.com',
    imagePath: '/home/email.png',
    backgroundColor: '#ffffff',
    color: '#000000',
    target: true,
  },
  {
    name: '깃허브',
    path: 'https://github.com/Taeyeon-Lim',
    imagePath: '/home/github-mark-white.png',
    backgroundColor: '#000000',
    color: '#ffffff',
    target: true,
  },
  {
    name: '포트폴리오',
    path: '/',
    // path: '/portfolio',
    imagePath: '/portfolio.svg',
    backgroundColor: '#FFE3BB',
    color: '#000000',
    target: false,
  },
  {
    name: 'Home',
    path: '/',
    imagePath: '/house.png',
    backgroundColor: '#F9F7F7',
    color: '#000000',
    target: false,
  },
];

function Navigator() {
  const buttonRef = useRef<HTMLDivElement>(null!);
  const avatarRefs = useRef<HTMLDivElement[]>([]);
  const avatarRefInitialPositions = useRef<number[]>([]);

  const isVisible = useRef(false); // for mouse
  const isTouch = useRef(false); // for touch

  const [{ opacity, viewLinkbuttonColor }, api] = useSpring(
    () => ({ opacity: 0, viewLinkbuttonColor: '#6579D4' }),
    []
  );

  const [avatarSprings, avatarApi] = useSprings(
    NAVI_LINKS.length,
    () => ({ y: 0, opacity: 0 }),
    []
  );

  useLayoutEffect(() => {
    if (avatarRefInitialPositions.current.length === 0) {
      const { y: buttonY } = buttonRef.current.getBoundingClientRect();

      avatarRefInitialPositions.current = avatarRefs.current.map(
        node => buttonY - node.getBoundingClientRect().y
      );
    }

    avatarApi.start(i => ({
      y: avatarRefInitialPositions.current[i],
      opacity: i === 0 ? 0 : 1 / (i * 1.2),
      immediate: true,
    }));
    // eslint-disable-next-line
  }, []);

  const backgroundTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const avatarTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const open = () => {
    if (backgroundTimeoutRef.current) {
      clearTimeout(backgroundTimeoutRef.current);
    }
    if (avatarTimeoutRef.current) {
      clearTimeout(avatarTimeoutRef.current);
    }

    api.start({
      opacity: 1,
      viewLinkbuttonColor: '#d64d4d',
    });

    avatarApi.start({
      y: 0,
      opacity: 1,
    });
  };

  const close = (delay: [number, number]) => {
    backgroundTimeoutRef.current = setTimeout(() => {
      api.start({
        opacity: 0,
        viewLinkbuttonColor: '#6579D4',
      });
    }, delay[0]);

    avatarTimeoutRef.current = setTimeout(() => {
      avatarApi.start(i => ({
        y: avatarRefInitialPositions.current[i],

        opacity: i === 0 ? 0 : 1 / (i * 1.2),

        onRest: () => {
          isVisible.current = false;
          isTouch.current = false;
        },
      }));
    }, delay[1]);
  };

  const bindHover = useHover(({ hovering }) => {
    // mouse event
    if (hovering) {
      isVisible.current = true;
      open();
    } else {
      close([600, 1000]);
    }
  });

  const {
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    ...restGestures
  } = bindHover();

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (isVisible.current) return;

    if (onPointerDown) onPointerDown(e);

    if (isTouch.current) {
      close([0, 400]);
    } else {
      isTouch.current = true;
      open();
    }
  };

  const pathname = usePathname();

  return (
    <a.nav
      onPointerLeave={onPointerLeave}
      {...restGestures}
      style={{
        backgroundColor: opacity.to(o => `rgba(0, 0, 0, ${0.2 * o})`),
        backdropFilter: opacity.to(o => `blur(${o * 8}px)`),
        touchAction: opacity.to(o => (o === 0 ? 'auto' : 'none')),
      }}
      className={cx('blur-background')}
    >
      {avatarSprings.map((springs, index) => (
        <a.div
          key={NAVI_LINKS[index].name}
          ref={ref => (avatarRefs.current[index] = ref!)}
          style={{
            ...springs,
            backgroundColor: NAVI_LINKS[index].backgroundColor,
          }}
          className={cx('link')}
        >
          <Link
            href={NAVI_LINKS[index].path}
            target={NAVI_LINKS[index].target ? '_blank' : '_self'}
            onClick={e => {
              if (NAVI_LINKS[index].name === '포트폴리오') {
                e.preventDefault();
                alert('곧 작성이 완료됩니다..!');
                return;
              }

              if (pathname === NAVI_LINKS[index].path) {
                e.preventDefault();

                window.scrollTo({ top: 0, behavior: 'smooth' });
                close([0, 400]);
                return;
              }

              if (isVisible.current || isTouch.current) close([0, 400]);
            }}
          >
            <Image
              src={NAVI_LINKS[index].imagePath}
              alt={NAVI_LINKS[index].name}
              width={24}
              height={24}
            />
            <div
              style={{
                color: NAVI_LINKS[index].color,
              }}
            >
              {NAVI_LINKS[index].name}
            </div>
          </Link>
        </a.div>
      ))}

      <a.div
        ref={buttonRef}
        onPointerDown={handlePointerDown}
        onPointerEnter={onPointerEnter}
        {...restGestures}
        style={{
          boxShadow: opacity.to(
            o => `0px 3px 8px 2px rgba(0, 0, 0, ${0.4 - o})`
          ),
          transform: opacity.to(o => `rotate(${o * 135}deg)`),
        }}
        className={cx('view-link')}
      >
        <span>
          <a.svg
            xmlns='http://www.w3.org/2000/svg'
            width='56'
            height='56'
            viewBox='0 0 512 512'
            fill={viewLinkbuttonColor}
          >
            <g transform='translate(0, 512) scale(0.1, -0.1)'>
              <path d='M2365 5114 c-27 -2 -111 -13 -185 -24 -710 -105 -1348 -511 -1752 -1115 -202 -302 -340 -661 -400 -1040 -32 -201 -32 -549 0 -750 115 -729 511 -1352 1117 -1757 302 -202 661 -340 1040 -400 201 -32 549 -32 750 0 284 45 512 117 764 243 501 248 902 649 1150 1150 126 252 198 480 243 764 32 201 32 549 0 750 -115 729 -511 1352 -1117 1757 -299 200 -662 340 -1030 398 -127 20 -459 34 -580 24z m515 -1754 l0 -480 480 0 480 0 0 -320 0 -320 -480 0 -480 0 0 -480 0 -480 -320 0 -320 0 0 480 0 480 -480 0 -480 0 0 320 0 320 480 0 480 0 0 480 0 480 320 0 320 0 0 -480z' />
            </g>
          </a.svg>
        </span>
      </a.div>
    </a.nav>
  );
}

export default Navigator;
