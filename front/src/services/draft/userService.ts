// src/services/draft/userService.ts

import axios from "axios";
import { IUser } from "@/types/User";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Datos ficticios (mockeados) para usar mientras el backend no está listo.
const mockUsers: IUser[] = [
  {
    id: "auth0|689b7607b514312f414ccbde!!!!", // Importante: Este ID debe coincidir con el 'sub' de un usuario mock de Auth0.
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashed_password",
    address: "123 Mock Street",
    phone: 1234567890,
    diet: "general",
    birthday: new Date("1990-01-01"),
    isAdmin: "customer",
  },
];

export const userService = {
  // getById con lógica mockeada.
  // Tu lógica original para getById() está comentada abajo.
  async getById(id: string): Promise<IUser> {
    // Devuelve un usuario temporal basado en el sub de Auth0
    console.log(`Fetching user profile for id: ${id}`);
    return Promise.resolve({
      id, // ✅ sub real de Auth0
      name: "", // se puede completar luego con el formulario
      email: "", // se puede completar luego con el formulario
      password: "",
      address: "asdasd",
      phone: 0,
      diet: "general",
      birthday: new Date(),
      isAdmin: "customer",
    });
  },
  // update con lógica mockeada.
  // Tu lógica original para update() está comentada abajo.
  async update(id: string, payload: Partial<Omit<IUser, "id">>) {
    // ---- LÓGICA ORIGINAL PARA CUANDO EL BACKEND ESTÉ LISTO (COMENTADA) ----
    /*
    return axios.patch(`${BASE_URL}/users/${id}`, payload);
    */

    // ---- LÓGICA DE SIMULACIÓN (MOCKEADA) PARA TRABAJAR AHORA ----
    console.log(`Mocking update for user: ${id}. Updating mock data.`);
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...payload };
      console.log("Mock user updated:", mockUsers[userIndex]);
      return Promise.resolve({ data: mockUsers[userIndex] });
    }
    return Promise.reject(new Error("Could not update user (mock)"));
  },

  // Puedes dejar las funciones getAll y remove intactas si no necesitas mockearlas por ahora.
  // Esto es un ejemplo de cómo se verían si el backend ya estuviera listo.
  async getAll(): Promise<IUser[]> {
    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
  },

  async remove(id: string) {
    return axios.delete(`${BASE_URL}/users/${id}`);
  },
};
