import { OrbitControls } from "@react-three/drei";
import Ground from "./components/Ground/Ground";


const Experience = () => {

    return (
        <>
            {/* Controls */}
            <OrbitControls makeDefault />

            {/* Lights */}
            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1} />

            {/* Models */}
            <group>

            </group>

            {/* Floor */}
            <Ground position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}/>
        </>
    )
}

export default Experience