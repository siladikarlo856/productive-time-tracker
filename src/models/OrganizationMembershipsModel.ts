import { deepCopy } from "../helpers/helpers";
import { OrganizationMembership } from "@/interfaces/OrganizationMembership";
import { OrganizationMemberships } from "@/interfaces/OrganizationMemberships";
import { Person } from "@/interfaces/Person";
import { OrganizationMembershipModel } from "./OrganizationMembershipModel";
import { PersonModel } from "./PersonModel";

export class OrganizationMembershipsModel implements OrganizationMemberships {
  data: Array<OrganizationMembership>; //TODO: replace with interface
  included: Array<Person | any>; //TODO: replace with interface
  links: Record<string, unknown>;
  meta: Record<string, unknown>;

  constructor(data?: OrganizationMemberships) {
    this.data =
      Array.isArray(data?.data) && data?.data.length
        ? data.data.map(
            (orgMembership: OrganizationMembership) =>
              new OrganizationMembershipModel(orgMembership)
          )
        : [];
    this.included =
      Array.isArray(data?.included) && data?.included?.length
        ? data.included
            .filter((includedObject: any) => includedObject.type === "people")
            .map((personObject: Person) => new PersonModel(personObject))
        : [];
    this.links = deepCopy(data?.links);
    this.meta = deepCopy(data?.meta);
  }
}
