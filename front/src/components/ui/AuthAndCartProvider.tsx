"use client";

import React, { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import Auth0ProviderWithNavigate from "./Auth0ProviderWithNavigate";

interface Props {
  children: ReactNode;
}

const AuthAndCartProvider = ({ children }: Props) => {
  return (
    <Auth0ProviderWithNavigate>
      <CartProvider>
        {children}
      </CartProvider>
    </Auth0ProviderWithNavigate>
  );
};

export default AuthAndCartProvider;