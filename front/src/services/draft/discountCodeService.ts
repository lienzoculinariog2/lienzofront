import { ICreateDiscountCodeDto, IDiscountCode } from "@/types/DiscountCode";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const discountCodeService = {
  /**
   * Crea un nuevo código de descuento.
   * @param payload Los datos del nuevo código.
   */
  async create(payload: ICreateDiscountCodeDto) {
    return axios.post(`${BASE_URL}/discount-codes`, payload);
  },
  /**
   * Obtiene todos los códigos de descuento, con soporte para filtros.
   * @param filters Opcional. Los filtros para la búsqueda (código parcial y estado activo).
   * @returns Una promesa que resuelve a un array de IDiscountCode.
   */
  async getAll(
    filters: { partialCode?: string; isActive?: boolean } = {}
  ): Promise<IDiscountCode[]> {
    const params = {
      partialCode: filters.partialCode,
      isActive: filters.isActive !== undefined ? filters.isActive : undefined,
    };
    const { data } = await axios.get(`${BASE_URL}/discount-codes`, { params });
    return data;
  },
  /**
   * Obtiene un código de descuento por su código único.
   * @param code El código de descuento.
   * @returns Una promesa que resuelve a un objeto IDiscountCode.
   */
  async getByCode(code: string): Promise<IDiscountCode> {
    const { data } = await axios.get(`${BASE_URL}/discount-codes/${code}`);
    return data;
  },
  /**
   * Actualiza un código de descuento existente usando PUT.
   * @param id El ID del código de descuento.
   * @param payload Los datos a actualizar.
   */
  async update(id: string, payload: Partial<Omit<IDiscountCode, "id">>) {
    return axios.put(`${BASE_URL}/discount-codes/${id}`, payload);
  },
  /**
   * Inactiva un código de descuento.
   * @param id El ID del código a inactivar.
   */
  async inactivate(id: string) {
    return axios.put(`${BASE_URL}/discount-codes/inactivate/${id}`, {});
  },
  /**
   * Activa un código de descuento.
   * @param id El ID del código a activar.
   */
  async activate(id: string) {
    return axios.put(`${BASE_URL}/discount-codes/activate/${id}`, {});
  },
};
