export interface DiscountCode {
  id: number;
  code: string;
  isSingleUserPerUser: boolean;
  isActive: boolean;
  validUntil: Date;
}
