<template>
  <div
    class="flex relative w-full cursor-pointer max-w-sm py-5 px-8 center-items rounded-md text-white justify-between"
    :style="roadmap.bg_color"
  >
    <div v-if="roadmap.icon">
      <component :is="roadmap.icon" class="h-8 mr-4 w-auto" />
    </div>
    <div class="my-auto">
      <h3 class="text-base font-semibold">{{ roadmap.title }}</h3>
      <p v-if="roadmap.description" class="text-sm">
        {{ roadmap.description }}
      </p>
    </div>
    <div
      v-if="!roadmap.icon"
      class="flex relative ml-4 items-center"
      style="right:-1rem"
    >
      <ArrowIcon class="transform rotate-180 w-5 h-5 border-white" />
    </div>
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

<style scoped>
@screen sm {
  .path-card {
    min-width: 20rem;
  }
}
</style>
