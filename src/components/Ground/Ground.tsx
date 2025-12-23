import { useGLTF } from '@react-three/drei';
import * as THREE from "three";

export default function Ground() {
    const { nodes } = useGLTF('./ground.glb')
    const groundMesh = nodes.ground as THREE.Mesh;
    return (
        <group position={[0,0,0]} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={groundMesh.geometry}
                material={groundMesh.material}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1.316}
            />
        </group>
    )
}

useGLTF.preload('./ground.glb')