"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();

  const [kategori, setKategori] = useState("kecelakaan");
  const [deskripsi, setDeskripsi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch(
        "http://localhost/pelaporan-darurat/backend/report/create_report.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            kategori,
            deskripsi,
            alamat,
            latitude,
            longitude,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Laporan berhasil dikirim");
        router.push("/dashboard");
      } else {
        alert("Gagal mengirim laporan");
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-3xl border shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Form Pelaporan Darurat
          </h1>
          <p className="text-slate-500 mt-2">
            Laporkan kejadian dengan cepat berdasarkan lokasi Anda
          </p>
        </div>

        {/* LOCATION STATUS */}
        <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-2xl mb-6 text-sm">
          📍 Lokasi aktif: {latitude || "-"}, {longitude || "-"}
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-6">

          {/* KATEGORI */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Kategori Kejadian
            </label>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            >
              <option value="kecelakaan">Kecelakaan</option>
              <option value="kriminal">Kriminal</option>
              <option value="kebakaran">Kebakaran</option>
            </select>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Deskripsi Kejadian
            </label>

            <textarea
              placeholder="Jelaskan kejadian secara detail..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={5}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition"
            />
          </div>

          {/* ALAMAT */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Alamat Kejadian
            </label>

            <input
              placeholder="Masukkan alamat kejadian"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          {/* COORDINATES */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 border rounded-xl p-3 text-slate-600">
              Latitude: {latitude || "-"}
            </div>
            <div className="bg-slate-50 border rounded-xl p-3 text-slate-600">
              Longitude: {longitude || "-"}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Mengirim laporan..." : "Kirim Laporan Darurat"}
          </button>
        </div>
      </div>
    </main>
  );
}