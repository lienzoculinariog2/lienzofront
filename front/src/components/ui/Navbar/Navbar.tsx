// src/components/Navbar/Navbar.tsx
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { navbarLinks } from "@/constants/Navbar";

// Esta lógica cambiará cuando implementes la autenticación
const isUserLogged = false; 

export default function Navbar() {
return (
    <nav className="bg-primary-background-900 text-secondary-txt-400 shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Lado Izquierdo: Botón de Home */}
        <Link href="/" className="bg-primary-background-500 text-primary-txt-100 uppercase font-bold px-4 py-2 rounded-md hover:bg-primary-background-600 transition-colors">
            Home
        </Link>
        
        {/* Centro: Links de Navegación */}
        <ul className="flex items-center space-x-6">
        {navbarLinks.map((item) => (
            <NavbarItem 
            key={item.label}
            label={item.label}
            href={item.href}
            />
        ))}

          {/* Link condicional para Iniciar sesión */}
        {!isUserLogged && (
            <li>
            <Link
                href="/iniciar-sesion"
                className="uppercase font-semibold text-sm hover:text-primary-txt-100 transition-colors"
            >
                Iniciar sesión
            </Link>
            </li>
        )}
        </ul>
    </div>
    </nav>
);
}
