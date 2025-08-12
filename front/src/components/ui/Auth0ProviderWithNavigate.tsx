// src/components/Auth0ProviderWithNavigate/Auth0ProviderWithNavigate.tsx
"use client";

import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from 'next/navigation';

interface Auth0ProviderWithNavigateProps {
children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  // CORRECTO: Los hooks se deben llamar al inicio del componente.
  // Mover useRouter aquí asegura que se llama en cada renderizado.
const router = useRouter();

const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  // Manejar el caso en que las variables de entorno no estén definidas
if (!domain || !clientId) {
    return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
        <p className="font-bold">Error de Configuración</p>
        <p>
        Las variables de entorno de Auth0 no están definidas. Por favor, asegúrate de que
        `NEXT_PUBLIC_AUTH0_DOMAIN` y `NEXT_PUBLIC_AUTH0_CLIENT_ID` están configuradas en tu
        archivo `.env.local` y reinicia el servidor.
        </p>
    </div>
    );
}

const onRedirectCallback = (appState?: { returnTo?: string }) => {
    router.push(appState?.returnTo || window.location.pathname);
};

return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    onRedirectCallback={onRedirectCallback}
    authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : '',
    }}
    >
    {children}
    </Auth0Provider>
);
};

export default Auth0ProviderWithNavigate;



