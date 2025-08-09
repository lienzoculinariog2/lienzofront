import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  isActive: boolean;
  caloricLevel: number;
  ingredients: string[];
};

export default function ProductCard({
  name,
  imgUrl,
  description,
  price,
  stock,
  caloricLevel,
  ingredients,
}: ProductCardProps) {
  const tieneCarne = ingredients.includes("carne");
  const tieneHarina = ingredients.some(
    (i) => i.includes("pasta") || i.includes("pan") || i.includes("harina")
  );
  const tieneLacteo = ingredients.some(
    (i) => i.includes("leche") || i.includes("lacteo")
  );
  const tieneVerdura = ingredients.includes("verdura");
  return (
    <div className="text-textPrimary rounded-lg shadow-md border-4 bg-primary-background-500/65 border-secondary-background-300/65 p-4 w-full max-w-md flex flex-col gap-2">
      <div
        className={`h-2 w-full rounded-t ${
          caloricLevel === 1
            ? "bg-low-calories-100"
            : caloricLevel === 2
            ? "bg-low-calories-500"
            : caloricLevel === 3
            ? "bg-celiac-500"
            : caloricLevel === 4
            ? "bg-daily-menu-300"
            : caloricLevel === 5
            ? "bg-daily-menu-700"
            : "bg-secondary-background-300"
        }`}
      />
      <div className="w-full flex flex-col gap-[2px]">
        {tieneVerdura && (
          <div className="h-2 rounded-t bg-vegetarian-900 w-full" />
        )}
        {tieneLacteo && <div className="h-2 bg-secondary-txt-500 w-full" />}
        {tieneHarina && <div className="h-2 bg-daily-menu-700 w-full" />}
        {tieneCarne && (
          <div className="h-2 rounded-b bg-daily-menu-900 w-full" />
        )}
      </div>

      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
        <Image
          src={imgUrl}
          alt={name}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      <h2 className="text-lg font-bold underline">{name}</h2>
      <p className="text-sm text-textSecondary bg-primary-background-100/100 rounded-md p-1">
        {" "}
        {description}{" "}
      </p>
      <p className="text-sm text-textSecondary"> ${price.toFixed(2)}</p>
      <p className="text-sm"> Nivel calorico: {caloricLevel} </p>
      <p className={`text-sm ${stock > 0 ? "text-success" : "text-error"}`}>
        {stock > 0 ? `Stock: ${stock}` : "No disponible"}
      </p>
      <button className="text-white font-semibold px-4 py-2 rounded-xl border-4 bg-primary-background-300 hover:bg-secondary-txt-800 transition duration-300 ease-in-out">
        Agregar al pedido
      </button>
    </div>
  );
}
