import { OrganizationMembershipRelationships } from "@/interfaces/OrganizationMembershipRelationships";
import { PersonModel } from "./PersonModel";

export class OrganizationMembershipRelationshipsModel
  implements OrganizationMembershipRelationships
{
  person: {
    data: PersonModel;
  };

  constructor(data?: OrganizationMembershipRelationships) {
    this.person = { data: new PersonModel() };
    this.person.data = data?.person?.data
      ? new PersonModel(data.person.data)
      : new PersonModel();
  }
}
