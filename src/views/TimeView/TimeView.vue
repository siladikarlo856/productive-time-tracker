<template>
  <div>
    <div class="m-4">
      Here are yours time entries for today ({{ new Date().toDateString() }}) on
      project "{{ timeTrackerStore.PROJECT_NAME }}"
    </div>
  </div>
  <TimeEntryEditor />
  <div class="cards-container flex flex-col justify-items-center">
    <TimeEntryCard
      v-for="timeEntry in timeEntries"
      :key="timeEntry.id"
      :project-title="timeTrackerStore.PROJECT_NAME"
      :service-title="timeEntry.serviceName"
      :note-text="timeEntry.noteText"
      :duration-in-minutes="timeEntry.timeInMinutes"
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

    const timeEntries = ref<Array<any>>([]);

    // Lifecycle hooks
    onMounted(() => {
      console.log("TimeView: get time entries");
      fetchTimeEntries();

      timeTrackerStore.$subscribe(storeSubscriptionHandler);
    });

    function fetchTimeEntries() {
      apiStore
        .getFilteredTimeEntries(
          timeTrackerStore.getTodaysDateFormatted(),
          timeTrackerStore.getTodaysDateFormatted(),
          timeTrackerStore.currentUser.id
        )
        .then((filteredTimeEntriesResponse) => {
          console.log("Time view getFilteredTimeEntries");
          apiStore.getAllServices().then((allServicesResponse) => {
            console.log("get all services", allServicesResponse);

            filteredTimeEntriesResponse.data.data.forEach(
              (timeEntryDTO: any) => {
                console.log("timeEntryDTO object", timeEntryDTO);

                const serviceName = allServicesResponse.data.data.find(
                  (serviceObject: any) =>
                    serviceObject.id ===
                    timeEntryDTO.relationships.service.data.id
                )?.attributes?.name;

                const timeEntryPresentableObj = {
                  id: timeEntryDTO.id,
                  noteText: timeEntryDTO.attributes.note,
                  timeInMinutes: timeEntryDTO.attributes.time,
                  serviceName: serviceName,
                };
                console.log("timeEntryPresentableObj", timeEntryPresentableObj);

                timeEntries.value.push(timeEntryPresentableObj);
              }
            );
            return allServicesResponse;
          });
          return filteredTimeEntriesResponse;
        });
    }

    function storeSubscriptionHandler(mutation: any, state: any) {
      if (mutation?.events?.newValue instanceof PersonModel) {
        console.log("Person mutated", mutation, state);
        fetchTimeEntries();
      }
    }

    function onTimeEntryDelete(timeEntryId: string) {
      console.log("onTimeEntryDelete", timeEntryId);
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
        });
    }

    function onTimeEntryEdit(timeEntryId: string) {
      notifyUserStore.notifyUserWithWarningMessage(
        "Edit feature is not implemented"
      );
    }

    return {
      timeTrackerStore,
      timeEntries,
      onTimeEntryDelete,
      onTimeEntryEdit,
    };
  },
});
</script>
