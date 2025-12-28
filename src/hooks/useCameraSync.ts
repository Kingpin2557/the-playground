import { useParams } from "react-router-dom";
import {useEffect, useRef} from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import models from "../assets/playgrounds.json";
import * as React from "react";
import { useCameraStore } from "../store/useCameraStore.ts";

// interface CameraState {
//     currentPos?: {
//         position: THREE.Vector3;
//         target: THREE.Vector3;
//         zoom: number;
//         fov: number;
//         near: number;
//         far: number;
//     };
//     modelPosition?: THREE.Vector3;
// }

export function useCameraSync({ scene }: { scene: React.RefObject<THREE.Group | null> }) {
    const { name } = useParams();
    const { camera, controls } = useThree();
    const tl = useRef<gsap.core.Timeline | null>(null);

    const defaultSettings = useCameraStore((state) => state.defaultSettings);

    const model = models.find(
        (model) => model.name.toLowerCase() === name?.toLowerCase()
    );

    useEffect(() => {
        if (!controls || !camera) return;

        const orbit = controls as OrbitControlsImpl;
        const pCamera = camera as THREE.PerspectiveCamera;

        if (tl.current) tl.current.kill();
        tl.current = gsap.timeline({
            // Disable controls while animating to prevent the jitter
            onStart: () => {
                orbit.enabled = false;
            },
            // Re-enable when finished
            onComplete: () => {
                orbit.enabled = true;
                orbit.update();
            }
        });

        if (model && scene.current) {
            const targetGroup = scene.current;
            const box = new THREE.Box3().setFromObject(targetGroup);
            const center = new THREE.Vector3();
            box.getCenter(center);

            const { fov, near, far, zoom, offset } = model.cameraSettings;
            const targetCameraPos = new THREE.Vector3(
                center.x + offset[0],
                center.y + offset[1],
                center.z + offset[2]
            );

            tl.current.to(orbit, {
                minPolarAngle: THREE.MathUtils.degToRad(40),
                maxPolarAngle: THREE.MathUtils.degToRad(90),
                enableZoom: false,
                duration: 1.5,
                ease: "power3.inOut",
            });

            tl.current.to(orbit.target, {
                x: center.x, y: center.y, z: center.z,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => orbit.update(),
            }, 0);

            tl.current.to(pCamera.position, {
                x: targetCameraPos.x, y: targetCameraPos.y, z: targetCameraPos.z,
                duration: 1.5,
                ease: "power3.inOut",
            }, 0);

            tl.current.to(pCamera, {
                fov, near, far, zoom,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => pCamera.updateProjectionMatrix(),
            }, 0);

        } else {
            // Fallback to default
            tl.current.to(orbit, {
                minPolarAngle: 0,
                maxPolarAngle: Math.PI,
                enableZoom: true,
                duration: 1.5,
                ease: "power3.inOut",
            });

            tl.current.to(orbit.target, {
                x: defaultSettings.target[0],
                y: defaultSettings.target[1],
                z: defaultSettings.target[2],
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => orbit.update(),
            }, 0);

            tl.current.to(pCamera.position, {
                x: defaultSettings.position[0],
                y: defaultSettings.position[1],
                z: defaultSettings.position[2],
                duration: 1.5,
                ease: "power3.inOut",
            }, 0);

            tl.current.to(pCamera, {
                fov: defaultSettings.fov,
                near: defaultSettings.near,
                far: defaultSettings.far,
                zoom: 1,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => pCamera.updateProjectionMatrix(),
            }, 0);
        }

        return () => {
            if (tl.current) tl.current.kill();
        };
    }, [model, name, controls, camera, defaultSettings, scene]);
}