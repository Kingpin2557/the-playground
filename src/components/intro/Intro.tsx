import { Html, useProgress } from "@react-three/drei";

function Intro() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div style={{ color: "white", fontSize: 24 }}>
                Loading {Math.round(progress)}%
            </div>
        </Html>
    );
}


export default Intro;
