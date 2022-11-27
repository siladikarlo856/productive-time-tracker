import { Axios } from "axios";
import { defineStore } from "pinia";
import { ref, computed, inject } from "vue";

export const useProductiveApiStore = defineStore("productive-api-store", () => {
  // Dependency injection
  const axios = inject<Axios>("axios"); // inject axios

  function getOrganizationMemberships() {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.get("/organization_memberships")
      .then((response: { data: any }) => {
        console.log("GET /organization_memberships", response.data);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function getOrganizationMembershipsForSpecificOrganization(
    organizationId: number
  ) {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.get("/organization_memberships", {
        params: {
          "filter[organization_id]": organizationId,
        },
      })
      .then((response: { data: any }) => {
        console.log(
          "GET /organization_memberships for org",
          organizationId,
          response.data
        );
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function getAllTimeEntries() {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.get("/time_entries")
      .then((response: { data: any }) => {
        console.log("GET /time_entries", response.data);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function getFilteredTimeEntries(
    after: string,
    before: string,
    personId: number
  ) {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.get("/time_entries", {
        params: {
          "filter[after]": after,
          "filter[before]": before,
          "filter[person_id]": personId,
        },
      })
      .then((response: { data: any }) => {
        console.log("GET filtered /time_entries", response.data);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function getAllServices() {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.get("/services")
      .then((response: { data: any }) => {
        console.log("GET /services", response.data);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function getServiceById(id: number) {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.get(`/services/${id}`)
      .then((response: { data: any }) => {
        console.log("GET /services", response.data);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function getAvailableServicesForProject(
    after: string,
    before: string,
    personId: number
  ) {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
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
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
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
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided

    return axios
      ?.post("/time_entries", postTimeEntryBody)
      .then((response: { data: any }) => {
        console.log("POST /time_entries response:", response.data);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  function deleteTimeEntryById(id: number) {
    if (!axios) return Promise.reject("Error. Internal error."); // error if axios is not provided
    return axios
      ?.delete(`/time_entries/${id}`)
      .then((response: any) => {
        console.log("DELETE /time_entries", response);
        return response;
      })
      .catch((err) => {
        console.error("API call error", err);
        return Promise.reject(err);
      });
  }

  return {
    getOrganizationMemberships,
    getOrganizationMembershipsForSpecificOrganization,
    getAllTimeEntries,
    getFilteredTimeEntries,
    getAllServices,
    getServiceById,
    getAvailableServicesForProject,
    postTimeEntry,
    deleteTimeEntryById,
  };
});
