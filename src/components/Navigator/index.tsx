'use client';

import styles from './Navigator.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useHover } from '@use-gesture/react';
import { a, useSpring, useSprings } from '@react-spring/web';

function Navigator({
  links,
}: {
  links: {
    name: string;
    path: string;
    imagePath: string;
    backgroundColor: string;
    color: string;
    target: boolean;
  }[];
}) {
  const buttonRef = useRef<HTMLDivElement>(null!);
  const avatarRefs = useRef<HTMLDivElement[]>([]);
  const avatarRefInitialPositions = useRef<number[]>([]);
  // const containerRef = useRef<HTMLDivElement>(null!);

  const isVisible = useRef(false);
  const isMobile = useRef(false);

  const [{ opacity, viewLinkbuttonColor }, api] = useSpring(
    () => ({ opacity: 0, viewLinkbuttonColor: '#6579D4' }),
    []
  );

  const [avatarSprings, avatarApi] = useSprings(
    links.length,
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

    isVisible.current = true;

    api.start({
      opacity: 1,
      viewLinkbuttonColor: '#d64d4d',
    });

    avatarApi.start({
      y: 0,
      opacity: 1,
    });
  };

  const close = (isMobile: boolean) => {
    console.log('close', isMobile);
    backgroundTimeoutRef.current = setTimeout(
      () => {
        api.start({
          opacity: 0,
          viewLinkbuttonColor: '#6579D4',
        });
      },
      isMobile ? 1000 : 750
    );

    avatarTimeoutRef.current = setTimeout(
      () => {
        avatarApi.start(i => ({
          y: avatarRefInitialPositions.current[i],

          opacity: i === 0 ? 0 : 1 / (i * 1.2),

          onRest: () => {
            isVisible.current = false;
          },
        }));
      },
      isMobile ? 2000 : 1000
    );
  };

  const bindHover = useHover(
    state => {
      const { hovering } = state;

      if (hovering) {
        open();
      } else {
        close(false);
      }
    },
    {
      mouseOnly: false,
    }
  );

  const {
    onPointerEnter,
    onPointerLeave,
    // onPointerDown,
    ...restGestures
  } = bindHover();

  // const handlePointerDown =
  //   (isBackground: boolean) => (e: React.PointerEvent<HTMLElement>) => {
  //     e.stopPropagation();

  //     if (isBackground && !isVisible.current) return;

  //     if (onPointerDown) onPointerDown(e);
  //   };

  const handleOnPointerLeave =
    (isBackground: boolean) => (e: React.PointerEvent<HTMLElement>) => {
      e.stopPropagation();

      if (isBackground && !isVisible.current) return;

      if (onPointerLeave) onPointerLeave(e);
    };

  const handleClick = () => (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    console.log('click - ', isVisible.current);

    if (isVisible.current) {
      close(true);
    } else {
      open();
    }
  };

  return (
    <a.nav
      // ref={containerRef}
      // onPointerLeave={onPointerLeave}
      onPointerLeave={handleOnPointerLeave(false)}
      // onPointerDown={handlePointerDown(true)}
      {...restGestures}
      style={{
        backgroundColor: opacity.to(o => `rgba(0, 0, 0, ${0.2 * o})`),
        backdropFilter: opacity.to(o => `blur(${o * 8}px)`),
      }}
      className={cx('blur-background')}
    >
      {avatarSprings.map((springs, index) => (
        <a.div
          key={links[index].name}
          ref={ref => (avatarRefs.current[index] = ref!)}
          style={{
            y: springs.y,
            backgroundColor: links[index].backgroundColor,
          }}
          className={cx('link')}
        >
          <Link
            href={links[index].path}
            target={links[index].target ? '_blank' : '_self'}
            onClick={() => {
              if (links[index].name === '포트폴리오') {
                alert('곧 작성이 완료됩니다..!');
              }
            }}
          >
            <Image
              src={links[index].imagePath}
              alt={links[index].name}
              width={24}
              height={24}
            />
            <div
              style={{
                color: links[index].color,
              }}
            >
              {links[index].name}
            </div>
          </Link>
        </a.div>
      ))}

      <a.div
        ref={buttonRef}
        onPointerEnter={onPointerEnter}
        // onClick={() => {
        //   console.log('click', isVisible.current);
        //   if (isVisible.current) {
        //     close(true);
        //   } else {
        //     open();
        //   }
        // }}
        onClick={handleClick}
        // onPointerDown={handlePointerDown(false)}
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
