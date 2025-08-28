"use client";
import { useState } from "react";

export default function EmailCapture(){
  const [email,setEmail]=useState(""); const [status,setStatus]=useState<"idle"|"loading"|"ok"|"err">("idle");
  async function submit(e:React.FormEvent){ e.preventDefault(); setStatus("loading");
    const res = await fetch("/api/subscribe",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email })});
    setStatus(res.ok?"ok":"err");
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
        placeholder="you@school.edu" className="px-3 py-2 rounded-md bg-black/30 border border-white/10 flex-1" aria-label="Email address"/>
      <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50" disabled={status==="loading"}>
        {status==="loading" ? "Joining..." : "Join Beta"}
      </button>
      {status==="ok" && <span className="text-green-400 text-sm self-center">You're in!</span>}
      {status==="err" && <span className="text-red-400 text-sm self-center">Try again</span>}
    </form>
  );
}
