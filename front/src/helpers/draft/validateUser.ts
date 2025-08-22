import { IUser } from "@/types/User";

export function validateUser(data: Partial<IUser>) {
  const errors: Record<string, string> = {};

  // Nombre
  if (!data.name || data.name.trim() === "") {
    errors.name = "El nombre es obligatorio";
  }

  // Email
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email inválido";
  }

  // Contraseña
  if (!data.password || data.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  // Dirección
  if (!data.address || data.address.trim() === "") {
    errors.address = "La dirección es obligatoria";
  }

  // Teléfono
  if (!data.phone || isNaN(Number(data.phone))) {
    errors.phone = "Teléfono inválido";
  }

  // Fecha de nacimiento
  if (!data.birthday || isNaN(new Date(data.birthday).getTime())) {
    errors.birthday = "Fecha de nacimiento inválida";
  }

  // Dieta
  const validDiets = ["general", "vegetariano", "celiaco", "fitness"];
  if (!data.diet || !validDiets.includes(data.diet)) {
    errors.diet = "Tipo de dieta inválido";
  }

  // Rol
  const validRoles = ["customer", "admin"];
  if (!data.roles || !validRoles.includes(data.roles)) {
    errors.isAdmin = "Rol inválido";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
