import { Person } from "./Person";

export interface OrganizationMembershipRelationships {
  person: {
    data: Person;
  };
}
