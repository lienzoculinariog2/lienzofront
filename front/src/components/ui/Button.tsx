import React from "react";
import cs from "classnames";

const categoryColorMap: Record<string, ButtonVariant> = {
  "e1cc7b13-709b-4904-866e-6fbcd8ab8962": "vegetarian",
  "ac549dd4-e652-47f7-9ede-490bdda26fc4": "vegan",
  "0d93094f-58a2-4fda-8b09-59ff302d3f91": "celiac",
  "d17c38c5-abf9-4acd-a9e9-7a24f70665d4": "lowCalories",
  "7912932c-31f5-488b-b466-d64df78c7ee2": "dailyMenu",
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
  | "category";

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

  if (variant === "category") {
    if (categoryId && categoryColorMap[categoryId]) {
      finalVariant = categoryColorMap[categoryId]; // el color real
    } else {
      finalVariant = "dark"; // fallback si no hay categoryId
    }
  }

  const combinedClasses = cs(
    VariantClasses[finalVariant],
    className,
    props.disabled && "opacity-50 cursor-not-allowed"
  );
  return (
    <button className={combinedClasses} {...props}>
      {!loading && children} {loading && <span>Cargando...</span>}
    </button>
  );
};

export default Button;
