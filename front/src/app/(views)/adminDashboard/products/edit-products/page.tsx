"use client";

import { useState, useEffect } from "react";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import Button from "@/components/ui/Button";
import ProductForm from "../../components/ProductForm";
import Image from "next/image";

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const allProducts = await productService.getAll();
      setProducts(allProducts);
    } catch (err) {
      setError("Error al obtener los productos.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (formData: Partial<IProduct>) => {
    try {
      setLoading(true);
      if (editingProduct && editingProduct.id) {
        const updatePayload = {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          isActive: formData.isActive,
          caloricLevel: formData.caloricLevel,
          ingredients: formData.ingredients,
          categoryId: formData.category?.id,
        };
        await productService.update(editingProduct.id, updatePayload);
      }
      setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      setError("Error al guardar el producto.");
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (productId: string) => {
    setLoading(true);
    try {
      const productToEdit = await productService.getById(productId);
      setEditingProduct(productToEdit);
    } catch (err) {
      setError("Error al cargar el producto para edición.");
      console.error("Error loading product for editing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="container min-h-screen p-8 mx-auto">
      <h1 className="my-6 text-4xl font-bold text-center border-b border-secondary-background-400 text-primary-txt-400">
        Panel de Productos
      </h1>

      {editingProduct ? (
        <div className="max-w-2xl p-6 mx-auto shadow-lg bg-black/50 rounded-2xl backdrop-blur-md">
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <div className="p-6 mt-8 shadow-lg rounded-2xl bg-black/50 backdrop-blur-md">
          <h2 className="mb-6 text-2xl font-bold text-primary-txt-500">
            Lista de Productos
          </h2>

          {loading && <p className="text-gray-300">Cargando productos...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between px-4 py-4 mb-2 transition-colors border border-gray-700 rounded-lg hover:bg-gray-800/50"
              >
                {product.imgUrl && (
                  <div className="flex-shrink-0 w-20 h-20 mr-4 overflow-hidden rounded-lg">
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="flex-1 mr-4">
                  <h3 className="mb-1 font-bold text-gray-100 underline">
                    {product.name}
                  </h3>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold text-vegetarian-500">
                      Precio: $
                      {product.price
                        ? Number(product.price).toFixed(2)
                        : "0.00"}
                    </span>
                    <br />
                    <span className="ml-4 font-semibold text-celiac-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between text-sm text-gray-200">
                  <Button
                    onClick={() => handleEdit(product.id)}
                    variant="category"
                    categoryId={product.category.id}
                    className="mt-2"
                  >
                    Editar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
