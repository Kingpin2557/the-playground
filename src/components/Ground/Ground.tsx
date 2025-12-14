import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Ground(props) {
    const { nodes } = useGLTF('/ground.glb')
    return (
        <group {...props} dispose={null}>
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