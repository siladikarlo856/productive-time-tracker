<template>
  <div class="min-h-screen flex flex-col h-screen">
    <header class="bg-red-50">Header</header>
    <!-- main container -->
    <div class="flex-1 flex flex-row overflow-y-hidden">
      <main class="flex-1 bg-indigo-100 overflow-y-auto">
        <router-view></router-view>
      </main>

      <nav class="order-first sm:w-32 overflow-y-auto">
        <router-link
          to="/"
          class="text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded"
          >Go to Home</router-link
        >
        <router-link
          to="/about"
          class="text-blue-500 hover:text-blue-800 block hover:bg-indigo-50 py-2 px-2 rounded"
          >Go to About</router-link
        >
      </nav>
    </div>
    <!-- end main container -->
    <footer class="bg-gray-100">Footer</footer>
  </div>
</template>

<script lang="ts">
import { Axios } from "axios";
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const axios = inject<Axios>("axios"); // inject axios

    axios
      ?.get("https://dummyjson.com/products/1")
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error("API call error", err);
      });

    console.log("Test lint warning");
    return {};
  },
});
</script>
