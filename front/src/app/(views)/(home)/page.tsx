import Image from "next/image";
import RenderBarWithCart from "@/components/RenderBarWithCart";
import IngredientLegendButton from "@/components/ui/IngredientListButton";

export default async function Home() {
  const specialIngredients = [
    { name: "Verduras", className: "bg-vegetarian-700", check: true },
    { name: "Queso", className: "bg-celiac-500", check: true },
    { name: "Harina", className: "bg-vegan-600", check: true },
    { name: "Carne", className: "bg-daily-menu-700", check: true },
  ];

  return (
    <>
      <div>
        <div className="relative w-full h-[450px]">
          <Image
            src="https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/victoria-shes-UC0HZdUitWY-unsplash.jpg?updatedAt=1754504868306"
            alt="Banner de comida en la página de inicio"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 z-10 bg-gray-300/10" />

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Image
              src="https://ik.imagekit.io/xiqknvpxxh/Lienzo%20Culinario/2145c662-3775-48b0-aba7-55d032195e32-removebg-preview.png?updatedAt=1754512253493"
              alt="Logo de Lienzo Culinario"
              width={400}
              height={400}
              className="filter contrast-150 brightness-75"
            />
          </div>
        </div>
          
        <RenderBarWithCart />
        <IngredientLegendButton specialIngredients={specialIngredients} />
        <br />
      </div>
    </>
  );
}
