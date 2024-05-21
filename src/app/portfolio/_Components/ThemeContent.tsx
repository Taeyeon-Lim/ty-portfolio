'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  Sky,
  Image,
  Float,
  Cylinder,
  SpotLight,
  useCursor,
  RoundedBox,
  useDepthBuffer,
  MeshPortalMaterial,
  MeshDistortMaterial,
} from '@react-three/drei';
import { Vector3, ThreeEvent, useThree } from '@react-three/fiber';
const Text = dynamic(() => import('@react-three/drei').then(mod => mod.Text), {
  ssr: false,
});
const AnimatedCylinder = animated(Cylinder);
const AnimatedText = animated(Text);

import { useUpdateSearchParams } from '@Hooks/hookUtils';
import { animated, useSpring } from '@react-spring/web';

import useAnimateState from './Store';

import { Themes } from '../page';
type ThemeInfo = {
  description: string; // 반드시 텍스트가 잘 보이는 지 확인
  imageUrl: string;
  position: Vector3;
};

import { PortfolioTheme_Hangul, ThemeTypeArray } from '../_Types';
const TRANSITION_TIME = 1000;
const THEME_INFOS: Record<NonNullable<Themes>, ThemeInfo> = {
  0: {
    description: `인강헬퍼는 선생님의 수업 관리를\n도와주는 플랫폼입니다.\n\n학생과 선생님의 매칭 및 결제 관리\n도 지원합니다`,
    imageUrl: '/portfolio/ingangHelper.jpg',
    position: [-11.665, 2, 2.262],
  },
  1: {
    description: `hey Vote!는 토이프로젝트로,\n\n모임에서 어떤 일을 결정 할 때\n투표하여 결정 내리는 것을\n도와주는 웹앱입니다`,
    imageUrl: '/portfolio/heyVote.png',
    position: [-6.838, 2, 2.2625],
  },
};

function ThemeContent({ theme }: { theme: Themes }) {
  const depthBuffer = useDepthBuffer();
  const descriptionPosition = theme
    ? THEME_INFOS[theme].description.match(/\n/g)?.length || 0
    : 0;

  const deviceWidth = useThree(state => Math.floor(state.size.width));
  const mobilePosZ =
    deviceWidth !== 0 && deviceWidth < 550 ? -(deviceWidth * 0.0035) : 0;

  const { updateSearchParam } = useUpdateSearchParams(null, 'push');

  const [{ opacity }, api] = useSpring(
    () => ({
      opacity: 0,
      config: {
        precision: 0.0001,
      },
    }),
    []
  );

  const [
    animateState,
    astronautAnimation,
    updateAnimateState,
    updateAstronautAnimation,
  ] = useAnimateState(s => [
    s.animateState,
    s.astronautAnimation,
    s.updateAnimateState,
    s.updateAstronautAnimation,
  ]);

  // handle browser history
  useLayoutEffect(() => {
    const back = () => {
      if (theme) {
        if (theme === '0' && astronautAnimation === 'floating') {
          updateAstronautAnimation('wave');
        }

        api.start({
          opacity: 0,
          immediate: true,
        });

        return;
      }

      // [+] theme(null)에서 `앞으로`인 경우 (아래 이유로 사용 불가)
      // `/portfolio`에서 하위 경로가 아닌 경로로 이동할 경우, 자동 이동이 됨
      // if (!theme && astronautAnimation === 'wave') {
      //  updateAstronautAnimation('floating');
      // }
    };

    window.addEventListener('popstate', back);

    return () => window.removeEventListener('popstate', back);
  }, [theme, astronautAnimation, updateAstronautAnimation, api]);

  // handle animation
  useEffect(() => {
    if (theme) {
      api.start(() => ({
        opacity: 1,
        delay: TRANSITION_TIME,
        onStart: () => {
          updateAnimateState('progress', true);
        },
        onRest: () => {
          updateAnimateState('idle', true);
        },
      }));
    }
  }, [theme, api, updateAnimateState]);

  // cursor control
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = useCallback(
    (lastButton: boolean) => (e: ThreeEvent<PointerEvent | MouseEvent>) => (
      e.stopPropagation(), setHovered(!lastButton)
    ),
    []
  );
  const handlePointerOut = useCallback(() => setHovered(false), []);

  useCursor(hovered, animateState === 'end' ? 'wait' : 'pointer');

  return (
    <AnimatedCylinder
      args={
        opacity.to(top => [1.5, 1.5, top * 1.5, 64, 64, true, -0.4, 0.8]) as any
      }
      position={theme ? THEME_INFOS[theme].position : THEME_INFOS['0'].position}
      rotation={[-Math.PI / 10.1, 0, 0]}
    >
      <MeshPortalMaterial toneMapped={false}>
        <group position={[0, 0, mobilePosZ]}>
          {/* portal env */}
          <Sky />
          <ambientLight intensity={1} color={'#ffffff'} />
          <SpotLight
            distance={10}
            angle={4}
            intensity={5.5}
            color={'#94b8df'}
            position={[0, 0.1, 1]}
            depthBuffer={depthBuffer}
          />

          {/* Top Title */}
          <AnimatedText
            font={'fonts/NanumGothic-Regular.woff'}
            color='black'
            fontSize={0.3}
            anchorY={'top'}
            position={[0, 1.65, 0.01]}
            fillOpacity={opacity.to(x => Math.atan(x) * 1.45)}
          >
            {theme
              ? PortfolioTheme_Hangul[ThemeTypeArray[parseInt(theme)]]
              : '초기화 중...'}
          </AnimatedText>

          {/* Middle Contents */}
          <group rotation={[Math.PI / 36, 0, 0]}>
            {/* Content - Image  */}
            <Float
              speed={1} // Animation speed, defaults to 1
              rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.4, 0]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
              // scale={1.2}
              position={[0, 0.45, 0]}
            >
              <Image
                url={
                  theme
                    ? THEME_INFOS[theme].imageUrl
                    : THEME_INFOS['0'].imageUrl
                }
                // @ts-ignore
                alt={
                  'Thumbnail_' +
                  (theme
                    ? PortfolioTheme_Hangul[ThemeTypeArray[parseInt(theme)]]
                    : PortfolioTheme_Hangul[ThemeTypeArray[0]])
                }
                onPointerOver={handlePointerOver(false)}
                onPointerOut={handlePointerOut}
                onClick={e => {
                  e.stopPropagation();

                  handlePointerOut();
                  alert('곧 업데이트 됩니다..!');

                  // if (theme && animateState === 'idle') {
                  //   handlePointerOut();

                  //   updateAnimateState('end', true);

                  //   updateSearchParam(
                  //     null,
                  //     null,
                  //     ['view'],
                  //     `/portfolio/${ThemeTypeArray[parseInt(theme)]}`
                  //   );

                  //   updateAnimateState('idle', true);
                  // }
                }}
              />
            </Float>

            {/* Content - Right Button  */}
            <group
              position={[0.85, 0.325, 0.1]}
              rotation={[Math.PI / 36, 0, 0]}
              visible={theme !== '1'}
              onPointerOver={handlePointerOver(theme === '1')}
              onPointerOut={handlePointerOut}
              onClick={e => {
                e.stopPropagation();
                if (theme && animateState === 'idle') {
                  if (theme === '1') return;

                  api.start({
                    opacity: 0,
                    onStart: () => {
                      handlePointerOut();

                      updateAnimateState('progress', false);
                    },
                    onRest: () => {
                      updateAnimateState('progress', true);

                      updateSearchParam(
                        'view',
                        (parseInt(theme) + 1).toString()
                      );

                      api.start({
                        opacity: 1,
                        delay: TRANSITION_TIME,
                        onRest: () => {
                          updateAnimateState('idle', true);
                        },
                      });
                    },
                  });
                }
              }}
            >
              <RoundedBox
                args={[0.4, 0.4, 0.05]}
                position={[0, 0, 0.01]}
                radius={0.025}
              >
                <MeshDistortMaterial speed={1} color={'#94b8df'} />
              </RoundedBox>
              <Cylinder
                args={[0, 0.125, 0.125 * Math.sqrt(3), 2]}
                position={[-0.01, -0.01, 0.1]}
                rotation={[Math.PI * 0.5, 0, Math.PI * 1.5]}
              >
                <MeshDistortMaterial speed={1} color={'#94b8df'} />
              </Cylinder>
            </group>

            {/* Content - Left Button  */}
            <group
              position={[-0.85, 0.325, 0.1]}
              rotation={[Math.PI / 36, 0, 0]}
              onPointerOver={handlePointerOver(false)}
              onPointerOut={handlePointerOut}
              onClick={e => {
                e.stopPropagation();
                if (theme && animateState === 'idle') {
                  handlePointerOut();
                  if (theme === '0') {
                    api.start({
                      opacity: 0,
                      onStart: () => {
                        updateAnimateState('progress', false);
                        updateAstronautAnimation('wave');
                      },
                      onRest: () => {
                        updateAnimateState('idle', true);
                        updateSearchParam(null, null, ['view']);
                      },
                    });
                  } else {
                    api.start({
                      opacity: 0,
                      onStart: () => {
                        updateAnimateState('progress', false);
                      },
                      onRest: () => {
                        updateAnimateState('progress', true);
                        updateSearchParam(
                          'view',
                          (parseInt(theme) - 1).toString()
                        );
                        api.start({
                          opacity: 1,
                          delay: TRANSITION_TIME,
                          onRest: () => {
                            updateAnimateState('idle', true);
                          },
                        });
                      },
                    });
                  }
                }
              }}
            >
              <RoundedBox
                args={[0.4, 0.4, 0.05]}
                position={[0, 0, 0.01]}
                radius={0.025}
              >
                <MeshDistortMaterial speed={1} color={'#94b8df'} />
              </RoundedBox>

              <Cylinder
                args={[0, 0.125, 0.125 * Math.sqrt(3), 2]}
                position={[-0.01, -0.01, 0.1]}
                rotation={[Math.PI * 1.5, 0, Math.PI * 0.5]}
              >
                <MeshDistortMaterial speed={1} color={'#94b8df'} />
              </Cylinder>
            </group>
          </group>

          {/* Bottom Description */}
          <AnimatedText
            font={'fonts/NanumGothic-Regular.woff'}
            color='black'
            fontSize={0.1075}
            anchorY={'bottom'}
            position={[0, -(descriptionPosition * 0.05) - 0.65, 0.01]}
            fillOpacity={opacity.to(x => Math.atan(x) * 1.75)}
          >
            {theme ? THEME_INFOS[theme].description : '초기화 중...'}
          </AnimatedText>
        </group>
      </MeshPortalMaterial>
    </AnimatedCylinder>
  );
}

export default ThemeContent;
