import { useThree } from "@react-three/fiber";
import { useControls, button } from "leva";

function CameraLogger() {
    const { camera } = useThree();

    useControls("Camera Manager", {
        "Copy Position": button(() => {
            const pos = camera.position;
            const rot = camera.rotation;

            // Format as an array for easy pasting into R3F props
            const posArray = `[${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`;

            navigator.clipboard.writeText(posArray);

            console.log("✅ Copied to clipboard:", posArray);
            console.log("Rotation (Euler):", `[${rot.x.toFixed(2)}, ${rot.y.toFixed(2)}, ${rot.z.toFixed(2)}]`);
        })
    });

    return null;
}

export default CameraLogger;