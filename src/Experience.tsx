import Ground from "./components/Ground/Ground";
import Playground from "./components/playground/Playground.tsx";
import {OrbitControls} from "@react-three/drei";
import models from "./assets/playgrounds.json";
import * as THREE from "three";
import {useParams, useNavigate} from "react-router-dom";

const Experience = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    if (!name) {
        console.log(`No active model name from URL`);
    }

    const handleModelClick = (modelName: string) => {
        navigate(`/${modelName.toLowerCase()}`);

        console.log(`Updated URL path to: /${modelName}`);
    }

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
                    const vectorRotation = new THREE.Vector3();

                   return <Playground key={model.id} model={model.path} onClick={() => handleModelClick(model.name)} position={vectorPosition.fromArray(model.position)} rotation={vectorRotation.fromArray(model.rotation)} scale={model.scale} />
                })}
            </group>

            {/* Floor */}
            <Ground />
        </>
    )
}

export default Experience