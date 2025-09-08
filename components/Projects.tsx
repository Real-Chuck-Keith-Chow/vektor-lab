"use client";
import React, { useMemo, useState } from "react";

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
};

const ALL: Project[] = [
  {
    title: "Arthritis Relief Glove",
    blurb: "Embedded PWM motor control, temperature sensors, MOSFET drivers, and Arduino/ESP32 integration.",
    tags: ["hardware", "embedded", "research"],
    href: "https://github.com/your-username/arthritis-glove",
  },
  {
    title: "FPGA High-Speed DAQ",
    blurb: "Artix-7 + Verilog SPI with ADS8881 ADC, UART, wireless link; Python testbenches.",
    tags: ["hardware", "fpga", "verilog"],
    href: "https://github.com/your-username/fpga-daq",
  },
  {
    title: "Signal Wave Simulator",
    blurb: "Next.js + TypeScript interactive waveform visualizer for signals & systems.",
    tags: ["web", "nextjs"],
    href: "https://vektor-lab.vercel.app",
  },
  {
    title: "RISC-V Core w/ Fault Detection",
    blurb: "Verilog core design, hazard unit, testbenches, and embedded reliability checks.",
    tags: ["hardware", "verilog", "riscv"],
  },
  {
    title: "Edison Puzzle Visualizer",
    blurb: "Python + Pygame visualizing state search algorithms for puzzle solving.",
    tags: ["python"],
    href: "https://github.com/your-username/edison-puzzle",
  },
];

const TAGS = ["all", "hardware", "embedded", "fpga", "verilog", "riscv", "web", "nextjs", "python", "research"];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL.filter((p) => {
      const matchTag = tag === "all" || p.tags.includes(tag);
      const matchText = !q || p.title.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q);
      return matchTag && matchText;
    });
  }, [query, tag]);

  return (
    <section className="space-y-6">
      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          placeholder="Search projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 rounded-xl border w-60"
        />
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1 rounded-full border text-sm ${
                tag === t
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border p-4 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
            <p className="text-sm opacity-80 mb-3">{p.blurb}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full border opacity-80"
                >
                  {t}
                </span>
              ))}
            </div>
            {p.href && (
              <a
                href={p.href}
                target="_blank"
                className="text-sm underline"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
