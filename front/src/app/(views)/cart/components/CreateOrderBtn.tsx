"use client";

import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { CartItem } from "@/hooks/useCart";

interface CreateOrderBtnProps {
    resetCart: () => void;
    cartItems: CartItem[];
}

const CreateOrderBtn = ({ resetCart, cartItems }: CreateOrderBtnProps) => {
    const router = useRouter();
    const { user } = useAuth0();
    const [isProcessing, setIsProcessing] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const handleCreateOrder = async () => {
        if (!user) {
            toast.error("Debes iniciar sesión para completar la compra.");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("El carrito está vacío. Añade productos para crear una orden.");
            return;
        }

        setIsProcessing(true);
        const userId = user.sub;
        const shippingAddress = "123 Calle Falsa, Springfield";

        try {
            
            const response = await fetch(`${API_URL}/orders/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    shippingAddress,
                    items: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        // 🎯 CORRECCIÓN: Nos aseguramos de que el precio sea un número y de que el imgUrl sea un string
                        price: parseFloat(String(item.price)),
                        imgUrl: item.imgUrl,
                    })),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al procesar la orden.');
            }

            resetCart();
            toast.success("¡Orden creada con éxito!");
            router.push('/order-confirmation');
        } catch (error: unknown) {
            console.error('Error during order creation:', error);
            if (error instanceof Error) {
                toast.error(error.message || 'Error al procesar la orden.');
            } else {
                toast.error('Ocurrió un error inesperado al procesar la orden.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Button 
            onClick={handleCreateOrder} 
            className="bg-daily-menu-500 hover:bg-daily-menu-600 text-white"
            disabled={isProcessing}
        >
            {isProcessing ? "Procesando..." : "Crear Orden"}
        </Button>
    );
};

export default CreateOrderBtn;
