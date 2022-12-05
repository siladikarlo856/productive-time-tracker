import { TimeEntryPresentable } from "@/interfaces/TimeEntryPresentable";
import { TimeEntryPresentableModel } from "@/presentables/TimeEntryPresentableModel";
import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";

export class TimeViewViewModel {
  apiStore: ReturnType<typeof useProductiveApiStore>;
  notifyUserStore: ReturnType<typeof useNotifyUserStore>;
  timeTrackerStore: ReturnType<typeof useTimeTrackerStore>;

  isDeleteInProgress: boolean;
  timeEntries: Array<TimeEntryPresentableModel>;

  constructor(
    apiStore: ReturnType<typeof useProductiveApiStore>,
    notifyUserStore: ReturnType<typeof useNotifyUserStore>,
    timeTrackerStore: ReturnType<typeof useTimeTrackerStore>
  ) {
    this.apiStore = apiStore;
    this.notifyUserStore = notifyUserStore;
    this.timeTrackerStore = timeTrackerStore;
    this.isDeleteInProgress = false;
    this.timeEntries = [];
  }

  fetchTimeEntryPresentables() {
    return this.timeTrackerStore
      .fetchTimeEntryPresentables()
      .then((timeEntries) => {
        this.timeEntries = timeEntries;
        Promise.resolve(this.timeEntries);
      })
      .catch((err) => {
        console.error(err);
        if (err.status !== "001")
          this.notifyUserStore.notifyUserWithErrorMessage(
            "Something went wrong during entries fetching. Please try again"
          );
      });
  }

  getTimeEntryPresentables(): Array<TimeEntryPresentable> {
    return this.timeEntries;
  }

  onTimeEntryDelete(timeEntryId: string) {
    this.isDeleteInProgress = true;
    this.apiStore
      .deleteTimeEntryById(timeEntryId)
      .then(() => {
        this.notifyUserStore.notifyUserWithSuccessMessage(
          "Time entry successfully deleted"
        );
      })
      .catch(() => {
        this.notifyUserStore.notifyUserWithErrorMessage(
          "Time entry can not be deleted"
        );
      })
      .finally(() => {
        this.isDeleteInProgress = false;
        this.timeTrackerStore.fetchTimeEntryPresentables();
      });
  }

  onTimeEntryEdit(timeEntryId: string) {
    this.notifyUserStore.notifyUserWithWarningMessage(
      "Edit feature is not implemented"
    );
  }
}
