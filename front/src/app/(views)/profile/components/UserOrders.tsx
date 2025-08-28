"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/Order";
import Spinner from "@/components/ui/Spinner";
import { orderService } from "@/services/draft/OrderService";

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

        // 🔹 Filtrar solo órdenes que estén pagadas
        const paidOrders = data.filter(
          (order: Order) => order.isPaid || order.paymentStatus === "succeeded"
        );

        // 🔹 Ordenar de más reciente a más antigua
        const sortedOrders = [...paidOrders].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

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
    return <p className="text-gray-500">No tienes órdenes pagadas aún.</p>;
  }

  // 🔹 Traducciones SOLO para estados de orden (admin)
  const statusTranslations: Record<string, string> = {
    pending: "Pendiente de envio",
    processing: "Orden enviada",
    completed: "Orden entregada",
    cancelled: "Cancelada",
    failed: "Fallida",
  };

  if (orders.length === 0) {
    return <p className="text-white">No tienes pagos completados aún.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold text-primary-txt-500">
        Mis Órdenes
      </h2>
      <div className="space-y-6">
        {orders
          .filter((order) => order.status === "completed")
          .map((order) => (
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
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
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
                        {detail.productId} (x{detail.quantity})
                      </span>
                      <span className="font-medium text-primary-txt-100">
                        $
                        {(Number(detail.unitPrice) * detail.quantity).toFixed(
                          2
                        )}
                      </span>
                    </li>
                  ))}

                  {/* Total al final */}
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
            </div>
          ))}
      </div>
    </div>
  );
}
