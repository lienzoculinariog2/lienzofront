// src/app/(views)/cart/components/CreateOrderBtn.tsx
"use client";

import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook de Auth0

interface CreateOrderBtnProps {
    resetCart: () => void;
}

const CreateOrderBtn = ({ resetCart }: CreateOrderBtnProps) => {
    const router = useRouter();
    const { user } = useAuth0();
    const [isProcessing, setIsProcessing] = useState(false);

    const API_URL = "http://localhost:3000"; // Asegúrate de que esta URL sea correcta

    const handleCreateOrder = async () => {
        if (!user) {
            toast.error("Debes iniciar sesión para completar la compra.");
            return;
        }

        setIsProcessing(true);
        const userId = user.sub;
        const shippingAddress = "123 Calle Falsa, Springfield"; // Esto debería ser dinámico

        try {
            const response = await fetch(`${API_URL}/cart/checkout/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shippingAddress }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al procesar el pago.');
            }

            // Si el pago es exitoso, reiniciamos el carrito y mostramos un mensaje
            resetCart(); // Esto llamará a la función que vacía el carrito en el back-end
            toast.success("¡Orden creada con éxito!");

            // Redirigimos al usuario a una página de confirmación
            setTimeout(() => {
                router.push('/order-confirmation'); // Cambia esto por la ruta de tu página de confirmación
            }, 1500);

        } catch (error: unknown) {
            console.error('Error during checkout:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al procesar el pago.');
            } else {
                toast.error('Ocurrió un error inesperado al procesar el pago.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Button 
            onClick={handleCreateOrder} 
            className="bg-daily-menu-500 hover:bg-daily-menu-600 text-white"
            disabled={isProcessing} // Deshabilitamos el botón durante el procesamiento
        >
            {isProcessing ? "Procesando..." : "Crear Orden"}
        </Button>
    );
};

export default CreateOrderBtn;
