// src/components/AdminOrdersPage.tsx
"use client";

import { useEffect, useState } from "react";
import { adminOrderService } from "@/services/AdminOrderService";
import { Order } from "@/types/Order";

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  shipped: "Enviado",
  delivered: "Entregado",
  canceled: "Cancelado",
};

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await adminOrderService.getAll();
        setOrders(allOrders);
      } catch (error) {
        console.error("Error al traer órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      const updated = await adminOrderService.updateStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  if (loading) return <p className="text-gray-400">Cargando órdenes...</p>;

  return (
    <div className="container min-h-screen p-8 mx-auto text-primary-txt-500">
      <header className="mb-10 text-center">
        <h1 className="my-6 text-3xl font-bold border-b border-gray-600">
          Gestión de Órdenes
        </h1>
        <p className="mt-2 text-gray-400">
          Administra las órdenes de los usuarios y actualiza su estado de envío.
        </p>
      </header>

      {orders.length === 0 ? (
        <p className="text-gray-400">No hay órdenes registradas.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 shadow-lg bg-black/40 rounded-xl"
            >
              {/* Encabezado */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-700">
                <div>
                  <h3 className="text-lg font-bold">
                    Orden #{order.id.slice(0, 6)}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Usuario: {order.user?.name || "Desconocido"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Fecha: {new Date(order.date).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      order.isPaid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {order.isPaid ? "Pagada" : "Pendiente de pago"}
                  </p>
                  <p className="mt-1 text-gray-300">
                    Estado envío:{" "}
                    <span className="font-bold">
                      {statusLabels[order.statusOrder] || order.statusOrder}
                    </span>
                  </p>

                  {/* Select para cambiar estado */}
                  <select
                    value={order.statusOrder}
                    onChange={(e) =>
                      handleChangeStatus(order.id, e.target.value)
                    }
                    className="px-3 py-1 mt-2 text-white bg-gray-800 border border-gray-600 rounded-lg"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregado</option>
                    <option value="canceled">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Detalle de productos */}
              <div className="space-y-2">
                {order.orderDetails?.map((detail) => (
                  <div
                    key={detail.id}
                    className="flex justify-between pb-2 border-b border-gray-700"
                  >
                    <span>
                      {detail.product?.name} x{detail.quantity}
                    </span>
                    <span>
                      ${(detail.unitPrice * detail.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 font-bold text-right text-green-400">
                Total: ${order.totalAmount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
