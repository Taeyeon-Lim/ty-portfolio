'use client';

import * as THREE from 'three';
import { Group } from 'three';
import { useRef, useEffect, useCallback, useMemo } from 'react';

import { GroupProps } from '@react-three/fiber';
import { SpotLight, useAnimations, useGLTF, Outlines } from '@react-three/drei';
import {
  useTimeout,
  useInterval,
  useUpdateSearchParams,
} from '@hooks/hookUtils';
import { a, useSpring } from '@react-spring/three';
import { useShallow } from 'zustand/react/shallow';

import useAnimateState from './Store';

import { GLTF } from 'three-stdlib';
import { Themes } from '../page';

type GLTFResult = GLTF & {
  nodes: {
    Object_99: THREE.SkinnedMesh;
    Object_100: THREE.SkinnedMesh;
    Object_103: THREE.SkinnedMesh;
    Object_106: THREE.SkinnedMesh;
    GLTF_created_0_rootJoint: THREE.Bone;
  };
  materials: {
    material_0: THREE.MeshStandardMaterial;
    material_1: THREE.MeshStandardMaterial;
    material_2: THREE.MeshStandardMaterial;
  };
};

const INIT_SPRING_VALUE = {
  position: [-16, 6.5, 14],
  rotation: [0, Math.PI * -0.35, Math.PI * 0.025] as any,
};

export default function Astronaut({
  theme,
  ...props
}: {
  theme: Themes;
} & GroupProps) {
  const group = useRef<Group>(null!);

  const { nodes, materials, animations } = useGLTF(
    '/portfolio/astronaut.glb'
  ) as GLTFResult;

  const instances = useMemo(
    () => ({
      ...nodes,
    }),
    [nodes]
  );

  const { actions } = useAnimations(animations, group);

  const [springs, api] = useSpring(() => ({
    ...INIT_SPRING_VALUE,
    config: {
      precision: 0.0001,
      duration: 2000,
    },
  }));

  // 애니메이션 초기화
  useEffect(() => {
    // 4가지 타입 애니메이션
    // wave, moon_walk, floating, idle

    if (!actions || !actions['wave']) return;

    actions['wave']?.reset().play();

    return () => {
      actions['wave']?.stop();
    };
  }, [actions]);

  const [
    animateState,
    isControlCamera,
    astronautAnimation,
    updateAstronautAnimation,
  ] = useAnimateState(
    useShallow(s => [
      s.animateState,
      s.isControlCamera,
      s.astronautAnimation,
      s.updateAstronautAnimation,
    ])
  );

  // handle animation
  useEffect(() => {
    if (!actions || !actions['idle'] || !actions['floating'] || !api) return;

    // Theme (null => number)
    if (astronautAnimation === 'floating') {
      if (actions['wave']?.isRunning()) {
        actions['wave']?.fadeOut(1);
      }
      if (actions['idle']?.isRunning()) {
        actions['idle']?.fadeOut(1);
      }

      api.start({
        position: [-12, 3.4, 16],
        rotation: [Math.PI * -0.275, Math.PI * -1, 0],
        config: {
          duration: 800,
        },
      });

      actions['floating']?.reset().fadeIn(0.4).play();

      return () => {
        actions['floating']?.fadeOut(0.4);
      };
    }

    // Theme (number => null)
    if (!theme) {
      if (actions['floating']?.isRunning()) {
        actions['floating']?.fadeOut(1);
      }

      api.start({ ...INIT_SPRING_VALUE });

      actions['wave']?.reset().fadeIn(1).play();

      return () => {
        actions['wave']?.fadeOut(1);
      };
    }
  }, [theme, actions, astronautAnimation, api]);

  const { updateSearchParam } = useUpdateSearchParams(null, 'push');

  const updateThemeNumber = useCallback(() => {
    updateSearchParam('view', '0');
  }, [updateSearchParam]);

  const intervalCallback = useCallback(() => {
    if (actions['wave']?.isRunning()) {
      actions['wave']?.fadeOut(1);

      actions['idle']?.reset().fadeIn(1).play();
    } else if (actions['idle']?.isRunning()) {
      actions['idle']?.fadeOut(1);

      actions['wave']?.reset().fadeIn(1).play();
    }
  }, [actions]);

  // Theme 전환
  useTimeout(
    updateThemeNumber,
    700,
    !theme && astronautAnimation === 'floating'
  );

  // handle animation interval
  useInterval(
    intervalCallback,
    theme || astronautAnimation === 'floating' ? null : 6000
  );

  return (
    <a.group
      {...props}
      ref={group}
      onClick={e => {
        e.stopPropagation();

        if (theme) return;

        if (animateState === 'idle' && isControlCamera) {
          if (astronautAnimation === 'floating') return;

          updateAstronautAnimation('floating');
        }
      }}
      position={springs.position.to((x, y, z) => [x, y, z])}
      rotation={springs.rotation.to((x: number, y: number, z: number) => [
        x,
        y,
        z,
      ])}
      dispose={null}
    >
      <SpotLight
        position={[0, 3.75, 2.25]}
        distance={3}
        angle={0.4}
        attenuation={0.5}
        color={'#ffffd1'}
        anglePower={10} // Diffuse-cone anglePower (default: 5)
        visible={theme === null}
      />

      <group name='Sketchfab_Scene'>
        <group
          name='Sketchfab_model'
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.314}
        >
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='RootNode0_0' scale={0.01}>
                <group name='skeletal3_6'>
                  <group name='GLTF_created_0'>
                    <primitive object={instances.GLTF_created_0_rootJoint} />

                    <group name='_3_correction'>
                      <group name='_3' />
                    </group>

                    <group name='_4_correction'>
                      <group name='_4' />
                    </group>

                    <group name='_5_correction'>
                      <group name='_5' />
                    </group>

                    <skinnedMesh
                      name='Object_99'
                      geometry={instances.Object_99.geometry}
                      material={materials.material_0}
                      skeleton={instances.Object_99.skeleton}
                    >
                      <Outlines
                        angle={Math.PI}
                        color={'#ffc999'}
                        opacity={4}
                        thickness={1}
                        screenspace
                        transparent
                      />
                    </skinnedMesh>

                    <skinnedMesh
                      name='Object_100'
                      geometry={instances.Object_100.geometry}
                      material={materials.material_0}
                      skeleton={instances.Object_100.skeleton}
                    />

                    <skinnedMesh
                      name='Object_103'
                      geometry={instances.Object_103.geometry}
                      material={materials.material_1}
                      skeleton={instances.Object_103.skeleton}
                    />

                    <skinnedMesh
                      name='Object_106'
                      geometry={instances.Object_106.geometry}
                      material={materials.material_2}
                      skeleton={instances.Object_106.skeleton}
                    >
                      <Outlines
                        angle={Math.PI}
                        color={
                          astronautAnimation === 'floating'
                            ? '#ffc999'
                            : '#efb581'
                        }
                        opacity={astronautAnimation === 'floating' ? 2 : 10}
                        thickness={2}
                        screenspace
                        transparent
                      />
                    </skinnedMesh>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}

useGLTF.preload('/portfolio/astronaut.glb');
