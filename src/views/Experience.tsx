import {PerspectiveCamera} from "three";
import * as THREE from "three";

import {useFrame, useThree} from "@react-three/fiber";
import {useNavigate, useParams} from "react-router-dom";
import { OrbitControls} from "@react-three/drei";
import {  useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import Model from "../components/model/Model.tsx";
import Floor from "../components/floor/Floor.tsx";

import models from "../assets/playgrounds.json";
import {useCameraSync} from "../hooks/useCameraSync.ts";
import {Physics, RigidBody} from "@react-three/rapier";
import {CameraHelper} from "../components/CameraHelper.tsx";
import Atmosphere from "../components/atmosphere/Atmosphere.tsx";
import {Ocean} from "../components/ocean/Ocean.tsx";

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
    const orbitRef = useRef<OrbitControlsImpl | null>(null);
    const selectedModelRef = useRef<THREE.Group | null>(null);

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
    const centerPolar = Math.PI / 3;      // vertical center
    const polarRange = Math.PI / 12;      // ±15°

    const centerAzimuth = 0;              // horizontal center
    const azimuthRange = Math.PI / 6;     // ±30°


    useFrame(() => {
        if (!orbitRef.current || name) return;

        const controls = orbitRef.current;
        const polar = controls.getPolarAngle();

        const min = centerPolar - polarRange;
        const max = centerPolar + polarRange;

        if (polar < min || polar > max) {
            controls.setPolarAngle(
                THREE.MathUtils.clamp(polar, min, max)
            );
            controls.update();
        }
    });




    return (
        <Physics debug={false}>
            <CameraHelper />
            <OrbitControls
                ref={orbitRef}
                target={[0, 0, 0]}
                makeDefault
                enableDamping
                dampingFactor={0.05}
                enableZoom={!!name}
                enablePan={false}

                // Vertical (up / down)
                minPolarAngle={!name ? centerPolar - polarRange : 0}
                maxPolarAngle={!name ? centerPolar + polarRange : Math.PI}

                // Horizontal (left / right)
                minAzimuthAngle={!name ? centerAzimuth - azimuthRange : -Infinity}
                maxAzimuthAngle={!name ? centerAzimuth + azimuthRange : Infinity}

                mouseButtons={{
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: THREE.MOUSE.ROTATE,
                    LEFT: THREE.MOUSE.ROTATE
                }}
            />



            <Atmosphere/>

            <group>
                <Ocean />
            </group>
            <group>
                {models.model.map((model) => {
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