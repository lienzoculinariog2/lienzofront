import React from "react";
import cs from "classnames"; 

// Mapeo de IDs de categoría a los nombres de las variantes de botón
const categoryColorMap: Record<string, ButtonVariant> = {
  "550e8400-e29b-41d4-a716-446655440000": "vegetarian", // La Huella del Jardin
  "550e8400-e29b-41d4-a716-446655440001": "vegan", // Creación Pura
  "550e8400-e29b-41d4-a716-446655440002": "celiac", // Toque Delicado
  "550e8400-e29b-41d4-a716-446655440003": "lowCalories", // Equilibrio de Colores
  "550e8400-e29b-41d4-a716-446655440004": "dailyMenu", // La Obra Maestra
  "550e8400-e29b-41d4-a716-446655440005": "dark", // El Lienzo en Blanco (o la que corresponda)
  "550e8400-e29b-41d4-a716-446655440006": "dark", // Silueta de Sabor (o la que corresponda)
};

type ButtonVariant =
  | "default"
  | "alternative"
  | "dark"
  | "light"
  | "dailyMenu"
  | "celiac"
  | "vegetarian"
  | "lowCalories"
  | "vegan"
  | "category"; ;


const VariantClasses: Record<ButtonVariant, string> = {
  default:
    "text-primary-background-400 bg-primary-text-600 border border-primary-background-200 focus:outline-none hover:bg-primary-txt-600 focus:ring-4 focus:ring-daily-menu-500 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2",

  alternative:
    "py-2.5 px-5 me-2 mb-2 text-primary-txt-500 focus:outline-none bg-primary-txt-800 rounded-lg border border-primary-background-400 hover:bg-primary-background-500 hover:text-primary-txt-100 ",

    dark: "text-primary-txt-500 bg-primary-background-500 hover:bg-primary-txt-800 rounded-lg border border-primary-background-400 focus:outline-none focus:ring-4 focus:ring-primary-background-400 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2 ",

    light:
    "text-primary-txt-500 bg-secondary-background-100 border border-secondary-background-200 focus:outline-none hover:bg-secondary-background-200 focus:ring-4 focus:ring-secondary-background-300 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2 dark:bg-secondary-background-800 dark:text-primary-txt-500 dark:border-secondary-background-600 dark:hover:bg-secondary-background-700 dark:hover:border-secondary-background-600 dark:focus:ring-secondary-background-700",

    dailyMenu:
    "text-primary-txt-400 bg-daily-menu-600 border border-primary-background-200 focus:outline-none hover:bg-daily-menu-700 focus:ring-4 focus:ring-daily-menu-500 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2",

    celiac:
     "text-primary-txt-400 bg-celiac-600 border border-primary-background-200 focus:outline-none hover:bg-celiac-700 focus:ring-4 focus:ring-secondary-background-300 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2",

    vegetarian:
    "text-primary-txt-400 bg-vegetarian-600 border border-primary-background-200 focus:outline-none hover:bg-vegetarian-700 focus:ring-4 focus:ring-vegetarian-300 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2",

    lowCalories:
   "text-primary-txt-400 bg-low-calories-500 border border-primary-background-200 focus:outline-none hover:bg-low-calories-600 focus:ring-4 focus:ring-low-calories-600 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2",

    vegan:
    "text-primary-txt-400 bg-vegan-600 border border-primary-background-200 focus:outline-none hover:bg-vegan-700 focus:ring-4 focus:ring-vegan-700 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2",

    category: "",
};


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; 
  children: React.ReactNode; 
  loading?: boolean; 
  categoryId?: string; 
}


const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children, 
  className,
  loading = false,
   categoryId,
  ...props
}) => {
  let finalVariant = variant;
  if (variant === "category" && categoryId) {
    // Usa la variante del mapa si existe, de lo contrario, usa 'default'
    finalVariant = categoryColorMap[categoryId] || "default";
  }

  const combinedClasses = cs(
    VariantClasses[finalVariant],
    className,
    props.disabled && "opacity-50 cursor-not-allowed"
  );
  return (
<button
      className={combinedClasses}
      {...props}
    >
      {!loading && children}{" "}
      {loading && <span>Cargando...</span>}
    </button>
  );
};

export default Button;
