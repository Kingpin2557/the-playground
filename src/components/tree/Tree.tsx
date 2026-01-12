import { useGLTF } from "@react-three/drei";
import { useControls, button, folder } from "leva";
import * as THREE from "three";
import { useState } from "react";

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
    const folderPath = `Trees.${data.name} (ID: ${data.id})`;

    let mesh: THREE.Mesh | undefined;
    scene.traverse((child) => {
        if (!mesh && (child as THREE.Mesh).isMesh) {
            mesh = child as THREE.Mesh;
        }
    });

    const [controls] = useControls(() => ({
        Trees: folder({
            [`${data.name} (ID: ${data.id})`]: folder({
                pos: {
                    value: { x: data.position[0], y: data.position[1], z: data.position[2] },
                    step: 0.1
                },
                rotY: {
                    value: THREE.MathUtils.radToDeg(data.rotation[1]),
                    min: 0,
                    max: 360,
                    step: 1
                },
                scale: { value: data.scale, min: 0.1, max: 10, step: 0.01 },
                "Log Values": button((get) => {
                    const p = get(`${folderPath}.pos`);
                    const r = get(`${folderPath}.rotY`);
                    const s = get(`${folderPath}.scale`);

                    console.log(`-- ${data.name} (ID: ${data.id}) --`);
                    console.log(`position: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
                    console.log(`rotation: [0.00, ${THREE.MathUtils.degToRad(r).toFixed(2)}, 0.00]`);
                    console.log(`scale: ${s}`);
                })
            }, { collapsed: true })
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
    const [trees, setTrees] = useState<TreeData[]>(treeData);

    useControls(() => ({
        Trees: folder({
            "Spawn Temporary Tree": button(() => {
                const newId = trees.length > 0 ? Math.max(...trees.map(t => t.id)) + 1 : 100;
                const newTree: TreeData = {
                    id: newId,
                    name: "Temp Tree",
                    path: treeData[0]?.path || './floor/tree.glb',
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: 1
                };
                setTrees([...trees, newTree]);
            })
        }, { order: -1 })
    }));

    return (
        <>
            {trees.map((tree) => (
                <TreeInstance key={tree.id} data={tree} />
            ))}
        </>
    );
}