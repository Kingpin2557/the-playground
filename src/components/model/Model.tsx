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
        rotY: {
            value: rotation.y,
            step: 0.01,
        },
        scale: {
            value: scale,
            min: 0.1,
            max: 10,
            step: 0.01
        },
        "Log Values": button((get) => {
            const p = get(`${name}.pos`);
            const ry = get(`${name}.rotY`);
            const s = get(`${name}.scale`);

            console.log(`-- ${name} --`);
            console.log(`position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
            console.log(`rotation: [${rotation.x.toFixed(2)}, ${ry.toFixed(2)}, ${rotation.z.toFixed(2)}]`);
            console.log(`scale: ${s}`);
        })
    }));

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);


    const bottomOffset = box.min.y;

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
            <group
                rotation={[rotation.x, controls.rotY, rotation.z]}
                scale={controls.scale}
            >
                <group position={[-center.x, -bottomOffset, -center.z]}>
                    <Clone
                        ref={ref}
                        object={scene}
                        castShadow
                        receiveShadow
                    />
                </group>

                <Html position={[0, (box.max.y - bottomOffset) + 2, 0]} center>
                    <div className={styles.tag}>
                        <p onClick={onCamera}>{name}</p>
                    </div>
                </Html>
            </group>
        </group>
    );
}

export default Model;