"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Stars,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ pointer }) => {
  if (!sphereRef.current) return;

  sphereRef.current.position.x = pointer.x * 4;
  sphereRef.current.position.y = pointer.y * 3;

  sphereRef.current.rotation.y += 0.01;
});

  return (
  <Sphere
    ref={sphereRef}
    args={[1, 64, 64]}
    scale={1.5}
  >
    <MeshDistortMaterial
      color="#8b5cf6"
      distort={0.35}
      speed={2}
      roughness={0}
    />
  </Sphere>
);
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[2, 2, 2]}
          intensity={2}
        />

        <pointLight
          position={[0, 0, 3]}
          intensity={4}
          color="#8b5cf6"
        />

        <AnimatedSphere />

        <Stars
          radius={100}
          depth={50}
          count={2500}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}