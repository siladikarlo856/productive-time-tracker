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
}
