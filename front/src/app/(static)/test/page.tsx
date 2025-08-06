import { protoProduct } from "@/helpers/prototype";
import ProductCard from "@/components/cards/HomeCard";

export default function ProductList() {
  const producto = protoProduct;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProductCard {...producto} />
    </div>
  );
}
