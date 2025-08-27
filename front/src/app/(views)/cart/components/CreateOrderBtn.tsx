'use client';

import Button from "@/components/ui/Button";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
// ✅ Importación corregida para el tipo CartItem
import { CartItem } from "@/context/CartContext"; 

// 🎯 Interfaz de props ajustada para solo recibir cartItems
interface CreateOrderBtnProps {
    cartItems: CartItem[];
}

const CreateOrderBtn = ({ cartItems }: CreateOrderBtnProps) => {
    const router = useRouter();
    const { user } = useAuth0();

    const handleCreateOrder = () => {
        if (!user) {
            toast.error("Debes iniciar sesión para continuar.");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("El carrito está vacío.");
            return;
        }
        
        router.push('/checkout');
    };

    return (
        <Button 
            onClick={handleCreateOrder} 
            className="text-white bg-daily-menu-500 hover:bg-daily-menu-600"
        >
            Ir al Checkout
        </Button>
    );
};

export default CreateOrderBtn;
