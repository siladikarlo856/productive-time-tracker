<template>
  <div class="cards-container flex flex-col justify-items-center"></div>
  <TimeEntryCard
    project-title="Productive time tracker"
    service-title="My service for development"
    note-text="Here goes note for development time entry"
    :duration-in-minutes="120"
  />
  <TimeEntryCard
    project-title="Productive time tracker"
    service-title="My service for testing"
    note-text="Here goes note for testing time entry"
    :duration-in-minutes="50"
  />
  <TimeEntryCard
    project-title="Productive time tracker"
    service-title="My service for documenting"
    note-text="Here goes note for documenting time entry"
    :duration-in-minutes="100"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimeEntryCard from "@/views/TimeView/TimeEntryCard.vue";

export default defineComponent({
  name: "TimeView",
  components: { TimeEntryCard },
  setup() {
    return {};
  },
});
</script>
