import {useGLTF, Clone, PositionalAudio} from "@react-three/drei";
import { useControls, button } from "leva";
import * as THREE from "three";
import {useState} from "react";

function Floor() {
    const { scene, nodes } = useGLTF('./ground.glb');
    const name = "Ground"; // Label for Leva folder

    const [controls] = useControls(name, () => ({
        pos: {
            value: { x: 0, y: 0, z: 0 },
            step: 0.1,
        },
        rotY: {
            value: 0,
            step: 0.01,
        },
        scale: {
            value: 1,
            min: 0.1,
            max: 20,
            step: 0.01
        },
        "Log Values": button((get) => {
            const p = get(`${name}.pos`);
            const ry = get(`${name}.rotY`);
            const s = get(`${name}.scale`);

            console.log(`-- ${name} --`);
            console.log(`position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
            console.log(`rotation: [0, ${ry.toFixed(2)}, 0]`);
            console.log(`scale: ${s}`);
        })
    }));

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const bottomOffset = box.min.y;

    const [ready, setReady] = useState(false)

    console.log(nodes.Speaker)

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]} onClick={() => setReady(true)}>
            <group
                rotation={[0, controls.rotY, 0]}
                scale={controls.scale}
            >
                <group position={[-center.x, -bottomOffset, -center.z]}>
                    <Clone
                        object={scene}
                        receiveShadow
                    />
                    {ready && (
                        <PositionalAudio
                            url={audioUrl} // The path to your sound file in /public
                            distance={5}   // How far the sound carries
                            loop
                            autoplay
                        />
                    )}
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('./ground.glb');
export default Floor;