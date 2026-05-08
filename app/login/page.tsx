"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [noHp, setNoHp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost/pelaporan-darurat/backend/auth/login.php",
        {
          no_hp: noHp,
        }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border shadow-sm rounded-3xl p-8"
      >

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            LaporKuy
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Login untuk mengakses sistem pelaporan darurat
          </p>
        </div>

        {/* INPUT */}
        <div className="space-y-4">

          <div>
            <label className="text-sm text-slate-700 font-medium">
              Nomor HP
            </label>

            <input
              type="text"
              placeholder="Masukkan nomor HP"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-2xl font-semibold text-white transition ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        {/* REGISTER */}
        <p className="text-center mt-6 text-sm text-slate-600">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </motion.div>
    </main>
  );
}