import { Canvas } from "@react-three/fiber";
import { Route, Routes } from "react-router-dom";
import Experience from "./views/Experience.tsx";
import { useCameraStore } from "./store/useCameraStore.ts";
import {Leva} from "leva";
import WeatherWidget from "./components/widget/WeatherWidget.tsx";
import InfoWidget from "./components/widget/InfoWidget.tsx";
import GoBack from "./components/goback/GoBack.tsx";
import AudioManager from "./components/audio/AudioManager.tsx";
import {Suspense, useState} from "react";
import Intro from "./components/intro/Intro.tsx"; // Import the store hook

function App() {
    const defaultSettings = useCameraStore((state) => state.defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldPlayMusic, setShouldPlayMusic] = useState(false); // New state

    const handleEnter = () => {
        setIsLoaded(true);
        setShouldPlayMusic(true); // Trigger music on user gesture
    };

    return (
        <>
            <Leva hidden={import.meta.env.VITE_IS_PRODUCTION === 'true'}/>

            {!isLoaded && <Intro onComplete={handleEnter} />}

            <Canvas shadows camera={{ ...defaultSettings }}>
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<Experience />} />
                        <Route path="/:name" element={<Experience />} />
                    </Routes>
                </Suspense>
            </Canvas>

            {isLoaded && (
                <>
                    <GoBack />
                    {/* Pass the play state to your manager */}
                    <AudioManager autoStart={shouldPlayMusic} />
                    <InfoWidget />
                    <WeatherWidget />
                </>
            )}
        </>
    );
}

export default App;