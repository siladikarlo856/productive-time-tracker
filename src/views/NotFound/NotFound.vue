<template>
  <div
    class="mt-3 mb-6 ml-20 mr-20 flex flex-col py-8 px-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:space-y-0 items-center"
  >
    <i class="fa-sharp fa-solid fa-error my-auto mr-4 text-xl text-red-500"></i>
    <span class="my-auto text-xl pb-6 font-semibold">
      Sorry. Page Not Found :(
    </span>
    <p class="text-right">
      <!-- eslint-disable-next-line vue/no-parsing-error -->
      Please go back or use
      <router-link to="/" class="underline text-blue-600 hover:text-blue-800"
        >THIS LINK</router-link
      >
      to go on home page
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: "NotFound",
};
</script>
