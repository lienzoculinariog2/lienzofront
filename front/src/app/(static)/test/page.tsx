"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/types/Product";
import Button from "@/components/ui/Button";
import { ICategories } from "@/types/Categories";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { categoriesServices } from "@/services/CategoryService";
import { productService } from "@/services/ProductService";

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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoriesServices.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFormData((prev) => ({ ...prev, imgUrl: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setFormData((prev) => ({ ...prev, imgUrl: URL.createObjectURL(file) }));
    }
  };

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
    e.preventDefault();
    setSuccess(false);

    if (!selectedImage) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        imgUrl: "Por favor, sube una imagen.",
      }));
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("price", String(formData.price || 0));
      formDataToSend.append("stock", String(formData.stock || 0));

      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }

      formDataToSend.append("isActive", String(formData.isActive || false));
      formDataToSend.append("categoryId", formData.category?.id || "");
      formDataToSend.append("caloricLevel", String(formData.caloricLevel || 1));
      formDataToSend.append(
        "ingredients",
        JSON.stringify(formData.ingredients || [])
      );

      await productService.createWithImage(formDataToSend);

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
      setSelectedImage(null);
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
            <label htmlFor="imgFile" className="text-primary-txt-600">
              Imagen
            </label>
            <input
              id="imgFile"
              name="imgFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
            />
            {errors.imgUrl && (
              <p className="mt-1 text-sm text-daily-menu-500">
                {errors.imgUrl}
              </p>
            )}
            {formData.imgUrl && (
              <div className="mt-4">
                <label className="text-primary-txt-600">Vista Previa:</label>
                <div className="relative mt-2 h-52 w-62">
                  <Image
                    src={formData.imgUrl}
                    alt="Vista previa de la imagen del producto"
                    className="object-cover w-full h-full rounded-md"
                    width={350}
                    height={160}
                  />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute flex items-center justify-center w-6 h-6 font-bold text-m text-primary-txt-400 top-1 right-1 hover:opacity-100"
                >
                  X
                </button>
                </div>
              </div>
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
