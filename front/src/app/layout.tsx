import "../styles/globals.css";
import { Inter } from "next/font/google";
import Auth0ProviderWithNavigate from "@/components/ui/Auth0ProviderWithNavigate";
import UserSync from "@/components/ui/auth/UserSync";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Auth0ProviderWithNavigate>
          <UserSync />
          {children}
          <ToastContainer position="bottom-right" />
        </Auth0ProviderWithNavigate>
      </body>
    </html>
  );
}
