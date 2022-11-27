import { deepCopy } from "../helpers/helpers";
import { OrganizationMembership } from "@/interfaces/OrganizationMembership";
import { OrganizationMembershipRelationships } from "@/interfaces/OrganizationMembershipRelationships";
import { OrganizationMembershipRelationshipsModel } from "./OrganizationMembershipRelationshipsModel";

export class OrganizationMembershipModel implements OrganizationMembership {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  relationships: OrganizationMembershipRelationships;

  constructor(data?: OrganizationMembership) {
    this.id = data?.id || "";
    this.type = data?.type || "";
    this.attributes = deepCopy(data?.attributes);
    this.relationships = new OrganizationMembershipRelationshipsModel(
      data?.relationships
    );
  }
}
