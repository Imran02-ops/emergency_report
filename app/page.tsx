import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 relative overflow-hidden flex items-center justify-center px-6">
      
      {/* floating icons background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-white/20 text-6xl rotate-12">
          🚑
        </div>
        <div className="absolute top-32 right-12 text-white/20 text-5xl -rotate-12">
          🚔
        </div>
        <div className="absolute bottom-32 left-8 text-white/20 text-6xl rotate-6">
          🔥
        </div>
        <div className="absolute bottom-20 right-10 text-white/20 text-5xl -rotate-6">
          📍
        </div>
        <div className="absolute top-1/2 left-16 text-white/10 text-7xl">
          🚨
        </div>
        <div className="absolute top-1/3 right-20 text-white/10 text-6xl">
          🏥
        </div>
      </div>

      {/* card content */}
      <div className="relative z-10 text-center max-w-sm">
        <div className="w-28 h-28 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl mb-8 border border-white/20">
          <span className="text-6xl">🚨</span>
        </div>

        <h1 className="text-4xl font-extrabold text-white leading-tight">
          Sistem Pelaporan
          <br />
          Darurat
        </h1>

        <p className="mt-4 text-white/90 text-base leading-relaxed">
          Laporkan kejadian darurat secara cepat, akurat, dan terintegrasi
          dengan instansi terkait.
        </p>

        <Link href="/login">
          <button className="mt-8 w-full bg-white text-blue-700 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition duration-300">
            Masuk Aplikasi
          </button>
        </Link>
      </div>
    </main>
  );
}