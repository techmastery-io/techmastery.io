<template>
  <div class="mb-10 px-5 max-w-md w-full">
    <p class="mb-10 text-2xl font-medium text-center">
      ... or a specific technology:
    </p>
    <div class=" flex items-center justify-around">
      <nuxt-link
        v-for="(roadmapSlug, index) in roadmapList"
        :key="index"
        :to="localePath({ name: 'paths-slug', params: { slug: roadmapSlug } })"
      >
        <component
          :is="$store.getters.getRodmapInfo(roadmapSlug).icon"
          class="h-10 w-auto transition-transform duration-200 transform  hover:scale-125"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    roadmapList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped></style>
