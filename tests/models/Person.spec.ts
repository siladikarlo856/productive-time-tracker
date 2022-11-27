import { expect } from "chai";
import { PersonModel } from "../../src/models/PersonModel";

import getOrganizationMemberships from "../mockData/getOrganizationMemberships.json";

describe("OrganizationMembershipRelationshipsModel test", function () {
  it("should initialize from included", () => {
    const included = getOrganizationMemberships.included;
    const modelObj = new PersonModel(included[1]);
    // console.log("Initialzied model:", modelObj);
    expect(modelObj).to.be.not.empty;
    expect(modelObj.attributes?.first_name).to.equals("Developer");
    expect(modelObj.attributes?.last_name).to.equals("Siladi");
  });
});
