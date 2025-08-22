// src/components/Navbar/Navbar.tsx
"use client";
import NavbarItem from "./NavbarItem";
import { navbarLinks } from "@/constants/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Navbar() {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();

  return (
    // Usa tus clases de fondo y texto originales, y el contenedor central
    <div className="bg-gradient-to-t from-primary-background-400 via-primary-background-500 to-primary-background-400 text-secondary-txt-400">
      <nav className="shadow-md">
        <div className="container mx-auto px-4 py-3">
          {/* Este div usa `justify-between` para empujar los elementos a los extremos */}
          <div className="flex justify-between items-center">
            {/* Contenedor de los links principales, a la izquierda */}
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <ul className="flex items-center space-x-6">
                {navbarLinks.map((item) => {
                  // Oculta el link de Perfil si el usuario no está autenticado
                  if (item.href === "/profile" && !isAuthenticated) {
                    return null;
                  }
                  if (item.href === "/adminDashboard" && !isAuthenticated) {
                    return null;
                  }
                  if (item.href === "/cart" && !isAuthenticated) {
                    return null;
                  }
                  return (
                    <NavbarItem
                      key={item.label}
                      label={item.label}
                      href={item.href}
                    />
                  );
                })}
              </ul>
            )}

            {/* Renderiza el botón de login o el de usuario/logout, a la derecha */}
            {!isLoading && (
              <div>
                {!isAuthenticated ? (
                  <Button
                    onClick={() => loginWithRedirect()}
                    variant="dark"
                    className="border border-secondary-txt-600 rounded-lg px-3 py-1.5 text-sm hover:animate-pulse"
                  >
                    🔑 Iniciar sesión
                  </Button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold">{user?.name}</span>
                    {user?.picture && (
                      <Image
                        src={user.picture}
                        alt="User profile"
                        className="w-8 h-8 rounded-full"
                        width={32}
                        height={32}
                      />
                    )}
                    <Button
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      variant="dark"
                      // Mantenemos el estilo de botón para cerrar sesión
                      className="border border-secondary-txt-600 rounded-lg px-3 py-1.5 text-sm hover:animate-pulse"
                    >
                      Cerrar sesión 🔒
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* La línea fina en la parte inferior */}
      <div className="w-full h-[2px] bg-primary-background-200 animate-pulse"></div>
    </div>
  );
}
