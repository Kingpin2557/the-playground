import { Mesh } from "three"
import * as React from "react";

interface SphereProps {
    color?: string
    position?: [number, number, number] | number
    scale?: [number, number, number] | number
    rotation?: [number, number, number] | number,
    visible?: boolean
    ref?: React.Ref<Mesh>
    receiveShadow?: boolean
    castShadow?: boolean
    onClick?: (e: React.MouseEvent) => void
}

const Playground = ({color, ...props}: SphereProps) => {

  return (
    <mesh {...props}>
        <sphereGeometry />
        <meshStandardMaterial color={color || "orange"} 
        />
    </mesh>
  )
}

export default Playground