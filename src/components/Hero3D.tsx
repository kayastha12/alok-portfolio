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

    sphereRef.current.position.x = pointer.x * 3;
    sphereRef.current.position.y = pointer.y * 2;
    sphereRef.current.rotation.y += 0.005;
  });

  return (
    <Sphere
      ref={sphereRef}
      args={[1, 64, 64]}
      scale={1.4}
    >
      <MeshDistortMaterial
        color="#245D66"
        distort={0.4}
        speed={1.5}
        roughness={0.1}
        metalness={0.2}
      />
    </Sphere>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-25">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />

        <directionalLight
          position={[2, 2, 2]}
          intensity={1.5}
        />

        <pointLight
          position={[0, 0, 3]}
          intensity={3}
          color="#245D66"
        />

        <AnimatedSphere />
      </Canvas>
    </div>
  );
}