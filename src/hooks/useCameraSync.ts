import {useLocation, useParams} from "react-router-dom";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import models from "../assets/playgrounds.json";

export function useCameraSync() {
    const { name } = useParams();
    const { camera, controls } = useThree();
    const { state } = useLocation();
    console.log(state);

    const model = models.find(
        model => model.name.toLowerCase() === name?.toLowerCase()
    );

    useEffect(() => {
        if (!camera || !controls) return;

        const orbit = controls as OrbitControlsImpl;

        // No model → restore free camera
        if (!model) {
            gsap.to(orbit, {
                minDistance: 0,
                maxDistance: Infinity,
                minPolarAngle: 0,
                maxPolarAngle: Math.PI,
                enablePan: true,
                duration: 0.5
            });
            return;
        }

        const { position, fov, near, far, zoom } = model.cameraSettings;

        const targetPos = new THREE.Vector3().fromArray(model.position);
        const cameraTargetPos = new THREE.Vector3().fromArray(position);

        // Kill running tweens
        gsap.killTweensOf(camera.position);
        gsap.killTweensOf(camera);
        gsap.killTweensOf(orbit.target);

        // Camera position animation
        gsap.to(camera.position, {
            x: cameraTargetPos.x,
            y: cameraTargetPos.y,
            z: cameraTargetPos.z,
            duration: 1.5,
            ease: "power3.inOut"
        });

        // Camera lens animation
        gsap.to(camera, {
            fov,
            near,
            far,
            zoom,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.updateProjectionMatrix();
            }
        });

        // OrbitControls target animation
        gsap.to(orbit.target, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => orbit.update(),
            onComplete: () => {
                orbit.minDistance = 2;
                orbit.maxDistance = 15;
                orbit.minPolarAngle = Math.PI / 4;
                orbit.maxPolarAngle = Math.PI / 2.1;
                orbit.enablePan = false;
            }
        });

    }, [model, camera, controls]);
}
