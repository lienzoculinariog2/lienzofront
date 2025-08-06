import { protoProduct } from "@/helpers/prototype";
import ProductCard from "@/components/cards/HomeCard";
import CartCard from "@/components/cards/CartCard";
import OrderCard from "@/components/cards/OrderCard";
import DetailCard from "@/components/cards/DetailCard";

export default function ProductList() {
  const producto = protoProduct;

  return (
    <div className="">
      <p>HomeCard</p>
      <ProductCard {...producto} />
      <p>CartCard</p>
      <CartCard {...producto} />
      <p>OrderCard</p>
      <OrderCard {...producto} />
      <p>DetailCard</p>
      <DetailCard {...producto} />
    </div>
  );
}
