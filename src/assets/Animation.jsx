import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, PerspectiveCamera } from "@react-three/drei";

// Orbit ring as thin torus
const OrbitRing = ({ distance }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <torusGeometry args={[distance, 0.01, 8, 100]} />
    <meshBasicMaterial color="gray" transparent opacity={0.5} />
  </mesh>
);

// Planet component
const Planet = ({ distance, speed, size, color, name, tilt = 0, children }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = distance * Math.cos(t);
    ref.current.position.z = distance * Math.sin(t);
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z = tilt;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Planet name */}
      <Text
        position={[0, -size - 0.5, 0]}
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {children}
    </group>
  );
};

// Moon component
const Moon = ({ distance, speed, size, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = distance * Math.cos(t);
    ref.current.position.z = distance * Math.sin(t);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const SolarSystem = () => {
  return (
    <Canvas shadows style={{ width: "100%", height: "100vh" }}>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 50, 80]} fov={45} />
      <OrbitControls enablePan enableZoom enableRotate />

      {/* Stars background */}
      <Stars radius={300} depth={60} count={2000} factor={7} saturation={0} fade />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} castShadow />

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial emissive="yellow" emissiveIntensity={2} />
      </mesh>

      {/* Orbit rings */}
      <OrbitRing distance={12} />
      <OrbitRing distance={20} />
      <OrbitRing distance={28} />
      <OrbitRing distance={36} />
      <OrbitRing distance={44} />
      <OrbitRing distance={52} />
      <OrbitRing distance={13.5} /> {/* habitat orbit */}

      {/* Planets */}
      <Planet distance={12} speed={0.5} size={1.2} color="#1E90FF" name="Earth">
        <Moon distance={2} speed={1} size={0.3} color="#aaaaaa" />
      </Planet>
      <Planet distance={20} speed={0.3} size={1.5} color="#FF4500" name="Mars" />
      <Planet distance={28} speed={0.2} size={2} color="#00FA9A" name="Neptune" />
      <Planet distance={36} speed={0.15} size={2.5} color="#FFA500" name="Jupiter" />
      <Planet distance={44} speed={0.12} size={2} color="#87CEEB" name="Uranus" />
      <Planet distance={52} speed={0.1} size={2} color="#0000FF" name="Saturn" />

      {/* Space Habitat */}
      <Planet distance={13.5} speed={1.2} size={0.5} color="#CCCCCC" name="Habitat" />
    </Canvas>
  );
};

export default SolarSystem;
