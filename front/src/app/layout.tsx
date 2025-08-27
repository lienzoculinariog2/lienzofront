import "../styles/globals.css";
import { Inter } from "next/font/google";
import Auth0ProviderWithNavigate from "@/components/ui/Auth0ProviderWithNavigate";
import UserSync from "@/components/ui/auth/UserSync";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "@/context/CartContext";
import AuthAndCartProvider from "@/components/ui/AuthAndCartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lienzo Culinario",
  description: "Aplicación protegida con autenticación",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="es">
      <body className={inter.className}>
        {/* ✅ Envuelve toda la lógica de proveedores en un solo componente */}
        <AuthAndCartProvider>
          {children}
          <UserSync /> {/* ✅ Coloca UserSync dentro de los proveedores */}
        <ToastContainer position="bottom-right" /> {/* ✅ El ToastContainer va por fuera, al final del body */}
        </AuthAndCartProvider>
      </body>
    </html>
  );
}
