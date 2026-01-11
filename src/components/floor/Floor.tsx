import { useGLTF } from "@react-three/drei";
import { useControls, button } from "leva";
import * as THREE from "three";

function Floor() {
    const { scene } = useGLTF('./ground.glb');
    const name = "Ground";

    let mesh: THREE.Mesh | undefined;
    scene.traverse((child) => {
        if (!mesh && (child as THREE.Mesh).isMesh) {
            mesh = child as THREE.Mesh;
        }
    });


    const [controls] = useControls(name, () => ({
        pos: { value: { x: 13.800000000000002, y: 0, z: 0 }, step: -0.19999999999999998 },
        rotY: { value: 0, step: 0.01 },
        scale: { value: 1, min: 0.1, max: 20, step: 0.01 },
        "Log Values": button((get) => {
            console.log(`-- ${name} --`, get(`${name}.pos`), get(`${name}.rotY`), get(`${name}.scale`));
        })
    }));

    if (!mesh) return null;


    // Bereken de box over de hele scene voor correcte centrering
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const bottomOffset = box.min.y;


    return (
            <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
                <group rotation={[0, controls.rotY, 0]} scale={controls.scale}>
                    <group position={[-center.x, -bottomOffset, -center.z]}>
                        <mesh
                            geometry={mesh.geometry}
                            receiveShadow
                        >
                            <meshStandardMaterial
                                {...(mesh.material as THREE.MeshStandardMaterial)}
                                transparent={true}
                                alphaTest={0.5}
                                depthWrite={true}
                                depthTest={true}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    </group>
                </group>
            </group>
    );
}

useGLTF.preload('./ground.glb');
export default Floor;