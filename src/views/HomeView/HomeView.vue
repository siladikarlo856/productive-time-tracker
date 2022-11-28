<template>
  <div
    class="mt-3 mb-6 ml-20 mr-20 flex flex-col py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 items-center"
  >
    <span class="my-auto text-xl py-6 font-semibold">
      Welcome {{ timeTrackerStore?.currentUser?.attributes?.first_name }}
      {{ timeTrackerStore?.currentUser?.attributes?.last_name }}!
    </span>
    <p class="text-left w-full">
      Thanks for using our client-side web application for time tracking.
    </p>

    <p class="text-left w-full pt-2 pb-6">
      To start tracking time, please click on 'Time' in the navigation or on
      <router-link
        to="/time"
        class="underline text-blue-600 hover:text-blue-800"
        >THIS LINK</router-link
      >.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTimeTrackerStore } from "@/stores/timeTrackerStore";

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const timeTrackerStore = useTimeTrackerStore();

    return { timeTrackerStore };
  },
});
</script>
