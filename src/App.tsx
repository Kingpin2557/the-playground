import { Canvas } from "@react-three/fiber";
import { Route, Routes } from "react-router-dom";
import Experience from "./views/Experience.tsx";
import { useCameraStore } from "./store/useCameraStore.ts";
import {Leva} from "leva";
import {CameraHelper} from "./components/CameraHelper.tsx";
import WeatherWidget from "./components/widget/WeatherWidget.tsx";
import InfoWidget from "./components/widget/InfoWidget.tsx"; // Import the store hook

function App() {
    const defaultSettings = useCameraStore((state) => state.defaultSettings);

    const isProduction = import.meta.env.VITE_IS_PRODUCTION === 'true';

    return (
        <>
            <Leva hidden={isProduction}/>
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
            <InfoWidget/>
            <WeatherWidget/>
        </>
    );
}

export default App;