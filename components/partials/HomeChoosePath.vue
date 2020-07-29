<template>
  <div class="mb-10 px-6 w-full">
    <p class="mb-10 text-3xl font-medium text-center tracking-tight">
      Choose a career path:
    </p>
    <nuxt-link
      v-for="(roadmapSlug, index) in roadmapList"
      :key="index"
      class="flex-col flex items-center"
      :to="localePath({ name: 'paths-slug', params: { slug: roadmapSlug } })"
    >
      <path-card
        :roadmap="$store.getters.getRodmapInfo(roadmapSlug)"
        class="mb-4 transition-transform duration-200 transform  hover:scale-105"
      />
    </nuxt-link>
  </div>
</template>

<script>
import PathCard from '@/components/PathCard.vue'
export default {
  components: {
    PathCard
  },
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
