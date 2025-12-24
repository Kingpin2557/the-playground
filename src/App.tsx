import {Canvas} from "@react-three/fiber";
import {Route, Routes} from "react-router-dom";
import Experience from "./views/Experience.tsx";

function App() {
    const cameraSettings = {
        fov: 50,
        near: 0.1,
        far: 5000,
        position: [0, 8, 10] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
    };


    return (
        <Canvas camera={cameraSettings}>
            <Routes>
                <Route path="/" element={<Experience />} />
                <Route path="/:name" element={<Experience />} />
            </Routes>
        </Canvas>
    )
}

export default App;