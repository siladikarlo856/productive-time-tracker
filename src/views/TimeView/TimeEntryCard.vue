<template>
  <div
    class="mb-1 ml-20 mr-20 flex justify-between py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
  >
    <div class="text-center space-y-2 sm:text-left">
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">{{ projectTitle }}</p>
        <p class="text-slate-500 font-medium">{{ serviceTitle }}</p>
      </div>
    </div>
    <div class="flex flex-grow">
      <div class="text-sm ml-6">
        <div class="text-gray-900" v-html="noteText"></div>
      </div>
    </div>
    <div class="flex">
      <div class="text-gray-900 font-bold text-xl">
        {{ durationInMinutes }} minutes
      </div>
    </div>
    <div>
      <button
        class="mr-4 px-4 py-1 w-20 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none"
        @click="$emit('edit')"
      >
        Edit
      </button>
      <button
        class="px-4 py-1 text-sm w-20 text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none"
        @click="$emit('delete')"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimeEntryCard",
  props: {
    projectTitle: { type: String },
    serviceTitle: { type: String },
    noteText: { type: String },
    durationInMinutes: { type: Number },
  },
  emits: ["edit", "delete"],
  setup() {
    return {};
  },
});
</script>
