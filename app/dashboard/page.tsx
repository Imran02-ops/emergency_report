"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [location, setLocation] = useState({
    lat: -8.6500,
    lng: 116.3249,
  });

  const [locationReady, setLocationReady] = useState(false);
  const [reports, setReports] = useState<any[]>([]);

  const fetchReports = async (userId: number) => {
    try {
      const res = await fetch(
        `http://localhost/pelaporan-darurat/backend/report/get_user_reports.php?user_id=${userId}`
      );

      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (!data) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(data);
    setUser(parsed);

    if (parsed?.id) {
      fetchReports(parsed.id);

      const interval = setInterval(() => {
        fetchReports(parsed.id);
      }, 5000);

      return () => clearInterval(interval);
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLocationReady(true);
        },
        () => setLocationReady(false),
        { enableHighAccuracy: true }
      );
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 px-4 py-8">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-3xl shadow-sm p-6"
        >
          <h1 className="text-2xl font-bold text-slate-900">
            Halo, {user?.nama || "User"}
          </h1>
          <p className="text-slate-500 mt-1">
            Emergency Reporting System Dashboard
          </p>
        </motion.div>

        {/* ACTION CARD */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold">🚨 Lapor Darurat</h2>
          <p className="text-blue-100 text-sm mt-1 mb-4">
            Kirim laporan kejadian dengan cepat berdasarkan lokasi Anda
          </p>

          <button
            onClick={() => router.push("/report")}
            className="w-full bg-white text-blue-600 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition"
          >
            Buat Laporan
          </button>
        </motion.div>

        {/* REPORT STATUS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border rounded-3xl shadow-sm p-5"
        >
          <h3 className="font-semibold text-slate-800 mb-4">
            📋 Laporan Anda
          </h3>

          {reports.length === 0 ? (
            <p className="text-sm text-slate-400">
              Belum ada laporan dibuat
            </p>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl border bg-slate-50"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold capitalize text-slate-900">
                      {r.kategori}
                    </p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        r.operator_confirm === "diterima"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.operator_confirm === "diterima"
                        ? "Diterima"
                        : "Proses"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-1">
                    {r.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl overflow-hidden border shadow-sm"
        >
          {!locationReady ? (
            <div className="h-[260px] flex items-center justify-center bg-white text-red-500 font-medium">
              🔴 Aktifkan GPS untuk melihat lokasi realtime
            </div>
          ) : (
            <iframe
              src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
              width="100%"
              height="260"
              loading="lazy"
              className="pointer-events-none"
            />
          )}
        </motion.div>

        {/* LOGOUT */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/login");
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold shadow-md transition"
        >
          Logout
        </motion.button>

      </div>
    </main>
  );
}