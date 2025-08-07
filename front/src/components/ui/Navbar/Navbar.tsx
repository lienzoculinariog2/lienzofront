// src/components/Navbar/Navbar.tsx
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { navbarLinks } from "@/constants/Navbar";

const isUserLogged = false;

export default function Navbar() {
return (
    <div className="bg-primary-background-500">

      {/* Tu navbar sin el borde de abajo */}
    <nav className="text-secondary-txt-400 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-center items-center">
        
          {/* Todos los links están juntos y centrados */}
        <ul className="flex items-center space-x-6">
            <li>
            <Link
                href="/"
                className="uppercase font-semibold text-sm hover:text-primary-txt-100 transition-colors"
            >
                Home
            </Link>
            </li>
            
            {navbarLinks.map((item) => (
            <NavbarItem
                key={item.label}
                label={item.label}
                href={item.href}
            />
            ))}
            
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
    <div className="h-1 w-full bg-gradient-to-r from-secondary-background-900 to-secondary-txt-400"></div>
    </div>
);
}