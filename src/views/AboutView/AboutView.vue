<template>
  <div class="flex flex-col mt-10 text-3xl mx-auto items-center">
    <div>Name: vue3-ts-template</div>
    <div>Framework: vue3</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutView",
  setup() {
    return {};
  },
});
</script>
