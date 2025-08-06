// src/components/Navbar/Navbar.tsx
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { navbarLinks } from "@/constants/Navbar";

const isUserLogged = false; 

export default function Navbar() {
return (
    <nav className="bg-primary-background-900 text-secondary-txt-400 shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        
        {/* Todos los links están juntos y centrados */}
        <ul className="flex items-center space-x-6">
          {/* El enlace de Home ahora es un item más de la lista */}
        <li>
            <Link 
            href="/" 
            className="uppercase font-semibold text-sm hover:text-primary-txt-100 transition-colors"
            >
            Home
            </Link>
        </li>
        
          {/* Los demás links */}
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