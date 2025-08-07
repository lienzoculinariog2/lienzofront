export type StatusOrder = "pending" | "confirmed" | "delivered" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  date: Date;
  total: number;
  discountId: number;
  statusOrder: StatusOrder;
  isPaid: boolean;
}
