import { Html, useGLTF, Clone } from "@react-three/drei";
import { useControls, button } from "leva";
import * as THREE from "three";
import { type MouseEventHandler, useRef } from "react";
import styles from "./Model.module.css";
import * as React from "react";
import { useParams } from "react-router-dom";



type ModelProps = {
    model: string;
    name: string;
    onCamera: MouseEventHandler;
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    scale: number;
    groupRef?: React.Ref<THREE.Group>;
};

function Model({ model, name, onCamera, position, rotation, scale, groupRef}: ModelProps) {
    const { scene } = useGLTF(model);
    const { name: urlName } = useParams();


    const internalRef = useRef<THREE.Group>(null!);
    const ref = groupRef || internalRef;

    const hasActiveModel = !!urlName;

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

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
            <Html 
                position={[0, 1, 0]} 
                center
                zIndexRange={[0, 10]}
            >
                <div className={`${styles.tag} ${hasActiveModel ? styles.invisible : ''}`}>
                    <p onClick={onCamera}>{name}</p>
                </div>
            </Html>

            <group rotation={[rotation.x, controls.rotY, rotation.z]} scale={controls.scale}>
                <group position={[-center.x, -box.min.y, -center.z]}>
                    <Clone ref={ref} object={scene} castShadow receiveShadow />
                </group>
            </group>
        </group>
    );
}
export default Model;