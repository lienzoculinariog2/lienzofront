import { IUser, Diet, IsAdmin } from "@/types/User";

const validDiets: Diet[] = ["general", "vegetariano", "celiaco", "fitness"];
const validRoles: IsAdmin[] = ["customer", "admin"];

export function validateUser(data: Partial<IUser>) {
  const errors: Record<string, string> = {};

  // Nombre
  if (!data.name || data.name.trim() === "") {
    errors.name = "El nombre es obligatorio";
  }

  // Email
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "El correo electrónico es obligatorio y debe ser válido";
  }

  // Contraseña
  if (!data.password || data.password.trim().length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  // Dirección
  if (!data.address || data.address.trim() === "") {
    errors.address = "La dirección es obligatoria";
  }

  // Teléfono
  if (
    data.phone === undefined ||
    isNaN(Number(data.phone)) ||
    String(data.phone).length < 7
  ) {
    errors.phone = "El teléfono debe ser un número válido";
  }

  // Dieta
  if (!data.diet || !validDiets.includes(data.diet)) {
    errors.diet = "La dieta debe ser una opción válida";
  }

  // Fecha de nacimiento
  if (!data.birthday || isNaN(new Date(data.birthday).getTime())) {
    errors.birthday = "La fecha de nacimiento es obligatoria y debe ser válida";
  }

  // Rol
  if (!data.isAdmin || !validRoles.includes(data.isAdmin)) {
    errors.isAdmin = "El rol debe ser 'customer' o 'admin'";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
