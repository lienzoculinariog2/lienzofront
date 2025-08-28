// src/components/AdminDashboardPage.tsx
"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/Product";
import { ICategories } from "@/types/Categories";
import { IUser } from "@/types/User"; // Importa el tipo de usuario
import { productService } from "@/services/ProductService";
import { categoriesServices } from "@/services/CategoryService";
import { userService } from "@/services/draft/userService"; // Importa el servicio de usuario
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react"; // Importa useAuth0 para el token
import { Order } from "@/types/Order";
import { orderService } from "@/services/draft/OrderService";
import { discountCodeService } from "@/services/draft/discountCodeService";
import { IDiscountCode } from "@/types/DiscountCode";

export const AdminDashboardPage = () => {
  const router = useRouter();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [users, setUsers] = useState<IUser[]>([]); // Estado para los usuarios
  const [orders, setOrders] = useState<Order[]>([]);
  const [discountCodes, setDiscountCodes] = useState<IDiscountCode[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await productService.getAll();
      setProducts(allProducts.slice(0, 4));
    };

    const fetchCategories = async () => {
      const allCategories = await categoriesServices.getAll();
      setCategories(allCategories.slice(0, 4));
    };

    const fetchUsers = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const allUsers = await userService.findAll(accessToken);
          setUsers(allUsers.slice(0, 4));
        } catch (error) {
          console.error("Error al obtener los usuarios:", error);
        }
      }
    };

    const fetchOrders = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const allOrders = await orderService.getAll(undefined, accessToken);
          const sortedOrders = allOrders.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setOrders(sortedOrders.slice(0, 4));
        } catch (error) {
          console.error("Error al obtener las órdenes:", error);
        }
      }
    };

    const fetchDiscountCodes = async () => {
      try {
        const allDiscountCodes = await discountCodeService.getAll();
        setDiscountCodes(allDiscountCodes.slice(0, 4));
      } catch (error) {
        console.error("Error al obtener los códigos de descuento:", error);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchOrders();
    fetchDiscountCodes();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleEditProduct = (id: string) => {
    router.push(`/adminDashboard/products/edit-products?id=${id}`);
  };

  const handleEditCategory = (id: string) => {
    router.push(`/adminDashboard/categories/edit-category?id=${id}`);
  };

   const handleEditDiscountCode = (id: string) => {
    router.push(`/adminDashboard/discountCodes/edit-discount?id=${id}`);
  };

  return (
    <div className="container min-h-screen p-8 mx-auto text-primary-txt-500">
      {/* Encabezado */}
      <header className="mb-10 text-center">
        <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
          Panel de Administración
        </h1>
        <p className="mt-2 text-gray-400">
          Gestiona tu aplicacion de forma sencilla.
        </p>
      </header>

      {/* Sección de Productos */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Productos</h2>
          <div className="flex gap-3">
            <Link href="/adminDashboard/products/edit-products">
              <Button variant="dailyMenu">Ver Todos</Button>
            </Link>
            <Link href="/adminDashboard/products/create-product">
              <Button variant="dailyMenu">Crear Nuevo</Button>
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400">No hay productos para mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleEditProduct(product.id)}
                className="overflow-hidden transition-shadow shadow-lg cursor-pointer bg-black/40 rounded-xl hover:shadow-xl"
              >
                {product.imgUrl && (
                  <div className="relative w-full h-40">
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-2 font-semibold text-green-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Separador de secciones */}
      <hr className="my-10 border-gray-700" />

      {/* Sección de Categorías */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Categorías</h2>
          <div className="flex gap-3">
            <Link href="/adminDashboard/categories/edit-category">
              <Button variant="dailyMenu">Ver Todas</Button>
            </Link>
            <Link href="/adminDashboard/categories/create-category">
              <Button variant="dailyMenu">Crear Nueva</Button>
            </Link>
          </div>
        </div>

        {categories.length === 0 ? (
          <p className="text-gray-400">No hay categorías para mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleEditCategory(category.id)}
                className="overflow-hidden transition-shadow shadow-lg cursor-pointer bg-black/40 rounded-xl hover:shadow-xl"
              >
                {category.imgUrl && (
                  <div className="relative w-full h-40">
                    <Image
                      src={category.imgUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    {category.description}
                  </p>
                  <p
                    className={`mt-2 font-semibold ${
                      category.isActive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {category.isActive ? "Activa" : "Inactiva"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Separador de secciones */}
      <hr className="my-10 border-gray-700" />

      {/* Sección de Usuarios */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Usuarios</h2>
          <Link href="/adminDashboard/users">
            <Button variant="dailyMenu">Ver Todos</Button>
          </Link>
        </div>

        {users.length === 0 ? (
          <p className="text-gray-400">No hay usuarios para mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="overflow-hidden shadow-lg bg-black/40 rounded-xl"
              >
                <div className="p-4">
                  <h3 className="font-bold">Nombre de Usuario</h3>
                  <p className="mt-1 text-sm text-gray-300 break-all">
                    {user.name}
                  </p>
                  <h3 className="mt-2 font-bold">Email</h3>
                  <p className="mt-1 text-sm text-gray-300">{user.email}</p>
                  <h3 className="mt-2 font-bold">Rol</h3>
                  <p className="mt-1 text-sm text-gray-300 capitalize">
                    {user.roles}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Separador de secciones */}
      <hr className="my-10 border-gray-700" />

      {/* Sección de Órdenes */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Órdenes</h2>
          <Link href="/adminDashboard/orders">
            <Button variant="dailyMenu">Ver Todas</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-400">No hay órdenes para mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 overflow-hidden shadow-lg bg-black/40 rounded-xl"
              >
                <h3 className="font-bold">Orden #{order.id}</h3>
                <p className="mt-1 text-sm text-gray-300">
                  Usuario: {order.user?.name ?? "N/A"}
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Estado:{" "}
                  <span
                    className={`capitalize ${
                      order.status === "cancelled"
                        ? "text-red-400"
                        : order.status === "completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Fecha: {new Date(order.date).toLocaleDateString("es-ES")}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

       {/* Separador de secciones */}
      <hr className="my-10 border-gray-700" />

      {/* Sección de Códigos de Descuento */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Códigos de Descuento</h2>
          <div className="flex gap-3">
            <Link href="/adminDashboard/discountCode">
              <Button variant="dailyMenu">Ver Todos</Button>
            </Link>
          </div>
        </div>

        {discountCodes.length === 0 ? (
          <p className="text-gray-400">No hay códigos de descuento para mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {discountCodes.map((discount) => (
              <div
                key={discount.id}
                onClick={() => handleEditDiscountCode(discount.id)}
                className="p-4 overflow-hidden transition-shadow shadow-lg cursor-pointer bg-black/40 rounded-xl hover:shadow-xl"
              >
                <h3 className="font-bold">{discount.code}</h3>
                <p className="mt-1 text-sm text-gray-300">
                  {discount.percentage}% de descuento
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Válido hasta:{" "}
                  {new Date(discount.validUntil).toLocaleDateString("es-ES")}
                </p>
                <p
                  className={`mt-2 font-semibold ${
                    discount.isActive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {discount.isActive ? "Activo" : "Inactivo"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboardPage;
