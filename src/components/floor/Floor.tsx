import { useGLTF } from '@react-three/drei';
import * as THREE from "three";

 function Floor() {
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
                scale={1}
            />
        </group>
    )
}

export default Floor;
useGLTF.preload('./ground.glb')