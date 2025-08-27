export interface IOrdersDetail {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;   // 👈 normalmente está así
  product?: {
    id: string;
    name: string;
    imgUrl?: string;
  };
}
