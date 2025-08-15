// src/services/draft/userService.ts

import axios from 'axios';
import { IUser } from '@/types/User';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class UserService {
  /**
   * Obtiene un usuario por su ID. Si no lo encuentra (error 404),
   * lo crea y luego lo devuelve.
   */
  async getOrCreateUser(userId: string, email: string, accessToken: string): Promise<IUser> {
    const encodedUserId = encodeURIComponent(userId);
    const url = `${API_URL}/users/${encodedUserId}`;

    try {
      // 1. Intentamos OBTENER el usuario
      const response = await axios.get<IUser>(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data;

    } catch (error) {
      // 2. Si el error es un 404, lo creamos
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        const newUser = await this.create({ id: userId, email }, accessToken);
        return newUser;
      }
      
      // 3. Si es otro tipo de error, lo relanzamos
      throw error;
    }
  }

  // El método 'create' es usado internamente por 'getOrCreateUser'
  private async create(userData: { id: string; email: string }, accessToken: string): Promise<IUser> {
    const url = `${API_URL}/users`;
    const response = await axios.post<IUser>(url, userData, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return response.data;
  }

  // El método 'update' se usará en la página de perfil
  async update(userId: string, data: Partial<IUser>, accessToken: string): Promise<IUser> {
    const encodedUserId = encodeURIComponent(userId);
    const url = `${API_URL}/users/${encodedUserId}`;
    const response = await axios.patch<IUser>(url, data, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return response.data;
  }
}

export const userService = new UserService();






