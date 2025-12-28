import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export function CameraHelper() {
    const { camera, controls } = useThree();

    const [{ position, target }] = useControls("Global Camera", () => ({
        position: {
            value: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
            step: 0.1,
        },
        target: {
            value: { x: 0, y: 0, z: 0 },
            step: 0.1,
        }
    }));

    useEffect(() => {
        camera.position.set(position.x, position.y, position.z);

        if (controls) {
            // Cast to OrbitControlsImpl to get access to .target and .update()
            const orbit = controls as OrbitControlsImpl;
            orbit.target.set(target.x, target.y, target.z);
            orbit.update();
        } else {
            camera.lookAt(target.x, target.y, target.z);
        }
    }, [position, target, camera, controls]);

    return null;
}