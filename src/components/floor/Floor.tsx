import { useGLTF } from "@react-three/drei";
import { useControls, button } from "leva";
import * as THREE from "three";

function Floor() {
    const { scene } = useGLTF('./ground.glb');
    const name = "Ground";

    const [controls] = useControls(name, () => ({
        pos: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
        rotY: { value: 0, step: 0.01 },
        scale: { value: 1, min: 0.1, max: 20, step: 0.01 },
        "Log Values": button((get) => {
            const p = get(`${name}.pos`);
            const ry = get(`${name}.rotY`);
            const s = get(`${name}.scale`);
            console.log(`-- ${name} --`, p, ry, s);
        })
    }));

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const bottomOffset = box.min.y;

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
            <group rotation={[0, controls.rotY, 0]} scale={controls.scale}>
                <group position={[-center.x, -bottomOffset, -center.z]}>
                    <primitive
                        object={scene}
                        receiveShadow
                        transparancy={true}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('./ground.glb');
export default Floor;