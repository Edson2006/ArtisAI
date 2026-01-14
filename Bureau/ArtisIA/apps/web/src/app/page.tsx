import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Footer Simple */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ArtisIA. Fait avec ❤️ pour les artisans.</p>
        </div>
      </footer>
    </main>
  );
}
