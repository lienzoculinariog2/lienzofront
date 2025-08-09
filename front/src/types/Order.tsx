export type IStatusOrder = "pending" | "confirmed" | "delivered" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  date: Date;
  total: number;
  discountId: number;
  statusOrder: IStatusOrder;
  isPaid: boolean;
}
