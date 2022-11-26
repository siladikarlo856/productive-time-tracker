<template>
  <div class="min-h-screen flex flex-col h-screen">
    <header class="bg-red-50">Header</header>
    <!-- main container -->
    <div class="flex-1 flex flex-row overflow-y-hidden">
      <main class="flex-1 bg-indigo-100 overflow-y-auto">
        <router-view></router-view>
      </main>

      <nav class="order-first sm:w-32 overflow-y-auto">
        <router-link
          to="/"
          class="text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded"
          >Go to Home</router-link
        >
        <router-link
          to="/about"
          class="text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded"
          >Go to About</router-link
        >
        <router-link
          to="/time"
          class="text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded"
          >Time</router-link
        >
      </nav>
    </div>
    <!-- end main container -->
    <footer class="bg-gray-100">
      Footer
      <button @click="createTimeEntry">Create</button>
      <button @click="deleteTimeEntry">DELETE</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Axios } from "axios";
import { defineComponent, inject } from "vue";
import { useProductiveApiStore } from "./stores/apiStore";

export default defineComponent({
  setup() {
    // Dependency injection
    const axios = inject<Axios>("axios"); // inject axios

    // Stores
    const apiStore = useProductiveApiStore();

    console.log("Test api store");
    apiStore.getOrganizationMemberships();

    apiStore.getFilteredTimeEntries("2022-11-25", "2022-11-25", 352657);
    apiStore.getAvailableServicesForProject("2022-11-25", "2022-11-25", 352657);

    function deleteTimeEntry() {
      console.log("Delete button handler");
      const timeEntryId = window.prompt();
      apiStore.deleteTimeEntryById(Number.parseInt(timeEntryId || ""));
    }

    function createTimeEntry() {
      console.log("Create button handler");
      apiStore.postTimeEntry();
    }

    return { deleteTimeEntry, createTimeEntry };
  },
});
</script>
