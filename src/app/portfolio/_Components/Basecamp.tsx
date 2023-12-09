import * as THREE from 'three';
import { GroupProps } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import { GLTF } from 'three-stdlib';
import { Themes } from '../page';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_17: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_19: THREE.Mesh;
    Object_20: THREE.Mesh;
    Object_21: THREE.Mesh;
    Object_22: THREE.Mesh;
    Object_23: THREE.Mesh;
    Object_24: THREE.Mesh;
    Object_25: THREE.Mesh;
    Object_26: THREE.Mesh;
    Object_27: THREE.Mesh;
    Object_28: THREE.Mesh;
    Object_29: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_31: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshBasicMaterial;
    material_1: THREE.MeshBasicMaterial;
    material_2: THREE.MeshBasicMaterial;
    material_3: THREE.MeshBasicMaterial;
    material_4: THREE.MeshBasicMaterial;
    material_5: THREE.MeshBasicMaterial;
    material_6: THREE.MeshBasicMaterial;
    material_7: THREE.MeshBasicMaterial;
    material_8: THREE.MeshBasicMaterial;
    material_9: THREE.MeshBasicMaterial;
    material_10: THREE.MeshBasicMaterial;
    material_11: THREE.MeshBasicMaterial;
    material_12: THREE.MeshBasicMaterial;
    material_13: THREE.MeshBasicMaterial;
    material_14: THREE.MeshBasicMaterial;
    material_15: THREE.MeshBasicMaterial;
    material_16: THREE.MeshBasicMaterial;
    material_17: THREE.MeshBasicMaterial;
    material_18: THREE.MeshBasicMaterial;
    material_19: THREE.MeshBasicMaterial;
    material_20: THREE.MeshBasicMaterial;
    material_21: THREE.MeshBasicMaterial;
    material_22: THREE.MeshBasicMaterial;
    material_23: THREE.MeshBasicMaterial;
    material_24: THREE.MeshBasicMaterial;
    material_25: THREE.MeshBasicMaterial;
    material_26: THREE.MeshBasicMaterial;
    material_27: THREE.MeshBasicMaterial;
    material_28: THREE.MeshBasicMaterial;
    material_29: THREE.MeshBasicMaterial;
  };
};

// type ContextType = Record<
//   string,
//   React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
// >;

export default function Basecamp({
  theme,
  ...props
}: {
  theme: Themes;
} & GroupProps) {
  const { nodes, materials } = useGLTF(
    '/portfolio/basecamp_draco/basecamp.gltf'
  ) as GLTFResult;

  return (
    <group {...props} position={[0, 0, 5]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.02}>
        {/* 거점 외곽 지형 */}
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.Object_3.geometry}
          material={materials.material_1}
        />
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.material_2}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.material_3}
        />

        {/* 배경 */}
        <mesh
          geometry={nodes.Object_6.geometry}
          material={materials.material_4}
        />

        {/* 거점 주변 지형 */}
        <mesh
          geometry={nodes.Object_7.geometry}
          material={materials.material_5}
        />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.material_6}
        />
        <mesh
          geometry={nodes.Object_9.geometry}
          material={materials.material_7}
        />
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.material_8}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.material_9}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.material_10}
        />

        {/* 태양광 집열판 */}
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.material_11}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.material_12}
        />

        {/* 거점 사다리 */}
        <mesh
          geometry={nodes.Object_15.geometry}
          material={materials.material_13}
          visible={!theme}
        />

        {/* 우주 비행사 */}
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.material_14}
          visible={!theme}
        />

        {/* 거점 숙소 1 */}
        <mesh
          geometry={nodes.Object_17.geometry}
          material={materials.material_15}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials.material_16}
        />

        {/* 거점 숙소 2 */}
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials.material_17}
        />
        <mesh
          geometry={nodes.Object_20.geometry}
          material={materials.material_18}
        />

        {/* 거점 숙소 3 */}
        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials.material_19}
        />
        <mesh
          geometry={nodes.Object_22.geometry}
          material={materials.material_20}
        />

        {/* 거점 숙소 4 */}
        <mesh
          geometry={nodes.Object_23.geometry}
          material={materials.material_21}
        />
        <mesh
          geometry={nodes.Object_24.geometry}
          material={materials.material_22}
        />

        {/* 거점 숙소 5 */}
        <mesh
          geometry={nodes.Object_25.geometry}
          material={materials.material_23}
        />
        <mesh
          geometry={nodes.Object_26.geometry}
          material={materials.material_24}
        />

        {/* 거점 숙소 6 */}
        <mesh
          geometry={nodes.Object_27.geometry}
          material={materials.material_25}
        />
        <mesh
          geometry={nodes.Object_28.geometry}
          material={materials.material_26}
        />
        <mesh
          geometry={nodes.Object_29.geometry}
          material={materials.material_27}
        />
        <mesh
          geometry={nodes.Object_30.geometry}
          material={materials.material_28}
        />

        {/* 안테나 */}
        <mesh
          geometry={nodes.Object_31.geometry}
          material={materials.material_29}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/portfolio/basecamp_draco/basecamp.gltf');
