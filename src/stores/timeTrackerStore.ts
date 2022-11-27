import { OrganizationMembershipModel } from "@/models/OrganizationMembershipModel";
import { OrganizationMembershipsModel } from "@/models/OrganizationMembershipsModel";
import { PersonModel } from "@/models/PersonModel";
import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export const useTimeTrackerStore = defineStore("time-tracker-store", () => {
  // CONSTANTS
  const ORGANIZATION_ID = "23881";
  const PROJECT_ID = "261719";
  const PROJECT_NAME = "Productive time tracker";

  // REACTIVE
  const organizationMemberships = ref<OrganizationMembershipsModel>(
    new OrganizationMembershipsModel()
  );
  const orgMembershipForCurrentOrganization = ref<OrganizationMembershipModel>(
    new OrganizationMembershipModel()
  );
  const currentUser = ref<PersonModel>(new PersonModel());

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
    findOrgMembershipForOrganization,
    getPersonFromOrganizationMemberships,
    getTodaysDateFormatted,
  };
});
