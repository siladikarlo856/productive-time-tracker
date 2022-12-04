import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";

export class TimeViewViewModel {
  isDeleteInProgress: boolean;

  apiStore: ReturnType<typeof useProductiveApiStore>;
  notifyUserStore: ReturnType<typeof useNotifyUserStore>;
  timeTrackerStore: ReturnType<typeof useTimeTrackerStore>;

  constructor(
    apiStore: ReturnType<typeof useProductiveApiStore>,
    notifyUserStore: ReturnType<typeof useNotifyUserStore>,
    timeTrackerStore: ReturnType<typeof useTimeTrackerStore>
  ) {
    this.isDeleteInProgress = false;
    this.apiStore = apiStore;
    this.notifyUserStore = notifyUserStore;
    this.timeTrackerStore = timeTrackerStore;
  }

  fetchTimeEntryPresentables() {
    return this.timeTrackerStore.fetchTimeEntryPresentables();
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
