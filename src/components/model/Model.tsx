import {Html, useGLTF} from "@react-three/drei";
import * as THREE from "three";
import {type MouseEventHandler, useRef} from "react";
import styles from "./Model.module.css";
import * as React from "react";

type ModelProps = {
    model: string;
    name: string;
    onCamera: MouseEventHandler;
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: number;
    groupRef?: React.Ref<THREE.Group>;
};

// Type guard for THREE.Mesh
function isMesh(object: THREE.Object3D): object is THREE.Mesh {
    return (object as THREE.Mesh).isMesh;
}

function Model({ model, name, onCamera, position, rotation, scale, groupRef }: ModelProps) {
    const { scene } = useGLTF(model);
    const internalRef = useRef<THREE.Group>(null!);
    
    // Combineer refs: gebruik de meegegeven ref of de interne
    const ref = groupRef || internalRef;
    

    return (
        <group ref={ref} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]} scale={scale}>
            {/* Render each mesh individually */}
            {scene.children.map((child, index) => {
                if (isMesh(child)) {
                    return (
                        <mesh
                            key={index}
                            geometry={child.geometry}
                            material={child.material}
                            position={child.position}
                            rotation={child.rotation}
                            scale={child.scale}
                            castShadow
                            receiveShadow
                        >
                            {index === 0 && (
                                <Html position={[0, 1, 0]} center>
                                    <div className={styles.tag}>
                                        <p onClick={onCamera}>{name}</p>
                                    </div>
                                </Html>
                            )}
                        </mesh>
                    );
                }
                return null;
            })}
        </group>
    );
}

export default Model;
