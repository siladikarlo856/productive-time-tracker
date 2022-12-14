<template>
  <div
    class="mt-3 mb-6 mx-5 md:ml-20 md:mr-20 flex py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:space-y-0 items-center"
  >
    <i
      class="fa-sharp fa-solid fa-circle-info mr-4 text-xl text-blue-800 my-auto"
    ></i>
    <div class="flex">
      Here are yours time entries for today, {{ new Date().toDateString() }}
    </div>
  </div>
  <TimeEntryEditor class="mb-6" />
  <div class="cards-container flex flex-col justify-items-center">
    <TimeEntryCard
      v-for="timeEntry in timeTrackerStore.timeEntries"
      :key="timeEntry.id"
      :project-title="timeEntry.projectName"
      :budget-title="timeEntry.budgetName"
      :service-title="timeEntry.serviceName"
      :note-text="timeEntry.note"
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
    });

    // Fetch time entries if the currentUser object is mutated
    function storeSubscriptionHandler(mutation: any, state: any) {
      if (mutation?.events?.newValue instanceof PersonModel) {
        timeTrackerStore.fetchTimeEntryPresentables();
      }
    }

    function onTimeEntryDelete(timeEntryId: string) {
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
