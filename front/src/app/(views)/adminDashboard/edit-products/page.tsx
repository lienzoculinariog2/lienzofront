"use client";

import { useState, useEffect } from "react";
import { IProduct } from "@/types/Product";
import { productService } from "@/services/ProductService";
import Button from "@/components/ui/Button";
import ProductForm from "../components/ProductForm"; // ✅ Ajusta la ruta del componente

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
    <div className="container p-8 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center">Panel de Productos</h1>
      
      {editingProduct ? (
        <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelEdit} />
      ) : (
        <div className="p-6 mt-8 rounded-lg shadow-md bg-primary-background-200">
          <h2 className="mb-4 text-2xl font-bold">Lista de Productos</h2>
          {loading && <p>Cargando productos...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <ul>
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between py-2 border-b">
                <span>{product.name}</span>
                <Button onClick={() => handleEdit(product.id)} variant="alternative" className="text-blue-500">
                  Editar
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}