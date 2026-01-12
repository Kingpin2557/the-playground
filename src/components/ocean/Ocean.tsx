import { useControls, folder } from "leva";
import "./WaterMaterial";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"; // Use * as THREE for proper namespacing

//tutorial
// https://wawasensei.dev/courses/react-three-fiber/lessons/water-shader


export const Ocean = () => {
    const { waterColor, waterOpacacity, speed, repeat, foam, foamTop, noiseType } = useControls("Environment", {
        "Ocean Settings": folder({
            waterColor: { value: "#00c3ff", label: "Color" },
            waterOpacacity: { value: 0.8, min: 0, max: 1, label: "Opacity" },
            speed: { value: 0.5, min: 0, max: 5, label: "Speed" },
            repeat: { value: 30, min: 1, max: 100, label: "Repeat" },
            foam: { value: 0.7, min: 0, max: 1, label: "Foam" },
            foamTop: { value: 0.7, min: 0, max: 1, label: "FoamTop" },
            noiseType: {
                value: 0,
                options: { Perlin: 0, Voronoi: 1 }
            },
        })
    });

    // Explicitly typing the ref to access .uniforms
    const waterMaterialRef = useRef<THREE.ShaderMaterial>(null!);

    const oceanRot: [number, number, number] = [-Math.PI / 2, 0, 0];

    useFrame(({ clock }) => {
        if (waterMaterialRef.current) {
            // FIX: Use getElapsedTime() (method) instead of elapsedTime()
            waterMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            {/* Increase to a massive size like 1000x1000 */}
            <planeGeometry args={[1000, 1000]} />
            <waterMaterial
                ref={waterMaterialRef}
                uColor={waterColor}
                uOpacity={waterOpacacity}
                uSpeed={speed}
                uRepeat={repeat} // Your shader uses this to tile the noise
                uFoam={foam}
                uFoamTop={foamTop}
                uNoiseType={noiseType}
                transparent
            />
        </mesh>
    );
};