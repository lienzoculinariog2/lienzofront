import Image from "next/image";

type DetailCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgURL: string;
  caloricLevel: number;
  ingredients: string[];
};

export default function DetailCard({
  name,
  imgURL,
  description,
  price,
  stock,
  caloricLevel,
  ingredients,
}: DetailCardProps) {
  const tieneCarne = ingredients.includes("carne");
  const tieneHarina = ingredients.some(
    (i) => i.includes("pasta") || i.includes("pan") || i.includes("harina")
  );
  const tieneLacteo = ingredients.some(
    (i) => i.includes("leche") || i.includes("lacteo")
  );
  const tieneVerdura = ingredients.includes("verdura");

  return (
    <div className="rounded-lg shadow-md border-4 bg-primary-background-500/65 p-4 w-1/2">
      {/* Barras de calorías */}
      <div
        className={`h-2 w-full rounded-t mb-1 ${
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

      {/* Barras de ingredientes */}
      <div className="w-full flex flex-col gap-[2px] mb-2">
        {tieneVerdura && <div className="h-2 bg-vegetarian-900 w-full" />}
        {tieneLacteo && <div className="h-2 bg-secondary-txt-500 w-full" />}
        {tieneHarina && <div className="h-2 bg-daily-menu-700 w-full" />}
        {tieneCarne && <div className="h-2 bg-daily-menu-900 w-full" />}
      </div>

      {/* Nombre centrado */}
      <h2 className="text-lg font-bold underline text-center mb-2">{name}</h2>

      {/* Imagen + info */}
      <div className="flex gap-4 items-start mb-4">
        {/* Imagen */}
        <div className="relative w-32 h-32 overflow-hidden rounded-md flex-shrink-0">
          <Image
            src={imgURL}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-start gap-1">
          <p className="text-sm text-textSecondary font-semibold">
            Precio: ${price.toFixed(2)}
          </p>
          <p className="text-sm">Nivel calórico: {caloricLevel}</p>
          <p className={`text-sm ${stock > 0 ? "text-success" : "text-error"}`}>
            {stock > 0 ? `Stock: ${stock}` : "No disponible"}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-sm text-textSecondary bg-primary-background-100/100 rounded-md p-2">
        {description}
      </p>
    </div>
  );
}
