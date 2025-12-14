import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'

type Model = {
    model: string,
    position: THREE.Vector3,
}

export default function Playground({model, position }:Model) {
    const { nodes } = useGLTF(model);
    const arrNodes = Object.values(nodes);
    const [x, y, z] = position;

    let newY = y;
    newY += 0.015;


    return (
        <group position={[x, newY ,z]} rotation={[0, 0.984, 0]} scale={0.101}>
            {arrNodes.map((node) => {
                if (node.isMesh) {
                    return (
                        <mesh
                            key={node.uuid}
                            castShadow
                            receiveShadow
                            geometry={node.geometry}
                            material={node.material}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                        />
                    );
                }
                return null;
            })}
        </group>
    )
}

// useGLTF.preload(modelPath)
