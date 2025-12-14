import { useGLTF } from '@react-three/drei'

export default function Ground() {
    const { nodes } = useGLTF('/ground.glb')
    return (
        <group dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.ground.geometry}
                material={nodes.ground.material}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1.316}
            />
        </group>
    )
}

useGLTF.preload('/ground.glb')