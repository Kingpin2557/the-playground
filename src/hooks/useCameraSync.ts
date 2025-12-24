import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import models from "../assets/playgrounds.json";
import * as React from "react";

interface CameraState {
    currentPos?: {
        position: THREE.Vector3;
        target: THREE.Vector3;
        zoom: number;
        fov: number;
        near: number;
        far: number;
    };
    modelPosition?: THREE.Vector3;
}

export function useCameraSync({ scene }: { scene: React.RefObject<THREE.Group | null> }) {
    const { name } = useParams();
    const { camera, controls } = useThree();
    const location = useLocation();
    const state = location.state as CameraState;

    const model = models.find(
        (m) => m.name.toLowerCase() === name?.toLowerCase()
    );

    useEffect(() => {
        if (!controls || !camera) return;
        const orbit = controls as OrbitControlsImpl;
        const pCamera = camera as THREE.PerspectiveCamera;

        if (model && scene.current) {
            const targetGroup = scene.current;
        
            const box = new THREE.Box3().setFromObject(targetGroup);
            const center = new THREE.Vector3();
            box.getCenter(center);

            // 2. Haal instellingen en offset uit de JSON
            const { fov, near, far, zoom, offset } = model.cameraSettings;

            // 3. Bereken de gewenste camerapositie (middelpunt + offset)
            const targetCameraPos = new THREE.Vector3(
                center.x + offset[0],
                center.y + offset[1],
                center.z + offset[2]
            );

            // Animeer OrbitControls target naar het middelpunt
            gsap.to(orbit.target, {
                x: center.x,
                y: center.y,
                z: center.z,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => orbit.update(),
            });

            // Animeer de camerapositie naar middelpunt + offset
            gsap.to(pCamera.position, {
                x: targetCameraPos.x,
                y: targetCameraPos.y,
                z: targetCameraPos.z,
                duration: 1.5,
                ease: "power3.inOut",
            });

            // Animeer de lens-instellingen
            gsap.to(pCamera, {
                fov,
                near,
                far,
                zoom,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => pCamera.updateProjectionMatrix(),
            });
        }
    }, [model, controls, camera, state, scene]);
}