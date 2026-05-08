"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);

  const fetchReports = async () => {
    const res = await fetch(
      "http://localhost/pelaporan-darurat/backend/report/get_reports.php"
    );
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);

  const confirmReport = async (id: number) => {
    await fetch(
      "http://localhost/pelaporan-darurat/backend/report/confirm_report.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    fetchReports();
  };

  const hasNew = reports.some((r) => r.operator_confirm === "belum");

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white border rounded-3xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard Operator
          </h1>
          <p className="text-slate-500 mt-2">
            Monitoring laporan darurat secara realtime
          </p>
        </div>

        {/* ALERT */}
        {hasNew && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl font-semibold">
            🚨 Ada laporan baru masuk yang belum ditangani
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white border rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* HEADER CARD */}
              <div className="p-5 border-b">
                <h2 className="text-lg font-bold text-slate-900 capitalize">
                  {report.kategori}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Report ID #{report.id}
                </p>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                <p className="text-sm text-slate-700 leading-relaxed">
                  {report.deskripsi}
                </p>

                <div className="text-blue-600 text-sm font-medium">
                  📍 {report.alamat}
                </div>

                {/* MAP */}
                <div className="rounded-2xl overflow-hidden border">
                  <iframe
                    src={`https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=15&output=embed`}
                    width="100%"
                    height="180"
                    loading="lazy"
                  />
                </div>

                {/* STATUS BUTTON */}
                {report.operator_confirm === "belum" ? (
                  <button
                    onClick={() => confirmReport(report.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition"
                  >
                    Terima Laporan
                  </button>
                ) : (
                  <div className="text-center bg-green-50 text-green-700 py-3 rounded-2xl font-semibold">
                    ✓ Laporan sudah diterima
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}