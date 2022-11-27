<template>
  <div class="min-h-screen flex flex-col h-screen">
    <header class="bg-red-50">
      Hello {{ timeTrackerStore.currentUser.attributes?.first_name }}
      {{ timeTrackerStore.currentUser.attributes?.last_name }}
    </header>
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

    function deleteTimeEntry() {
      console.log("Delete button handler");
      const timeEntryId = window.prompt();
      apiStore
        .deleteTimeEntryById(timeEntryId || "")
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

    function createTimeEntry() {
      console.log("Create button handler");
      const postTimeEntryBody = {
        data: {
          type: "time_entries",
          attributes: {
            note: "test note vue",
            date: "2022-11-25",
          },
          relationships: {
            person: {
              data: {
                type: "people",
                id: "352657",
              },
            },
            service: {
              data: {
                type: "services",
                id: "2343326",
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

    return { timeTrackerStore, deleteTimeEntry, createTimeEntry };
  },
});
</script>
