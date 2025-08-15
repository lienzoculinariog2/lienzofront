// "use client";

// import { useState, useEffect } from "react";
// import Button from "@/components/ui/Button";
// import { ICategories } from "@/types/Categories";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import imageCompression from "browser-image-compression";
// import { categoriesServices } from "@/services/CategoryService";

// interface CategoryFormProps {
//   categoryId?: string;
// }

// const CategoryForm = ({ categoryId }: CategoryFormProps) => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<Partial<ICategories>>({
//     name: "",
//     description: "",
//     imgUrl: "",
//     isActive: true,
//   });
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     return () => {
//       if (formData.imgUrl?.startsWith("blob:")) {
//         URL.revokeObjectURL(formData.imgUrl);
//       }
//     };
//   }, [formData.imgUrl]);

//   useEffect(() => {
//   if (!categoryId) return;

//   const fetchCategory = async () => {
//     try {
//       setLoading(true);
//       const category = await categoriesServices.getById(categoryId);

//       if (!category) {
//         setErrors(prev => ({ ...prev, general: "Categoría no encontrada." }));
//         return;
//       }

//       setFormData({
//         name: category.name,
//         description: category.description,
//         imgUrl: category.imgUrl || "",
//         isActive: category.isActive,
//       });
//     } catch (err) {
//       console.error("Error cargando categoría:", err);
//       setErrors(prev => ({ ...prev, general: "No se pudo cargar la categoría." }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCategory();
// }, [categoryId]);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const options = { maxSizeMB: 0.3, maxWidthOrHeight: 1920, useWebWorker: true };
//     try {
//       const compressedFile = await imageCompression(file, options);
//       setSelectedImage(compressedFile);
//       setFormData(prev => ({ ...prev, imgUrl: URL.createObjectURL(compressedFile) }));
//     } catch (error) {
//       console.error("Error al comprimir la imagen:", error);
//       setErrors(prev => ({ ...prev, imgUrl: "Error al procesar la imagen." }));
//     }
//   };

//   const handleRemoveImage = () => {
//     setSelectedImage(null);
//     setFormData(prev => ({ ...prev, imgUrl: "" }));
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;
//     const parsedValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
//     setFormData(prev => ({ ...prev, [name]: parsedValue }));
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.name) newErrors.name = "El nombre de la categoría es obligatorio.";
//     if (!formData.imgUrl && !categoryId) newErrors.imgUrl = "Por favor, sube una imagen.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setSuccess(false);

//   if (!validateForm()) return;

//   try {
//     setLoading(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name || "");
//     formDataToSend.append("description", formData.description || "");
//     formDataToSend.append("isActive", String(formData.isActive));

//     if (selectedImage) {
//       formDataToSend.append("file", selectedImage);
//     }

//     if (categoryId) {
//       await categoriesServices.updateWithImage(categoryId, formDataToSend);
//     } else {
//       await categoriesServices.createWithImage(formDataToSend);
//     }

//     setSuccess(true);
//     router.replace("/admin/categories"); 
//   } catch (err: unknown) {
//     console.error("Error al enviar:", err);

//     let message = "Ocurrió un error al guardar.";
//     if (err instanceof Error) {
//       message = err.message;
//     }

//     setErrors(prev => ({ ...prev, general: message }));
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <section className="flex items-center justify-center min-h-screen bg-primary-background-500">
//       <div className="w-full max-w-2xl p-8 rounded-lg shadow-xl bg-secondary-background-700">
//         <h1 className="mb-6 text-2xl font-bold text-center underline text-primary-txt-500">
//           {categoryId ? "Editar Categoría" : "Crear Nueva Categoría"}
//         </h1>

//         {errors.general && (
//           <p className="mb-4 text-center text-red-500">{errors.general}</p>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
//           <div className="flex flex-col gap-1">
//             <label htmlFor="name" className="text-primary-txt-600">Nombre</label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Nombre de la categoría"
//               value={formData.name}
//               onChange={handleChange}
//               className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
//             />
//             {errors.name && <p className="mt-1 text-sm text-daily-menu-500">{errors.name}</p>}
//           </div>

//           <div className="flex flex-col gap-1">
//             <label htmlFor="description" className="text-primary-txt-600">Descripción</label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Descripción de la categoría"
//               value={formData.description}
//               onChange={handleChange}
//               className="p-3 bg-primary-background-600 border border-primary-background-400 rounded-md text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500 min-h-[100px]"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label htmlFor="imgFile" className="text-primary-txt-600">Imagen</label>
//             <input
//               id="imgFile"
//               name="imgFile"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="p-3 border rounded-md bg-primary-background-600 border-primary-background-400 text-primary-txt-300 focus:outline-none focus:ring-2 focus:ring-daily-menu-500"
//             />
//             {errors.imgUrl && <p className="mt-1 text-sm text-daily-menu-500">{errors.imgUrl}</p>}

//             {formData.imgUrl && (
//               <div className="mt-4">
//                 <label className="text-primary-txt-600">Vista Previa:</label>
//                 <div className="relative mt-2 h-52 w-62">
//                   <Image
//                     src={formData.imgUrl}
//                     alt="Vista previa de la imagen de la categoría"
//                     className="object-cover w-full h-full rounded-md"
//                     width={350}
//                     height={160}
//                   />
//                   <button
//                     type="button"
//                     onClick={handleRemoveImage}
//                     className="absolute flex items-center justify-center w-6 h-6 font-bold text-m text-primary-txt-400 top-1 right-1 hover:opacity-100"
//                   >
//                     X
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-2 mt-2">
//             <input
//               id="isActive"
//               name="isActive"
//               type="checkbox"
//               checked={formData.isActive}
//               onChange={handleChange}
//               className="w-5 h-5 rounded form-checkbox text-daily-menu-500 bg-primary-background-600 border-primary-background-400 focus:ring-daily-menu-500"
//             />
//             <label htmlFor="isActive" className="select-none text-primary-txt-500">
//               Categoría activa
//             </label>
//           </div>

//           <Button type="submit" disabled={loading} variant="dailyMenu">
//             {loading
//               ? categoryId
//                 ? "Actualizando..."
//                 : "Creando..."
//               : categoryId
//               ? "Actualizar categoría"
//               : "Crear categoría"}
//           </Button>

//           {success && (
//             <p className="flex items-center justify-center gap-2 mt-2 text-center text-green-500">
//               <span className="text-xl">✅</span>{" "}
//               {categoryId
//                 ? "Categoría actualizada con éxito"
//                 : "Categoría creada con éxito"}
//             </p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default CategoryForm;

"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { ICategories } from "@/types/Categories";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { categoriesServices } from "@/services/CategoryService";

interface CategoryFormProps {
  categoryId?: string;  // <-- ahora sí TypeScript lo reconoce
  onSave: (formData: Partial<ICategories>) => Promise<void>;
  onCancel: () => void;
}

const ImagePreview = ({ src, onRemove }: { src: string; onRemove: () => void }) => (
  <div className="relative mt-2 h-52 w-62">
    <Image
      src={src}
      alt={`Vista previa de categoría`}
      className="object-cover w-full h-full rounded-md"
      width={350}
      height={160}
    />
    <button
      type="button"
      onClick={onRemove}
      className="absolute w-6 h-6 font-bold text-red-500 top-1 right-1 hover:opacity-80"
    >
      X
    </button>
  </div>
);

const CategoryForm = ({ categoryId }: CategoryFormProps) => {
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

  // Limpiar URLs temporales al cambiar o desmontar
  useEffect(() => {
    return () => {
      if (formData.imgUrl?.startsWith("blob:")) URL.revokeObjectURL(formData.imgUrl);
    };
  }, [formData.imgUrl]);

  // Cargar categoría para edición
  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        const category = await categoriesServices.getById(categoryId);

        if (!category) {
          setErrors(prev => ({ ...prev, general: "Categoría no encontrada." }));
          return;
        }

        setFormData({
          name: category.name,
          description: category.description,
          imgUrl: category.imgUrl || "",
          isActive: category.isActive,
        });
      } catch (err) {
        console.error("Error cargando categoría:", err);
        setErrors(prev => ({ ...prev, general: "No se pudo cargar la categoría." }));
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limpiar URL anterior
    if (formData.imgUrl?.startsWith("blob:")) URL.revokeObjectURL(formData.imgUrl);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      setSelectedImage(compressedFile);
      setFormData(prev => ({ ...prev, imgUrl: URL.createObjectURL(compressedFile) }));
    } catch (error) {
      console.error("Error al comprimir la imagen:", error);
      setErrors(prev => ({ ...prev, imgUrl: "Error al procesar la imagen." }));
    }
  };

  const handleRemoveImage = () => {
    if (formData.imgUrl?.startsWith("blob:")) URL.revokeObjectURL(formData.imgUrl);
    setSelectedImage(null);
    setFormData(prev => ({ ...prev, imgUrl: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "El nombre de la categoría es obligatorio.";
    if (!formData.imgUrl && !categoryId) newErrors.imgUrl = "Por favor, sube una imagen.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) return;

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("isActive", String(formData.isActive));
      if (selectedImage) formDataToSend.append("file", selectedImage);

      if (categoryId) {
        await categoriesServices.updateWithImage(categoryId, formDataToSend);
      } else {
        await categoriesServices.createWithImage(formDataToSend);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // mensaje de éxito temporal
      router.replace("/admin/categories");
    } catch (err: unknown) {
      console.error("Error al enviar:", err);
      const message = err instanceof Error ? err.message : "Ocurrió un error al guardar.";
      setErrors(prev => ({ ...prev, general: message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-primary-background-500">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-xl bg-secondary-background-700">
        <h1 className="mb-6 text-2xl font-bold text-center underline text-primary-txt-500">
          {categoryId ? "Editar Categoría" : "Crear Nueva Categoría"}
        </h1>

        {errors.general && <p className="mb-4 text-center text-red-500">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
          {/* Nombre */}
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
            {errors.name && <p className="mt-1 text-sm text-daily-menu-500">{errors.name}</p>}
          </div>

          {/* Descripción */}
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

          {/* Imagen */}
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
            {errors.imgUrl && <p className="mt-1 text-sm text-daily-menu-500">{errors.imgUrl}</p>}

            {formData.imgUrl && <ImagePreview src={formData.imgUrl} onRemove={handleRemoveImage} />}
          </div>

          {/* Activa */}
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
            {loading
              ? categoryId
                ? "Actualizando..."
                : "Creando..."
              : categoryId
              ? "Actualizar categoría"
              : "Crear categoría"}
          </Button>

          {success && (
            <p className="flex items-center justify-center gap-2 mt-2 text-center text-green-500">
              <span className="text-xl">✅</span>{" "}
              {categoryId ? "Categoría actualizada" : "Categoría creada"} con éxito
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default CategoryForm;
