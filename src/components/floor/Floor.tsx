import { useGLTF } from "@react-three/drei";
import { useControls, button, folder } from "leva";
import models from "../../assets/playgrounds.json";
import * as THREE from "three";

const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function Floor() {
    const { nodes } = useGLTF(models.floor.path, DRACO_URL);
    const folderName = "Ground";

    const floorGroup = nodes.floor as THREE.Group;

    const [controls] = useControls(() => ({
        [folderName]: folder({
            pos: {
                // Initialize from models.floor.position array
                value: {
                    x: models.floor.position[0],
                    y: models.floor.position[1],
                    z: models.floor.position[2]
                },
                step: 0.1
            },
            rotY: {
                // Initialize from models.floor.rotation array (index 1 is Y)
                value: THREE.MathUtils.radToDeg(models.floor.rotation[1]),
                min: 0,
                max: 360,
                step: 1
            },
            scale: {
                // Initialize from models.floor.scale
                value: models.floor.scale,
                min: 0.1,
                max: 20,
                step: 0.01
            },
            "Log Values": button((get) => {
                const p = get(`${folderName}.pos`);
                const ry = get(`${folderName}.rotY`);
                const s = get(`${folderName}.scale`);

                console.log(`-- ${folderName} --`);
                console.log(`position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
                console.log(`rotation: [0.00, ${THREE.MathUtils.degToRad(ry).toFixed(2)}, 0.00]`);
                console.log(`scale: ${s}`);
            })
        }, { collapsed: true })
    }));

    if (!floorGroup) return null;

    floorGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;


            mat.transparent = true;
            mat.alphaTest = 0.5;
            mat.depthWrite = true;
            mat.depthTest = true;
            mat.side = THREE.DoubleSide;

            mesh.receiveShadow = true;
            mesh.castShadow = true;
        }
    });

    // We calculate the bounding box center to ensure the rotation pivot is correct,
    // but the actual position in the world is handled by the controls.
    const box = new THREE.Box3().setFromObject(floorGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const bottomOffset = box.min.y;

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
            <group
                rotation={[0, THREE.MathUtils.degToRad(controls.rotY), 0]}
                scale={controls.scale}
            >
                <primitive
                    object={floorGroup}
                    // Offset the primitive so it rotates around its own center/bottom
                    position={[-center.x, -bottomOffset, -center.z]}
                />
            </group>
        </group>
    );
}

useGLTF.preload(models.floor.path, DRACO_URL);
export default Floor;