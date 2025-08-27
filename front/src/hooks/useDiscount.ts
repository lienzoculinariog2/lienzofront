'use client';

import { useState, useCallback } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

export interface DiscountDetails {
  percentage: number;
  code: string;
}

export function useDiscount() {
  const [discount, setDiscount] = useState<DiscountDetails | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateDiscountCode = useCallback(async (code: string) => {
    setIsLoading(true);
    setDiscountError(null);
    setDiscount(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setDiscountError("API URL is not defined.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/discount-codes/${code}`);
      setDiscount({ percentage: response.data.percentage, code: response.data.code });
      toast.success(`Código de descuento "${code}" aplicado con éxito!`);
    } catch (error) {
      // 🎯 CORRECCIÓN: Usamos la variable 'error' para obtener un mensaje más específico
      if (isAxiosError(error) && error.response) {
        setDiscountError(error.response.data.message || "Error al validar el código.");
        toast.error(error.response.data.message || "Error al validar el código.");
      } else {
        setDiscountError("Código de descuento no válido o expirado.");
        toast.error("Código de descuento no válido.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { discount, discountError, isLoading, validateDiscountCode };
}