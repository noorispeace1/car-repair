"use client";

import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, ContactShadows, Text, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Sparkles, Palette, Layers, Eye, RefreshCw, Check, ShieldCheck, Activity, Cpu } from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";

const PAINT_COLORS = [
  { name: "Miami Sky Blue", hex: "#0088cc", metalness: 0.85, roughness: 0.15, code: "M3B" },
  { name: "GT Silver Metallic", hex: "#94a3b8", metalness: 0.95, roughness: 0.1, code: "U2" },
  { name: "Guards Red", hex: "#dc2626", metalness: 0.75, roughness: 0.18, code: "G1" },
  { name: "Obsidian Jet Black", hex: "#0f172a", metalness: 0.9, roughness: 0.08, code: "A1" },
  { name: "Racing Yellow", hex: "#eab308", metalness: 0.8, roughness: 0.15, code: "P3" },
  { name: "Acid Green GT", hex: "#65a30d", metalness: 0.85, roughness: 0.12, code: "2M8" },
];

function ProceduralCarModel({
  color,
  mode,
  isRotating,
}: {
  color: string;
  mode: "paint" | "wireframe" | "xray";
  isRotating: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  const isWireframe = mode === "wireframe";
  const isXRay = mode === "xray";

  const carMaterial = new THREE.MeshPhysicalMaterial({
    color: isWireframe ? "#00D2FF" : isXRay ? "#38BDF8" : color,
    metalness: isWireframe ? 0 : 0.9,
    roughness: isWireframe ? 1 : 0.12,
    clearcoat: isWireframe ? 0 : 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
    wireframe: isWireframe,
    transparent: isXRay,
    opacity: isXRay ? 0.35 : 1.0,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#0a0f1d",
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.5,
    transparent: true,
    opacity: isWireframe ? 0.2 : 0.7,
    wireframe: isWireframe,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: "#e2e8f0",
    metalness: 0.95,
    roughness: 0.05,
    wireframe: isWireframe,
  });

  const caliperMaterial = new THREE.MeshStandardMaterial({
    color: "#facc15", // Porsche yellow calipers
    metalness: 0.5,
    roughness: 0.3,
    wireframe: isWireframe,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: "#18181b",
    metalness: 0.1,
    roughness: 0.8,
    wireframe: isWireframe,
  });

  const glowLightMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
  });

  const redTailLightMaterial = new THREE.MeshBasicMaterial({
    color: "#ef4444",
  });

  return (
    <group ref={groupRef} position={[0, 0.45, 0]}>
      {/* Lower Main Chassis / Body */}
      <mesh position={[0, 0.35, 0]} material={carMaterial} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.45, 4.4]} />
      </mesh>

      {/* Aerodynamic Front Nose Hood */}
      <mesh position={[0, 0.28, 1.8]} rotation={[-0.15, 0, 0]} material={carMaterial} castShadow>
        <boxGeometry args={[1.9, 0.3, 1.2]} />
      </mesh>

      {/* Front Splitter / Air Dam */}
      <mesh position={[0, 0.1, 2.25]} material={tireMaterial}>
        <boxGeometry args={[1.95, 0.08, 0.35]} />
      </mesh>

      {/* Aerodynamic Cabin / Greenhouse */}
      <mesh position={[0, 0.75, -0.2]} material={carMaterial} castShadow>
        <boxGeometry args={[1.5, 0.45, 2.2]} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.75, 0.8]} rotation={[0.5, 0, 0]} material={glassMaterial}>
        <boxGeometry args={[1.42, 0.5, 0.05]} />
      </mesh>

      {/* Rear Sloped Fastback Window */}
      <mesh position={[0, 0.72, -1.25]} rotation={[-0.45, 0, 0]} material={glassMaterial}>
        <boxGeometry args={[1.4, 0.65, 0.05]} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[-0.72, 0.75, -0.2]} material={glassMaterial}>
        <boxGeometry args={[0.05, 0.38, 1.6]} />
      </mesh>
      <mesh position={[0.72, 0.75, -0.2]} material={glassMaterial}>
        <boxGeometry args={[0.05, 0.38, 1.6]} />
      </mesh>

      {/* Rear Ducktail Spoiler / Engine Louvers */}
      <mesh position={[0, 0.58, -2.1]} rotation={[0.1, 0, 0]} material={carMaterial}>
        <boxGeometry args={[1.8, 0.15, 0.6]} />
      </mesh>

      {/* Rear Continuous LED Light Bar */}
      <mesh position={[0, 0.5, -2.22]} material={redTailLightMaterial}>
        <boxGeometry args={[1.75, 0.06, 0.05]} />
      </mesh>

      {/* Headlights (Porsche iconic oval projectors) */}
      <mesh position={[-0.65, 0.42, 2.15]} rotation={[0.3, -0.2, 0]} material={glowLightMaterial}>
        <cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
      </mesh>
      <mesh position={[0.65, 0.42, 2.15]} rotation={[0.3, 0.2, 0]} material={glowLightMaterial}>
        <cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
      </mesh>

      {/* 4 Performance Wheels & Brakes */}
      {[
        { pos: [-1.02, 0.32, 1.35] as [number, number, number], rot: Math.PI / 2 },
        { pos: [1.02, 0.32, 1.35] as [number, number, number], rot: Math.PI / 2 },
        { pos: [-1.02, 0.34, -1.35] as [number, number, number], rot: Math.PI / 2 },
        { pos: [1.02, 0.34, -1.35] as [number, number, number], rot: Math.PI / 2 },
      ].map((w, idx) => (
        <group key={idx} position={w.pos}>
          {/* Tire */}
          <mesh rotation={[0, 0, w.rot]} material={tireMaterial} castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.28, 24]} />
          </mesh>
          {/* Alloy Rim */}
          <mesh rotation={[0, 0, w.rot]} material={chromeMaterial}>
            <cylinderGeometry args={[0.26, 0.26, 0.29, 16]} />
          </mesh>
          {/* Carbon-Ceramic Brake Rotor */}
          <mesh rotation={[0, 0, w.rot]} material={chromeMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 16]} />
          </mesh>
          {/* Yellow Caliper */}
          <mesh position={[0, 0.14, 0]} material={caliperMaterial}>
            <boxGeometry args={[0.12, 0.12, 0.16]} />
          </mesh>
        </group>
      ))}

      {/* Structural Frame Laser Inspection Nodes (Visible in Wireframe & XRay) */}
      {(isWireframe || isXRay) && (
        <group>
          {[
            [-0.9, 0.4, 1.9],
            [0.9, 0.4, 1.9],
            [-0.9, 0.4, -1.9],
            [0.9, 0.4, -1.9],
            [0, 0.9, 0],
            [-0.8, 0.2, 0],
            [0.8, 0.2, 0],
          ].map((pt, i) => (
            <mesh key={i} position={pt as [number, number, number]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#00D2FF" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

export default function CarScene3D() {
  const [selectedColor, setSelectedColor] = useState(PAINT_COLORS[0]);
  const [mode, setMode] = useState<"paint" | "wireframe" | "xray">("paint");
  const [isRotating, setIsRotating] = useState(true);

  const handleColorChange = (c: typeof PAINT_COLORS[0]) => {
    audioEngine.playTick(1800);
    setSelectedColor(c);
  };

  const handleModeChange = (m: "paint" | "wireframe" | "xray") => {
    audioEngine.playWhoosh();
    setMode(m);
  };

  return (
    <section
      id="interactive-3d-studio"
      className="relative w-full min-h-screen bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-800"
    >
      {/* Section Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-mono font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Virtual Inspector</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display">
              Custom Paint & Frame Inspection Studio
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl">
              Rotate in 360°, inspect Celette computerized frame alignment laser points, and preview Glasurit factory waterborne finish formulations.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => handleModeChange("paint")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                mode === "paint"
                  ? "bg-brand-accent text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
              data-interactive="true"
              data-cursor-label="PAINT"
            >
              <Palette className="w-3.5 h-3.5" />
              Factory Paint
            </button>
            <button
              onClick={() => handleModeChange("wireframe")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                mode === "wireframe"
                  ? "bg-brand-accent text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
              data-interactive="true"
              data-cursor-label="FRAME"
            >
              <Layers className="w-3.5 h-3.5" />
              Celette Frame Grid
            </button>
            <button
              onClick={() => handleModeChange("xray")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                mode === "xray"
                  ? "bg-brand-accent text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                  : "text-slate-300 hover:text-white"
              }`}
              data-interactive="true"
              data-cursor-label="X-RAY"
            >
              <Eye className="w-3.5 h-3.5" />
              X-Ray Powertrain
            </button>
          </div>
        </div>

        {/* 3D Canvas Stage Container */}
        <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Real-time 3D Canvas */}
          <Canvas shadows={{ type: THREE.PCFShadowMap }} dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[3.8, 2.2, 4.8]} fov={45} />
            <OrbitControls
              enablePan={false}
              minDistance={3.2}
              maxDistance={7.5}
              maxPolarAngle={Math.PI / 2 - 0.05}
              minPolarAngle={Math.PI / 6}
            />

            {/* Studio Lighting Rig */}
            <ambientLight intensity={0.6} />
            <spotLight
              position={[5, 8, 5]}
              angle={0.4}
              penumbra={0.8}
              intensity={2.2}
              color="#ffffff"
              castShadow
            />
            <spotLight
              position={[-5, 6, -4]}
              angle={0.5}
              penumbra={0.9}
              intensity={1.8}
              color="#38BDF8"
            />
            <pointLight position={[0, 4, 0]} intensity={1.5} color="#00D2FF" />

            <Suspense fallback={null}>
              <ProceduralCarModel
                color={selectedColor.hex}
                mode={mode}
                isRotating={isRotating}
              />

              {/* Reflective Studio Showroom Floor */}
              <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={40}
                  roughness={0.4}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#050914"
                  metalness={0.8}
                  mirror={0.6}
                />
              </mesh>
            </Suspense>
          </Canvas>

          {/* Top Left Floating HUD Telemetry Readout */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-xs font-mono text-slate-300 shadow-lg">
              <div className="flex items-center gap-2 text-brand-accent font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CELETTE BENCH: 0.00° STRUCTURAL TOLERANCE</span>
              </div>
              <span className="text-[10px] text-slate-400">
                Active PPG/Glasurit Spec: {selectedColor.name} ({selectedColor.code})
              </span>
            </div>
          </div>

          {/* Top Right Controls (Auto-rotation toggle) */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => {
                audioEngine.playTick(1200);
                setIsRotating(!isRotating);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono backdrop-blur-md transition-all ${
                isRotating
                  ? "border-brand-accent/50 bg-brand-accent/15 text-brand-accent"
                  : "border-slate-800 bg-slate-900/80 text-slate-400"
              }`}
              data-interactive="true"
              data-cursor-label="ROTATE"
            >
              <RefreshCw className={`w-3 h-3 ${isRotating ? "animate-spin" : ""}`} />
              <span>{isRotating ? "AUTO-ORBIT ON" : "ORBIT PAUSED"}</span>
            </button>
          </div>

          {/* Bottom Interactive Paint Swatches Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider hidden md:inline">
                Formula Match:
              </span>
              <span className="text-xs font-mono font-bold text-brand-sky">
                {selectedColor.name}
              </span>
            </div>

            {/* Color Swatch Circles */}
            <div className="flex items-center gap-2.5">
              {PAINT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => handleColorChange(c)}
                  className={`relative w-8 h-8 rounded-full transition-transform duration-200 border-2 ${
                    selectedColor.hex === c.hex
                      ? "scale-125 border-brand-accent shadow-[0_0_15px_#00D2FF]"
                      : "border-slate-700 hover:scale-110"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  data-interactive="true"
                  data-cursor-label={c.name}
                >
                  {selectedColor.hex === c.hex && (
                    <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow" />
                  )}
                </button>
              ))}
            </div>

            <span className="text-[10px] font-mono text-slate-400 hidden lg:inline">
              Left-click & drag to orbit • Scroll to zoom
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
