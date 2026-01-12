import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import { useControls, button, folder } from "leva";
import models from "../assets/playgrounds.json";
import * as React from "react";
import { useCameraStore } from "../store/useCameraStore.ts";

// --- Complete Type Interfaces ---

interface PlaygroundInfo {
    capacity: number;
    history: string;
    safeInRain: boolean;
    material: string;
    ageRange: string;
}

interface CameraSettings {
    offset: [number, number, number];
    fov: number;
    near: number;
    far: number;
    zoom: number;
}

interface ModelData {
    id: number;
    name: string;
    path: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    cameraSettings: CameraSettings;
    info: PlaygroundInfo;
}

// --- Hook Implementation ---

export function useCameraSync({ scene }: { scene: React.RefObject<THREE.Group | null> }) {
    const { name } = useParams<{ name: string }>();
    const { camera, controls } = useThree();
    const { defaultSettings } = useCameraStore();

    const model = (models.model as ModelData[]).find(
        (m) => m.name.toLowerCase() === name?.toLowerCase()
    );

    const [cameraParams, setParams] = useControls("Camera Inspector", () => ({
        [name || "Global"]: folder({
            offset: {
                value: model?.cameraSettings.offset || [5, 5, 5] as [number, number, number],
                step: 0.1
            },
            fov: {
                value: model?.cameraSettings.fov || 45,
                min: 10,
                max: 120
            },
            zoom: {
                value: model?.cameraSettings.zoom || 1,
                min: 0.1,
                max: 10
            },
            "Copy JSON": button((get) => {
                const folderKey = `Camera Inspector.${name || "Global"}`;
                const pCamera = camera as THREE.PerspectiveCamera;

                console.log(JSON.stringify({
                    cameraSettings: {
                        offset: get(`${folderKey}.offset`),
                        fov: get(`${folderKey}.fov`),
                        near: pCamera.near,
                        far: pCamera.far,
                        zoom: get(`${folderKey}.zoom`),
                    }
                }, null, 2));
            })
        }, { render: () => !!name })
    }), [name, model]);

    // Force Leva to update when the model changes via URL
    useEffect(() => {
        if (model) {
            setParams({
                offset: model.cameraSettings.offset,
                fov: model.cameraSettings.fov,
                zoom: model.cameraSettings.zoom
            });
        }
    }, [model, setParams]);

    useEffect(() => {
        if (!controls || !camera) return;
        const orbit = controls as OrbitControlsImpl;
        const pCamera = camera as THREE.PerspectiveCamera;

        // Default Targets (Zustand)
        let targetPos = new THREE.Vector3(...defaultSettings.position);
        let targetLook = new THREE.Vector3(...defaultSettings.target);
        let targetFov = defaultSettings.fov;
        let targetZoom = 1;

        // Model Targets (JSON + Leva)
        if (name && model && scene.current) {
            const box = new THREE.Box3().setFromObject(scene.current);
            const center = new THREE.Vector3();
            box.getCenter(center);

            targetLook = center;
            targetPos = new THREE.Vector3().addVectors(
                center,
                new THREE.Vector3(...cameraParams.offset)
            );
            targetFov = cameraParams.fov;
            targetZoom = cameraParams.zoom;
        }

        // 1. Look at model/target first
        gsap.to(orbit.target, {
            x: targetLook.x,
            y: targetLook.y,
            z: targetLook.z,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => orbit.update()
        });

        // 2. Fly to position
        gsap.to(pCamera.position, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: 1.5,
            ease: "power3.inOut"
        });

        // 3. Adjust lens
        gsap.to(pCamera, {
            fov: targetFov,
            zoom: targetZoom,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => pCamera.updateProjectionMatrix()
        });

    }, [name, model, scene.current, cameraParams, controls, camera, defaultSettings]);
}