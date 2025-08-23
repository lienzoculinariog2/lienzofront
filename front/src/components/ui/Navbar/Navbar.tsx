// "use client";
// import { useEffect, useState } from "react";
// import NavbarItem from "./NavbarItem";
// import { navbarLinks } from "@/constants/Navbar";
// import { useAuth0 } from "@auth0/auth0-react";
// import Button from "@/components/ui/Button";
// import Image from "next/image";
// import { IUser } from "@/types/User";
// import { userService } from "@/services/draft/userService";

// export default function Navbar() {
//   const { user, isAuthenticated, loginWithRedirect, logout, isLoading, getAccessTokenSilently } =
//     useAuth0();

//   const [currentUser, setCurrentUser] = useState<IUser | null>(null);

//   // 🔹 Obtener usuario del backend para acceder al rol
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!isAuthenticated || !user?.sub) return;

//       try {
//         const token = await getAccessTokenSilently();
//         const fetchedUser = await userService.findOne(user.sub, token);
//         setCurrentUser(fetchedUser);
//       } catch (err) {
//         console.error("Error al obtener usuario del backend:", err);
//       }
//     };

//     void fetchUser();
//   }, [isAuthenticated, user?.sub, getAccessTokenSilently]);

//   return (
//     <div className="bg-gradient-to-t from-primary-background-400 via-primary-background-500 to-primary-background-400 text-secondary-txt-400">
//       <nav className="shadow-md">
//         <div className="container px-4 py-3 mx-auto">
//           <div className="flex items-center justify-between">
//             {isLoading ? (
//               <p>Cargando...</p>
//             ) : (
//               <ul className="flex items-center space-x-6">
//                 {navbarLinks.map((item) => {
//                   // Ocultar links de perfil y carrito si no está autenticado
//                   if (!isAuthenticated && (item.href === "/profile" || item.href === "/cart")) {
//                     return null;
//                   }

//                   // Mostrar adminDashboard solo si el usuario es admin
//                   if (item.href === "/adminDashboard" && currentUser?.roles !== "admin") {
//                     return null;
//                   }

//                   return <NavbarItem key={item.label} label={item.label} href={item.href} />;
//                 })}
//               </ul>
//             )}

//             {/* Botón de login/logout */}
//             {!isLoading && (
//               <div>
//                 {!isAuthenticated ? (
//                   <Button
//                     onClick={() => loginWithRedirect()}
//                     variant="dark"
//                     className="border border-secondary-txt-600 rounded-lg px-3 py-1.5 text-sm hover:animate-pulse"
//                   >
//                     🔑 Iniciar sesión
//                   </Button>
//                 ) : (
//                   <div className="flex items-center space-x-4">
//                     <span className="text-sm font-semibold">{user?.name}</span>
//                     {user?.picture && (
//                       <Image
//                         src={user.picture}
//                         alt="User profile"
//                         className="w-8 h-8 rounded-full"
//                         width={32}
//                         height={32}
//                       />
//                     )}
//                     <Button
//                       onClick={() =>
//                         logout({
//                           logoutParams: { returnTo: window.location.origin },
//                         })
//                       }
//                       variant="dark"
//                       className="border border-secondary-txt-600 rounded-lg px-3 py-1.5 text-sm hover:animate-pulse"
//                     >
//                       Cerrar sesión 🔒
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       <div className="w-full h-[2px] bg-primary-background-200 animate-pulse"></div>
//     </div>
//   );
// }

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
          <div className="container relative flex items-center justify-center h-16 mx-auto">
            {/* Links centrados */}
            <ul className="flex items-center space-x-6 font-black uppercase">
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
            {user?.email && (
              <span className="text-sm font-medium text-secondary-txt-400 truncate max-w-[180px]">
                {user.email}
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



