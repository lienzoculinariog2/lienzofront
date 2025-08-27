'use client';

import { useState } from "react";
import Button from "@/components/ui/Button";

// 🎯 CORRECCIÓN: Quitamos la importación del hook
// import { useDiscount } from "@/hooks/useDiscount"; 

interface DiscountInputProps {
  onApply: (code: string) => void;
  isLoading: boolean;
}

export function DiscountInput({ onApply, isLoading }: DiscountInputProps) {
  const [code, setCode] = useState("");

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código de descuento"
        className="flex-1 p-2 border rounded-md"
        disabled={isLoading}
      />
      <Button
        onClick={() => onApply(code)}
        disabled={!code || isLoading}
        variant="dailyMenu"
      >
        {isLoading ? "Aplicando..." : "Aplicar"}
      </Button>
    </div>
  );
}