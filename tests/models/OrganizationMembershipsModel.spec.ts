import { OrganizationMembershipsModel } from "../../src/models/OrganizationMembershipsModel";
import { expect } from "chai";

import getOrganizationMemberships from "../mockData/getOrganizationMemberships.json";

describe("OrganizationMembershipsModel test", function () {
  describe("Create empty object", () => {
    const modelObj = new OrganizationMembershipsModel();
    // console.log("Initialzied model:", modelObj);
    it("should initialize", () => {
      expect(modelObj).to.be.not.empty;
    });
  });
  describe("Create object from API response", () => {
    it("should initialize from data", () => {
      const modelObj = new OrganizationMembershipsModel(
        getOrganizationMemberships
      );
      //   console.log("Initialzied model:", modelObj);
      expect(modelObj).to.be.not.empty;
    });
  });
});
