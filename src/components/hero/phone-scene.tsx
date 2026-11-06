"use client";
/* eslint-disable react-hooks/immutability -- R3F mutates three.js objects and uniforms inside useFrame by design. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMediaQuery } from "@/lib/hooks";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* Screen: domain-warped curl-ish noise "ink in water", stirred by the pointer. */
const vert = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uPointer;
uniform float uStir;
uniform vec3 uA;
uniform vec3 uB;
uniform float uScroll;
uniform sampler2D uTex;
uniform float uHasTex;

vec2 hash(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return -1.0 + 2.0 * fract(sin(p) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
             mix(dot(hash(i + vec2(0, 1)), f - vec2(0, 1)), dot(hash(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(1.0, 2.05) * 2.2;
  // pointer swirl
  vec2 d = uv - uPointer;
  float r = length(d * vec2(1.0, 2.05));
  float swirl = uStir * exp(-r * 6.0);
  float ang = swirl * 3.0;
  p = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p;
  float t = uTime * 0.12;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 w = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.5 * w);
  vec3 col = mix(vec3(0.012, 0.014, 0.02), uB * 0.85, smoothstep(-0.1, 0.7, w.y + f));
  col = mix(col, uA, smoothstep(0.05, 0.75, f * 1.4 + length(q) * 0.7 - w.x * 0.3));
  col += uA * swirl * 0.35;
  // vignette + scanline sheen
  col *= smoothstep(1.25, 0.2, length((uv - 0.5) * vec2(1.6, 1.0)));
  col += 0.04 * smoothstep(0.0, 1.0, sin((uv.y + uTime * 0.05) * 3.14159 * 2.0));
  if (uHasTex > 0.0) {
    // Real screen image (Job's app icons) with the live ink as a soft screen-blend layer on top.
    vec3 tex = texture2D(uTex, uv).rgb;
    vec3 ink = col * (0.4 + swirl * 0.6);
    col = mix(col, 1.0 - (1.0 - tex) * (1.0 - ink), uHasTex);
  }
  col = mix(col, vec3(0.03, 0.035, 0.045), uScroll * 0.6);
  gl_FragColor = vec4(col, 1.0);
}
`;

type Tilt = { x: number; y: number };

const SCREEN_SRC = "/images/hero/hero-screen.webp";

function Phone({ lite, tiltRef }: { lite: boolean; tiltRef: React.RefObject<Tilt> }) {
  const group = useRef<THREE.Group>(null);
  const vel = useRef({ x: 0, y: 0 });
  const rot = useRef({ x: 0, y: 0 });
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const stir = useRef(0);
  const { invalidate } = useThree();

  const body = useMemo(() => new RoundedBoxGeometry(1.6, 3.3, 0.16, 8, 0.2), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uStir: { value: 0 },
      uScroll: { value: 0 },
      uA: { value: new THREE.Color("#3DFFA2") },
      uB: { value: new THREE.Color("#7C5CFF") },
      uTex: { value: null as THREE.Texture | null },
      uHasTex: { value: 0 },
    }),
    [],
  );

  // Screen image: fades in over the ink once loaded; the ink alone stays as the fallback.
  useEffect(() => {
    let tex: THREE.Texture | null = null;
    let cancelled = false;
    new THREE.TextureLoader().load(SCREEN_SRC, (t) => {
      if (cancelled) return t.dispose();
      t.colorSpace = THREE.NoColorSpace; // raw sRGB values straight to the sRGB canvas (no tone mapping here)
      t.anisotropy = 4;
      tex = t;
      uniforms.uTex.value = t;
      fadeIn.current = true;
      invalidate();
    });
    return () => {
      cancelled = true;
      tex?.dispose();
    };
  }, [uniforms, invalidate]);
  const fadeIn = useRef(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      tiltRef.current.x = (e.clientX / innerWidth) * 2 - 1;
      tiltRef.current.y = (e.clientY / innerHeight) * 2 - 1;
      pointer.current.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
      stir.current = Math.min(stir.current + 0.15, 1.2);
      invalidate();
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [invalidate, tiltRef]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const step = Math.min(dt, 1 / 30);
    // Spring physics: stiffness 260, damping 24, mass 0.8 (house tokens), scaled to radians.
    const k = 260,
      c = 24,
      m = 0.8;
    const scroll = Math.min(window.scrollY / innerHeight, 1.2);
    const target = { x: tiltRef.current.y * 0.25 + scroll * 0.9, y: tiltRef.current.x * 0.45 - 0.3 + scroll * 1.6 };
    (["x", "y"] as const).forEach((a) => {
      const f = -k * (rot.current[a] - target[a]) - c * vel.current[a];
      vel.current[a] += (f / m) * step;
      rot.current[a] += vel.current[a] * step;
    });
    g.rotation.set(rot.current.x, rot.current.y, -0.12 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06 - scroll * 0.6;
    stir.current *= 0.96;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uPointer.value.lerp(pointer.current, 0.08);
    uniforms.uStir.value = stir.current;
    uniforms.uScroll.value = Math.min(scroll, 1);
    if (fadeIn.current && uniforms.uHasTex.value < 1) uniforms.uHasTex.value = Math.min(uniforms.uHasTex.value + step * 1.5, 1);
  });

  return (
    <group ref={group} rotation={[0, -0.3, -0.12]}>
      <mesh geometry={body}>
        <meshPhysicalMaterial
          color="#0E1014"
          metalness={0.6}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.1}
          {...(lite ? {} : { transmission: 0, sheen: 1, sheenColor: new THREE.Color("#7C5CFF") })}
        />
      </mesh>
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[1.46, 3.14, 1, 1]} />
        <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} toneMapped={false} />
      </mesh>
      {/* glass edge highlight */}
      <mesh position={[0, 0, 0.0815]}>
        <planeGeometry args={[1.5, 3.18]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.035} />
      </mesh>
    </group>
  );
}

function Rig({ lite, onReady }: { lite: boolean; onReady: () => void }) {
  const ready = useRef(false);
  const last = useRef(0);
  const { invalidate } = useThree();
  // Drive frames manually: 60fps normally, 30fps on low-power; stop when off-screen or hidden.
  useEffect(() => {
    let raf = 0;
    let visible = true;
    const el = document.querySelector("#hero-title");
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting || window.scrollY < innerHeight * 1.3), {
      rootMargin: "400px",
    });
    if (el) io.observe(el);
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (lite && t - last.current < 1000 / 30) return;
      last.current = t;
      invalidate();
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [invalidate, lite]);
  useFrame(() => {
    if (!ready.current) {
      ready.current = true;
      requestAnimationFrame(onReady);
    }
  });
  return null;
}

export default function PhoneScene({ lite, onReady }: { lite: boolean; onReady: () => void }) {
  const tiltRef = useRef<Tilt>({ x: 0, y: 0 });
  const coarse = useMediaQuery("(pointer: coarse)");
  const gyroAvailable = coarse && typeof window !== "undefined" && "DeviceOrientationEvent" in window;
  const [gyroOn, setGyroOn] = useState(false);

  useEffect(() => {
    if (!gyroOn) return;
    const onOrient = (e: DeviceOrientationEvent) => {
      tiltRef.current.x = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30));
      tiltRef.current.y = Math.max(-1, Math.min(1, ((e.beta ?? 45) - 45) / 30));
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [gyroOn]);

  const enableGyro = async () => {
    const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    try {
      if (typeof D.requestPermission === "function") {
        if ((await D.requestPermission()) !== "granted") return;
      }
      setGyroOn(true);
    } catch {}
  };

  return (
    <>
      <Canvas
        aria-hidden="true"
        frameloop="demand"
        dpr={lite ? [1, 1.25] : [1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 2, 4]} intensity={2.2} color="#3DFFA2" />
        <directionalLight position={[-4, 1, 2]} intensity={2} color="#7C5CFF" />
        <pointLight position={[0, 0, 3]} intensity={6} color="#ffffff" distance={6} />
        <Phone lite={lite} tiltRef={tiltRef} />
        <Rig lite={lite} onReady={onReady} />
      </Canvas>
      {gyroAvailable && !gyroOn && (
        <button
          type="button"
          onClick={enableGyro}
          className="label-mono absolute right-0 top-full mt-3 min-h-11 whitespace-nowrap rounded-full border hairline bg-bg/70 px-4 backdrop-blur hover:text-text"
        >
          Enable motion
        </button>
      )}
    </>
  );
}
