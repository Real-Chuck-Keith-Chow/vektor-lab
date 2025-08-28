"use client";
type Props = {
  label: string; min: number; max: number; step?: number;
  value: number; onChange: (v: number) => void; id?: string;
};
export default function Slider({ label, min, max, step = 0.01, value, onChange, id }: Props) {
  const sliderId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={sliderId} className="block text-sm space-y-2">
      <span className="text-zinc-300">
        {label}: <span className="text-zinc-100 font-medium">{value.toFixed(2)}</span>
      </span>
      <input
        id={sliderId} type="range" min={min} max={max} step={step} value={value}
        onChange={(e)=>onChange(parseFloat(e.target.value))}
        className="w-full accent-blue-500"
      />
    </label>
  );
}
