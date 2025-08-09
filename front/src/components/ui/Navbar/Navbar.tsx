// src/components/Navbar/Navbar.tsx
import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { navbarLinks } from "@/constants/Navbar";

const isUserLogged = false;

export default function Navbar() {
return (
    <div className="bg-primary-background-500">

      {/* Tu navbar sin el borde de abajo */}
    <nav className="shadow-md text-secondary-txt-400">
        <div className="container flex items-center justify-center px-4 py-3 mx-auto">
        
          {/* Todos los links están juntos y centrados */}
        <ul className="flex items-center space-x-6">
            
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
                className="text-sm font-semibold uppercase transition-colors hover:text-primary-txt-100"
                >
                Iniciar sesión
                </Link>
            </li>
            )}
        </ul>
        </div>
    </nav>
    <div className="w-full h-[2px] bg-secondary-txt-600 "></div>
    </div>
);
}