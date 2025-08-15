// types/User.ts

export type Diet = "general" | "vegetariano" | "celiaco" | "fitness";
export type IsAdmin = "customer" | "admin";

export interface IUser {
  // --- Campos Obligatorios ---
  // Estos son los únicos campos que garantizamos que existirán siempre.
  id: string;
  email: string;

  // --- Campos Opcionales del Perfil ---
  // El '?' indica que estos campos pueden no estar presentes,
  // especialmente para un usuario recién creado.
  name?: string;
  password?: string; // Auth0 maneja la contraseña real.
  address?: string;
  phone?: number;
  diet?: Diet;
  birthday?: Date;
  isAdmin?: IsAdmin;
}
