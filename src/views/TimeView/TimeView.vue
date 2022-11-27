<template>
  <div>
    <div
      class="mt-3 mb-6 ml-20 mr-20 flex py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 items-center"
    >
      <i
        class="fa-sharp fa-solid fa-circle-info my-auto mr-4 text-xl text-blue-800"
      ></i>
      <span class="my-auto">
        Here are yours time entries for today, {{ new Date().toDateString() }}
      </span>
    </div>
  </div>
  <TimeEntryEditor class="mb-6" />
  <div class="cards-container flex flex-col justify-items-center">
    <TimeEntryCard
      v-for="timeEntry in timeTrackerStore.timeEntries"
      :key="timeEntry.id"
      :project-title="timeTrackerStore.PROJECT_NAME"
      :service-title="timeEntry.serviceName"
      :note-text="timeEntry.noteText"
      :duration-in-minutes="timeEntry.timeInMinutes"
      :is-delete-in-progress="isDeleteInProgress"
      @delete="onTimeEntryDelete(timeEntry.id)"
      @edit="onTimeEntryEdit(timeEntry.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import TimeEntryCard from "@/views/TimeView/TimeEntryCard.vue";
import TimeEntryEditor from "./TimeEntryEditor.vue";
import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";
import { PersonModel } from "@/models/PersonModel";

export default defineComponent({
  name: "TimeView",
  components: { TimeEntryCard, TimeEntryEditor },
  setup() {
    const apiStore = useProductiveApiStore();
    const notifyUserStore = useNotifyUserStore();
    const timeTrackerStore = useTimeTrackerStore();

    const isDeleteInProgress = ref(false);

    // Lifecycle hooks
    onMounted(() => {
      timeTrackerStore.fetchTimeEntryPresentables();
      // subscribe on timeTracker store changes
      timeTrackerStore.$subscribe(storeSubscriptionHandler);
    });

    // Fetch time entries if the currentUser object is mutated
    function storeSubscriptionHandler(mutation: any, state: any) {
      if (mutation?.events?.newValue instanceof PersonModel) {
        timeTrackerStore.fetchTimeEntryPresentables();
      }
    }

    function onTimeEntryDelete(timeEntryId: string) {
      console.log("onTimeEntryDelete", timeEntryId);
      isDeleteInProgress.value = true;
      apiStore
        .deleteTimeEntryById(timeEntryId)
        .then(() => {
          notifyUserStore.notifyUserWithSuccessMessage(
            "Time entry successfully deleted"
          );
        })
        .catch(() => {
          notifyUserStore.notifyUserWithErrorMessage(
            "Time entry can not be deleted"
          );
        })
        .finally(() => {
          isDeleteInProgress.value = false;
          timeTrackerStore.fetchTimeEntryPresentables();
        });
    }

    function onTimeEntryEdit(timeEntryId: string) {
      notifyUserStore.notifyUserWithWarningMessage(
        "Edit feature is not implemented"
      );
    }

    return {
      timeTrackerStore,
      isDeleteInProgress,
      onTimeEntryDelete,
      onTimeEntryEdit,
    };
  },
});
</script>
