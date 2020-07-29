<template>
  <div class="flex flex-col" style="min-height: 100vh;">
    <TheHeader />
    <nuxt class="flex-grow" />
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter
  },
  async fetch() {
    // await store.dispatch('getRoadmapList')
    // await this.$store.dispatch('getRoadmapList', { locale: this.$i18n.locale })
  }
}
</script>
<style></style>
