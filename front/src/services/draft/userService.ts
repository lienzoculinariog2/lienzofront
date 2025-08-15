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
      console.log("Intentando OBTENER el usuario en:", url);
      const response = await axios.get<IUser>(url, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      console.log("Usuario encontrado con éxito.");
      return response.data;

    } catch (error) {
      // 2. Si el error es un 404, significa que el usuario no existe en nuestra BD
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("Usuario no encontrado (404). Procediendo a CREARLO en nuestra base de datos.");
        
        // 3. Llamamos a la función de CREAR el usuario
        // Pasamos el email y el ID (sub) para que el backend tenga los datos iniciales
        const newUser = await this.create({ id: userId, email }, accessToken);
        return newUser;
      }
      
      // 4. Si es otro tipo de error (ej: 500, error de red), lo relanzamos
      console.error("Error inesperado en getOrCreateUser:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo usuario en el backend.
   * Este método será llamado por getOrCreateUser si el usuario no existe.
   */
  async create(userData: { id: string; email: string }, accessToken: string): Promise<IUser> {
    const url = `${API_URL}/users`;
    console.log("Intentando CREAR un nuevo usuario en:", url, "con data:", userData);
    
    try {
      // NOTA: Tu @Post() en el backend no tiene @UseGuards, pero si lo tuviera,
      // necesitarías el token aquí también. Lo incluimos por si acaso.
      const response = await axios.post<IUser>(url, userData, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      console.log("Usuario creado con éxito:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw error;
    }
  }

  /**
   * Actualiza los datos de un perfil de usuario.
   */
  async update(userId: string, data: Partial<IUser>, accessToken: string): Promise<IUser> {
    const encodedUserId = encodeURIComponent(userId);
    const url = `${API_URL}/users/${encodedUserId}`;
    
    try {
      // Usamos PATCH para coincidir con tu @Patch(':id') en el backend.
      const response = await axios.patch<IUser>(url, data, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }
}

// Exportamos una instancia de la clase para usarla como un singleton
export const userService = new UserService();






