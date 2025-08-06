import Image from "next/image";

type ProductCardProps = {
  name: string;
  imgURL: string;
  price: number;
  stock: number;
  caloricLevel: number;
  categories_id: string[];
};

export default function ProductCard({
  name,
  imgURL,
  price,
  stock,
  caloricLevel,
  categories_id,
}: ProductCardProps) {
  return (
    <div
      className={`bg-secondary text-textPrimary rounded-lg p-4 shadow-md border-t-4 border-${categories_id}`}
    >
      <div className="relative w-full h-40 mb-4 overflow-hidden rounded">
        <Image src={imgURL} alt={name} height={100} width={100} />
      </div>
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-textSecondary"> ${price.toFixed(2)}</p>
      <p className="text-sm"> Nivel calorico: {caloricLevel} </p>
      <p className={`text-sm ${stock > 0 ? "text-success" : "text-error"}`}>
        {stock > 0 ? `Stock: ${stock}` : "No disponible"}
      </p>
    </div>
  );
}
