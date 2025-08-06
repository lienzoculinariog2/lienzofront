import React from "react";
import cs from "classnames"; 


type ButtonVariant =
  | "default"
  | "alternative"
  | "dark"
  | "light"
  | "dailyMenu"
  | "celiac"
  | "vegetarian"
  | "lowCalories"
  | "vegan";


const VariantClasses: Record<ButtonVariant, string> = {
  default:
    "text-primary-txt-500 font-black bg-secondary-background-500 hover:bg-secondary-background-600 focus:ring-4 focus:ring-secondary-background-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-secondary-background-600 dark:hover:bg-secondary-background-700 focus:outline-none dark:focus:ring-secondary-background-800",

  alternative:
    "py-2.5 px-5 me-2 mb-2 text-primary-txt-500 focus:outline-none bg-primary-background-300 rounded-lg border border-primary-background-400 hover:bg-primary-background-400 hover:text-primary-txt-100 focus:z-10 focus:ring-4 focus:ring-primary-background-200 dark:focus:ring-primary-background-700 dark:bg-primary-background-400 dark:text-primary-txt-100 dark:border-primary-background-600 dark:hover:text-primary-txt-100 dark:hover:bg-primary-background-500",

    dark: "text-primary-txt-500 bg-primary-background-500 hover:bg-primary-background-600 focus:outline-none focus:ring-4 focus:ring-primary-background-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-background-600 dark:hover:bg-primary-background-700 dark:focus:ring-primary-background-800 dark:border-primary-background-700",

    light:
    "text-primary-txt-500 bg-secondary-background-100 border border-secondary-background-200 focus:outline-none hover:bg-secondary-background-200 focus:ring-4 focus:ring-secondary-background-300 font-medium rounded-lg text-extrabold px-5 py-2.5 me-2 mb-2 dark:bg-secondary-background-800 dark:text-primary-txt-500 dark:border-secondary-background-600 dark:hover:bg-secondary-background-700 dark:hover:border-secondary-background-600 dark:focus:ring-secondary-background-700",

    dailyMenu:
    "focus:outline-none text-primary-txt-500 bg-daily-menu-500 hover:bg-daily-menu-600 focus:ring-4 focus:ring-daily-menu-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-daily-menu-600 dark:hover:bg-daily-menu-700 dark:focus:ring-daily-menu-900",

    celiac:
    "focus:outline-none text-primary-txt-500 bg-celiac-500 hover:bg-celiac-600 focus:ring-4 focus:ring-celiac-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-celiac-600 dark:hover:bg-celiac-700 dark:focus:ring-celiac-900",

    vegetarian:
    "focus:outline-none text-primary-txt-500 bg-vegetarian-500 hover:bg-vegetarian-600 focus:ring-4 focus:ring-vegetarian-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-vegetarian-600 dark:hover:bg-vegetarian-700 dark:focus:ring-vegetarian-900",

    lowCalories:
    "focus:outline-none text-primary-txt-500 bg-low-calories-500 hover:bg-low-calories-600 focus:ring-4 focus:ring-low-calories-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-low-calories-600 dark:hover:bg-low-calories-700 dark:focus:ring-low-calories-900",

    vegan:
    "focus:text-primary-txt-500 bg-vegan-500 ",
};


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; 
  children: React.ReactNode; 
  loading?: boolean; 
}


const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children, 
  className,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={cs(
        VariantClasses[variant],
        className,
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      {...props}
    >
      {!loading && children}{" "}
      {loading && <span>Cargando...</span>}
    </button>
  );
};

export default Button;
