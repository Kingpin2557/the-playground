import {PerspectiveCamera} from "three";
import * as THREE from "three";

import {useThree} from "@react-three/fiber";
import {useNavigate, useParams} from "react-router-dom";
import { OrbitControls } from "@react-three/drei";
import {  useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import CameraLogger from "../components/CameraLogger.tsx"

import Model from "../components/model/Model.tsx";
import Floor from "../components/floor/Floor.tsx";

import models from "../assets/playgrounds.json";
import {useCameraSync} from "../hooks/useCameraSync.ts";
import {Physics, RigidBody} from "@react-three/rapier";

export interface PlaygroundInfo {
    capacity: number;
    history: string;
    safeInRain: boolean;
    material: string;
    ageRange: string;
}

function Experience() {
    const navigate = useNavigate();
    const { name } = useParams();
    // const isRoot = !name;
    const orbitRef = useRef<OrbitControlsImpl | null>(null);
    const selectedModelRef = useRef<THREE.Group | null>(null);

    // Geef de ref door aan de hook
    useCameraSync({ scene: selectedModelRef });

    const { camera } = useThree();
    const pCamera = camera as PerspectiveCamera;



    const saveSettings = (modelName: string, info: PlaygroundInfo) => {
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
            state: {
                currentPos,
                info
            }
        });
    };


    return (
        <Physics debug={false}>
            <CameraLogger/>
            <OrbitControls
                ref={orbitRef}
                makeDefault
                enableDamping
                dampingFactor={0.05}
                enableZoom={!name}
                mouseButtons={{
                    LEFT: name ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: name ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE
                }}
            />
            <directionalLight position={[1, 2, 3]} intensity={4.5} />
            <ambientLight intensity={1} />

                <group>
                    {models.map((model) => {
                        const vectorPosition = new THREE.Vector3().fromArray(model.position);
                        const vectorRotation = new THREE.Vector3().fromArray(model.rotation);
                        const isSelected = model.name.toLowerCase() === name?.toLowerCase();

                        return (
                            <RigidBody key={model.id} type="fixed" colliders="hull">
                                <Model
                                    model={model.path}
                                    name={model.name}
                                    onCamera={() => saveSettings(model.name, model.info)}
                                    position={vectorPosition}
                                    rotation={vectorRotation}
                                    scale={model.scale}
                                    groupRef={isSelected ? selectedModelRef : undefined}
                                />
                            </RigidBody>
                        )
                    })}
                    <RigidBody type="fixed" colliders="cuboid">
                        <Floor />
                    </RigidBody>
                </group>
            </Physics>
    );
}

export default Experience;