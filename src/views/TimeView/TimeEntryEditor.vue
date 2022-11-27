<template>
  <div
    class="mb-1 ml-20 mr-20 flex flex-col justify-between py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0"
  >
    <div class="flex flex-grow w-full pb-4">
      <div class="flex flex-grow">
        <div class="mb-6 md:mb-0 w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="project"
          >
            Project
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="project"
            >
              <option value="" disabled selected>
                {{ timeTrackerStore.PROJECT_NAME }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row flex-grow justify-between w-full">
      <div class="flex flex-wrap flex-grow w-1/2">
        <div class="pr-1 mb-6 md:mb-0 w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="service"
          >
            Service
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :class="{
                'border-2': isServiceFieldInvalid,
                'border-red-600': isServiceFieldInvalid,
              }"
              id="service"
              v-model="selectedService"
            >
              <option value="" disabled selected>Select service</option>
              <option
                v-for="service in timeTrackerStore.availableServicesForProject"
                :key="service.id"
                :value="service.id"
              >
                {{ service.budgetName }}: {{ service.name }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-1/4 flex-grow">
        <div class="px-2 mb-6 md:mb-0 w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="time"
          >
            Time [min]
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="time"
            type="number"
            v-model="timeInMinutes"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-grow w-full pt-4">
      <div class="flex flex-grow">
        <div class="mb-6 md:mb-0 w-full">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >
            Note
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            v-model="note"
          />
        </div>
      </div>
      <div class="flex flex-wrap justify-end w-1/5">
        <div class="mt-1 ml-4 w-full">
          <div class="block">
            <br />
          </div>
          <LoadingButton
            class="px-4 py-2 w-20 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none justify-center w-full flex-grow"
            @click="onAddNewClick"
            :isLoading="isLoading"
          >
            Add new
          </LoadingButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import LoadingButton from "@/components/LoadingButton/LoadingButton.vue";
import { CreateTimeEntryCommandModelImpl } from "@/models/CreateTimeEntryCommandModelImpl";
import { getTodaysDateFormatted } from "@/helpers/helpers";
import { validate } from "@babel/types";

export default defineComponent({
  name: "TimeEntryEditor",
  components: { LoadingButton },
  setup() {
    const apiStore = useProductiveApiStore();
    const notifyUserStore = useNotifyUserStore();
    const timeTrackerStore = useTimeTrackerStore();

    const selectedService = ref("");
    const note = ref("");
    const timeInMinutes = ref();

    const isLoading = ref(false);
    const isServiceFieldInvalid = ref(false);

    function onAddNewClick() {
      isLoading.value = true;
      validateTimeEntry()
        .then(() => {
          createTimeEntry()
            .then(() => {
              timeTrackerStore.fetchTimeEntryPresentables();
            })
            .finally(() => {
              clearForm();
              isLoading.value = false;
            });
        })
        .catch(() => {
          notifyUserStore.notifyUserWithErrorMessage(
            "Service field is required."
          );
          isLoading.value = false;
        });
    }

    function validateTimeEntry(): Promise<void> {
      if (selectedService.value) {
        isServiceFieldInvalid.value = false;
        return Promise.resolve();
      }
      isServiceFieldInvalid.value = true;
      return Promise.reject();
    }

    function createTimeEntry() {
      const postTimeEntryBody = new CreateTimeEntryCommandModelImpl(
        note.value,
        getTodaysDateFormatted(),
        timeInMinutes.value,
        timeTrackerStore.currentUser.id,
        selectedService.value
      );

      return apiStore
        .postTimeEntry(postTimeEntryBody)
        .then(() => {
          notifyUserStore.notifyUserWithSuccessMessage("Time entry created");
        })
        .catch(() => {
          notifyUserStore.notifyUserWithErrorMessage(
            "Time entry creation failed"
          );
        });
    }

    function clearForm() {
      selectedService.value = "";
      note.value = "";
      timeInMinutes.value = undefined;
    }

    onMounted(() => {
      timeTrackerStore.fetchAvailableServicesForProject();
    });

    watchEffect(() => {
      if (isServiceFieldInvalid.value && selectedService.value) {
        isServiceFieldInvalid.value = false;
      }
    });

    return {
      timeTrackerStore,
      selectedService,
      note,
      timeInMinutes,
      isLoading,
      isServiceFieldInvalid,
      onAddNewClick,
    };
  },
});
</script>
