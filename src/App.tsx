import { Canvas } from "@react-three/fiber";
import { Route, Routes } from "react-router-dom";
import Experience from "./views/Experience.tsx";
import { useCameraStore } from "./store/useCameraStore.ts";
import {Leva} from "leva";
import WeatherWidget from "./components/widget/WeatherWidget.tsx";
import InfoWidget from "./components/widget/InfoWidget.tsx";
import GoBack from "./components/goback/GoBack.tsx";
import AudioManager from "./components/audio/AudioManager.tsx";
import {Suspense} from "react";
import Intro from "./components/intro/Intro.tsx"; // Import the store hook

function App() {
    const defaultSettings = useCameraStore((state) => state.defaultSettings);

    const isProduction = import.meta.env.VITE_IS_PRODUCTION === 'true';

    return (
        <>
            <Leva hidden={isProduction}/>
            <Canvas
                shadows
                camera={{
                    fov: defaultSettings.fov,
                    near: defaultSettings.near,
                    far: defaultSettings.far,
                    position: defaultSettings.position
                }}
            >
                <Suspense fallback={<Intro />}>
                    <Routes>
                        <Route path="/" element={<Experience />} />
                        <Route path="/:name" element={<Experience />} />
                    </Routes>
                </Suspense>

            </Canvas>
            <GoBack/>
            <AudioManager />
            <InfoWidget/>
            <WeatherWidget/>
        </>
    );
}

export default App;