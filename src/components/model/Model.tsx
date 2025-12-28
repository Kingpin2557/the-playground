import { Html, useGLTF, Clone } from "@react-three/drei";
import { useControls, button } from "leva";
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

    const [controls] = useControls(name, () => ({
        pos: {
            value: { x: position.x, y: position.y, z: position.z },
            step: 0.1,
        },
        rot: {
            value: { x: rotation.x, y: rotation.y, z: rotation.z },
            step: 0.01,
        },
        modelScale: { value: scale, min: 0.1, max: 10, step: 0.01 },
        "Log Values": button((get) => {
            const p = get(`${name}.pos`);
            const r = get(`${name}.rot`);
            const s = get(`${name}.modelScale`);

            console.log(`-- ${name} --`);
            console.log(`position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
            console.log(`rotation: [${r.x.toFixed(2)}, ${r.y.toFixed(2)}, ${r.z.toFixed(2)}]`);
            console.log(`scale: ${s}`);
        })
    }));

    // Calculate center for pivoting
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
            {/* 1. Pivot Group: This handles Rotation and Scale around the center */}
            <group
                rotation={[controls.rot.x, controls.rot.y, controls.rot.z]}
                scale={controls.modelScale}
            >
                {/* 2. Offset Group: Moves the model so its center is at the Pivot's [0,0,0] */}
                <group position={[-center.x, -center.y, -center.z]}>
                    <Clone
                        ref={ref}
                        object={scene}
                        castShadow
                        receiveShadow
                    />
                </group>

                {/* Tag stays relative to the pivot center */}
                <Html position={[0, center.y + 2, 0]} center>
                    <div className={styles.tag}>
                        <p onClick={onCamera}>{name}</p>
                    </div>
                </Html>
            </group>
        </group>
    );
}

export default Model;