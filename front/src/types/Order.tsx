export type IStatusOrder = 
  | "pending" 
  | "paid" 
  | "shipped" 
  | "delivered" 
  | "canceled" 
  | "payment_failed";

export interface Order {
  id: string;
  date: string; // backend envía como ISO string, no Date
  total: number;
  discountId?: number;
  statusOrder: IStatusOrder;
  isPaid: boolean;
  shippingAddress?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  id: string;
  quantity: number;
  unitPrice: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

