'use client';

import Button from "@/components/ui/Button";
import React from "react"; // Ya no es necesario useState
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { CartItem } from "@/hooks/useCart";

// 🎯 CORRECCIÓN: Quitamos las props que no se usan
interface CreateOrderBtnProps {
    cartItems: CartItem[];
}

// 🎯 CORRECCIÓN: Quitamos las variables que no se usan
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
            className="bg-daily-menu-500 hover:bg-daily-menu-600 text-white"
        >
            Ir al Checkout
        </Button>
    );
};

export default CreateOrderBtn;
