import { OrganizationMembershipModel } from "@/models/OrganizationMembershipModel";
import { OrganizationMembershipsModel } from "@/models/OrganizationMembershipsModel";
import { PersonModel } from "@/models/PersonModel";
import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useProductiveApiStore } from "./apiStore";

export const useTimeTrackerStore = defineStore("time-tracker-store", () => {
  // CONSTANTS
  const ORGANIZATION_ID = "23881";
  const PROJECT_ID = "261719";
  const PROJECT_NAME = "Productive time tracker";

  // STORES and COMPOSABLES
  const apiStore = useProductiveApiStore();

  // REACTIVE
  const organizationMemberships = ref<OrganizationMembershipsModel>(
    new OrganizationMembershipsModel()
  );
  const orgMembershipForCurrentOrganization = ref<OrganizationMembershipModel>(
    new OrganizationMembershipModel()
  );
  const currentUser = ref<PersonModel>(new PersonModel());

  const timeEntries = ref<Array<any>>([]);
  const availableServicesForProject = ref<Array<any>>([]);

  function fetchTimeEntryPresentables() {
    apiStore
      .getFilteredTimeEntries(
        getTodaysDateFormatted(),
        getTodaysDateFormatted(),
        currentUser.value.id
      )
      .then((filteredTimeEntriesResponse) => {
        console.log("Time view getFilteredTimeEntries");
        apiStore.getAllServices().then((allServicesResponse) => {
          console.log("get all services", allServicesResponse);

          timeEntries.value = [];
          filteredTimeEntriesResponse.data.data.forEach((timeEntryDTO: any) => {
            console.log("timeEntryDTO object", timeEntryDTO);

            const serviceName = allServicesResponse.data.data.find(
              (serviceObject: any) =>
                serviceObject.id === timeEntryDTO.relationships.service.data.id
            )?.attributes?.name;

            const timeEntryPresentableObj = {
              id: timeEntryDTO.id,
              noteText: timeEntryDTO.attributes.note,
              timeInMinutes: timeEntryDTO.attributes.time,
              serviceName: serviceName,
            };
            console.log("timeEntryPresentableObj", timeEntryPresentableObj);

            timeEntries.value.push(timeEntryPresentableObj);
          });
          return allServicesResponse;
        });
        return filteredTimeEntriesResponse;
      });
  }

  function fetchAvailableServicesForProject() {
    return apiStore
      .getAvailableServicesForProject(
        getTodaysDateFormatted(),
        getTodaysDateFormatted(),
        currentUser.value.id,
        PROJECT_ID
      )
      .then((response) => {
        availableServicesForProject.value = response.data.data;
        console.log(
          "fetchAvailableServicesForProject then in store",
          availableServicesForProject.value
        );
        return response;
      });
  }

  /**
   * Get today's in 'YYYY-MM-DD' format
   * @returns 'YYYY-MM-DD'
   */
  function getTodaysDateFormatted(): string {
    return formatDateYYYYMMDD(new Date());
  }

  function formatDateYYYYMMDD(date: Date) {
    return date.toISOString().split("T")[0];
  }

  function findOrgMembershipForOrganization(
    organizationId: string
  ): OrganizationMembershipModel | undefined {
    return organizationMemberships.value.data.find(
      (organizationMembership: OrganizationMembershipModel) =>
        organizationMembership?.relationships?.organization?.data?.id ===
        organizationId
    );
  }

  function getPersonFromOrganizationMemberships(
    personId?: string
  ): PersonModel | undefined {
    return organizationMemberships.value.included.find(
      (includedObject: any) => includedObject?.id === personId
    );
  }

  return {
    ORGANIZATION_ID,
    PROJECT_ID,
    PROJECT_NAME,
    organizationMemberships,
    orgMembershipForCurrentOrganization,
    currentUser,
    timeEntries,
    availableServicesForProject,
    findOrgMembershipForOrganization,
    getPersonFromOrganizationMemberships,
    getTodaysDateFormatted,
    fetchTimeEntryPresentables,
    fetchAvailableServicesForProject,
  };
});
