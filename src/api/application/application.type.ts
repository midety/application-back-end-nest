import { ApplicationGroup } from '../application-group/application-group.type';

export type Application = {
  id: string;
  ing: string;
  url: string;
};

export type ApplicationsFilter = {
  ids?: Array<Application['id']>;
  GroupsIds?: Array<ApplicationGroup['id']>;
};
