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

export const useCameraStore = create<CameraStore>(() => ({
    defaultSettings: {
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 8, 10],
        target: [0, 0, 0],
    },
}));