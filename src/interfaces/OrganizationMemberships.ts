import { OrganizationMembership } from "./OrganizationMembership";
import { Person } from "./Person";

export interface OrganizationMemberships {
  data: Array<OrganizationMembership>; //TODO: replace with interface
  included: Array<Person | any>; //TODO: replace with interface
  links: Record<string, unknown>;
  meta: Record<string, unknown>;
}
