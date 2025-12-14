import { useGLTF } from '@react-three/drei'

type Model = {
    model: string,
    position: [number, number, number],
    animation?: boolean
}

export default function Playground({model, position }:Model) {
    const { nodes } = useGLTF(model);
    const [x, y, z] = position;

    let newY = y;
    newY += 0.015;

    return (
        <group position={[x, newY ,z]} rotation={[0, 0.984, 0]} scale={0.101}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Paal.geometry}
                material={nodes.Paal.material}
                position={[0.009, -0.228, -0.014]}
                rotation={[-Math.PI, 0.983, -Math.PI]}
                scale={0.057}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Whip.geometry}
                material={nodes.Whip.material}
                position={[0.005, 0.579, -0.013]}
                rotation={[-0.023, 0.591, 0.152]}
                scale={0.079}
            />
        </group>
    )
}

// useGLTF.preload(modelPath)
