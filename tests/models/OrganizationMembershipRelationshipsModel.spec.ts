import { expect } from "chai";
import { OrganizationMembershipRelationshipsModel } from "../../src/models/OrganizationMembershipRelationshipsModel";
import getOrganizationMemberships from "../mockData/getOrganizationMemberships.json";

describe("OrganizationMembershipRelationshipsModel test", function () {
  describe("Create empty object", function () {
    const modelObj = new OrganizationMembershipRelationshipsModel();
    it("should initialize", function () {
      // console.log("Empty model:", modelObj);
      expect(modelObj).to.be.not.empty;
      expect(modelObj.person).to.be.not.empty;
      expect(modelObj.person.data).to.be.not.empty;
      expect(modelObj.person.data.id).to.equal("");
      expect(modelObj.person.data.type).to.equal("");
    });
  });
  describe("Create object from API response", () => {
    const relationships = getOrganizationMemberships.data[0].relationships;

    it("should initialize from relationships", () => {
      const modelObj = new OrganizationMembershipRelationshipsModel(
        relationships
      );
      // console.log("Initialzied model:", modelObj);
      expect(modelObj).to.be.not.empty;
    });
  });
});
