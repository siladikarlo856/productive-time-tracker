import { getTodaysDateFormatted } from "@/helpers/helpers";
import { ProductiveDTO } from "@/interfaces/ProductiveDTO";
import { ServiceDTO } from "@/interfaces/ServiceDTO";
import { OrganizationMembershipModel } from "@/models/OrganizationMembershipModel";
import { OrganizationMembershipsModel } from "@/models/OrganizationMembershipsModel";
import { PersonModel } from "@/models/PersonModel";
import { ServicePresentableModel } from "@/presentables/ServicePresentableModel";
import { TimeEntryPresentableModel } from "@/presentables/TimeEntryPresentableModel";
import { defineStore } from "pinia";
import { ref } from "vue";
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

  const timeEntries = ref<Array<TimeEntryPresentableModel>>([]);
  const availableServicesForProject = ref<Array<ServicePresentableModel>>([]);

  function fetchTimeEntryPresentables() {
    if (!currentUser.value.id) {
      return Promise.reject("User data is not present.");
    }
    return apiStore
      .getFilteredTimeEntries(
        getTodaysDateFormatted(),
        getTodaysDateFormatted(),
        currentUser.value.id
      )
      .then((filteredTimeEntriesResponse) => {
        timeEntries.value = filteredTimeEntriesResponse.data.data.map(
          (timeEntryDTO: any) =>
            new TimeEntryPresentableModel(
              timeEntryDTO,
              filteredTimeEntriesResponse.data.included
            )
        );

        return timeEntries.value;
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
        if (Array.isArray(response?.data)) {
          const servicesArray = response?.data?.map(
            (serviceDTO) =>
              new ServicePresentableModel(
                serviceDTO as unknown as ServiceDTO,
                response?.included
              )
          );
          availableServicesForProject.value =
            servicesArray || ([] as Array<ServicePresentableModel>);
        }
        return availableServicesForProject;
      });
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
    fetchTimeEntryPresentables,
    fetchAvailableServicesForProject,
  };
});
