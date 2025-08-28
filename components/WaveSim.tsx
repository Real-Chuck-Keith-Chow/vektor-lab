"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import Slider from "./Slider";

function WaveField({ freq, phase, sep }:{freq:number; phase:number; sep:number}) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const start = useMemo(()=>performance.now(),[]);
  useFrame(()=>{ if(matRef.current){ matRef.current.uniforms.u_time.value=(performance.now()-start)/1000; }});

  const uniforms = useMemo(()=>({
    u_time: { value: 0 }, u_freq: { value: freq }, u_phase: { value: phase },
    u_sep: { value: sep }, u_speed: { value: 1.0 }, u_intensity: { value: 0.95 },
    u_resolution: { value: new THREE.Vector2(1,1) },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }),[]);

  useEffect(()=>{ if(matRef.current){ matRef.current.uniforms.u_freq.value=freq; }},[freq]);
  useEffect(()=>{ if(matRef.current){ matRef.current.uniforms.u_phase.value=phase; }},[phase]);
  useEffect(()=>{ if(matRef.current){ matRef.current.uniforms.u_sep.value=sep; }},[sep]);

  const frag = /* glsl */`
    precision highp float;
    uniform float u_time, u_freq, u_phase, u_sep, u_speed, u_intensity;
    uniform vec2  u_resolution;
    vec3 palette(float t){ return 0.6 + 0.4*cos(6.28318*(vec3(0.00,0.33,0.67)+t)); }
    void main(){
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      float aspect = u_resolution.x / u_resolution.y;
      vec2 p = vec2((uv.x-0.5)*2.0*aspect, (uv.y-0.5)*2.0);
      vec2 s1 = vec2(-u_sep,0.0), s2 = vec2(u_sep,0.0);
      float r1=length(p-s1), r2=length(p-s2);
      float k = 6.28318*u_freq/u_speed, wt = 6.28318*u_freq*u_time;
      float w1 = sin(k*r1 - wt);
      float w2 = sin(k*r2 - wt + u_phase);
      float sum = 0.5*(w1+w2);
      float I = pow(sum*sum, 0.8);
      vec3 col = palette(sum*0.5+0.5)*(0.2+0.8*I)*u_intensity;
      gl_FragColor = vec4(col,1.0);
    }`;
  const vert = `void main(){ gl_Position = vec4(position,1.0); }`;

  return (
    <mesh>
      <planeGeometry args={[2,2]} />
      <shaderMaterial ref={matRef} fragmentShader={frag} vertexShader={vert} uniforms={uniforms} />
    </mesh>
  );
}

export default function WaveSim(){
  const [freq,setFreq]=useState(1.2);
  const [phase,setPhase]=useState(0);
  const [sep,setSep]=useState(0.5);

  return (
    <div className="grid md:grid-cols-3">
      <div className="md:col-span-2 h-80 sm:h-96">
        <Canvas dpr={[1,1.75]} gl={{ antialias:true, powerPreference:"high-performance" }}
          onCreated={({ gl, size })=>{
            // update u_resolution on resize
            const m = (gl.getContext() as WebGLRenderingContext);
            const set = () => {
              const w = size.width, h = size.height;
              (gl.domElement as any).__mat && ((gl.domElement as any).__mat.uniforms.u_resolution.value.set(w,h));
            };
            // we attach uniform via ref below after first frame
          }}>
          {/* full-screen quad shader */}
          <WaveField freq={freq} phase={phase} sep={sep} />
        </Canvas>
      </div>
      <div className="p-4 space-y-4 border-l border-white/10 bg-black/20">
        <h4 className="font-semibold">Wave Controls</h4>
        <Slider label="Frequency" min={0.2} max={3.0} step={0.01} value={freq} onChange={setFreq}/>
        <Slider label="Phase Δ (rad)" min={-3.1415} max={3.1415} step={0.01} value={phase} onChange={setPhase}/>
        <Slider label="Source Separation" min={0.1} max={1.0} step={0.01} value={sep} onChange={setSep}/>
        <p className="text-xs text-zinc-400">Try larger separation + phase to see bright/dark fringes.</p>
      </div>
    </div>
  );
}
