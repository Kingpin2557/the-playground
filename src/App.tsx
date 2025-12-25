import { Canvas } from "@react-three/fiber";
import { Route, Routes } from "react-router-dom";
import Experience from "./views/Experience.tsx";
import { useCameraStore } from "./store/useCameraStore.ts"; // Import the store hook

function App() {
    const defaultSettings = useCameraStore((state) => state.defaultSettings);

    return (
        <Canvas
            camera={{
                fov: defaultSettings.fov,
                near: defaultSettings.near,
                far: defaultSettings.far,
                position: defaultSettings.position
            }}
        >
            <Routes>
                <Route path="/" element={<Experience />} />
                <Route path="/:name" element={<Experience />} />
            </Routes>
        </Canvas>
    );
}

export default App;