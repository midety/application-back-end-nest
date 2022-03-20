export type ApplicationGroup = {
  id: string;
  name: string;
};

export type Pagination = {
  page: number;
  perPage: number;
};

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export type Sort<T> = {
  order?: Order;
  orderBy?: keyof T;
};
