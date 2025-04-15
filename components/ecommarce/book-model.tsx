"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html } from "@react-three/drei";
import { Loader2 } from "lucide-react";

function Model({ modelUrl }: { modelUrl: string }) {
  const modelRef = useRef<any>(null);
  const { scene } = useGLTF(modelUrl);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[2, 2, 2]}
      position={[0, 0.5, 0]}
    />
  );
}

export default function BookModel({ modelUrl }: { modelUrl?: string }) {
  if (!modelUrl) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">মডেল লিঙ্ক পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense
          fallback={
            <Html>
              <div className="flex items-center justify-center flex-col">
                <Loader2 className="animate-spin h-8 w-8" />
                <p className="mt-2">মডেল লোড হচ্ছে...</p>
              </div>
            </Html>
          }
        >
          <Model modelUrl={modelUrl} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}
