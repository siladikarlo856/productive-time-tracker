import { ProductiveDTO } from "@/interfaces/ProductiveDTO";
import { TimeEntryPresentableModel } from "../../src/presentables/TimeEntryPresentableModel";

import getFilteredTimeEntries from "../mockData/getFilteredTimeEntries.json";

describe("TimeEntryPresentableModel test", () => {
  describe("Create object from API response", () => {
    it("should initialize from data", () => {
      const timeEntryDTO = getFilteredTimeEntries.data[0];
      const modelObj = new TimeEntryPresentableModel(
        timeEntryDTO,
        getFilteredTimeEntries.included as unknown as Array<ProductiveDTO>
      );
    });
    it("should initialize multiple objects", () => {
      const timeEntries = getFilteredTimeEntries.data.map(
        (timeEntryDto) =>
          new TimeEntryPresentableModel(
            timeEntryDto,
            getFilteredTimeEntries.included as unknown as Array<ProductiveDTO>
          )
      );
      console.log(timeEntries);
    });
  });
});
