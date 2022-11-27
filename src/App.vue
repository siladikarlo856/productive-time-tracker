<template>
  <div class="min-h-screen flex flex-col h-screen">
    <!-- main container -->

    <div class="flex-1 flex flex-row overflow-y-hidden">
      <main class="flex-1 bg-indigo-100 overflow-y-auto">
        <div class="flex bg-red-50 p-5 border">
          Hello {{ timeTrackerStore.currentUser.attributes?.first_name }}
          {{ timeTrackerStore.currentUser.attributes?.last_name }}!
        </div>
        <router-view></router-view>
      </main>

      <nav class="order-first sm:w-32 overflow-y-auto">
        <div class="p-5 border">Productive</div>
        <router-link
          to="/"
          class="border text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded text-center"
          >Home</router-link
        >
        <router-link
          to="/time"
          class="border text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded text-center"
          >Time</router-link
        >
        <router-link
          to="/about"
          class="border text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded text-center"
          >About</router-link
        >
      </nav>
    </div>
    <!-- end main container -->
    <footer class="bg-gray-100">Footer</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OrganizationMemberships } from "./interfaces/OrganizationMemberships";
import { OrganizationMembershipsModel } from "./models/OrganizationMembershipsModel";
import { useProductiveApiStore } from "./stores/apiStore";
import { useNotifyUserStore } from "./stores/notifiyUserStore";
import { useTimeTrackerStore } from "./stores/timeTrackerStore";

export default defineComponent({
  setup() {
    // Stores
    const apiStore = useProductiveApiStore();
    const notifyUserStore = useNotifyUserStore();
    const timeTrackerStore = useTimeTrackerStore();

    apiStore
      .getOrganizationMemberships()
      .then((res) => {
        timeTrackerStore.organizationMemberships =
          new OrganizationMembershipsModel(res.data as OrganizationMemberships);
      })
      .then(() => {
        const orgMembership = timeTrackerStore.findOrgMembershipForOrganization(
          timeTrackerStore.ORGANIZATION_ID
        );
        if (orgMembership) {
          timeTrackerStore.orgMembershipForCurrentOrganization = orgMembership;
        }
        const personId = orgMembership?.relationships?.person?.data?.id;
        const personObject =
          timeTrackerStore.getPersonFromOrganizationMemberships(personId);
        if (personObject) {
          timeTrackerStore.currentUser = personObject;
        }
        console.log("Current user: ", personObject);
      })
      .then(() => {
        apiStore.getFilteredTimeEntries(
          "2022-11-25",
          "2022-11-25",
          timeTrackerStore.orgMembershipForCurrentOrganization.id
        );
        apiStore.getAvailableServicesForProject(
          "2022-11-25",
          "2022-11-25",
          timeTrackerStore.orgMembershipForCurrentOrganization.id,
          timeTrackerStore.PROJECT_ID
        );
      })
      .catch((res) => {
        console.log("getOrganizationMemberships catch", res);
      });

    return { timeTrackerStore };
  },
});
</script>
