// src/app/(views)/Demo/Cart/components/CreateOrderBtn.tsx
"use client";

import Button from "@/components/ui/Button";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Importa el useRouter

// Ya no se necesita importar IProduct

interface CreateOrderBtnProps {
    resetCart: () => void;
}

const CreateOrderBtn = ({ resetCart }: CreateOrderBtnProps) => {
    const router = useRouter(); // Instancia el router
    
    const handleCreateOrder = () => {
        resetCart();
        toast.success("Orden creada (demo): El carrito ha sido vaciado.");
        
        // Añadimos la redirección después de un breve delay
        setTimeout(() => {
            router.push('/Demo');
        }, 1500); // Redirige a la página de productos de la demo
    };

    return (
        <Button 
            onClick={handleCreateOrder} 
            className="bg-daily-menu-500 hover:bg-daily-menu-600 text-white"
        >
        Crear Orden (Demo)
        </Button>
    );
};

export default CreateOrderBtn;