import  { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

import models from "../assets/playgrounds.json";
import * as THREE from "three";

import {useLocation, useNavigate} from "react-router-dom";
import { useThree } from "@react-three/fiber";

import Floor from "../components/floor/Floor.tsx";
import Model from "../components/model/Model.tsx";

function Experience() {
    const navigate = useNavigate();
    const location = useLocation();
    const { camera } = useThree();
    const [savedCamera, setSavedCamera] = useState({
        position: new THREE.Vector3(0, 5, 10),
        rotation: new THREE.Euler(0, 0, 0)
    });

    useEffect(() => {
        if (savedCamera.position && savedCamera.rotation) {
            camera.position.copy(savedCamera.position);
            camera.rotation.copy(savedCamera.rotation);
            camera.updateProjectionMatrix();
        }
    }, [camera, savedCamera]);

    const handleCameraClick = (modelName: string) => {
        const currentPos = {
            position: camera.position.clone(),
            rotation: camera.rotation.clone()
        };

        setSavedCamera(currentPos);

        navigate(`/${modelName.toLowerCase()}`, {
            state: {
                position: currentPos.position.toArray(),
                rotation: [currentPos.rotation.x, currentPos.rotation.y, currentPos.rotation.z]
            }
        });

        console.log(`Path has been updated to /${modelName.toLowerCase()}. Camera settings saved:`, location.state);
    }

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1} />

            <group>
                {models.map((model) => {
                    const vectorPosition = new THREE.Vector3();
                    const vectorRotation = new THREE.Vector3();

                    return (
                        <Model
                            key={model.id}
                            model={model.path}
                            name={model.name}
                            onCamera={() => handleCameraClick(model.name)}
                            position={vectorPosition.fromArray(model.position)}
                            rotation={vectorRotation.fromArray(model.rotation)}
                            scale={model.scale}
                        />
                    )
                })}
            </group>

            <Floor />
        </>
    )
}

export default Experience;