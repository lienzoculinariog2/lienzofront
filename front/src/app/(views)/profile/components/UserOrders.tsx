"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/Order";
import Spinner from "@/components/ui/Spinner";
import { orderService } from "@/services/draft/OrderService";
// import Button from "@/components/ui/Button";

interface Props {
  userId: string;
}

export function UserOrders({ userId }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchOrders = async () => {
        try {
            const data = await orderService.getUserOrders(userId);
            // Ordena las órdenes por fecha de la más reciente a la más antigua
            const sortedOrders = [...data].reverse(); 
            setOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching user orders:", error);
        } finally {
            setLoading(false);
        }
    };

    if (userId) {
        fetchOrders();
    }
}, [userId]);

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return <p className="text-gray-500">No tienes órdenes aún.</p>;
  }

  // const handleCancelOrder = async (orderId: string) => {
  //   try {
  //     await orderService.cancelOrder(orderId);
  //     // refrescar las órdenes del usuario
  //     const updatedOrders = await orderService.getUserOrders(userId);
  //     setOrders(updatedOrders);
  //   } catch (error) {
  //     console.error("Error al cancelar la orden", error);
  //   }
  // };
  const statusTranslations: Record<string, string> = {
    pending: "Pago Pendiente",
    processing: "Pago en proceso",
    completed: "Pago Exitoso",
    cancelled: "Pago Cancelado",
    failed: "Error en el pago",
  };

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold text-primary-txt-500">
        Mis Órdenes
      </h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 transition-shadow border shadow-lg rounded-2xl bg-black/50 backdrop-blur-md border-primary-txt-800 hover:shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-primary-txt-100">
                Orden #{order.id.slice(0, 8).toUpperCase()}
              </p>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-lg capitalize
                  ${
                    order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : order.status === "processing"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : order.status === "completed"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
              >
                {statusTranslations[order.status] || order.status}
              </span>
            </div>

            {/* Info */}
            <p className="text-sm text-primary-txt-400">
              <strong>Fecha:</strong>{" "}
              {new Date(order.date).toLocaleDateString("es-UY")}
            </p>

            {/* Productos */}
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold text-primary-txt-300">
                Productos:
              </h3>
              <ul className="space-y-2">
                {order.orderDetails.map((detail) => (
                  <li
                    key={detail.id}
                    className="flex justify-between pb-2 text-sm border-b border-gray-700 last:border-0"
                  >
                    <span className="text-primary-txt-200">
                      {detail.product.name} (x{detail.quantity})
                    </span>
                    <span className="font-medium text-primary-txt-100">
                      ${(Number(detail.unitPrice) * detail.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}

                {/* Total al final, con mismo estilo que los productos */}
                <li className="flex justify-between pt-2 text-sm border-gray-700">
                  <span className="font-semibold text-primary-txt-300">
                    Total
                  </span>
                  <span className="text-lg font-bold text-primary-txt-100">
                    ${Number(order.totalAmount).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>

            {/* Botón cancelar
            {order.statusOrder === "pending" && (
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => handleCancelOrder(order.id)}
                  variant="dark"
                >
                  Cancelar orden
                </Button>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
