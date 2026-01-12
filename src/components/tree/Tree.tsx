import { useGLTF } from "@react-three/drei";
import { useControls, button } from "leva";
import * as THREE from "three";

interface TreeData {
    id: number;
    name: string;
    path: string;
    position: number[];
    rotation: number[];
    scale: number;
}

function TreeInstance({ data }: { data: TreeData }) {
    const { scene } = useGLTF(data.path);

    // Using the ID and Name from JSON to ensure unique folders in GUI
    const folderName = `Trees.${data.name} (ID: ${data.id})`;

    let mesh: THREE.Mesh | undefined;
    scene.traverse((child) => {
        if (!mesh && (child as THREE.Mesh).isMesh) {
            mesh = child as THREE.Mesh;
        }
    });

    const [controls] = useControls(folderName, () => ({
        pos: {
            value: { x: data.position[0], y: data.position[1], z: data.position[2] },
            step: 0.1
        },
        rotY: { value: data.rotation[1], min: 0, max: 360, step: 1 },
        scale: { value: data.scale, min: 0.1, max: 10, step: 0.01 },
        "Log Values": button((get) => {
            const p = get(`${folderName}.pos`);
            const r = get(`${folderName}.rotY`);
            const s = get(`${folderName}.scale`);

            console.log(`--- DATA FOR ${data.name} ---`);
            console.log(`Position -> X: ${p.x}, Y: ${p.y}, Z: ${p.z}`);
            console.log(`Rotation -> Y: ${r}°`);
            console.log(`Scale    -> ${s}`);
            console.log(`---------------------------`);
        })
    }));

    if (!mesh) return null;

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const bottomOffset = box.min.y;

    return (
        <group position={[controls.pos.x, controls.pos.y, controls.pos.z]}>
            <group
                rotation={[0, THREE.MathUtils.degToRad(controls.rotY), 0]}
                scale={controls.scale}
                position={[-center.x, -bottomOffset, -center.z]}
            >
                <mesh geometry={mesh.geometry} castShadow receiveShadow>
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
    );
}

export default function Tree({ treeData }: { treeData: TreeData[] }) {
    return (
        <>
            {treeData.map((tree) => (
                <TreeInstance key={tree.id} data={tree} />
            ))}
        </>
    );
}