"use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

export function PaymentStatus() {
  // const searchParams = useSearchParams();
  // const [status, setStatus] = useState<"success" | "error" | null>(null);

  // useEffect(() => {
  //   const paymentStatus = searchParams.get("redirect_status");
  //   if (paymentStatus === "succeeded") setStatus("success");
  //   if (paymentStatus === "failed") setStatus("error");
  // }, [searchParams]);

  return (
    <div className="mb-6">
      {/* {status === "success" && (
        <div className="bg-green-100 text-green-800 p-4 rounded">
          Pago exitoso. ¡Gracias por tu compra!
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-100 text-red-800 p-4 rounded">
          Hubo un problema con el pago. Por favor, intentá nuevamente.
        </div>
      )} */}
    </div>
  );
}
