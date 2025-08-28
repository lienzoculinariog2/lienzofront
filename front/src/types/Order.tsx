import { IUser } from "./User";

export type IStatusOrder =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "failed";

export interface OrderDetail {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string; // DECIMAL → string en JSON
  product: {
    id: string;
    name: string;
  };
}

export interface Order {
  id: string;
  date: string; // o Date si querés parsearlo
  userId: string;
  totalAmount: string; // DECIMAL → string
  status: IStatusOrder;
  shippingAddress: string | null;
  isPaid: boolean;
  stripePaymentIntentId?: string | null;
  stripeChargeId?: string | null;
  paymentStatus?: string | null;

  // Relaciones
  user?: IUser;
  orderDetails: OrderDetail[];
}
