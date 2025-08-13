"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { ICategories } from "@/types/Categories";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { categoryPoster } from "@/services/CategoryPoster";
import imageCompression from "browser-image-compression";

export default function CategoryAdminPanel() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<ICategories>>({
    name: "",
    description: "",
    imgUrl: "",
    isActive: true,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const options = {
      maxSizeMB: 0.3, 
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setSelectedImage(compressedFile);
      setFormData((prev) => ({ ...prev, imgUrl: URL.createObjectURL(compressedFile) }));
    } catch (error) {
      console.error('Error al comprimir la imagen:', error);
    }
  }
};


  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFormData((prev) => ({ ...prev, imgUrl: "" }));
  };

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSuccess(false);

  if (!formData.name) {
    setErrors({ name: "El nombre de la categoría es obligatorio." });
    return;
  }
  
  if (!selectedImage) {
    setErrors({ imgUrl: "Por favor, sube una imagen." });
    return;
  }
  setErrors({});

  try {
    setLoading(true);

    const formDataToSend = new FormData();
    
    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("description", formData.description || "");

    formDataToSend.append("isActive", String(formData.isActive));

    if (selectedImage) {
      formDataToSend.append("file", selectedImage);
    }
    
    await categoryPoster.createWithImage(formDataToSend);

    setSuccess(true);
    router.push("/");
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
          Crear Nueva Categoría
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-primary-txt-600">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre de la categoría"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-daily-menu-500">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-primary-txt-600">Descripción</label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción de la categoría"
              value={formData.description}
              onChange={handleChange}
              className="p-3 bg-primary-background-600 border border-primary-background-400 rounded-md text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500 min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="imgFile" className="text-primary-txt-600">Imagen</label>
            <input
              id="imgFile"
              name="imgFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
            />
            {formData.imgUrl && (
              <div className="mt-4">
                <label className="text-primary-txt-600">Vista Previa:</label>
                <div className="relative mt-2 h-52 w-62">
                  <Image
                    src={formData.imgUrl}
                    alt="Vista previa de la imagen de la categoría"
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
          
          <div className="flex items-center gap-2 mt-2">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 rounded form-checkbox text-daily-menu-500 bg-primary-background-600 border-primary-background-400 focus:ring-daily-menu-500"
            />
            <label htmlFor="isActive" className="select-none text-primary-txt-500">
              Categoría activa
            </label>
          </div>

          <Button type="submit" disabled={loading} variant="dailyMenu">
            {loading ? "Creando..." : "Crear categoría"}
          </Button>

          {success && (
            <p className="flex items-center justify-center gap-2 mt-2 text-center text-green-500">
              <span className="text-xl">✅</span> Categoría creada con éxito
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
