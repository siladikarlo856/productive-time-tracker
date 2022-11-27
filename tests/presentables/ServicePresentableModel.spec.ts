import { ProductiveDTO } from "@/interfaces/ProductiveDTO";
import { expect } from "chai";
import { ServicePresentableModel } from "../../src/presentables/ServicePresentableModel";

import getAvailableServicesForProject from "../mockData/getAvailableServicesForProject.json";

describe("ServicePresentableModel test", () => {
  describe("Create object from API response", () => {
    it("should initialize from data", () => {
      const serviceDTO = getAvailableServicesForProject.data[0];
      const modelObj = new ServicePresentableModel(
        serviceDTO,
        getAvailableServicesForProject.included as unknown as Array<ProductiveDTO>
      );
      // console.log("ServicePresentableModel:", modelObj);
    });
    it("should initialize multiple objects", () => {
      const availableServicesPresentables =
        getAvailableServicesForProject.data.map(
          (serviceDTO) =>
            new ServicePresentableModel(
              serviceDTO,
              getAvailableServicesForProject.included as unknown as Array<ProductiveDTO>
            )
        );
      expect(availableServicesPresentables.length).to.equal(3);
      expect(availableServicesPresentables[0].id).to.equal("2343343");
      expect(availableServicesPresentables[0].name).to.equal(
        "My service for development"
      );
      expect(availableServicesPresentables[0].budgetName).to.equal(
        "Productive time tracker"
      );
      expect(availableServicesPresentables.length).to.equal(3);
      expect(availableServicesPresentables[2].id).to.equal("2343326");
      expect(availableServicesPresentables[2].name).to.equal("Open hours");
      expect(availableServicesPresentables[2].budgetName).to.equal("My budget");
    });
  });
});
