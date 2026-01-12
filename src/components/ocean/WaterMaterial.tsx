declare module 'resolve-lygia';

import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";
import { resolveLygia } from "resolve-lygia";

export const WaterMaterial = shaderMaterial(
    {
        uColor: new Color("skyblue"),
        uOpacity: 0.8,
        uTime: 0,
        uSpeed: 0.5,
        uRepeat: 20.0,
        uNoiseType: 0,
        uFoam: 0.4,
        uFoamTop: 0.7
    },
    /*glsl*/ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
    resolveLygia(/*glsl*/ `
    // 1. Remove the semicolon from the include
    #include "lygia/generative/pnoise.glsl"
    
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uTime;
    uniform float uSpeed;
    uniform float uRepeat;
    uniform int uNoiseType;
    uniform float uFoam;
    uniform float uFoamTop;
    
    void main() {
        float adjustedTime = uTime * uSpeed;
        
        // pnoise returns float, we use vec3(uv, time) for 3D noise
        float noise = pnoise(vec3(vUv * uRepeat, adjustedTime * 0.5), vec3(100.0));
        
        // Smooth out the noise based on your Leva controls
        float mask = smoothstep(uFoam, uFoamTop, noise);
        
        vec3 intermediateColor = uColor * 1.5;
        vec3 topColor = uColor * 2.0;

        vec3 finalColor = uColor;
        
        // 2. Add commas inside the step functions
        finalColor = mix(finalColor, intermediateColor, step(0.1, noise));
        finalColor = mix(finalColor, topColor, step(0.5, noise));
        
        // 3. Ensure case-sensitive gl_FragColor
        gl_FragColor = vec4(finalColor, uOpacity);
        
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }`)
);