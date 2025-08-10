"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/types/Product";
import { productPoster } from "@/services/ProductPoster";
import { validateProduct } from "@/helpers/validateProduct";
import Button from "@/components/ui/Button";
import { ICategories } from "@/types/Categories";
import { getAllCategories } from "@/services/CategoryService";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<IProduct>>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    isActive: true,
    category: undefined,
    caloricLevel: 1,
    ingredients: [],
  });

  const [categories, setCategories] = useState<ICategories[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (name === "category.id") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      setFormData((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    } else {
      const parsedValue =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "ingredients"
          ? value.split(",").map((item) => item.trim())
          : type === "number"
          ? Number(value)
          : value;

      if (name.includes(".")) {
        const [parentKey, childKey] = name.split(".");
        setFormData((prev) => ({
          ...prev,
          [parentKey]: {
            ...(prev[parentKey as keyof typeof prev] as object),
            [childKey]: parsedValue,
          },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: parsedValue }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("submit iniciado");
    e.preventDefault();
    setSuccess(false);
    const { isValid, errors } = validateProduct(formData);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    try {
      setLoading(true);
      console.log("submit exitoso.");
      await productPoster.create(formData as IProduct);
      setSuccess(true);
      router.push("/");
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imgUrl: "",
        isActive: true,
        category: undefined,
        caloricLevel: 1,
        ingredients: [],
      });
      setErrors({});
    } catch (err) {
      console.error("Error al enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-primary-background-500">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-xl bg-secondary-background-700">
        <h1 className="mb-6 text-2xl font-bold text-center underline text-primary-txt-500">
          Panel de administrador
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          autoComplete="off"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-primary-txt-600">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre del producto"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-daily-menu-500">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-primary-txt-600">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción detallada del producto"
              value={formData.description}
              onChange={handleChange}
              className="p-3 bg-primary-background-600 border border-primary-background-400 rounded-md text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500 min-h-[100px]"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-daily-menu-500">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="text-primary-txt-600">
                Precio
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Precio (ej: 10.50)"
                value={formData.price}
                onChange={handleChange}
                className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-daily-menu-500">
                  {errors.price}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="stock" className="text-primary-txt-600">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                placeholder="Cantidad en stock"
                value={formData.stock}
                onChange={handleChange}
                className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-daily-menu-500">
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="imgUrl" className="text-primary-txt-600">
              URL de la imagen
            </label>
            <input
              id="imgUrl"
              name="imgUrl"
              type="text"
              placeholder="URL de imagen del producto"
              value={formData.imgUrl ?? ""}
              onChange={handleChange}
              className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
            />
            {errors.imgUrl && (
              <p className="mt-1 text-sm text-daily-menu-500">
                {errors.imgUrl}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="category.id" className="text-primary-txt-600">
                Categoría
              </label>
              <select
                id="category.id"
                name="category.id"
                value={formData.category?.id || ""}
                onChange={handleChange}
                className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-700 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-daily-menu-500">
                  {errors.category}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="caloricLevel" className="text-primary-txt-600">
                Nivel calórico
              </label>
              <input
                id="caloricLevel"
                name="caloricLevel"
                type="number"
                min="1"
                max="5"
                placeholder="1 (bajo) a 5 (alto)"
                value={formData.caloricLevel ?? ""}
                onChange={handleChange}
                className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
              />
              {errors.caloricLevel && (
                <p className="mt-1 text-sm text-daily-menu-500">
                  {errors.caloricLevel}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ingredients" className="text-primary-txt-600">
              Ingredientes
            </label>
            <input
              id="ingredients"
              name="ingredients"
              type="text"
              placeholder="Ingredientes separados por coma (ej: carne, tomate)"
              onChange={handleChange}
              className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
            />
            {errors.ingredients && (
              <p className="mt-1 text-sm text-daily-menu-500">
                {errors.ingredients}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 rounded form-checkbox text-daily-menu-500 bg-primary-background-600 border-primary-background-400 focus:ring-daily-menu-500"
            />
            <label
              htmlFor="isActive"
              className="select-none text-primary-txt-500"
            >
              Producto activo
            </label>
            {errors.isActive && (
              <p className="mt-1 text-sm text-daily-menu-500">
                {errors.isActive}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} variant="dailyMenu">
            {loading ? "Enviando..." : "Crear producto"}
          </Button>

          {success && (
            <p className="flex items-center justify-center gap-2 mt-2 text-center text-green-500">
              <span className="text-xl">✅</span> Producto creado con éxito
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
