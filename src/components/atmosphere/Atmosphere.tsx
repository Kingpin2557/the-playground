import { Environment, Lightformer, Sky, SoftShadows, useHelper } from "@react-three/drei";
import { useControls, folder } from "leva";
import * as THREE from "three";
import { useRef } from "react";

function Atmosphere() {
    const shadowCameraRef = useRef<THREE.DirectionalLight>(null!);

    const {
        sunPos,
        sunColor,
        intensity,
        turbidity,
        rayleigh,
        mieCoefficient,
        mieDirectionalG,
        showHelper,
        envIntensity,
        showBackground
    } = useControls("Sun Settings", {
        sunPos: { value: { x: -14, y: 20, z: 15 }, step: 1 },
        sunColor: "#fff5e6",
        intensity: { value: 2.5, min: 0, max: 10, step: 0.1 },
        "Sky Appearance": folder({
            turbidity: { value: 0.1, min: 0, max: 20 },
            rayleigh: { value: 0.5, min: 0, max: 4 },
            mieCoefficient: { value: 0.005, min: 0, max: 0.1 },
            mieDirectionalG: { value: 0.7, min: 0, max: 1 },
        }, { collapsed: true }),

        "Environment/City": folder({
            envIntensity: { value: 1, min: 0, max: 5 },
            showBackground: { value: false, label: "Sky vs City BG" }
        }, { collapsed: true }),

        showHelper: false
    });

    useHelper(showHelper ? shadowCameraRef : null, THREE.DirectionalLightHelper, 5);

    return (
        <>
            <SoftShadows size={25} samples={10} focus={0} />

            {/* 1. The Sky Component (Provides the background if showBackground is false) */}
            {!showBackground && (
                <Sky
                    distance={450000} // Ensure this is huge so it doesn't clip
                    sunPosition={[sunPos.x, sunPos.y, sunPos.z]}
                    turbidity={turbidity}
                    rayleigh={rayleigh}
                    mieCoefficient={mieCoefficient}
                    mieDirectionalG={mieDirectionalG}
                />
            )}

            {/* 2. The Sun */}
            <directionalLight
                ref={shadowCameraRef}
                position={[sunPos.x, sunPos.y, sunPos.z]}
                intensity={intensity}
                color={sunColor}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0005}
                shadow-normalBias={0.02}
                shadow-camera-near={ 1 }
                shadow-camera-far={ 10 }
                shadow-camera-top={ 2 }
                shadow-camera-right={ 2 }
                shadow-camera-bottom={ - 2 }
                shadow-camera-left={ - 2 }
            />

            <ambientLight intensity={0.4} color="#ddecff" />

            {/* 3. The City Environment (Provides reflections on models) */}
            <Environment
                preset="city"
                background={showBackground} // Only takes over the background if toggled
                environmentIntensity={envIntensity}
            >
                <Lightformer
                    form="rect"
                    intensity={2}
                    position={[10, 5, 10]}
                    scale={[10, 5, 1]}
                    target={[0, 0, 0]}
                    color="#ffaa00"
                />
                <Lightformer
                    form="circle"
                    intensity={1}
                    position={[-10, 10, -10]}
                    scale={[10, 10, 1]}
                    color="#4400ff"
                />
            </Environment>
        </>
    );
}

export default Atmosphere;