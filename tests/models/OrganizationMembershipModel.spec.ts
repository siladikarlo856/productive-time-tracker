import { OrganizationMembershipModel } from "../../src/models/OrganizationMembershipModel";
import { expect } from "chai";

import getOrganizationMemberships from "../mockData/getOrganizationMemberships.json";

describe("OrganizationMembershipModel test", function () {
  describe("Create empty object", () => {
    const modelObj = new OrganizationMembershipModel();
    it("should initialize", () => {
      expect(modelObj).to.be.not.empty;
      expect(modelObj.relationships.person).to.be.not.empty;
    });
  });
  describe("Create object from API response", () => {
    const orgMemebershipData = getOrganizationMemberships.data[0];
    it("should initialize from data", () => {
      const modelObj = new OrganizationMembershipModel(orgMemebershipData);
      // console.log("Initialzied model:", modelObj);
      expect(modelObj).to.be.not.empty;
      expect(modelObj.relationships.person.data.id).to.equal("352657");
    });
  });
});
