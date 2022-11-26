import { Axios } from "axios";
import { defineStore } from "pinia";
import { ref, computed, inject } from "vue";

export const useProductiveApiStore = defineStore("productive-api-store", () => {
  // Dependency injection
  const axios = inject<Axios>("axios"); // inject axios

  function getOrganizationMemberships() {
    return (
      axios
        ?.get("/organization_memberships")
        .then((response: { data: any }) => {
          console.log("GET /organization_memberships", response.data);
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

  function getAllTimeEntries() {
    return (
      axios
        ?.get("/time_entries")
        .then((response: { data: any }) => {
          console.log("GET /time_entries", response.data);
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

  function getFilteredTimeEntries(
    after: string,
    before: string,
    personId: number
  ) {
    return (
      axios
        ?.get("/time_entries", {
          params: {
            "filter[after]": after,
            "filter[before]": before,
            "filter[person_id]": personId,
          },
        })
        .then((response: { data: any }) => {
          console.log("GET filtered /time_entries", response.data);
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

  function getAllServices() {
    return (
      axios
        ?.get("/services")
        .then((response: { data: any }) => {
          console.log("GET /services", response.data);
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

  function getAvailableServicesForProject(
    after: string,
    before: string,
    personId: number
  ) {
    return (
      axios
        ?.get("/services", {
          params: {
            "filter[after]": after,
            "filter[before]": before,
            "filter[person_id]": personId,
            "filter[project_id]": 261719,
            "filter[time_tracking_enabled]": true,
          },
        })
        .then((response: { data: any }) => {
          console.log(
            "GET getAvailableServicesForProject /services",
            response.data
          );
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

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

  function postTimeEntry() {
    return (
      axios
        ?.post("/time_entries", postTimeEntryBody)
        .then((response: { data: any }) => {
          console.log("POST /time_entries response:", response.data);
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

  function deleteTimeEntryById(id: number) {
    return (
      axios
        ?.delete(`/time_entries/${id}`)
        .then((response: any) => {
          console.log("DELETE /time_entries", response);
        })
        .catch((err) => {
          console.error("API call error", err);
        }) || Promise.reject("Error 123") // error if axios is not provided
    );
  }

  return {
    getOrganizationMemberships,
    getAllTimeEntries,
    getFilteredTimeEntries,
    getAllServices,
    getAvailableServicesForProject,
    postTimeEntry,
    deleteTimeEntryById,
  };
});
