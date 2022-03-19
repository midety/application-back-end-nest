export type ApplicationGroup = {
  id: string;
  name: string;
};

export type Pagination = {
  page: number;
  perPage: number;
};

export type Sort = {
  order?: string;
  orderBy?: string;
};
