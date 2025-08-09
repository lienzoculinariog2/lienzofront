import Image from "next/image";

type CartCardProps = {
  name: string;
  imgUrl: string;
  price: number;
  ingredients: string[];
};

export default function CartCard({
  name,
  imgUrl,
  price,
  ingredients,
}: CartCardProps) {
  const tieneCarne = ingredients.includes("carne");
  const tieneHarina = ingredients.some(
    (i) => i.includes("pasta") || i.includes("pan") || i.includes("harina")
  );
  const tieneLacteo = ingredients.some(
    (i) => i.includes("leche") || i.includes("lacteo")
  );
  const tieneVerdura = ingredients.includes("verdura");

  return (
    <div className="rounded-lg shadow-md border-2 bg-primary-background-500/65 p-2 w-full max-w-md">
      {/* Barras de ingredientes */}
      <div className="w-full flex flex-col gap-[2px] mb-2">
        {tieneVerdura && <div className="h-2 bg-vegetarian-900 w-full" />}
        {tieneLacteo && <div className="h-2 bg-secondary-txt-500 w-full" />}
        {tieneHarina && <div className="h-2 bg-daily-menu-700 w-full" />}
        {tieneCarne && <div className="h-2 bg-daily-menu-900 w-full" />}
      </div>

      {/* Layout horizontal */}
      <div className="flex items-center gap-4">
        {/* Imagen cuadrada */}
        <div className="relative w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
          <Image
            src={imgUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-md font-semibold">{name}</h3>
          <p className="text-sm text-textSecondary">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
