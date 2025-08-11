"use client";

import { useState } from "react";
// Los imports se mantienen como estaban
import { IProduct } from "@/types/Product";
import { productPoster } from "@/services/ProductPoster";
import { validateProduct } from "@/helpers/validateProduct";

export default function AdminPanel() {
  const [formData, setFormData] = useState<Partial<IProduct>>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    isActive: true,
    category: { id: "", name: "", description: "", isActive: false },
    caloricLevel: 1,
    ingredients: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    const parsedValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : name === "ingredients"
        ? value.split(",")
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
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imgUrl: "",
        isActive: true,
        category: { id: "", name: "", description: "", isActive: false },
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
    <section className="min-h-screen bg-primary-background-400 flex items-center justify-center p-4 text-primary-txt-100">
      <div className="w-full max-w-2xl bg-primary-background-700 p-8 rounded-xl shadow-2xl border border-primary-background-700">
        <h1 className="mb-8 text-3xl font-bold text-center text-daily-menu-300">
          Panel de administrador
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full"
          autoComplete="off"
        >
          {/* Nombre */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">Nombre</p>
            <input
              name="name"
              placeholder="Nombre del producto"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.name && (
              <p className="text-daily-menu-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">
              Descripción
            </p>
            <textarea
              name="description"
              placeholder="Descripción del producto"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors resize-none placeholder-primary-txt-900"
            />
            {errors.description && (
              <p className="text-daily-menu-400 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Precio */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">Precio</p>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.price && (
              <p className="text-daily-menu-400 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">Stock</p>
            <input
              name="stock"
              type="number"
              placeholder="0"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.stock && (
              <p className="text-daily-menu-400 text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          {/* URL de la imagen */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">
              Url de la imagen
            </p>
            <input
              name="imgUrl"
              placeholder="URL de imagen"
              value={formData.imgUrl ?? ""}
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.imgUrl && (
              <p className="text-daily-menu-400 text-sm mt-1">
                {errors.imgUrl}
              </p>
            )}
          </div>

          {/* Categoria ID */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">
              Categoria ID
            </p>
            <input
              name="category.id"
              placeholder="ID de la categoría"
              value={formData.category?.id || ""}
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.category && (
              <p className="text-daily-menu-400 text-sm mt-1">
                {errors.category}
              </p>
            )}
          </div>

          {/* Nivel calórico */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">
              Nivel calórico
            </p>
            <input
              name="caloricLevel"
              type="number"
              min="1"
              max="5"
              placeholder="Nivel (1-5)"
              value={formData.caloricLevel ?? ""}
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.caloricLevel && (
              <p className="text-daily-menu-400 text-sm mt-1">
                {errors.caloricLevel}
              </p>
            )}
          </div>

          {/* Ingredientes */}
          <div>
            <p className="text-secondary-txt-400 font-semibold mb-2">
              Ingredientes
            </p>
            <input
              name="ingredients"
              placeholder="Ingredientes (coma separados)"
              onChange={handleChange}
              className="w-full p-3 bg-secondary-background-900 border border-secondary-background-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-daily-menu-500 transition-colors placeholder-primary-txt-900"
            />
            {errors.ingredients && (
              <p className="text-daily-menu-400 text-sm mt-1">
                {errors.ingredients}
              </p>
            )}
          </div>

          {/* Checkbox y botón */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <label className="flex items-center gap-2 text-secondary-txt-400 font-semibold cursor-pointer">
              Activo:
              <input
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-daily-menu-500 bg-secondary-background-900 border-secondary-background-800 rounded"
              />
            </label>
            {errors.isActive && (
              <p className="text-daily-menu-400 text-sm">{errors.isActive}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`py-3 px-8 text-lg font-bold rounded-lg shadow-lg transition-all duration-300 w-full md:w-auto
                ${
                  loading
                    ? "bg-primary-background-600 text-secondary-txt-700 cursor-not-allowed"
                    : "bg-daily-menu-500 text-primary-txt-100 hover:scale-105 hover:bg-daily-menu-600"
                }
              `}
            >
              {loading ? "Enviando..." : "Crear producto"}
            </button>
          </div>
          {success && (
            <p className="text-vegetarian-500 font-semibold text-center mt-4">
              ✅ Producto creado con éxito
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
