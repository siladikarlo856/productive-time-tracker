import { Relationship } from "./Relationship";

export interface OrganizationMembershipRelationships {
  person: Relationship;
  organization: Relationship;
  [key: string]: Relationship;
}
