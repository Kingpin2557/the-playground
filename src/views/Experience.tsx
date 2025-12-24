import {useCameraSync} from "../hooks/useCameraSync.ts";
import {PerspectiveCamera} from "three";
import * as THREE from "three";

import {useThree} from "@react-three/fiber";
import {useNavigate} from "react-router-dom";
import {OrbitControls} from "@react-three/drei";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";


import Model from "../components/model/Model.tsx";
import Floor from "../components/floor/Floor.tsx";

import models from "../assets/playgrounds.json";

function Experience() {
    const navigate = useNavigate();
    const orbitRef = useRef<OrbitControlsImpl | null>(null);
    const { camera } = useThree();
    const pCamera = camera as PerspectiveCamera;

    useCameraSync();

    const saveCameraSettings = (modelName: string) => {
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
            state: { currentPos }
        });
    };


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
                    const vectorPosition = new THREE.Vector3();
                    const vectorRotation = new THREE.Vector3();

                    return (
                        <Model
                            key={model.id}
                            model={model.path}
                            name={model.name}
                            onCamera={() => saveCameraSettings(model.name)}
                            position={vectorPosition.fromArray(model.position)}
                            rotation={vectorRotation.fromArray(model.rotation)}
                            scale={model.scale}
                        />
                    )
                })}
            </group>

            <Floor />
        </>
    );
}

export default Experience;