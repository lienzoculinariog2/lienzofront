// src/app/(views)/product-details/[...slug]/page.tsx
import React from "react";
import Image from "next/image";
import { productService } from "@/services/ProductServiceLocal";
import { IProduct } from "@/types/Product";
import Button from "@/components/ui/Button";

// Definición de tipos para los parámetros de la URL.
// '[...slug]' significa que 'slug' será un array de strings.
type ProductDetailProps = {
  params: {
    slug: string[];
  };
};

// Objeto de mapeo para los colores de los ingredientes, usando tu paleta de Tailwind
const specialColors: { [key: string]: string } = {
  carne: "bg-daily-menu-500", // Rojo para carnes
  lacteo: "bg-secondary-txt-500", // Gris azulado para lácteos
  huevo: "bg-celiac-500", // Amarillo para huevo (usando el color de celiac)
  grano: "bg-celiac-500", // Amarillo para granos
  harina: "bg-celiac-500", // Amarillo para harinas y pastas
  fruta: "bg-vegetarian-500", // Verde para frutas
  vegetal: "bg-vegetarian-500", // Verde esmeralda para vegetales
  // Clase por defecto si no se encuentra el color
  default: "bg-secondary-background-500" 
};

// Función auxiliar para extraer el ID del slug.
// Esto ayuda a encapsular la lógica y podría resolver la advertencia del linter.
function getSlugFromParams(params: { slug: string[] }) {
  if (params.slug?.length > 0) {
    return params.slug[params.slug.length - 1];
  }
  return undefined;
}

// Mantenemos el componente como async porque es un Server Component.
export default async function ProductDetail({ params }: ProductDetailProps) {
  // Ahora llamamos a la función auxiliar para obtener el ID.
  const id = getSlugFromParams(params);

  // Si no hay ID, muestra directamente el mensaje de "no encontrado"
  if (!id) {
    return (
      <div className="p-8 text-center mt-20 mb-20">
        <h2 className="text-2xl font-bold text-primary-txt-200 mb-2">Platillo no encontrado</h2>
        <p className="text-secondary-txt-500">
          Por favor, verifica la URL o vuelve a la lista de platillos.
        </p>
      </div>
    );
  }

  let product: IProduct | null = null;
  try {
    product = await productService.getById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  // Si hay un error o no se encuentra el producto, mostramos el mensaje de "no encontrado"
  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-primary-txt-200 mb-2">Platillo no encontrado</h2>
        <p className="text-secondary-txt-500">
          Por favor, vuelve a la lista de platillos.
        </p>
      </div>
    );
  }

  // Lógica para detectar los tipos de ingredientes sin duplicados
  const ingredientTypes = new Set<string>();
  const categories = [
    { category: 'carne', keywords: ['carne', 'pollo', 'pescado', 'cerdo'] },
    { category: 'lacteo', keywords: ['leche', 'lacteo', 'queso', 'yogur'] },
    { category: 'huevo', keywords: ['huevo', 'huevos'] },
    { category: 'grano', keywords: ['grano', 'arroz', 'trigo', 'avena'] },
    { category: 'harina', keywords: ['harina', 'pasta', 'pan'] },
    { category: 'fruta', keywords: ['fruta', 'manzana', 'platano', 'naranja'] },
    { category: 'vegetal', keywords: ['vegetal', 'verdura', 'lechuga', 'tomate', 'zanahoria'] },
  ];

  product?.ingredients?.forEach((ingredient) => {
    const lowerCaseIngredient = ingredient.toLowerCase();
    categories.forEach((cat) => {
      if (cat.keywords.some(keyword => lowerCaseIngredient.includes(keyword))) {
        ingredientTypes.add(cat.category);
      }
    });
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 bg-primary-background-900 border border-primary-background-800 rounded-xl shadow-lg overflow-hidden p-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
        <div className="lg:w-1/2 w-full h-96 relative rounded-xl overflow-hidden mb-6 lg:mb-0">
          <Image
            src={product.imgURL || "/docs/images/products/placeholder.png"}
            alt={product.name || "product image"}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="lg:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-primary-txt-100">
              {product.name || "Platillo sin nombre"}
            </h1>
            <p className="text-secondary-txt-300 mb-6 text-lg">
              {product.description || "Sin descripción"}
            </p>
            
            <div className="mb-6">
              <h3 className="text-primary-txt-200 font-semibold mb-2">Ingredientes:</h3>
              <div className="flex flex-wrap gap-2">
              {Array.from(ingredientTypes).map((type, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${specialColors[type]}`}
                  >
                  {type}
                  </span>
              ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center text-primary-txt-300 mb-2">
              <span className="font-semibold mr-2">Nivel Calórico:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${specialColors[product.caloricLevel] || specialColors.default}`}>
                {product.caloricLevel || "No especificado"}
              </span>
              </div>
              <div className="flex items-center text-primary-txt-300">
              <span className="font-semibold mr-2">Stock:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${product.stock > 0 ? "bg-daily-menu-500" : "bg-low-calories-500"}`}>
                {product.stock > 0 ? `En stock: ${product.stock}` : "Sin stock"}
              </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-secondary-background-800">
            <span className="text-4xl font-bold text-primary-txt-400">
              {product.price !== undefined ? `$${product.price}` : "Sin precio"}
            </span>
            <Button variant="dailyMenu" className="py-3 px-5">
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

