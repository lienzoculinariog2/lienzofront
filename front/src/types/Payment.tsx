export type IPaymentStatus =
  | "pending"
  | "processing"
  | "succeeded"
  | "failed"
  | "canceled"
  | "requires_action"
  | "requires_confirmation"
  | "requires_payment_method";

export type IPaymentProvider = "stripe" | "paypal" | "mercadopago";

export type IPaymentType = "payment" | "refund" | "partial_refund";

export interface Payment {
  id: string;
  orderId: string;
  provider: IPaymentProvider;
  type: IPaymentType;
  status: IPaymentStatus;
  amount: string; // DECIMAL → string
  refundedAmount: string;
  currency: string;
  stripePaymentIntentId?: string | null;
  stripeChargeId?: string | null;
  stripeRefundId?: string | null;
  customerEmail?: string | null;
  description?: string | null;
  metadata?: Record<string, any> | null;
  errorDetails?: Record<string, any> | null;
  idempotencyKey?: string | null;
  processedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}