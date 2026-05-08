"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Report {
  id: number;
  kategori: string;
  deskripsi: string;
  alamat: string;
  latitude: string;
  longitude: string;
  created_at: string;
  operator_confirm: string;
}

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [chartData, setChartData] = useState<
    { month: string; total: number }[]
  >([]);

  const fetchReports = async () => {
    try {
      const res = await fetch(
        "http://localhost/pelaporan-darurat/backend/report/get_reports.php",
        { cache: "no-store" }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setReports(data);
        generateChart(data);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchReports();

    const interval = setInterval(() => {
      fetchReports();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateChart = (data: Report[]) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const monthlyData = months.map((month) => ({
      month,
      total: 0,
    }));

    data.forEach((report) => {
      if (!report.created_at) return;

      const date = new Date(report.created_at);

      if (!isNaN(date.getTime())) {
        monthlyData[date.getMonth()].total += 1;
      }
    });

    setChartData(monthlyData);
  };

  const confirmReport = async (id: number) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const pendingReports = reports.filter(
    (report) => report.operator_confirm === "belum"
  ).length;

  const completedReports = reports.filter(
    (report) => report.operator_confirm !== "belum"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-3xl shadow-sm p-6"
        >
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard Operator
          </h1>
          <p className="text-slate-500 mt-2">
            Monitoring laporan darurat secara realtime
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5">
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border rounded-3xl shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="text-blue-600" size={22} />
              <p className="text-slate-500 text-sm">Total Laporan</p>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              {reports.length}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border rounded-3xl shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock3 className="text-yellow-600" size={22} />
              <p className="text-slate-500 text-sm">Pending</p>
            </div>
            <h2 className="text-3xl font-bold text-yellow-600">
              {pendingReports}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border rounded-3xl shadow-sm p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="text-green-600" size={22} />
              <p className="text-slate-500 text-sm">Diterima</p>
            </div>
            <h2 className="text-3xl font-bold text-green-600">
              {completedReports}
            </h2>
          </motion.div>
        </div>

        {/* Alert */}
        {pendingReports > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl flex items-center gap-3 font-medium"
          >
            <AlertTriangle size={18} />
            Ada laporan baru masuk yang belum diproses
          </motion.div>
        )}

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border rounded-3xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-5">
            Grafik Kasus Per Bulan
          </h2>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Reports */}
        <div className="grid lg:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="p-5 space-y-4">
                <div>
                  <h2 className="font-bold text-lg text-slate-900 capitalize">
                    {report.kategori}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {report.deskripsi}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <MapPin size={16} />
                  {report.alamat}
                </div>

                <div className="rounded-2xl overflow-hidden border">
                  <iframe
                    src={`https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=15&output=embed`}
                    width="100%"
                    height="220"
                    loading="lazy"
                  />
                </div>

                {report.operator_confirm === "belum" ? (
                  <button
                    onClick={() => confirmReport(report.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition"
                  >
                    Terima Laporan
                  </button>
                ) : (
                  <div className="bg-green-50 text-green-700 py-3 rounded-2xl text-center font-medium">
                    ✓ Laporan diterima operator
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}