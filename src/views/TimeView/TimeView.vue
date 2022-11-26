<template>
  <div class="cards-container flex flex-col justify-items-center">
    <TimeEntryCard
      v-for="timeEntry in timeEntries"
      :key="timeEntry.id"
      project-title="Productive time tracker"
      :service-title="timeEntry.serviceName"
      :note-text="timeEntry.noteText"
      :duration-in-minutes="timeEntry.timeInMinutes"
      @delete="onTimeEntryDelete(timeEntry.id)"
      @edit="onTimeEntryEdit(timeEntry.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import TimeEntryCard from "@/views/TimeView/TimeEntryCard.vue";
import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";

export default defineComponent({
  name: "TimeView",
  components: { TimeEntryCard },
  setup() {
    const apiStore = useProductiveApiStore();
    const notifyUserStore = useNotifyUserStore();

    const timeEntries = ref<Array<any>>([]);

    // Lifecycle hooks
    // On create
    apiStore
      .getFilteredTimeEntries("2022-11-25", "2022-11-25", 352657)
      .then((response) => {
        console.log("TimeView getFilteredTimeEntries", response);

        response.data.data.forEach(async (timeEntryDTO: any) => {
          await apiStore
            .getServiceById(timeEntryDTO.relationships.service.data.id)
            .then((res) => {
              const timeEntryPresentableObj = {
                id: timeEntryDTO.id,
                noteText: timeEntryDTO.attributes.note,
                timeInMinutes: timeEntryDTO.attributes.time,
                serviceName: res.data.data.attributes.name,
              };
              console.log("timeEntryPresentableObj", timeEntryPresentableObj);

              timeEntries.value.push(timeEntryPresentableObj);
            });
        });
        return response;
      })
      .then((response) => {
        console.log("timeEntries created", response.data.data);
      });

    function onTimeEntryDelete(timeEntryId: number) {
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

    function onTimeEntryEdit(timeEntryId: number) {
      notifyUserStore.notifyUserWithWarningMessage(
        "Edit feature is not implemented"
      );
    }

    return { timeEntries, onTimeEntryDelete, onTimeEntryEdit };
  },
});
</script>
