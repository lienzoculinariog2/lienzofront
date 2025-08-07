export interface DiscountCode {
  id: string;
  code: string;
  percentage: number;
  isSingleUsePerUser: boolean;
  isActive: boolean;
  validUntil: Date;
}
