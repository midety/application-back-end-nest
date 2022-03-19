export type ApplicationGroup = {
  id: string;
  name: string;
};

export type ApplicationGroupFilter = {
  ids?: Array<ApplicationGroup['id']>;
};
