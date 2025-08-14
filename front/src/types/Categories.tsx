export interface ICategories {
  id: string;
  name: string;
  description?: string;
  imgUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryCreate {
  name: string;
  description?: string;
}

export interface ICategoryUpdate {
  name?: string;
  description?: string;
  imgUrl?: string;
}