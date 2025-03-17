"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"

function Model({ modelUrl }) {
  const modelRef = useRef()
  const { scene } = useGLTF("/assets/3d/duck.glb") // Using the sample duck model for preview

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, 0, 0]} />
}

export default function BookModel({ modelUrl }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Model modelUrl={modelUrl} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}

