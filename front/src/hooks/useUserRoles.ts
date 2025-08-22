import { useAuth0 } from "@auth0/auth0-react";

const namespace = "https://lienzofront.vercel.app";

export const useUserRoles = () => {
  const { user, isAuthenticated } = useAuth0();
  const roles = isAuthenticated && user ? user[namespace + "/roles"] || [] : [];

  return {
    roles,
    isAdmin: roles.includes("admin"),
    isBanned: roles.includes("banned"),
    isUser: roles.includes("user"),
  };
};
