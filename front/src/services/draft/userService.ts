// src/services/draft/userService.ts

import axios from 'axios';
import { IUser } from '@/types/User';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class UserService {
  async getOrCreateUser(userId: string, email: string, accessToken: string): Promise<IUser> {
    const url = `${API_URL}/users`;

    try {
      const response = await axios.post<IUser>(
        url,
        { id: userId, email },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Error al crear/obtener usuario.");
    }
  }

  async findOne(userId: string, accessToken: string): Promise<IUser> {
    const encodedUserId = encodeURIComponent(userId);
    const url = `${API_URL}/users/${encodedUserId}`;

    try {
      const response = await axios.get<IUser>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Error al obtener el usuario.");
    }
  }

  async findAll(accessToken: string): Promise<IUser[]> {
    const url = `${API_URL}/users`;

    try {
      const response = await axios.get<IUser[]>(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Error al obtener la lista de usuarios.");
    }
  }

  async update(userId: string, data: Partial<IUser>, accessToken: string): Promise<IUser> {
    const encodedUserId = encodeURIComponent(userId);
    const url = `${API_URL}/users/${encodedUserId}`;

    try {
      const response = await axios.patch<IUser>(url, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Error al actualizar usuario.");
    }
  }

  async updateRole(userId: string, newRole: string, accessToken: string): Promise<IUser> {
    const encodedUserId = encodeURIComponent(userId);
    const url = `${API_URL}/users/${encodedUserId}/role`;

    try {
      const response = await axios.patch<IUser>(
        url,
        { newRole },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Error al actualizar el rol del usuario.");
    }
  }

  // 🔹 Helper centralizado para manejar errores
  private handleError(error: unknown, defaultMsg: string): Error {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return new Error("No tienes permiso para realizar esta acción.");
      }
      if (error.response?.status === 404) {
        return new Error("Usuario no encontrado.");
      }
      if (error.response?.status === 400) {
        return new Error(error.response.data?.message || "Solicitud inválida.");
      }
      return new Error(error.response?.data?.message || defaultMsg);
    }
    return new Error(defaultMsg);
  }
}

export const userService = new UserService();







