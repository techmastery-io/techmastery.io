<template>
  <div class="mx-auto border-gray-100 border-t-2 flex flex-col items-center">
    <HomeWelcome />
    <HomeChoosePath :roadmap-list="featuredRoadmaps" />
    <HomeChooseTechnology :roadmap-list="featuredTechRoadmaps" />
  </div>
</template>

<script>
import HomeWelcome from '@/components/partials/HomeWelcome.vue'
import HomeChoosePath from '@/components/partials/HomeChoosePath.vue'
import HomeChooseTechnology from '@/components/partials/HomeChooseTechnology'

export default {
  meta: {
    theme: 'light'
  },
  components: {
    HomeWelcome,
    HomeChoosePath,
    HomeChooseTechnology
  },
  computed: {
    featuredRoadmaps() {
      return this.$store.state.featuredRoadmaps
    },
    featuredTechRoadmaps() {
      return this.$store.state.featuredTechRoadmaps
    }
  }
}
</script>

<style></style>
