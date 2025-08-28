"use client";

import dynamic from "next/dynamic";
import EmailCapture from "@/components/EmailCapture";
const WaveSim = dynamic(()=>import("@/components/WaveSim"), { ssr:false });

export default function Home(){
  return (
    <div className="space-y-16">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Visualize the Invisible.</h1>
          <p className="text-zinc-300">
            Real-time, interactive simulations for wave propagation, signal processing, and electromagnetic fields.
          </p>
          <EmailCapture />
        </div>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <WaveSim />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Specialized","Waves, signals, and EM — not general STEM."],
          ["Real-time","GPU-accelerated visuals that respond instantly."],
          ["Accessible","Visual-first, dyslexia-friendly design."],
        ].map(([t,b])=>(
          <div key={t} className="rounded-xl border border-white/10 p-5">
            <h3 className="text-lg font-semibold">{t}</h3>
            <p className="text-zinc-300">{b}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
