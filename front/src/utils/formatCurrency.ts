// src/utils/formatCurrency.ts

/**
 * Formatea un número como una cadena de moneda.
 * @param amount - El número a formatear.
 * @param currency - El código de moneda (ej. 'USD', 'EUR').
 * @returns La cadena de moneda formateada.
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}