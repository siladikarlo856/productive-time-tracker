<template>
  <div
    class="mb-1 mx-4 md:ml-20 md:mr-20 flex flex-col lg:flex-row justify-between py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 items-center sm:space-y-0 sm:space-x-6"
  >
    <div class="text-center space-y-2 sm:text-left lg:w-1/4">
      <div class="space-y-0.5 text-center lg:text-left">
        <p class="text-lg text-black font-semibold">{{ projectTitle }}</p>
        <p class="text-gray-400 font-medium">
          {{ budgetTitle }}: {{ serviceTitle }}
        </p>
      </div>
    </div>
    <div class="flex flex-grow">
      <div class="text-sm">
        <div class="text-gray-900" v-html="noteText"></div>
      </div>
    </div>
    <div class="flex">
      <div class="text-gray-900 font-bold text-xl">
        {{ durationInMinutes }} minutes
      </div>
    </div>
    <div class="flex justify-end w-1/7">
      <div class="w-1/2 mr-2">
        <LoadingButton
          class="px-4 py-2 w-20 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none justify-center w-full"
          @click="$emit('edit')"
        >
          Edit
        </LoadingButton>
      </div>
      <div class="w-1/2 ml-2">
        <LoadingButton
          @click="$emit('delete')"
          :is-loading="isDeleteInProgress"
          class="px-4 py-2 w-20 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none justify-center w-full flex-grow"
          >Delete</LoadingButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingButton from "@/components/LoadingButton/LoadingButton.vue";

export default defineComponent({
  name: "TimeEntryCard",
  components: { LoadingButton },
  props: {
    projectTitle: { type: String },
    budgetTitle: { type: String },
    serviceTitle: { type: String },
    noteText: { type: String },
    durationInMinutes: { type: Number },
    isDeleteInProgress: { type: Boolean },
  },
  emits: ["edit", "delete"],
  setup() {
    return {};
  },
});
</script>
