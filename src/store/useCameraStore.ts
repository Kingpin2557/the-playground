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
        position: [4.599999999999976, 2.1, -0.8999999999999848],
        target: [0.19999999999999998, 0.5, -0.6],
    },
}));
