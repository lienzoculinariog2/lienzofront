// src/constants/navbarLinks.ts
import { NavbarItemProps } from "@/components/ui/Navbar/NavbarItem";
import { Routes } from "@/routes";

export const navbarLinks: NavbarItemProps[] = [
{
    label: "Página principal",
    href: Routes.home,
},
{
    label: "Paleta de sabores",
    href: Routes.categories,
},
{
    label: "Carrito de compras",
    href: Routes.cart,
},
{
    label: "Perfil",
    href: Routes.profile,
},
];