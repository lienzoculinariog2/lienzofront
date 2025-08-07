export interface IDiscountCode {
  id: string;
  code: string;
  percentage: number;
  isSingleUsePerUser: boolean;
  isActive: boolean;
  validUntil: Date;
}
