export type IStatusOrder =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "failed";

export interface Order {
  id: string;
  date: string; // backend envía como ISO string, no Date
  totalAmount: string;
  discountId?: number;
  status: IStatusOrder;
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
  unitPrice: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

