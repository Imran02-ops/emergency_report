"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost/pelaporan-darurat/backend/auth/register.php",
        {
          nama,
          no_hp: noHp,
        }
      );

      if (res.data.success) {
        alert("Registrasi berhasil");
        router.push("/login");
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-700 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Register
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Buat akun baru
        </p>

        <input
          type="text"
          placeholder="Nama lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-black placeholder:text-gray-400 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Nomor HP"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-black placeholder:text-gray-400 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Register
        </button>

        <p className="text-center mt-6 text-sm text-gray-700">
          Sudah punya akun?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}