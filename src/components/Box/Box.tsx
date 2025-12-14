import React from "react"
import { Mesh } from "three"

interface BoxProps {
    color?: string
    position?: [number, number, number] | number
    scale?: [number, number, number] | number
    rotation?: [number, number, number] | number
    visible?: boolean
    ref?: React.Ref<Mesh>
    receiveShadow?: boolean
    castShadow?: boolean
    onClick?: (e: React.MouseEvent) => void
}

const Box = ({color, ...props}: BoxProps) => {

  return (  
    <mesh {...props}>
        <boxGeometry />
        <meshStandardMaterial color={color || "royalblue"}/>
    </mesh>
  )
}

export default Box