// "use client";

// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import CartItem from "./components/CartItem";
// import CreateOrderBtn from "./components/CreateOrderBtn";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useCart } from "@/hooks/useCart";

// const CartPage = () => {
//   const { user } = useAuth0();
//   const userId = user?.sub || null;

//   // CORRECCIÓN: Usamos las nuevas funciones del hook
//   const {
//     cartItems,
//     resetCart,
//     isLoading,
//     handleAddQuantity,
//     handleRemoveQuantity,
//     deleteCartItem,
//   } = useCart(userId);

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + (parseFloat(String(item.price)) || 0) * item.quantity,
//     0
//   );
//   const showCart = cartItems.length > 0;

//   if (isLoading) {
//     return (
//       <div className="py-8 mx-5 bg-primary-background-500">
//         <h1 className="mb-10 text-2xl font-bold text-center text-primary-txt-100">
//           Carrito de Compras
//         </h1>
//         <p className="text-center text-primary-txt-100">Cargando carrito...</p>
//         <ToastContainer position="bottom-right" />
//       </div>
//     );
//   }

//   if (!userId) {
//     return (
//       <div className="py-8 mx-5 bg-primary-background-500">
//         <h1 className="mb-10 text-2xl font-bold text-center text-primary-txt-100">
//           Carrito de Compras
//         </h1>
//         <p className="text-center text-red-500">
//           Por favor, inicia sesión para ver tu carrito.
//         </p>
//         <ToastContainer position="bottom-right" />
//       </div>
//     );
//   }

//   return (
//     <div className="py-8 mx-5 bg-primary-background-500">
//       <h1 className="mb-10 text-2xl font-bold text-center text-primary-txt-100">
//         Carrito de Compras
//       </h1>
//       <div className="p-6 mb-6 rounded-lg shadow-md bg-secondary-background-500">
//         <div className="flex items-center justify-between p-6 mb-8 text-xl font-semibold">
//           <h2 className="text-primary-txt-100">Productos en el Carrito</h2>
//         </div>

//         {showCart ? (
//           cartItems.map((product) => (
//             <CartItem
//               key={product.id}
//               product={product}
//               onAdd={handleAddQuantity}
//               onRemove={handleRemoveQuantity}
//               onDelete={deleteCartItem}
//             />
//           ))
//         ) : (
//           <p className="text-center text-daily-menu-500">
//             No hay productos en el carrito.
//           </p>
//         )}
//       </div>

//       <div className="flex justify-end p-6 rounded-lg shadow-md bg-secondary-background-500">
//         <h2 className="text-xl font-semibold text-primary-txt-100">
//           Total: ${totalPrice.toFixed(2)}
//         </h2>
//       </div>

//       {showCart && (
//         <div className="flex justify-end mt-4">
//           <CreateOrderBtn resetCart={resetCart} />
//         </div>
//       )}
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default CartPage;

"use client";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CartItem from "./components/CartItem";
import CreateOrderBtn from "./components/CreateOrderBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { user } = useAuth0();
  const userId = user?.sub || null;

  const {
    cartItems,
    resetCart,
    isLoading,
    handleAddQuantity,
    handleRemoveQuantity,
    deleteCartItem,
  } = useCart(userId);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (parseFloat(String(item.price)) || 0) * item.quantity,
    0
  );
  const showCart = cartItems.length > 0;

  if (isLoading) {
    return (
      <div className="w-11/12 p-8 mx-auto mt-10 mb-20 border shadow-lg max-w-7xl border-primary-background-800 bg-primary-background-900 rounded-xl">
        <h1 className="mb-10 text-3xl font-bold text-center text-primary-txt-100">
          Carrito de Compras
        </h1>
        <p className="text-center text-primary-txt-100">Cargando carrito...</p>
        <ToastContainer position="bottom-right" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="w-11/12 p-8 mx-auto mt-10 mb-20 border shadow-lg max-w-7xl border-primary-background-800 bg-primary-background-900 rounded-xl">
        <h1 className="mb-10 text-3xl font-bold text-center text-primary-txt-100">
          Carrito de Compras
        </h1>
        <p className="text-center text-red-500">
          Por favor, inicia sesión para ver tu carrito.
        </p>
        <ToastContainer position="bottom-right" />
      </div>
    );
  }

  return (
    <div className="w-11/12 p-8 mx-auto mt-10 mb-20 space-y-8 border shadow-lg max-w-7xl border-primary-background-800 bg-primary-background-900 rounded-xl">
      <h1 className="my-6 text-3xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Carrito de Compras
      </h1>

      <div className="flex flex-col space-y-6">
        {showCart ? (
          cartItems.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onAdd={handleAddQuantity}
              onRemove={handleRemoveQuantity}
              onDelete={deleteCartItem}
            />
          ))
        ) : (
          <p className="text-center text-daily-menu-500">
            No hay productos en el carrito.
          </p>
        )}
      </div>

      <div className="flex justify-end p-6 border shadow-lg bg-primary-background-900 border-primary-background-800 rounded-xl">
        <h2 className="text-xl font-semibold text-primary-txt-100">
          Total: ${totalPrice.toFixed(2)}
        </h2>
      </div>

      {showCart && (
        <div className="flex justify-end mt-4">
          <CreateOrderBtn resetCart={resetCart} />
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CartPage;

