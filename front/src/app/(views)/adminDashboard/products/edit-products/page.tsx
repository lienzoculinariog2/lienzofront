"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { IProduct } from "@/types/Product";
import { ICategories } from "@/types/Categories";
import { productService } from "@/services/ProductService";
import { categoriesServices } from "@/services/CategoryService";
import Button from "@/components/ui/Button";
import ProductForm from "../../components/ProductForm";
import Image from "next/image";
import SearchBar from "@/components/ui/SerchBar";

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorías");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadProducts(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  const loadProducts = async (pageToLoad = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getPaginatedAndFiltered({
        page: pageToLoad,
        limit: 20,
        category: selectedCategory !== "Todas las categorías" ? selectedCategory : undefined,
        term: searchTerm || undefined,
      });

      setProducts((prev) =>
  pageToLoad === 1 ? res.data : [...prev, ...res.data]
);

      setPage(pageToLoad);
      setHasMore(res.data.length > 0);
    } catch (err) {
      setError("Error al cargar los productos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await categoriesServices.getAll();
      const activeCategories = fetchedCategories
        .filter((cat: ICategories) => cat.isActive)
        .map((cat) => cat.name);
      setCategories(["Todas las categorías", ...activeCategories]);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    loadProducts(1);
  }, []);

  const handleSearch = useCallback((category: string, term: string) => {
    setSelectedCategory(category);
    setSearchTerm(term);
    loadProducts(1);
  }, []);

  const handleSaveProduct = async (formData: FormData) => {
  try {
    setLoading(true);

    // Creamos el payload directamente desde el FormData
    const payload = new FormData();
    payload.append("name", formData.get("name") as string);
    payload.append("description", formData.get("description") as string);
    payload.append("price", String(formData.get("price")));
    payload.append("stock", String(formData.get("stock")));
    payload.append("isActive", String(formData.get("isActive") === "true"));
    payload.append("caloricLevel", String(formData.get("caloricLevel")));
    payload.append("ingredients", formData.get("ingredients") as string);
    payload.append("categoryId", formData.get("categoryId") as string);

    if (editingProduct && editingProduct.id) {
      await productService.update(editingProduct.id, payload);
    }

    setEditingProduct(null);
    loadProducts(1); // recargamos la primera página
  } catch (err) {
    setError("Error al guardar el producto.");
    console.error(err);
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
      console.error(err);
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

          <SearchBar onSearch={handleSearch} categories={categories} />

          {error && <p className="text-red-500">{error}</p>}

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((product, idx) => (
              <li
                ref={idx === products.length - 1 ? lastProductRef : null}
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
                  <h3 className="mb-1 font-bold text-gray-100 underline">{product.name}</h3>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold text-vegetarian-500">
                      Precio: ${Number(product.price).toFixed(2)}
                    </span>
                    <br />
                    <span className="ml-2 font-semibold text-celiac-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between text-sm text-gray-200">
                  <Button
                    onClick={() => handleEdit(product.id)}
                    variant="category"
                    categoryId={product.category?.id}
                    className="mt-2"
                  >
                    Editar
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {loading && <p className="mt-4 text-gray-300">Cargando más productos...</p>}
          {/* {!hasMore && <p className="mt-4 text-center text-gray-400">No hay más productos</p>} */}
        </div>
      )}
    </div>
  );
}
