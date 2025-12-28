import { Canvas } from "@react-three/fiber";
import { Route, Routes } from "react-router-dom";
import Experience from "./views/Experience.tsx";
import { useCameraStore } from "./store/useCameraStore.ts";
import {Leva} from "leva"; // Import the store hook

function App() {
    const defaultSettings = useCameraStore((state) => state.defaultSettings);
    // const isProduction = import.meta.env.VITE_IS_PRODUCTION === true;


    console.log("Is Production String:", import.meta.env.VITE_IS_PRODUCTION);
    console.log("Is Production Boolean:", import.meta.env.VITE_IS_PRODUCTION === 'true');

    return (
        <>
            <Leva hidden={true}/>
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
        </>
    );
}

export default App;