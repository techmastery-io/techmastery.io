<template>
  <div class="flex items-center  border-b px-5 max-w-screen-xl mx-auto">
    <div class="flex items-center">
      <nuxt-link
        :to="{ name: 'paths-slug', params: { slug: $route.params.slug } }"
        ><ArrowIcon class="w-6 h-6"
      /></nuxt-link>
    </div>
    <div class="py-4 flex-grow">
      <span class="ml-4 text-lg font-semibold">{{ core.title }}</span>
      <nuxt-link
        :to="{ name: 'paths-slug', params: { slug: $route.params.slug } }"
        class="hover:underline text-gray-500"
        ><span class=" ml-2">in {{ getRoadmapName }}</span></nuxt-link
      >
    </div>
    <icon-html class="w-8" />
  </div>
</template>

<script>
import IconHtml from '@/components/svg/IconHtml'
export default {
  components: {
    IconHtml
  },
  props: {
    core: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getRoadmapName() {
      return this.$store.state.roadmaps[this.$route.params.slug].title
    }
  }
}
</script>

<style scoped></style>
