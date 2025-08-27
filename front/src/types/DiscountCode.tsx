export interface IDiscountCode {
  id: string;
  code: string;
  percentage: number;
  isSingleUsePerUser: boolean;
  isActive: boolean;
  validUntil: string; // Se usa string para el input de tipo date
}

export interface ICreateDiscountCodeDto {
  name: string;
  percentage: number | null;
  validUntil: string;
}

export interface IUpdateDiscountCodeDto {
  percentage?: number;
  validUntil?: string;
  isSingleUsePerUser?: boolean;
  isActive?: boolean;
}

export interface IDiscountCodesFilterDto {
  partialCode?: string;
  isActive?: boolean;
}
