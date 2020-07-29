<template>
  <div
    class="whitespace-no-wrap cursor-pointer flex max-w-xs lg:max-w-sm py-5 px-6 center-items rounded-md text-white justify-between"
    :style="roadmap.bg_color"
  >
    <div v-if="roadmap.icon">
      <component :is="roadmap.icon" class="h-8 mr-4 w-auto" />
    </div>
    <div class="my-auto">
      <h3 class="text-base mb-1">{{ roadmap.title }}</h3>
    </div>
    <!-- <div v-if="!roadmap.icon" class="flex ml-4 items-center">
      <ArrowIcon class="transform rotate-180 w-5 h-5 border-white" />
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    roadmap: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped></style>
