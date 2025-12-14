import Ground from "./components/Ground/Ground";
import Playground from "./components/playground/Playground.tsx";
import {OrbitControls} from "@react-three/drei";
import models from "./assets/playgrounds.json";
import * as THREE from "three";


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
                {models.map((model) => {
                    const vectorPosition = new THREE.Vector3();
                   return <Playground key={model.id} model={model.path} position={vectorPosition.fromArray(model.position)} />
                })}
            </group>

            {/* Floor */}
            <Ground />
        </>
    )
}

export default Experience