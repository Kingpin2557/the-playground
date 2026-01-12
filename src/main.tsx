import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import {WaterMaterial} from "./components/ocean/WaterMaterial.tsx";
import {extend, type ThreeElement} from "@react-three/fiber";

extend({ WaterMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        waterMaterial: ThreeElement<typeof WaterMaterial>;
    }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </StrictMode>,
)
