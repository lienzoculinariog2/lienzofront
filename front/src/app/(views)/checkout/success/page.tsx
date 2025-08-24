'use client';

import React from 'react';
import Link from 'next/link'; // Importa el componente Link

export default function CheckoutSuccessPage() {
return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-4xl font-bold text-green-500 mb-4">
        ¡Pago Exitoso!
    </h1>
    <p className="text-xl text-white">
        Gracias por tu compra. Tu pedido ha sido procesado correctamente.
    </p>
      {/* 🎯 CORRECCIÓN: Reemplazamos la etiqueta <a> por <Link> */}
    <Link href="/" className="mt-8 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
        Volver a la página principal
    </Link>
    </div>
);
}