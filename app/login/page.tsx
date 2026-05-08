"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [noHp, setNoHp] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          LaporKuy
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Login dengan nomor HP
        </p>

        <input
          type="text"
          placeholder="Masukkan nomor HP"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 text-black placeholder:text-gray-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm text-gray-700">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}