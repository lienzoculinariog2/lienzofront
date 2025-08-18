import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignora los errores de ESLint durante la compilación
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configuración de optimización de imágenes de Next.js
  images: {
    // remotePatterns es la forma moderna de permitir dominios externos
    remotePatterns: [
      // Tu configuración existente para ImageKit
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      // Tu configuración existente para Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      // Esta es la configuración que agregamos para las imágenes de perfil de Auth0
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        port: "", // No es necesario especificar el puerto aquí
        pathname: "/avatar/**", // Permitimos todas las rutas que empiecen con /avatar/
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
