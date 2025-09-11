"use client";

import { useEffect, useRef, useState } from "react";
import { Order, IStatusOrder } from "@/types/Order";
import { orderService } from "@/services/draft/OrderService";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatCurrency = (value: string | number) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return num.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};

const statusConfig: Record<IStatusOrder, { label: string; color: string }> = {
  pending: { label: "Orden en preparación", color: "bg-[#F2B705] text-white" },
  processing: { label: "Orden enviada", color: "bg-[#D98F07] text-white" },
  completed: { label: "Orden entregada", color: "bg-[#537902] text-white" },
  cancelled: { label: "Orden cancelada", color: "bg-[#730202] text-white" },
  failed: { label: "Error en la orden", color: "bg-red-600 text-white" },
};

const PAGE_SIZE = 20;

const OrdersPage = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [visibleOrders, setVisibleOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    // cada vez que aumenta la página, agregamos más órdenes visibles
    const start = 0;
    const end = PAGE_SIZE * page;
    setVisibleOrders(allOrders.slice(start, end));
  }, [allOrders, page]);

  async function fetchOrders() {
    try {
      setLoading(true);
      const data = await orderService.getAll(); // 🔹 trae TODO
      const onlyPaid = data.filter((order: Order) => order.isPaid);
      setAllOrders(onlyPaid);
    } catch (error) {
      console.error("Error fetching orders", error);
      toast.error("Error cargando órdenes");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeStatus(orderId: string, newStatus: IStatusOrder) {
    try {
      setUpdating(orderId);
      await orderService.updateStatus(orderId, newStatus);
      toast.success(`Orden actualizada`);
      await fetchOrders(); // refrescamos todas
    } catch (error) {
      console.error("Error updating order status", error);
      toast.error("No se pudo actualizar la orden");
    } finally {
      setUpdating(null);
    }
  }

  async function handleCancel(orderId: string) {
    try {
      setUpdating(orderId);
      await orderService.cancelOrder(orderId);
      toast.success("Orden cancelada");
      await fetchOrders();
    } catch (error) {
      console.error("Error cancelando orden", error);
      toast.error("No se pudo cancelar la orden");
    } finally {
      setUpdating(null);
    }
  }

  // 🔹 Scroll infinito solo en front
  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  const nextStatus: Record<IStatusOrder, IStatusOrder | null> = {
    pending: "processing",
    processing: "completed",
    completed: null,
    cancelled: null,
    failed: null,
  };

  const renderOrderCard = (order: Order) => {
    const next = nextStatus[order.status];
    const statusCfg = statusConfig[order.status];

    return (
      <li
        key={order.id}
        className="relative overflow-hidden border border-gray-700 shadow-lg rounded-xl bg-black/70"
      >
        <div className="flex items-center justify-between px-6 py-3 bg-secondary-background-900">
          <h3 className="text-lg font-bold text-white">Orden #{order.id}</h3>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-lg capitalize border border-black/20 ${statusCfg.color}`}
          >
            {statusCfg.label}
          </span>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="grid grid-cols-1 text-sm text-gray-300 md:grid-cols-2 gap-y-2">
            <p>
              <span className="font-semibold text-green-400">Cliente:</span>{" "}
              {order.user?.name ?? "N/A"}
            </p>
            <p>
              <span className="font-semibold text-green-400">Fecha:</span>{" "}
              {new Date(order.date).toLocaleDateString("es-ES")}
            </p>
            <p>
              <span className="font-semibold text-green-400">Pago:</span>{" "}
              {order.isPaid ? "Pagado ✅" : "Pendiente ❌"}
            </p>
            <p>
              <span className="font-semibold text-green-400">Total:</span>{" "}
              {formatCurrency(order.totalAmount)}
            </p>
          </div>

          <div className="text-sm text-gray-300">
            <span className="font-semibold text-green-400">Productos:</span>
            <ul className="pl-4 mt-1 list-disc">
              {order.orderDetails.map((detail) => (
                <li key={detail.id}>
                  {detail.quantity} × {detail.product.name} —{" "}
                  {formatCurrency(detail.unitPrice)}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
            {next && (
              <Button
                onClick={() => handleChangeStatus(order.id, next)}
                disabled={updating === order.id}
                variant="dark"
              >
                Cambiar estado
              </Button>
            )}

            {order.status !== "cancelled" && order.status !== "completed" && (
              <Button
                onClick={() => handleCancel(order.id)}
                disabled={updating === order.id}
                variant="lowCalories"
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="container min-h-screen p-8 mx-auto">
      <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Panel de Órdenes
      </h1>

      {visibleOrders.length === 0 && !loading ? (
        <p className="text-center text-gray-400">No hay órdenes registradas.</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {visibleOrders.map(renderOrderCard)}
        </ul>
      )}

      {/* Loader para disparar scroll infinito */}
      <div ref={loaderRef} className="h-10 mt-10"></div>

      {loading && <p className="text-center text-gray-400">Cargando...</p>}
      {visibleOrders.length >= allOrders.length && !loading && (
        <p className="mt-6 text-sm text-center text-gray-500">
          No hay más órdenes para mostrar.
        </p>
      )}
    </div>
  );
};

export default OrdersPage;
