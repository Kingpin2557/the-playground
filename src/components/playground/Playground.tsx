import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'

type Model = {
    model: string,
    position: THREE.Vector3,
    rotation: THREE.Vector3,
    scale: number
}

export default function Playground({model, position, rotation, scale }:Model) {
    const { nodes } = useGLTF(model);
    const arrNodes = Object.values(nodes);
    const [x, y, z] = position;
    const [rx, ry, rz] = rotation;
    const sc = scale;

    let newY = y;
    newY += 0.015;


    return (
        <group position={[x, newY ,z]} rotation={[rx, ry, rz]} scale={sc}>
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
