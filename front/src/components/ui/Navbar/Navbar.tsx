"use client";
import { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { navbarLinks } from "@/constants/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import { IUser } from "@/types/User";
import { userService } from "@/services/draft/userService";
import { GrLogin, GrLogout } from "react-icons/gr";

export default function Navbar() {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated || !user?.sub) return;
      try {
        const token = await getAccessTokenSilently();
        const fetchedUser = await userService.findOne(user.sub, token);
        setCurrentUser(fetchedUser);
      } catch (err) {
        console.error("Error al obtener usuario del backend:", err);
      }
    };
    void fetchUser();
  }, [isAuthenticated, user?.sub, getAccessTokenSilently]);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full font-sans ">
        {/* Navbar principal */}
        <nav className="bg-primary-background-900">
          <div className="container relative flex items-center justify-start h-20 mx-auto">
            {/* Links centrados */}
            <ul className="flex items-center space-x-6 font-black uppercase">
              {!isLoading && (
                <Image
                  src="https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/2145c662-3775-48b0-aba7-55d032195e32-removebg-preview.png?updatedAt=1754512253493"
                  alt="Logo de Lienzo"
                  width={90}
                  height={45}
                  className="filter invert"
                />
              )}
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                navbarLinks.map((item) => {
                  if (
                    !isAuthenticated &&
                    (item.href === "/profile" || item.href === "/cart")
                  )
                    return null;
                  if (
                    item.href === "/adminDashboard" &&
                    currentUser?.roles !== "admin"
                  )
                    return null;
                  return (
                    <NavbarItem
                      key={item.label}
                      label={item.label}
                      href={item.href}
                    />
                  );
                })
              )}
            </ul>
          </div>

          {/* Línea inferior */}
          <div className="w-full h-[2px] bg-primary-background-200 animate-pulse"></div>
        </nav>

        {/* Usuario flotante o login, sin fondo */}
        <div className="absolute top-0 bottom-0 flex items-center right-4">
          {!isLoading && !isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="flex items-center gap-2 text-sm font-medium text-secondary-txt-400 hover:text-white"
            >
              <GrLogin className="w-5 h-5" />
              Iniciar sesión
            </button>
          )}

          {!isLoading && isAuthenticated && (
            <div className="flex items-center gap-3">
              {currentUser?.name && (
                <span className="text-sm font-medium text-secondary-txt-400 truncate max-w-[180px]">
                  {currentUser.name || user?.email}
                </span>
              )}

              {user?.picture && (
                <Image
                  src={user.picture}
                  alt="User profile"
                  className="object-cover w-10 h-10 border-2 border-white rounded-full shadow-md"
                  width={40}
                  height={40}
                />
              )}

              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="flex items-center gap-1 text-sm font-medium text-secondary-txt-400 hover:text-white"
              >
                <GrLogout className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Padding para que el contenido no quede tapado */}
      <div className="pt-20" />
    </>
  );
}
