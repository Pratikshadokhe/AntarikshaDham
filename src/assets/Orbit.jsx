import React from "react";

const OrbitRing = ({ distance }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[distance, 0.01, 8, 100]} />
      <meshBasicMaterial
        color="gray"
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export default OrbitRing;
