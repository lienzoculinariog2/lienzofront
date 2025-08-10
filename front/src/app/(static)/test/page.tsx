"use client";

import { useState } from "react";
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
    <section className="flex justify-center items-start min-h-screen bg-gray-500">
      <div className="w-full max-w-xl p-6">
        <h1 className="mb-4 text-xl font-bold">Panel de administrador</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-1/2"
          autoComplete="off"
        >
          <p>Nombre</p>
          <input
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
          <p>Descripcion</p>
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}
          <p>Precio</p>
          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p>{errors.price}</p>}
          <p>Stock</p>
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p>{errors.stock}</p>}
          <p>Url de la imagen</p>
          <input
            name="imgUrl"
            placeholder="URL de imagen"
            value={formData.imgUrl ?? ""}
            onChange={handleChange}
          />
          {errors.imgUrl && <p>{errors.imgUrl}</p>}
          <p>Categoria ID</p>
          <input
            name="category.id"
            value={formData.category?.id || ""}
            onChange={handleChange}
          />

          {errors.category && <p>{errors.category}</p>}
          <p>Nivel calorico</p>
          <input
            name="caloricLevel"
            type="number"
            min="1"
            max="5"
            value={formData.caloricLevel ?? ""}
            onChange={handleChange}
          />
          {errors.caloricLevel && <p>{errors.caloricLevel}</p>}
          <p>Ingredientes</p>
          <input
            name="ingredients"
            placeholder="Ingredientes (coma separados)"
            onChange={handleChange}
          />
          {errors.ingredients && <p>{errors.ingredients}</p>}

          <label>
            Activo:
            <input
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </label>
          {errors.isActive && <p>{errors.isActive}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Crear producto"}
          </button>
          {success && <p>✅ Producto creado con éxito</p>}
        </form>
      </div>
    </section>
  );
}
