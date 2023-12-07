'use client';

import styles from './Portfolio.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import * as THREE from 'three';
import { useState, Suspense, useEffect, useRef, lazy } from 'react';

import { Canvas, Vector3, useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from '@react-three/postprocessing';

import CanvasLoader from '@components/Loader/CanvasLoader';
import Astronaut from './_Components/Astronaut';
import Basecamp from './_Components/Basecamp';
const WelcomeText = lazy(() => import('./_Components/WelcomeText'));
const ThemeContent = lazy(() => import('./_Components/ThemeContent'));

import useAnimateState from './_Components/Store';

const ThemesArray = ['0', '1', null] as const;
export type Themes = (typeof ThemesArray)[number];
const isThemes = (x: any): x is '0' | '1' | null =>
  !x || isNaN(x) ? false : ThemesArray.includes(x) ? true : false;

const THEME_VIEW_Xpos = {
  0: -11.68,
  1: -6.85,
} as const;

const initialCamera: Vector3 = [-18, 10, 15] as const;

const Rig = ({ theme }: { theme: Themes }) => {
  const control = useRef<CameraControls>(null!);
  const [vec] = useState<THREE.Vector3>(
    () => new THREE.Vector3(...initialCamera)
  );

  const isControlCamera = useAnimateState(s => s.isControlCamera);

  const handleCamera = async () => {
    if (theme) {
      await control.current.setLookAt(
        vec.x,
        vec.y,
        vec.z,
        THEME_VIEW_Xpos[theme],
        2,
        0,
        true
      );
    } else {
      await control.current.setLookAt(vec.x, vec.y, vec.z, 0, 0, 0, true);
    }
  };

  useEffect(() => {
    if (theme) {
      vec.set(THEME_VIEW_Xpos[theme], 2.45, 5);
    } else {
      vec.set(initialCamera[0], initialCamera[1], initialCamera[2]);
    }
  }, [theme, vec]);

  useFrame(() => {
    if (isControlCamera) handleCamera();
  });

  return <CameraControls ref={control} />;
};

export default function Portfolio({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const theme: Themes = isThemes(searchParams.view) ? searchParams.view : null;

  return (
    <main className={cx('portfolio')}>
      <Suspense fallback={null}>
        <WelcomeText reverse={theme !== null} />
      </Suspense>

      <Suspense fallback={<CanvasLoader imageSrc={'/portfolio/loading.png'} />}>
        <Canvas
          gl={{ antialias: false }}
          dpr={[0.5, 2]}
          camera={{
            fov: 60,
            position: initialCamera,
          }}
        >
          <Rig theme={theme} />

          <ambientLight intensity={2} />

          <Astronaut theme={theme} />

          <Basecamp theme={theme} />

          <Suspense fallback={null}>
            <ThemeContent theme={theme} />
          </Suspense>

          <EffectComposer disableNormalPass multisampling={8}>
            <Bloom
              intensity={theme ? 0.15 : 0.3}
              luminanceSmoothing={0.1}
              luminanceThreshold={0.1}
              mipmapBlur
            />
            <DepthOfField
              target={initialCamera}
              focalLength={0.1}
              bokehScale={5}
              height={400}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </main>
  );
}
