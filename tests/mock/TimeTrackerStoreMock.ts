import { ProductiveDTO } from "@/interfaces/ProductiveDTO";
import { TimeEntryPresentableModel } from "../../src/presentables/TimeEntryPresentableModel";

import getFilteredTimeEntries from "../mockData/getFilteredTimeEntries.json";

export class TimeTrackerStoreMock {
  timeEntries: Array<TimeEntryPresentableModel>;

  constructor() {
    this.timeEntries = [];
  }

  fetchTimeEntryPresentables() {
    return new Promise<TimeEntryPresentableModel[]>((resolve) => {
      this.timeEntries = getFilteredTimeEntries.data.map(
        (timeEntryDTO: any) =>
          new TimeEntryPresentableModel(
            timeEntryDTO,
            getFilteredTimeEntries.included as unknown as Array<ProductiveDTO>
          )
      );
      resolve(this.timeEntries);
    });
  }
}
