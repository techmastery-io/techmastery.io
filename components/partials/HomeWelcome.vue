<template>
  <div
    class="px-5 py-16 flex flex-col lg:flex-row max-w-screen-xl items-center"
  >
    <div class="md:max-w-3xl px-2 md:px-6 text-center lg:text-left">
      <h1 class="tracking-tight text-4xl font-medium leading-tight">
        Community curated
        <span class="text-primary">learning paths </span> to become a web
        developer
      </h1>
      <p class="mt-6 mb-8 mx-auto text-lg leading-relaxed text-gray-600">
        Know what to learn next, explore free resources and
        <span class="font-medium">keep track of your progress</span>.
      </p>
    </div>
    <div class="px-6 max-w-4xl">
      <div class=""><HomeDesktopArt class="w-full h-auto" /></div>
    </div>
  </div>
</template>

<script>
import HomeDesktopArt from '@/assets/images/HomeDesktopArt.vue'
export default {
  components: {
    HomeDesktopArt
  }
}
</script>

<style scoped></style>
