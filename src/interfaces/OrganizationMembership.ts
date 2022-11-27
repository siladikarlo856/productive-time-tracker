import { OrganizationMembershipRelationships } from "./OrganizationMembershipRelationships";

export interface OrganizationMembership {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  relationships: OrganizationMembershipRelationships;
}
