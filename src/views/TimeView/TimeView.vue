<template>
  <div class="cards-container flex flex-col justify-items-center"></div>
  <TimeEntryCard />
  <TimeEntryCard />
  <TimeEntryCard />
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
