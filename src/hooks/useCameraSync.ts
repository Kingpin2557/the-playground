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
    const {state} = useLocation();
    console.log(state);

    const model = models.find(m => m.name.toLowerCase() === name?.toLowerCase());

    useEffect(() => {
        if (!model || !camera || !controls) return;

        const orbit = controls as OrbitControlsImpl;

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

        // Define our target vectors
        const targetPos = new THREE.Vector3().fromArray(model.position);
        const cameraTargetPos = new THREE.Vector3().fromArray(model.cameraSettings.position);

        // Kill any ongoing animations to prevent conflicts
        gsap.killTweensOf(camera.position);
        gsap.killTweensOf(orbit.target);

        // Animate Camera Position
        gsap.to(camera.position, {
            x: cameraTargetPos.x,
            y: cameraTargetPos.y,
            z: cameraTargetPos.z,
            duration: 1.5,
            ease: "power3.inOut",
        });

        // Animate OrbitControls Target (locks the view to the model)
        gsap.to(orbit.target, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => {
                orbit.update();
            },
            onComplete: () => {
                // Apply constraints after the transition is finished
                orbit.minDistance = 2;
                orbit.maxDistance = 15;
                orbit.minPolarAngle = Math.PI / 4;
                orbit.maxPolarAngle = Math.PI / 2.1;
                orbit.enablePan = false; // Optional: disable panning to keep it "locked"
            }
        });

    }, [model, camera, controls]);

    return state.currentPos;
}