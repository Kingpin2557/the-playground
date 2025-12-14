import { Mesh } from "three"

interface GroundProps {
    color?: string
    position?: [number, number, number] | number
    scale?: [number, number, number] | number
    rotation?: [number, number, number] | number
    ref?: React.Ref<Mesh>
    receiveShadow?: boolean
    castShadow?: boolean
}

const Ground = ({color, ...props}: GroundProps) => {
  return (
     <mesh {...props}>
        <planeGeometry />
        <meshStandardMaterial color={color || "grey"} />
    </mesh>
  )
}

export default Ground