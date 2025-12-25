import { Html, useGLTF, Clone } from "@react-three/drei";
import * as THREE from "three";
import { type MouseEventHandler, useRef } from "react";
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

function Model({ model, name, onCamera, position, rotation, scale, groupRef }: ModelProps) {
    const { scene } = useGLTF(model);
    const internalRef = useRef<THREE.Group>(null!);
    const ref = groupRef || internalRef;

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    return (
        <group
            position={position}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={scale}
        >
            <Clone
                ref={ref}
                object={scene}
                castShadow
                receiveShadow
            />

            <Html position={[center.x, center.y + 2, center.z]} center>
                <div className={styles.tag}>
                    <p onClick={onCamera}>{name}</p>
                </div>
            </Html>
        </group>
    );
}

export default Model;