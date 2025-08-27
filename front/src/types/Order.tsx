export type IStatusOrder =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "failed";

export interface OrderDetail {
  id: string;
  quantity: number;
  unitPrice: number; // ✅ number, no string
  product: {
    id: string;
    name: string;
  };
}

export interface Order {
  id: string;
  date: string; // o Date si ya lo parseas
  isPaid: boolean;
  status: IStatusOrder
  user?: {
    id: string;
    name: string;
  };
  orderDetails: OrderDetail[];
  totalAmount: number; // ✅ así se llama en tu servicio
}

