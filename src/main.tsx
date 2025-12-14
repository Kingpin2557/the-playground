import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Canvas} from "@react-three/fiber";
import Experience from './Experience.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 0, 6, 2 ] as [number, number, number],
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Canvas camera={cameraSettings}>
              <Routes>
                  <Route path="/" element={<Experience />} />
                  <Route path="/:name" element={<Experience />} />
              </Routes>
          </Canvas>
      </BrowserRouter>
  </StrictMode>,
)
