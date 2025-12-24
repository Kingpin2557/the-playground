import {Html, useGLTF} from '@react-three/drei';
import * as THREE from 'three'
import React, {type MouseEventHandler} from "react";
import styles from "./Model.module.css";

type Model = {
    model: string,
    name: string,
    onCamera: MouseEventHandler,
    position: THREE.Vector3,
    rotation: THREE.Vector3,
    scale: number,
}

//AI generated function, .filter() also with AI. everything else is my own work
function isMesh(object: THREE.Object3D | THREE.Mesh): object is THREE.Mesh {
    return (object as THREE.Mesh).isMesh;
}

function Model({model,name ,onCamera ,position, rotation, scale }:Model) {
    const { nodes } = useGLTF(model);

    const [x, y, z] = position;
    const [rx, ry, rz] = rotation;

    return (
        <group position={[x, y + 0.015, z]} rotation={[rx, ry, rz]} scale={scale}>
            {Object.values(nodes).filter(isMesh).map((node) => {
                return (
                    <React.Fragment key={node.uuid}>
                        <Html position={[x - 1, y + 3, z]}>
                            <div className={styles.tag}>
                                <p onClick={onCamera}>
                                    {name}
                                </p>
                            </div>
                        </Html>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={node.geometry}
                            material={node.material}
                            position={node.position}
                            rotation={node.rotation}
                            scale={node.scale}
                        />
                    </React.Fragment>
                )
            })}
        </group>
    )
}

export default Model;

// useGLTF.preload(modelPath)
