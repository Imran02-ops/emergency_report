"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 flex items-center justify-center relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-96 h-96 bg-cyan-300 blur-3xl opacity-20 rounded-full" />

      {/* content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* LOGO */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mb-8"
        >
          <Image
            src="/logo1.png"
            alt="Emergency Helpline"
            width={220}
            height={220}
            priority
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white text-3xl font-bold tracking-wide"
        >
          Emergency Helpline
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.7 }}
          className="text-blue-100 text-sm mt-2"
        >
          Fast • Accurate • Realtime
        </motion.p>

        {/* LOADING */}
        <div className="flex gap-2 mt-8">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-3 h-3 bg-white rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-3 h-3 bg-white rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-3 h-3 bg-white rounded-full"
          />
        </div>

        <p className="text-white/70 text-sm mt-5">
          Memuat aplikasi...
        </p>
      </motion.div>
    </main>
  );
}