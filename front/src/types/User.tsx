// types/User.ts

export type Diet =
  | "general"
  | "vegetariano"
  | "celiaco"
  | "vegano"
  | "diabetico";
export type Roles = "user" | "admin" | "banned";

export interface IUser {
  id: string;
  email: string;
  name?: string;
  password?: string;
  address?: string;
  phone?: number;
  diet?: Diet;
  birthday?: Date;
  roles?: Roles;
  isSuscribed?: boolean;
}
