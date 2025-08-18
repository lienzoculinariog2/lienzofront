"use client";

import React from "react";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import CartPageContent from "./CartPageContent";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartPageContent />
    </ProtectedRoute>
  );
}
