import { IProduct } from "./Product";

export interface ICategories {
  id : string,
  name : string,
  description : string,
  imgUrl : string,
  isActive : boolean,
  product: IProduct[],
}