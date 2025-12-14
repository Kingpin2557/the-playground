import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'
import type {ThreeEvent} from "@react-three/fiber";

type ClickHandler = (event: ThreeEvent<THREE.Mesh>) => void;
type Model = {
    model: string,
    onClick: ClickHandler,
    position: THREE.Vector3,
    rotation: THREE.Vector3,
    scale: number
}

//AI generated function, .filter() also with AI. everything else is my own work
function isMesh(object: THREE.Object3D | THREE.Mesh): object is THREE.Mesh {
    return (object as THREE.Mesh).isMesh;
}

export default function Playground({model, onClick ,position, rotation, scale }:Model) {
    const { nodes } = useGLTF(model);
    const arrNodes = Object.values(nodes);
    const [x, y, z] = position;
    const [rx, ry, rz] = rotation;

    return (
        <group position={[x, y + 0.015 ,z]} rotation={[rx, ry, rz]} scale={scale} onClick={ onClick }>
            {arrNodes.filter(isMesh).map((node) => {
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
            })}
        </group>
    )
}

// useGLTF.preload(modelPath)
