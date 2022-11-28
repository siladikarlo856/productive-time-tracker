<template>
  <div class="min-h-screen flex flex-row h-screen overflow-y-hidden">
    <nav>
      <MainNavigation class="hidden md:flex" />
    </nav>
    <main class="flex-1 bg-gray-100 overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OrganizationMemberships } from "./interfaces/OrganizationMemberships";
import { OrganizationMembershipsModel } from "./models/OrganizationMembershipsModel";
import { useProductiveApiStore } from "./stores/apiStore";
import { useNotifyUserStore } from "./stores/notifiyUserStore";
import { useTimeTrackerStore } from "./stores/timeTrackerStore";
import MainNavigation from "./components/MainNavigation/MainNavigation.vue";

export default defineComponent({
  name: "AppVue",
  components: { MainNavigation },
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
        timeTrackerStore.fetchTimeEntryPresentables();
      })
      .catch((err) => {
        console.error(err);
        notifyUserStore.notifyUserWithErrorMessage(
          "Something went wrong. Please refresh page and try again."
        );
      });

    return { timeTrackerStore };
  },
});
</script>
