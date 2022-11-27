<template>
  <div
    class="mb-1 ml-20 mr-20 flex flex-col md:flex-row justify-between py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
  >
    <div class="flex flex-wrap -mx-3 w-1/4">
      <div class="px-3 mb-6 md:mb-0 w-full">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="service"
        >
          Service
        </label>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="service"
            v-model="selectedService"
          >
            <option value="" disabled selected>Select service</option>
            <option
              v-for="service in availableServices"
              :key="service.id"
              :value="service.id"
            >
              {{ service.name }}
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
    <div class="flex flex-grow -mx-3">
      <div class="px-3 mb-6 md:mb-0 w-full">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-last-name"
        >
          Description
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          v-model="description"
        />
      </div>
    </div>
    <div class="flex flex-wrap justify-end -mx-3 w-1/7">
      <div class="mb-6 md:mb-0">
        <div class="block">
          <br />
        </div>
        <button
          class="mr-0 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none"
          @click="onAddNewClick"
        >
          Add new
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useProductiveApiStore } from "@/stores/apiStore";
import { useNotifyUserStore } from "@/stores/notifiyUserStore";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "TimeEntryEditor",
  components: {},
  setup() {
    const apiStore = useProductiveApiStore();
    const notifyUserStore = useNotifyUserStore();
    const timeTrackerStore = useTimeTrackerStore();

    const selectedService = ref("");
    const description = ref("");

    const availableServices = [
      {
        id: "2342970",
        name: "My service for development",
      },
      {
        id: "2343326",
        name: "Open hours",
      },
    ];

    function onAddNewClick() {
      console.log("Add new: ", selectedService.value, description.value);
      createTimeEntry();
    }

    function createTimeEntry() {
      console.log("Create button handler");
      const postTimeEntryBody = {
        data: {
          type: "time_entries",
          attributes: {
            note: description.value,
            date: "2022-11-25",
          },
          relationships: {
            person: {
              data: {
                type: "people",
                id: timeTrackerStore.currentUser.id,
              },
            },
            service: {
              data: {
                type: "services",
                id: selectedService.value,
              },
            },
            task: {
              data: null,
            },
          },
        },
      };
      apiStore
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

    watchEffect(() => {
      // TODO: reactive validation
    });

    return { selectedService, description, availableServices, onAddNewClick };
  },
});
</script>
