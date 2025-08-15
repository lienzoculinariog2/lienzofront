"use client";

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const router = useRouter();

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

  // Manejar el caso en que las variables de entorno no estén definidas
  if (!domain || !clientId || !audience) { // 👈 Se agregó la validación para 'audience'
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
        <p className="font-bold">Error de Configuración</p>
        <p>
          Las variables de entorno de Auth0 no están definidas. Por favor, asegúrate de que
          `NEXT_PUBLIC_AUTH0_DOMAIN`, `NEXT_PUBLIC_AUTH0_CLIENT_ID` y `NEXT_PUBLIC_AUTH0_AUDIENCE`
          están configuradas en tu archivo `.env.local` y reinicia el servidor.
        </p>
      </div>
    );
  }

  const onRedirectCallback = (appState?: { returnTo?: string }) => {
    console.log("Redirecting after login...", appState);
    router.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : '',
        audience: audience, // 👈 Se agregó la propiedad 'audience'
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;




