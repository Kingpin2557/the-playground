import {PerspectiveCamera} from "three";
import * as THREE from "three";

import {useThree} from "@react-three/fiber";
import {useNavigate, useParams} from "react-router-dom";
import {OrbitControls} from "@react-three/drei";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";


import Model from "../components/model/Model.tsx";
import Floor from "../components/floor/Floor.tsx";

import models from "../assets/playgrounds.json";
import {useCameraSync} from "../hooks/useCameraSync.ts";

function Experience() {
    const navigate = useNavigate();
    const { name } = useParams(); // Zorg dat name beschikbaar is voor de vergelijking
    const orbitRef = useRef<OrbitControlsImpl | null>(null);
    const selectedModelRef = useRef<THREE.Group | null>(null);

    // Geef de ref door aan de hook
    useCameraSync({ scene: selectedModelRef });

    const { camera } = useThree();
    const pCamera = camera as PerspectiveCamera;


    const saveSettings = (modelName: string) => {
        if (!orbitRef.current) return;

        const currentPos = {
            position: pCamera.position.clone(),
            rotation: pCamera.rotation.clone(),
            fov: pCamera.fov,
            near: pCamera.near,
            far: pCamera.far,
            zoom: pCamera.zoom,
            target: orbitRef.current.target.clone()
        };

        navigate(`/${modelName.toLowerCase()}`, {
            state: {currentPos}
        });
    };

    // const isProduction = import.meta.env.VITE_IS_PRODUCTION === 'true';

    return (
        <>
            <OrbitControls
                ref={orbitRef}
                makeDefault
                enableDamping
                dampingFactor={0.05}
            />
            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1} />

            <group>
                {models.map((model) => {
                    const vectorPosition = new THREE.Vector3().fromArray(model.position);
                    const vectorRotation = new THREE.Vector3().fromArray(model.rotation);
                    const isSelected = model.name.toLowerCase() === name?.toLowerCase();

                    return (
                        <Model
                            key={model.id}
                            model={model.path}
                            name={model.name}
                            onCamera={() => saveSettings(model.name)}
                            position={vectorPosition}
                            rotation={vectorRotation}
                            scale={model.scale}
                            groupRef={isSelected ? selectedModelRef : undefined}
                        />
                    )
                })}
                <Floor />
            </group>
        </>
    );
}

export default Experience;