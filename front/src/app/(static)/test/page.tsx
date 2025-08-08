import { productService } from "@/services/ProductServiceLocal";
import ProductCard from "@/components/cards/HomeCard";
import CartCard from "@/components/cards/CartCard";
import OrderCard from "@/components/cards/OrderCard";
import DetailCard from "@/components/cards/DetailCard";
import { IProduct } from "@/types/Product";

export default async function ProductList() {
  const productos: IProduct[] = await productService.getAll();
  const producto: IProduct = productos[1];

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
