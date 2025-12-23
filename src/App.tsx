import {Canvas} from "@react-three/fiber";
import {Route, Routes} from "react-router-dom";
import Experience from "./views/Experience.tsx";

function App() {
    const cameraSettings = {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ 0, 6, 2 ] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
    }


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