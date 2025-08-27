'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg p-10 text-center shadow-2xl bg-black/40 rounded-2xl backdrop-blur-lg"
      >
        {/* Ícono con animación */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="flex justify-center"
        >
          <CheckCircle2 className="w-20 h-20 text-green-400 drop-shadow-lg" />
        </motion.div>

        {/* Título */}
        <h1 className="mt-6 text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text">
          ¡Pago Exitoso!
        </h1>

        {/* Mensaje */}
        <p className="mt-4 text-lg text-gray-200">
          🎉 Gracias por tu compra, <br />
          tu pedido está en proceso y pronto lo recibirás.
        </p>

        {/* Botón */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
            <Link
            href="/"
            className="px-8 py-3 text-lg font-medium text-white rounded-xl shadow-lg transition-all bg-[#D92D07] hover:bg-[#b82406]"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}