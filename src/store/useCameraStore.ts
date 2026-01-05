import { create } from "zustand";

interface CameraSettings {
    fov: number;
    near: number;
    far: number;
    position: [number, number, number];
    target: [number, number, number];
}

interface CameraStore {
    defaultSettings: CameraSettings;
}

// Copied to clipboard: [4.97, 6.09, -0.50]
// CameraLogger.tsx:18 Rotation (Euler): [-1.53, 0.65, 1.50]

export const useCameraStore = create<CameraStore>(() => ({
    defaultSettings: {
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [4.97, 6.09, -0.50],
        rotation: [-1.53, 0.65, 1.50],
        target: [0.19999999999999998, 0.5, -0.6],
    },
}));
