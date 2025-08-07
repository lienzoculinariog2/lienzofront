export type Diet = "general" | "vegetariano" | "celiaco" | "fitness";
export type IsAdmin = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: number;
  diet: Diet;
  birthday: Date;
  isAdmin: IsAdmin;
}
