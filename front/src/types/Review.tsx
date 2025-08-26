import { IUser } from "./User";

export interface IReview {
  id: string;
  comment: string;
  rating: number;
  productId: string;
  userId: string;
  user?: IUser;
}
