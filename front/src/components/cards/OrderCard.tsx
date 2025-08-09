import Image from "next/image";

type OrderCardProps = {
  name: string;
  imgUrl: string;
  ingredients: string[];
};

export default function OrderCard({
  name,
  imgUrl,
  ingredients,
}: OrderCardProps) {
  const tieneCarne = ingredients.includes("carne");
  const tieneHarina = ingredients.some(
    (i) => i.includes("pasta") || i.includes("pan") || i.includes("harina")
  );
  const tieneLacteo = ingredients.some(
    (i) => i.includes("leche") || i.includes("lacteo")
  );
  const tieneVerdura = ingredients.includes("verdura");

  return (
    <div className="rounded-md shadow-md border bg-primary-background-100/80 p-2 w-28 h-72 flex flex-col justify-between">
      <div className="w-full flex flex-col gap-1 mb-1">
        {tieneVerdura && <div className="h-2 bg-vegetarian-900 w-full" />}
        {tieneLacteo && <div className="h-2 bg-secondary-txt-500 w-full" />}
        {tieneHarina && <div className="h-2 bg-daily-menu-700 w-full" />}
        {tieneCarne && <div className="h-2 bg-daily-menu-900 w-full" />}
      </div>
      <div className="relative w-full h-40 rounded-md overflow-hidden">
        <Image
          src={imgUrl}
          alt={name}
          fill
          className="object-cover inset-0"
          sizes="100%"
        />
      </div>

      <h3 className="text-sm font-semibold mt-2 text-center">{name}</h3>
    </div>
  );
}
