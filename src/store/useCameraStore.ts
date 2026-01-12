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
        position: [-19.200000000000024, 15, 0],
        rotation: [0, 0.65, 1.50],
        target: [-3.09999999999994, 0.4, 0.09999999999986159],
    },
}));
