import { Canvas } from "@react-three/fiber";
import { Route, Routes } from "react-router-dom";
import Experience from "./views/Experience.tsx";
import { useCameraStore } from "./store/useCameraStore.ts";
import {Leva} from "leva";
import {CameraHelper} from "./components/CameraHelper.tsx"; // Import the store hook

function App() {
    const defaultSettings = useCameraStore((state) => state.defaultSettings);


    return (
        <>
            <Leva hidden={false}/>
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
                <CameraHelper />
            </Canvas>
        </>
    );
}

export default App;