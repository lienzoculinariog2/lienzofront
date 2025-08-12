// import Button from "@/components/ui/Button";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import { productService } from "@/services/ProductService";
import { IProduct } from "@/types/Product";

export default async function Home() {
  const productosMap: IProduct[] = await productService.getAll();
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
        <br />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productosMap.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              imgUrl={product.imgUrl}
              isActive={product.isActive}
              caloricLevel={product.caloricLevel}
              ingredients={product.ingredients}
              category={product.category}
            />
          ))}
        </div>
        <br />
        {/* <Button variant="alternative"> Boton de prueba </Button>
        <Button variant="light"> Boton de prueba </Button>
        <Button variant="default"> Boton de prueba </Button>
        <Button variant="dark"> Boton de prueba </Button>
        <Button variant="dailyMenu"> Boton de prueba </Button>
        <Button variant="lowCalories"> Boton de prueba </Button>
        <Button variant="celiac"> Boton de prueba </Button>
        <Button variant="vegan"> Boton de prueba </Button>
        <Button variant="vegetarian"> Boton de prueba </Button> */}
      </div>
    </>
  );
}
