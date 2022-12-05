import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";
import { expect } from "chai";
import { TimeTrackerStoreMock } from "../../mock/TimeTrackerStoreMock";

import { TimeViewViewModel } from "../../../src/views/TimeView/TimeViewViewModel";

const apiStoreMock = {} as ReturnType<typeof useProductiveApiStore>;
const notifyUserStoreMock = {} as ReturnType<typeof useNotifyUserStore>;
const timeTrackerStoreMock = new TimeTrackerStoreMock() as ReturnType<
  typeof useTimeTrackerStore
>;

describe("TimeViewViewModel test", () => {
  const viewModel = new TimeViewViewModel(
    apiStoreMock,
    notifyUserStoreMock,
    timeTrackerStoreMock
  );
  it("should initialize", () => {
    expect(viewModel.isDeleteInProgress).to.be.false;
    expect(viewModel.getTimeEntryPresentables()).to.be.empty;
  });

  it("should fetch data", async () => {
    await viewModel.fetchTimeEntryPresentables();
    expect(viewModel.getTimeEntryPresentables().length).to.be.equal(5);
  });
});
