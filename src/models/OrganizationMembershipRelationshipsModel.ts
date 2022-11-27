import { OrganizationMembershipRelationships } from "@/interfaces/OrganizationMembershipRelationships";
import { Relationship } from "@/interfaces/Relationship";
import { PersonModel } from "./PersonModel";
import { RelationshipModel } from "./RelationshipModel";

export class OrganizationMembershipRelationshipsModel
  implements OrganizationMembershipRelationships
{
  person: RelationshipModel;
  organization: RelationshipModel;
  [key: string]: Relationship;

  constructor(data?: OrganizationMembershipRelationships) {
    this.person = data?.person
      ? new RelationshipModel(data.person)
      : new RelationshipModel();
    this.organization = data?.organization
      ? new RelationshipModel(data.organization)
      : new RelationshipModel();
  }
}
