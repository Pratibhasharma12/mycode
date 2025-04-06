// BeamVisualizer.js
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Box, Text, Html } from '@react-three/drei';
import { Button } from '@mui/material';

const BeamModel = ({ flangeWidth, webHeight, flangeThickness, webThickness, boltDiameter, boltType, propertyClass, autoRotate }) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Flanges */}
      <Box
        args={[flangeWidth, flangeThickness, 20]}
        position={[0, flangeThickness / 2, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered('flange')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === 'flange' ? '#6C5CE7' : '#A29BFE'} />
      </Box>

      {/* Web */}
      <Box
        args={[webThickness, webHeight, 20]}
        position={[0, webHeight / 2 + flangeThickness, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered('web')}
        onPointerOut={() => setHovered(null)}
      >
        <meshStandardMaterial color={hovered === 'web' ? '#E17055' : '#FAB1A0'} />
      </Box>

      {/* Bolts */}
      {[ -flangeWidth / 2 + 50, 0, flangeWidth / 2 - 50 ].map((x, idx) => (
        <group key={x} position={[x, flangeThickness + 50, 0]}
          onPointerOver={() => setHovered(`bolt-${idx}`)}
          onPointerOut={() => setHovered(null)}>
          <Box args={[boltDiameter, boltDiameter, boltDiameter]} castShadow receiveShadow>
            <meshStandardMaterial color={hovered === `bolt-${idx}` ? '#00CEC9' : '#81ECEC'} />
          </Box>
          {hovered === `bolt-${idx}` && (
            <Html position={[0, boltDiameter, 0]} center style={{ fontSize: '12px', color: '#333' }}>
              Bolt Ø{boltDiameter}mm<br/>
              Type: {boltType}<br/>
              Class: {propertyClass}
            </Html>
          )}
        </group>
      ))}

      {/* Weld/Plate */}
      <Box args={[flangeWidth, 5, 25]} position={[0, flangeThickness + webHeight + 5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#DFF9FB" />
      </Box>
    </group>
  );
};

const BeamVisualizer = ({
  flangeWidth = 200,
  webHeight = 300,
  flangeThickness = 20,
  webThickness = 10,
  boltDiameter = 10,
  boltType = 'Hex',
  propertyClass = '8.8'
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef();
  const canvasRef = useRef();

  const downloadImage = () => {
    const canvas = canvasRef.current.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'beam-visualizer.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div ref={canvasRef}>
        <Canvas
          style={{ height: '600px', background: 'linear-gradient(to bottom right, #ecf0f1, #dfe6e9)', borderRadius: '20px', boxShadow: '0px 15px 40px rgba(0,0,0,0.2)' }}
          shadows
          camera={{ position: [500, 400, 500], fov: 45 }}
        >
          <PerspectiveCamera makeDefault position={[500, 400, 500]} />
          <OrbitControls enablePan enableZoom maxDistance={1000} minDistance={300} />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[100, 100, 100]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />

          {/* Grid */}
          <gridHelper args={[1000, 20]} />

          {/* Beam Model */}
          <BeamModel
            flangeWidth={flangeWidth}
            webHeight={webHeight}
            flangeThickness={flangeThickness}
            webThickness={webThickness}
            boltDiameter={boltDiameter}
            boltType={boltType}
            propertyClass={propertyClass}
            autoRotate={autoRotate}
          />

          {/* Labels */}
          <Text position={[0, webHeight + 100, 0]} fontSize={20} color="#2C3E50" anchorX="center" anchorY="middle">
            Web Height: {webHeight}mm
          </Text>
          <Text position={[flangeWidth / 2 + 80, 20, 0]} fontSize={20} color="#2C3E50" rotation={[0, -Math.PI / 2, 0]}>
            Flange Width: {flangeWidth}mm
          </Text>
        </Canvas>
      </div>

      {/* UI Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button onClick={() => setAutoRotate(!autoRotate)} variant="contained" color="primary">
          {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
        </Button>

        <Button onClick={toggleFullscreen} variant="contained" color="info">
          {fullscreen ? 'Exit Fullscreen' : 'Full Screen'}
        </Button>

        <Button onClick={downloadImage} variant="contained" color="secondary">
          Download Image
        </Button>
      </div>
    </div>
  );
};
export default BeamVisualizer;
