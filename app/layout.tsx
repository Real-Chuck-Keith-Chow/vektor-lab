import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vektor Lab — Visualize the Invisible",
  description: "Interactive simulations for waves, signal processing, and EM fields.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="px-6 py-4 border-b border-white/10">
          <div className="mx-auto max-w-6xl flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M2 12c6-12 14 12 20 0" />
            </svg>
            <span className="font-semibold tracking-wide">Vektor Lab</span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        <footer className="mt-16 border-t border-white/10 py-8 text-sm text-zinc-400">
          <div className="mx-auto max-w-6xl">© {new Date().getFullYear()} Vektor Lab</div>
        </footer>
      </body>
    </html>
  );
}
