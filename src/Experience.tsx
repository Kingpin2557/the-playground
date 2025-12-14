import Ground from "./components/Ground/Ground";
import Playground from "./components/playground/Playground.tsx";
import {OrbitControls} from "@react-three/drei";


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
                <Playground position={[0, 0, 0]} />
            </group>

            {/* Floor */}
            <Ground />
        </>
    )
}

export default Experience